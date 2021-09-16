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
const { IamAuthenticator, NoAuthAuthenticator } = require('ibm-cloud-sdk-core');

const TESTCASE_TIMEOUT = 10000; // (10s)

const DEFAULT_TIMEOUT = 150000; // (2.5m=150s)
const CUSTOM_TIMEOUT = 30000; // (30s)

describe('Default timeout config tests', () => {
  jest.setTimeout(TESTCASE_TIMEOUT);

  it('Check default timeout value - CloudantV1 - SessionAuth', () => {
    const authenticator = new CouchdbSessionAuthenticator({
      username: 'name',
      password: 'pwd',
    });
    const myService = new CloudantV1({
      authenticator: authenticator,
    });
    assert.ok(myService.baseOptions.timeout);
    assert.equal(myService.baseOptions.timeout, DEFAULT_TIMEOUT);
    const auth = myService.getAuthenticator();
    assert.ok(auth.tokenOptions.timeout);
    assert.equal(myService.baseOptions.timeout, DEFAULT_TIMEOUT);
  });

  it('Allow timeout overwrite - CloudantV1 - SessionAuth', () => {
    const authenticator = new CouchdbSessionAuthenticator({
      username: 'name',
      password: 'pwd',
    });
    const myService = new CloudantV1({
      authenticator: authenticator,
      timeout: CUSTOM_TIMEOUT,
    });
    assert.ok(myService.baseOptions.timeout);
    assert.equal(myService.baseOptions.timeout, CUSTOM_TIMEOUT);
    const auth = myService.getAuthenticator();
    assert.ok(auth.tokenOptions.timeout);
    assert.equal(myService.baseOptions.timeout, CUSTOM_TIMEOUT);
  });

  it('Check default timeout value - newInstance - IamAuth', () => {
    const authenticator = new IamAuthenticator({
      apikey: 'apikey',
    });
    const myService = CloudantV1.newInstance({
      authenticator: authenticator,
      serviceName: 'server',
    });
    assert.ok(myService.baseOptions.timeout);
    assert.equal(myService.baseOptions.timeout, DEFAULT_TIMEOUT);
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
      // authenticate is called with default timeout
      sinon.assert.calledWith(
        spyAuth,
        sinon.match.has('timeout', DEFAULT_TIMEOUT)
      );
      // server request is called with default timeout
      sinon.assert.calledWith(
        sendRequestStubFn,
        sinon.match.hasNested('defaultOptions.timeout', DEFAULT_TIMEOUT)
      );
      // restore stubbed functions
      assert.ok(getTokenStubFn.calledOnce);
      getTokenStubFn.restore();
      assert.ok(sendRequestStubFn.calledOnce);
      sendRequestStubFn.restore();
    });
  });

  it('Allow timeout overwrite - newInstance', () => {
    const authenticator = new NoAuthAuthenticator();
    const myService = CloudantV1.newInstance({
      authenticator: authenticator,
      timeout: CUSTOM_TIMEOUT,
    });
    assert.ok(myService.baseOptions.timeout);
    assert.equal(myService.baseOptions.timeout, CUSTOM_TIMEOUT);
  });
});
