/**
 * © Copyright IBM Corporation 2020, 2022. All Rights Reserved.
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
const http = require('http');
const https = require('https');
const {
  BasicAuthenticator,
  IamAuthenticator,
  NoAuthAuthenticator,
} = require('ibm-cloud-sdk-core');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug');
const sinon = require('sinon');
const { CookieJar, MemoryCookieStore } = require('tough-cookie');
const { CloudantBaseService } = require('../../lib/cloudantBaseService.ts');
const { CouchdbSessionAuthenticator } = require('../../index.ts');

describe('Test CloudantBaseService', () => {
  const newUrl = 'something.new/';
  const appleUrl = 'http://cloudant.example/';
  const iamUrl = 'https://iam.cloud.ibm.com';
  beforeEach(() => {
    process.env.APPLE_URL = appleUrl;
  });
  it('Use couchdb_session authenticator', () => {
    const auth = new CouchdbSessionAuthenticator({
      username: 'test',
      password: 'user', // pragma: allowlist secret
    });
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
    assert.strictEqual(
      service.getAuthenticator().tokenOptions.serviceUrl,
      appleUrl.slice(0, -1)
    );

    service.setServiceUrl(newUrl);
    // newUrl is used in authenticator
    assert.strictEqual(
      service.getAuthenticator().tokenOptions.serviceUrl,
      newUrl.slice(0, -1)
    );

    service.configureService('apple');
    // the authenticator and the request using the same jar
    assert.strictEqual(
      service.getAuthenticator().tokenManager.options.jar,
      service.requestWrapperInstance.axiosInstance.defaults.jar
    );
    // authentication url uses serviceUrl
    assert.strictEqual(
      service.getAuthenticator().tokenOptions.serviceUrl,
      appleUrl.slice(0, -1)
    );
  });

  it('Verify gzip compression is disabled', () => {
    const auth = new CouchdbSessionAuthenticator({
      username: 'test',
      password: 'user', // pragma: allowlist secret
    });
    const service = new CloudantBaseService({
      authenticator: auth,
      serviceUrl: appleUrl,
    });
    assert.ok(service);

    // Enable gzip compression as this is the default setting
    service.setEnableGzipCompression(true);
    // Assert default value of gzip compression is true in base options, token options, and in request wrapper
    assert.strictEqual(service.baseOptions.enableGzipCompression, true);
    assert.strictEqual(
      service.getAuthenticator().tokenOptions.enableGzipCompression,
      true
    );
    let isGzipCompressionEnabled =
      service.getAuthenticator().tokenManager.requestWrapperInstance
        .axiosInstance.defaults.enableGzipCompression;
    assert.strictEqual(isGzipCompressionEnabled, true);

    // Disable gzip compression
    service.setEnableGzipCompression(false);
    // Assert gzip compression is disabled in base options, token options, and in request wrapper
    assert.strictEqual(service.baseOptions.enableGzipCompression, false);
    assert.strictEqual(
      service.getAuthenticator().tokenOptions.enableGzipCompression,
      false
    );
    isGzipCompressionEnabled =
      service.getAuthenticator().tokenManager.requestWrapperInstance
        .axiosInstance.defaults.enableGzipCompression;
    assert.strictEqual(isGzipCompressionEnabled, false);
  });

  it('Invalidate token on setServiceUrl', () => {
    const auth = new CouchdbSessionAuthenticator({
      username: 'test',
      password: 'user', // pragma: allowlist secret
    });
    const service = new CloudantBaseService({
      authenticator: auth,
      serviceUrl: appleUrl,
    });

    const { tokenManager } = auth;
    service.setServiceUrl(newUrl); // setServiceUrl actually replaces the SessionTokenManager instance of `auth`
    assert.notDeepStrictEqual(auth.tokenManager, tokenManager);
  });

  it('Apply SDK UA header', async () => {
    const auth = new CouchdbSessionAuthenticator({
      username: 'test',
      password: 'user', // pragma: allowlist secret
    });
    class MockV1 extends CloudantBaseService {}
    MockV1.DEFAULT_SERVICE_NAME = 'cloudant';
    const service = new MockV1({
      authenticator: auth,
      serviceUrl: 'http://example.invalid',
    });
    assert.ok(service);
    auth.tokenManager.requestWrapperInstance.sendRequest = sinon.spy();

    try {
      await auth.authenticate();
      // eslint-disable-next-line no-empty, no-unused-vars
    } catch (e) {}
    assert.ok(auth.tokenManager.requestWrapperInstance.sendRequest.calledOnce);

    assert.strictEqual(
      auth.tokenManager.requestWrapperInstance.sendRequest.getCall(-1).args[0]
        .options.headers['X-IBMCloud-SDK-Analytics'],
      'service_name=cloudant;service_version=v1;operation_id=authenticatorPostSession'
    );
  });

  it('Use IAM authenticator', () => {
    const auth = new IamAuthenticator({
      apikey: '1234',
      clientId: '345',
      clientSecret: '234',
    });
    const service = new CloudantBaseService({ authenticator: auth });
    assert.ok(service);
    // cookie jar exists
    assert.ok(service.baseOptions.jar);
    assert.strictEqual(
      service.baseOptions.jar,
      service.requestWrapperInstance.axiosInstance.defaults.jar
    );
    service.setServiceUrl(newUrl);
    assert.strictEqual(service.getAuthenticator().tokenManager.url, iamUrl);
    service.configureService('apple');
    // cookie jar exists
    assert.ok(service.baseOptions.jar);
    assert.strictEqual(
      service.baseOptions.jar,
      service.requestWrapperInstance.axiosInstance.defaults.jar
    );
    assert.strictEqual(service.getAuthenticator().tokenManager.url, iamUrl);
  });

  it('Custom cookie jar with basic authenticator', () => {
    const auth = new BasicAuthenticator({
      username: 'test',
      password: 'user', // pragma: allowlist secret
    });
    const testJar = new CookieJar(new MemoryCookieStore(), {
      rejectPublicSuffixes: false,
    });
    const service = new CloudantBaseService({
      authenticator: auth,
      jar: testJar,
    });
    assert.ok(service);
    // cookie jar exists
    assert.ok(service.baseOptions.jar);
    // cookie jar is the same as expected test jar
    let axiosJar = service.requestWrapperInstance.axiosInstance.defaults.jar;
    assert.strictEqual(axiosJar, testJar);
    assert.strictEqual(axiosJar.rejectPublicSuffixes, false);
    // reconfigure the service
    service.setServiceUrl(newUrl);
    service.configureService('apple');
    // cookie jar still exists
    assert.ok(service.baseOptions.jar);
    // cookie jar is still the same as expected test jar
    axiosJar = service.requestWrapperInstance.axiosInstance.defaults.jar;
    assert.strictEqual(axiosJar, testJar);
    assert.strictEqual(axiosJar.rejectPublicSuffixes, false);
  });

  describe('Check keepAlive', () => {
    const auth = new NoAuthAuthenticator();

    it('Set default agents when no custom agent is set', () => {
      const service = new CloudantBaseService({
        authenticator: auth,
        disableSslVerification: true,
      });
      assert.strictEqual(service.baseOptions.httpAgent.keepAlive, true);
      assert.strictEqual(service.baseOptions.httpsAgent.keepAlive, true);
      assert.strictEqual(
        service.baseOptions.httpsAgent.options.rejectUnauthorized,
        false
      );
    });
    it('Custom https agent', () => {
      const service = new CloudantBaseService({
        authenticator: auth,
        httpsAgent: new https.Agent({ keepAlive: false }),
      });
      assert.strictEqual(service.baseOptions.httpAgent.keepAlive, true);
      assert.strictEqual(service.baseOptions.httpsAgent.keepAlive, false);
    });

    it('Custom http agent', () => {
      const service = new CloudantBaseService({
        authenticator: auth,
        httpAgent: new http.Agent({ keepAlive: false }),
      });
      assert.strictEqual(service.baseOptions.httpAgent.keepAlive, false);
      assert.strictEqual(service.baseOptions.httpsAgent.keepAlive, true);
    });

    it('Custom http and https agent', () => {
      const service = new CloudantBaseService({
        authenticator: auth,
        httpAgent: new https.Agent({ keepAlive: false }),
        httpsAgent: new https.Agent({ keepAlive: false }),
      });
      assert.strictEqual(service.baseOptions.httpAgent.keepAlive, false);
      assert.strictEqual(service.baseOptions.httpsAgent.keepAlive, false);
    });

    it('Custom http agent with disableSslVerification', () => {
      const service = new CloudantBaseService({
        authenticator: auth,
        httpAgent: new https.Agent({ keepAlive: false }),
        disableSslVerification: true,
      });
      assert.strictEqual(service.baseOptions.httpAgent.keepAlive, false);
      assert.strictEqual(
        service.baseOptions.httpsAgent.options.rejectUnauthorized,
        false
      );
      assert.strictEqual(service.baseOptions.httpsAgent.keepAlive, true);
    });
  });

  describe('Gen 1 path warning', () => {
    const serviceUrl = 'http://example.invalid';
    const params = ({ url, operationId }) => ({
      defaultOptions: {
        serviceUrl,
        headers: {
          'X-IBMCloud-SDK-Analytics': `service_name=cloudant;service_version=v1;operation_id=${operationId}`,
        },
      },
      options: { url, method: 'GET' },
    });

    let logStub;
    let sendRequestStub;
    let service;

    beforeEach(() => {
      logStub = sinon.stub(debug, 'log');
      service = new CloudantBaseService({
        authenticator: new NoAuthAuthenticator(),
        serviceUrl,
      });
      sendRequestStub = sinon.stub().resolves({ result: {} });
      service.requestWrapperInstance.sendRequest = sendRequestStub;
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Warns for a /_api/v2 path and still sends the request', async () => {
      await service.createRequest(
        params({
          url: '/_api/v2/user/config/cors',
          operationId: 'getCorsInformation',
        })
      );
      assert.strictEqual(logStub.callCount, 1);
      const msg = logStub.getCall(0).args.join(' ');
      assert.ok(
        msg.includes(
          'The operation getCorsInformation is unavailable for Gen 2 Cloudant plans. ' +
            'See https://github.com/IBM/cloudant-node-sdk/blob/main/KNOWN_ISSUES.md#cloudant-gen-2-compatibility ' +
            'for more information.'
        )
      );
      assert.ok(sendRequestStub.calledOnce);
    });

    it('Warns with the path when the operation id is empty', async () => {
      await service.createRequest(
        params({ url: '/_api/v2/user/config/cors', operationId: '' })
      );
      assert.strictEqual(logStub.callCount, 1);
      const msg = logStub.getCall(0).args.join(' ');
      assert.ok(
        msg.includes(
          'The operation /_api/v2/user/config/cors is unavailable for Gen 2 Cloudant plans.'
        )
      );
    });

    it('Warns for the bare /_api/v2 path', async () => {
      await service.createRequest(
        params({ url: '/_api/v2', operationId: 'fakeOperation' })
      );
      assert.strictEqual(logStub.callCount, 1);
    });

    it('Warns for a /_api/v2 path with a path template', async () => {
      await service.createRequest(
        params({
          url: '/_api/v2/db/{db}/_security',
          operationId: 'putCloudantSecurityConfiguration',
        })
      );
      assert.strictEqual(logStub.callCount, 1);
    });

    it('Does not warn for other paths', async () => {
      await service.createRequest(
        params({ url: '/_all_dbs', operationId: 'getAllDbs' })
      );
      assert.strictEqual(logStub.callCount, 0);
      assert.ok(sendRequestStub.calledOnce);
    });

    it('Does not warn for similar path', async () => {
      await service.createRequest(
        params({ url: '/_api/v2foo', operationId: 'fakeOperation' })
      );
      assert.strictEqual(logStub.callCount, 0);
    });
  });
});
