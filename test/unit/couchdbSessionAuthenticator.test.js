/**
 * © Copyright IBM Corporation 2020. All Rights Reserved.
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
const sinon = require('sinon');
const { CookieJar } = require('tough-cookie');
const { CouchdbSessionAuthenticator } = require('../../index.ts');
const { SessionTokenManager } = require('../../auth/sessionTokenManager.ts');

describe('CouchdbSessionAutheticator tests', () => {
  it('Constructor input validation check', () => {
    try {
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

    const getTokenStubFn = sinon.stub(auth.tokenManager, 'getToken');
    auth.authenticate();
    assert.ok(getTokenStubFn.calledOnce);

    /* authenticator stores the same jar */
    assert.ok(auth.tokenManager.options.jar, options.jar);
  });
});
