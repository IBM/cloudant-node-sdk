/**
 * © Copyright IBM Corporation 2020, 2021. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const { promisify } = require('util');
const sinon = require('sinon');
const { CookieJar } = require('tough-cookie');
const { CouchdbSessionAuthenticator } = require('../../index.ts');
const { SessionTokenManager } = require('../../auth/sessionTokenManager.ts');

describe('CouchdbSessionAutheticator tests', () => {
  it('Constructor input validation check', () => {
    try {
      // eslint-disable-next-line no-new
      new CouchdbSessionAuthenticator({});
    } catch (err) {
      assert.strictEqual(
        'Error: Missing required parameters: username, password',
        err.toString()
      );
    }
  });

  it('During authentication getToken called', () => {
    const options = {
      username: 'username',
      password: 'password',
      serviceUrl: 'http://cloudant.example:80',
      jar: new CookieJar(),
    };
    const auth = new CouchdbSessionAuthenticator(options);
    auth.configure({});
    assert.ok(auth);
    assert.ok(auth.tokenManager);
    assert.ok(auth.tokenManager instanceof SessionTokenManager);
    assert.strictEqual('COUCHDB_SESSION', auth.authenticationType());

    const getTokenStubFn = sinon.stub(auth.tokenManager, 'getToken');
    auth.authenticate();
    assert.ok(getTokenStubFn.calledOnce);

    /* authenticator stores the same jar */
    assert.ok(auth.tokenManager.options.jar, options.jar);
  });

  // A function that asserts cookie jar values are correct after the specified times
  // Part 1. Performs authenticate(), sets cookie into jar and retrieves it for assertions
  // Elapses time (relative to start of test) to the number of seconds specified by the first arg
  // Part 2. Performs authenticate(), sets cookie into jar and retrieves it for update assertions
  // Elapses time (relative to start of test) to the number of seconds specified by the second arg
  // Part 3. Asserts cookie is the one from the second authenticate (i.e. it was refreshed and was not purged by expiry)
  function renewalTest(useMaxAge, firstElapsedSeconds, secondElapsedSeconds) {
    const options = {
      username: 'username',
      password: 'password',
      serviceUrl: 'http://cloudant.example:80',
      jar: new CookieJar(),
    };
    // Promisify the cookie jar methods for easier chaining in the test
    const setCookie = promisify(options.jar.setCookie.bind(options.jar));
    const getCookie = promisify(options.jar.getCookieString.bind(options.jar));
    setCookie.bind(options.jar);
    getCookie.bind(options.jar);
    // Setup of test header responses
    const makeCookieHeader = (token, elapasedTime) =>
      `AuthSession=${token}; Expires=${new Date(
        Date.now() + 1000 * (elapasedTime + 3600)
      ).toUTCString()}${useMaxAge ? '; Max-Age=3600' : ''}`;
    const headers = [
      makeCookieHeader('01234', 0),
      makeCookieHeader('56789', firstElapsedSeconds),
    ];
    const auth = new CouchdbSessionAuthenticator(options);
    auth.configure({});

    const fakeTokenRequest = (index) =>
      sinon.fake.resolves({
        'headers': {
          'set-cookie': [headers[index]],
        },
      });

    // Fake requestToken for part 1 token request
    let requestFake = sinon.replace(
      auth.tokenManager,
      'requestToken',
      fakeTokenRequest(0)
    );
    let clock;
    return (
      /* Start of part 1 */
      auth
        .authenticate()
        .then(() => {
          assert.ok(
            requestFake.calledOnce,
            'There should be exactly 1 session request in part 1.'
          );
          return setCookie(headers[0], options.serviceUrl, {});
        })
        .then(() => getCookie(options.serviceUrl))
        .then((cookieFromJar) => {
          assert.strictEqual(cookieFromJar, 'AuthSession=01234');
        })
        /* End of part 1 */
        .then(() => {
          // Re-fake requestToken for part 2 token request
          sinon.restore();
          requestFake = sinon.replace(
            auth.tokenManager,
            'requestToken',
            fakeTokenRequest(1)
          );
          // Advance the clock to the first number of elapsed seconds after the initial request
          clock = sinon.useFakeTimers(Date.now());
          clock.tick(1000 * firstElapsedSeconds);
        })
        /* Start of part 2 */
        .then(() => auth.authenticate())
        .then(() => {
          assert.ok(
            requestFake.calledOnce,
            'There should be exactly 1 session request in part 2.'
          );
          return setCookie(headers[1], options.serviceUrl, {});
        })
        .then(() => getCookie(options.serviceUrl))
        .then((cookieFromJar) => {
          assert.strictEqual(
            cookieFromJar,
            'AuthSession=56789',
            'The stored cookie should match that provided by the second session request.'
          );
        })
        /* End of part 2 */
        .then(() => {
          // Advance the clock to the second number of elapsed seconds after the initial request
          // Since we've already advanced to the first number of seconds, we advance by the delta
          clock.tick(1000 * (secondElapsedSeconds - firstElapsedSeconds));
        })
        /* Start of part 3 */
        .then(() => getCookie(options.serviceUrl))
        .then((cookieFromJar) => {
          assert.strictEqual(
            cookieFromJar,
            'AuthSession=56789',
            `The stored cookie should still match that provided by the second session request after the second lapse.`
          );
        })
        /* End of part 3 */
        .finally(() => {
          sinon.restore();
        })
    );
  }

  it('Renews pre-emptively correctly (Max-Age)', () =>
    // Test after an elapsed time of
    // 2880 seconds (48 minutes i.e. 80% of the 1 hour lifetime)
    // 3601 seconds (i.e. after the 1 hour lifetime of the original session has passed)
    renewalTest(true, 2880, 3601));

  it('Renews after expiration correctly (Max-Age)', () =>
    // Test after an elapsed time of
    // 3601 seconds (i.e. after the 1 hour lifetime has passed)
    // 7199 seconds (i.e. before the end of the second session)
    renewalTest(true, 3601, 7199));

  it('Renews pre-emptively correctly (Expires)', () =>
    // Test after an elapsed time of
    // 2880 seconds (48 minutes i.e. 80% of the 1 hour lifetime)
    // 3601 seconds (i.e. after the 1 hour lifetime of the original session has passed)
    renewalTest(false, 2880, 3601));

  it('Renews after expiration correctly (Expires)', () =>
    // Test after an elapsed time of
    // 3601 seconds (i.e. after the 1 hour lifetime has passed)
    // 7199 seconds (i.e. before the end of the second session)
    renewalTest(false, 3601, 7199));
});
