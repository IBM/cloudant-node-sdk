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

import { strictEqual, ok, deepStrictEqual } from 'node:assert';
import { stub } from 'sinon';
import { CookieJar } from 'tough-cookie';
import { SessionTokenManager } from '../../auth/sessionTokenManager';

const OPTIONS = Object.freeze({
  username: 'username',
  password: 'password',
  serviceUrl: 'cloudant.example',
  jar: new CookieJar(),
});

describe('SessionTokenManager tests', () => {
  describe('Test constructor', () => {
    it('Check input validation - all parameter', () => {
      const optionsWithoutCredentials = {
        username: undefined,
        password: null,
      };

      try {
        // eslint-disable-next-line no-new
        new SessionTokenManager(optionsWithoutCredentials);
      } catch (error) {
        strictEqual(
          'Error: Missing required parameters: username, password, serviceUrl, jar',
          error.toString()
        );
      }
    });

    it('Check option assignment', () => {
      const manager = new SessionTokenManager(OPTIONS);

      ok(manager instanceof SessionTokenManager);
      strictEqual(manager.options.username, OPTIONS.username);
      strictEqual(manager.options.password, OPTIONS.password);
      strictEqual(manager.options.serviceUrl, 'cloudant.example');
      strictEqual(manager.options.jar, OPTIONS.jar);
    });
  });

  describe('Test requestToken', () => {
    it('Check request parameters', () => {
      const sessionUrl = 'cloudant.example/_session';
      const expectedParameters = {
        options: {
          headers: {},
          url: sessionUrl,
          method: 'POST',
          body: {
            username: OPTIONS.username,
            password: OPTIONS.password,
          },
        },
      };

      const manager = new SessionTokenManager({ ...OPTIONS });
      const sendRequestStubFn = stub(
        manager.requestWrapperInstance,
        'sendRequest'
      );
      sendRequestStubFn.returnsArg(0);
      const parameters = manager.requestToken();
      deepStrictEqual(parameters, expectedParameters);
    });
  });

  describe('Test saveTokenInfo', () => {
    it('Empty header', () => {
      const manager = new SessionTokenManager(OPTIONS);
      const response = {
        'headers': {},
      };

      try {
        manager.saveTokenInfo(response);
      } catch (error) {
        strictEqual(
          'Error: Set-Cookie header not present in response',
          error.toString()
        );
      }

      strictEqual(manager.expireTime, undefined);
      strictEqual(manager.refreshTime, undefined);
      strictEqual(manager.accessToken, undefined);
    });

    it('AuthSession is missing from the cookie', () => {
      const manager = new SessionTokenManager(OPTIONS);
      const response = {
        'headers': {
          'set-cookie': ['TokenSession=123456; Max-Age=10;'],
        },
      };

      try {
        manager.saveTokenInfo(response);
      } catch (error) {
        strictEqual(
          'Error: Session token not present in response',
          error.toString()
        );
      }

      strictEqual(manager.expireTime, undefined);
      strictEqual(manager.refreshTime, undefined);
      strictEqual(manager.accessToken, undefined);
    });

    it('Session token presents with other cookie tokens without expire info', () => {
      const manager = new SessionTokenManager(OPTIONS);
      const response = {
        'headers': {
          'set-cookie': [
            'ProxyToken=987456;',
            'AuthSession=123456;',
            'JwtToken=758493',
          ],
        },
      };

      manager.saveTokenInfo(response);

      strictEqual(manager.expireTime, 0);
      strictEqual(manager.refreshTime, 0);
      strictEqual(manager.accessToken, '123456');
    });

    it('Session token with expire time stamp', () => {
      const manager = new SessionTokenManager(OPTIONS);
      const dateNow = Date.now();
      // Expire after 10 seconds
      const expireDate = new Date(dateNow + 10000);
      const response = {
        'headers': {
          'set-cookie': [`AuthSession=123456; Expires=${expireDate};`],
        },
      };

      manager.saveTokenInfo(response);

      strictEqual(Math.ceil(manager.expireTime - dateNow / 1000), 10);
      strictEqual(Math.ceil(manager.refreshTime - dateNow / 1000), 8);
      /* time difference between expire time and refresh time should be 2 seconds */
      strictEqual(
        Math.ceil(manager.expireTime - manager.refreshTime),
        2
      );
      strictEqual(manager.accessToken, '123456');
    });

    it('Session token with max-age seconds', () => {
      const manager = new SessionTokenManager(OPTIONS);
      const dateNow = Date.now();
      const response = {
        'headers': {
          'set-cookie': ['AuthSession=123456; Max-Age=10;'],
        },
      };

      manager.saveTokenInfo(response);

      strictEqual(Math.ceil(manager.expireTime - dateNow / 1000), 10);
      strictEqual(Math.ceil(manager.refreshTime - dateNow / 1000), 8);
      /* time difference between expire time and refresh time should be 2 seconds */
      strictEqual(manager.expireTime - manager.refreshTime, 2);
      strictEqual(manager.accessToken, '123456');
    });
  });
  describe('Test setHeader', () => {
    it('Call setHeader', () => {
      const manager = new SessionTokenManager(OPTIONS);
      try {
        manager.setHeaders({ test: 'header' });
      } catch (err) {
        strictEqual(
          err.toString(),
          'Error: During CouchDB Session Authentication only `request` service headers are in use'
        );
      }
    });
  });
});
