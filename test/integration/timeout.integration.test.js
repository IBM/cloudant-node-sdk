/**
 * © Copyright IBM Corporation 2021. All Rights Reserved.
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

'use strict';

const assert = require('assert');
const sinon = require('sinon');

const { CloudantV1 } = require('../../index.ts');
const { CouchdbSessionAuthenticator } = require('../../index.ts');
const {
  BasicAuthenticator,
  IamAuthenticator,
  NoAuthAuthenticator,
} = require('ibm-cloud-sdk-core');

const TESTCASE_TIMEOUT = 10000; // (10s)

const DEFAULT_TIMEOUT = 150000; // (2.5m=150s)
const CUSTOM_TIMEOUT = 30000; // (30s)

describe('Default timeout config tests', () => {
  jest.setTimeout(TESTCASE_TIMEOUT);

  function assertBaseTimeoutOptions(myService, expTimeoutValue) {
    assert.ok(myService.baseOptions.timeout);
    assert.equal(myService.baseOptions.timeout, expTimeoutValue);
  }

  function assertAuthTokenTimeoutOptions(myService, expTimeoutValue) {
    const auth = myService.getAuthenticator();
    assert.ok(auth.tokenOptions.timeout);
    assert.equal(auth.tokenOptions.timeout, expTimeoutValue);
  }

  it('CloudantV1 - BasicAuth', () => {
    const basicAuth = new BasicAuthenticator({
      username: 'user',
      password: 'pwd',
    });
    const testCases = [
      // Default
      {
        options: {
          authenticator: basicAuth,
        },
        expTimeout: DEFAULT_TIMEOUT,
      },
      // Overwrite
      {
        options: {
          authenticator: basicAuth,
          timeout: CUSTOM_TIMEOUT,
        },
        expTimeout: CUSTOM_TIMEOUT,
      },
    ];
    for (const tc of testCases) {
      const myService = new CloudantV1(tc.options);
      assertBaseTimeoutOptions(myService, tc.expTimeout);
    }
  });

  it('CloudantV1 - SessionAuth', () => {
    const sessionAuth = new CouchdbSessionAuthenticator({
      username: 'name',
      password: 'pwd',
    });
    const testCases = [
      // Default
      {
        options: {
          authenticator: sessionAuth,
        },
        expTimeout: DEFAULT_TIMEOUT,
      },
      // Overwrite
      {
        options: {
          authenticator: sessionAuth,
          timeout: CUSTOM_TIMEOUT,
        },
        expTimeout: CUSTOM_TIMEOUT,
      },
    ];
    for (const tc of testCases) {
      const myService = new CloudantV1(tc.options);
      assertBaseTimeoutOptions(myService, tc.expTimeout);
      assertAuthTokenTimeoutOptions(myService, tc.expTimeout);
    }
  });

  function assertIamAuthRequestTimeout(myService, expValue) {
    const auth = myService.getAuthenticator();
    const spyAuth = sinon.spy(auth, 'authenticate');

    // Mock out server calls
    const getTokenStubFn = sinon.stub(auth.tokenManager, 'getToken');
    getTokenStubFn.returns(
      new Promise((resolve) => {
        resolve('apikey');
      })
    );
    const sendRequestStubFn = sinon.stub(
      myService.requestWrapperInstance,
      'sendRequest'
    );
    sendRequestStubFn.returns(
      new Promise((resolve) => {
        resolve('response');
      })
    );

    return myService.getServerInformation().then((response) => {
      assert.ok(response);
      assert.ok(spyAuth.calledOnce);
      assert.ok(getTokenStubFn.calledOnce);
      // authenticate is called with default timeout
      sinon.assert.calledWith(spyAuth, sinon.match.has('timeout', expValue));
      // server request is called with default timeout
      assert.ok(sendRequestStubFn.calledOnce);
      sinon.assert.calledWith(
        sendRequestStubFn,
        sinon.match.hasNested('defaultOptions.timeout', expValue)
      );
      // restore stubbed functions
      getTokenStubFn.restore();
      sendRequestStubFn.restore();
    });
  }

  it('newInstance - IamAuth', () => {
    const iamAuth = new IamAuthenticator({
      apikey: 'apikey',
    });
    const testCases = [
      // Default
      {
        options: {
          authenticator: iamAuth,
        },
        expTimeout: DEFAULT_TIMEOUT,
      },
      // Overwrite
      {
        options: {
          authenticator: iamAuth,
          timeout: CUSTOM_TIMEOUT,
        },
        expTimeout: CUSTOM_TIMEOUT,
      },
    ];
    for (const tc of testCases) {
      const myService = CloudantV1.newInstance(tc.options);
      assertBaseTimeoutOptions(myService, DEFAULT_TIMEOUT);
      return assertIamAuthRequestTimeout(myService, tc.expTimeout);
    }
  });

  it('newInstance - NoAuth', () => {
    const noAuth = new NoAuthAuthenticator();
    const testCases = [
      // Default
      {
        options: {
          authenticator: noAuth,
        },
        expTimeout: DEFAULT_TIMEOUT,
      },
      // Overwrite
      {
        options: {
          authenticator: noAuth,
          timeout: CUSTOM_TIMEOUT,
        },
        expTimeout: CUSTOM_TIMEOUT,
      },
    ];
    for (const tc of testCases) {
      const myService = CloudantV1.newInstance(tc.options);
      assertBaseTimeoutOptions(myService, tc.expTimeout);
    }
  });
});
