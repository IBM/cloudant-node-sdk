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

const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const { CloudantBaseService } = require('../../lib/cloudantBaseService.ts');
const { CouchdbSessionAuthenticator } = require('../../index.ts');
const assert = require('assert');
const sinon = require('sinon');

describe('Test CloudantBaseService', () => {
  const newUrl = 'something.new/';
  const appleUrl = 'http://cloudant.example/';
  const iamUrl = 'https://iam.cloud.ibm.com/identity/token';
  beforeEach(() => {
    process.env.APPLE_URL = appleUrl;
  });
  it('Use couchdb_session authenticator', () => {
    const auth = new CouchdbSessionAuthenticator({ username: 'test', password: 'user' });
    const service = new CloudantBaseService({
      authenticator: auth,
      serviceUrl: appleUrl,
    });

    // the same jar is in use in the authenticator and in the base service
    assert.ok(service);
    assert.strictEqual(
      service.getAuthenticator().tokenManager.options.jar,
      service.requestWrapperInstance.axiosInstance.defaults.jar
    );
    // Check the trailing slash is removed by the constructor
    assert.strictEqual(service.getAuthenticator().tokenOptions.serviceUrl, appleUrl.slice(0, -1));

    service.setServiceUrl(newUrl);
    // newUrl is used in authenticator
    assert.strictEqual(service.getAuthenticator().tokenOptions.serviceUrl, newUrl.slice(0, -1));

    service.configureService('apple');
    // the authenticator and the request using the same jar
    assert.strictEqual(
      service.getAuthenticator().tokenManager.options.jar,
      service.requestWrapperInstance.axiosInstance.defaults.jar
    );
    // authentication url uses serviceUrl
    assert.strictEqual(service.getAuthenticator().tokenOptions.serviceUrl, appleUrl.slice(0, -1));
  });

  it('Invalidate token on setServiceUrl', () => {
    const auth = new CouchdbSessionAuthenticator({ username: 'test', password: 'user' });
    const service = new CloudantBaseService({
      authenticator: auth,
      serviceUrl: appleUrl,
    });

    const tokenManager = auth.tokenManager;
    service.setServiceUrl(newUrl); // setServiceUrl actually replaces the SessionTokenManager instance of `auth`
    assert.notDeepStrictEqual(auth.tokenManager, tokenManager);
  });

  it('Apply SDK UA header', () => {
    const auth = new CouchdbSessionAuthenticator({ username: 'test', password: 'user' });
    class MockV1 extends CloudantBaseService {}
    MockV1.DEFAULT_SERVICE_NAME = 'cloudant';
    new MockV1({
      authenticator: auth,
      serviceUrl: 'http://example.invalid',
    });
    auth.tokenManager.requestWrapperInstance.sendRequest = sinon.spy();

    try {
      auth.authenticate();
      // eslint-disable-next-line no-empty
    } catch (e) {}
    assert.ok(auth.tokenManager.requestWrapperInstance.sendRequest.calledOnce);

    assert.strictEqual(
      auth.tokenManager.requestWrapperInstance.sendRequest.getCall(-1).args[0]['options'][
        'headers'
      ]['X-IBMCloud-SDK-Analytics'],
      'service_name=cloudant;service_version=v1;operation_id=authenticatorPostSession'
    );
  });

  it('Use basic authenticator', () => {
    const auth = new IamAuthenticator({ apikey: '1234', clientId: '345', clientSecret: '234' });
    const service = new CloudantBaseService({ authenticator: auth });
    assert.ok(service);
    // no new jar was generated
    assert.ok(service.baseOptions.jar === undefined);
    service.setServiceUrl(newUrl);
    assert.strictEqual(service.getAuthenticator().tokenManager.url, iamUrl);
    service.configureService('apple');
    // no new jar and url were set
    assert.ok(service.baseOptions.jar === undefined);
    assert.strictEqual(service.getAuthenticator().tokenManager.url, iamUrl);
  });
});
