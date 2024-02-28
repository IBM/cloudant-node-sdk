/**
 * (C) Copyright IBM Corp. 2024.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { BaseService, NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const CloudantV1 = require('../../dist/cloudant/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const cloudantServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'http://localhost:5984',
};

const cloudantService = new CloudantV1(cloudantServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(cloudantService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('CloudantV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = CloudantV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CloudantV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CloudantV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CloudantV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CloudantV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CloudantV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CloudantV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CloudantV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CloudantV1.DEFAULT_SERVICE_URL);
    });

    test('should set `enableGzipCompression` by default', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CloudantV1(options);

      expect(testInstance.baseOptions.enableGzipCompression).toBe(true);
    });
  });

  describe('getServerInformation', () => {
    describe('positive tests', () => {
      function __getServerInformationTest() {
        // Construct the params object for operation getServerInformation
        const getServerInformationParams = {};

        const getServerInformationResult = cloudantService.getServerInformation(getServerInformationParams);

        // all methods should return a Promise
        expectToBePromise(getServerInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServerInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getServerInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getServerInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServerInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getServerInformation(getServerInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getServerInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMembershipInformation', () => {
    describe('positive tests', () => {
      function __getMembershipInformationTest() {
        // Construct the params object for operation getMembershipInformation
        const getMembershipInformationParams = {};

        const getMembershipInformationResult = cloudantService.getMembershipInformation(getMembershipInformationParams);

        // all methods should return a Promise
        expectToBePromise(getMembershipInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_membership', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMembershipInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getMembershipInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getMembershipInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMembershipInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getMembershipInformation(getMembershipInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getMembershipInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getUuids', () => {
    describe('positive tests', () => {
      function __getUuidsTest() {
        // Construct the params object for operation getUuids
        const count = 1;
        const getUuidsParams = {
          count,
        };

        const getUuidsResult = cloudantService.getUuids(getUuidsParams);

        // all methods should return a Promise
        expectToBePromise(getUuidsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_uuids', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.count).toEqual(count);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getUuidsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getUuidsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getUuidsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getUuidsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getUuids(getUuidsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getUuids({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCapacityThroughputInformation', () => {
    describe('positive tests', () => {
      function __getCapacityThroughputInformationTest() {
        // Construct the params object for operation getCapacityThroughputInformation
        const getCapacityThroughputInformationParams = {};

        const getCapacityThroughputInformationResult = cloudantService.getCapacityThroughputInformation(getCapacityThroughputInformationParams);

        // all methods should return a Promise
        expectToBePromise(getCapacityThroughputInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/capacity/throughput', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCapacityThroughputInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getCapacityThroughputInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getCapacityThroughputInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCapacityThroughputInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCapacityThroughputInformation(getCapacityThroughputInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getCapacityThroughputInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('putCapacityThroughputConfiguration', () => {
    describe('positive tests', () => {
      function __putCapacityThroughputConfigurationTest() {
        // Construct the params object for operation putCapacityThroughputConfiguration
        const blocks = 0;
        const putCapacityThroughputConfigurationParams = {
          blocks,
        };

        const putCapacityThroughputConfigurationResult = cloudantService.putCapacityThroughputConfiguration(putCapacityThroughputConfigurationParams);

        // all methods should return a Promise
        expectToBePromise(putCapacityThroughputConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/capacity/throughput', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.blocks).toEqual(blocks);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putCapacityThroughputConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putCapacityThroughputConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putCapacityThroughputConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const blocks = 0;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putCapacityThroughputConfigurationParams = {
          blocks,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCapacityThroughputConfiguration(putCapacityThroughputConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putCapacityThroughputConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putCapacityThroughputConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDbUpdates', () => {
    describe('positive tests', () => {
      function __getDbUpdatesTest() {
        // Construct the params object for operation getDbUpdates
        const descending = false;
        const feed = 'normal';
        const heartbeat = 0;
        const limit = 0;
        const timeout = 60000;
        const since = '0';
        const getDbUpdatesParams = {
          descending,
          feed,
          heartbeat,
          limit,
          timeout,
          since,
        };

        const getDbUpdatesResult = cloudantService.getDbUpdates(getDbUpdatesParams);

        // all methods should return a Promise
        expectToBePromise(getDbUpdatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_db_updates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.feed).toEqual(feed);
        expect(mockRequestOptions.qs.heartbeat).toEqual(heartbeat);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.timeout).toEqual(timeout);
        expect(mockRequestOptions.qs.since).toEqual(since);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDbUpdatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDbUpdatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDbUpdatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDbUpdatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDbUpdates(getDbUpdatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getDbUpdates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('postChanges', () => {
    describe('positive tests', () => {
      function __postChangesTest() {
        // Construct the params object for operation postChanges
        const db = 'testString';
        const docIds = ['testString'];
        const fields = ['testString'];
        const selector = { anyKey: 'anyValue' };
        const lastEventId = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const feed = 'normal';
        const filter = 'testString';
        const heartbeat = 0;
        const includeDocs = false;
        const limit = 0;
        const seqInterval = 1;
        const since = '0';
        const style = 'main_only';
        const timeout = 60000;
        const view = 'testString';
        const postChangesParams = {
          db,
          docIds,
          fields,
          selector,
          lastEventId,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          feed,
          filter,
          heartbeat,
          includeDocs,
          limit,
          seqInterval,
          since,
          style,
          timeout,
          view,
        };

        const postChangesResult = cloudantService.postChanges(postChangesParams);

        // all methods should return a Promise
        expectToBePromise(postChangesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_changes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Last-Event-ID', lastEventId);
        expect(mockRequestOptions.body.doc_ids).toEqual(docIds);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.feed).toEqual(feed);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.heartbeat).toEqual(heartbeat);
        expect(mockRequestOptions.qs.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.seq_interval).toEqual(seqInterval);
        expect(mockRequestOptions.qs.since).toEqual(since);
        expect(mockRequestOptions.qs.style).toEqual(style);
        expect(mockRequestOptions.qs.timeout).toEqual(timeout);
        expect(mockRequestOptions.qs.view).toEqual(view);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postChangesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postChangesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postChangesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postChangesParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postChanges(postChangesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postChanges({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postChanges();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postChangesAsStream', () => {
    describe('positive tests', () => {
      function __postChangesAsStreamTest() {
        // Construct the params object for operation postChangesAsStream
        const db = 'testString';
        const docIds = ['testString'];
        const fields = ['testString'];
        const selector = { anyKey: 'anyValue' };
        const lastEventId = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const feed = 'normal';
        const filter = 'testString';
        const heartbeat = 0;
        const includeDocs = false;
        const limit = 0;
        const seqInterval = 1;
        const since = '0';
        const style = 'main_only';
        const timeout = 60000;
        const view = 'testString';
        const postChangesAsStreamParams = {
          db,
          docIds,
          fields,
          selector,
          lastEventId,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          feed,
          filter,
          heartbeat,
          includeDocs,
          limit,
          seqInterval,
          since,
          style,
          timeout,
          view,
        };

        const postChangesAsStreamResult = cloudantService.postChangesAsStream(postChangesAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postChangesAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_changes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Last-Event-ID', lastEventId);
        expect(mockRequestOptions.body.doc_ids).toEqual(docIds);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.feed).toEqual(feed);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.heartbeat).toEqual(heartbeat);
        expect(mockRequestOptions.qs.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.seq_interval).toEqual(seqInterval);
        expect(mockRequestOptions.qs.since).toEqual(since);
        expect(mockRequestOptions.qs.style).toEqual(style);
        expect(mockRequestOptions.qs.timeout).toEqual(timeout);
        expect(mockRequestOptions.qs.view).toEqual(view);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postChangesAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postChangesAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postChangesAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postChangesAsStreamParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postChangesAsStream(postChangesAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postChangesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postChangesAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headDatabase', () => {
    describe('positive tests', () => {
      function __headDatabaseTest() {
        // Construct the params object for operation headDatabase
        const db = 'testString';
        const headDatabaseParams = {
          db,
        };

        const headDatabaseResult = cloudantService.headDatabase(headDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(headDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headDatabaseParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDatabase(headDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAllDbs', () => {
    describe('positive tests', () => {
      function __getAllDbsTest() {
        // Construct the params object for operation getAllDbs
        const descending = false;
        const endKey = 'testString';
        const limit = 0;
        const skip = 0;
        const startKey = 'testString';
        const getAllDbsParams = {
          descending,
          endKey,
          limit,
          skip,
          startKey,
        };

        const getAllDbsResult = cloudantService.getAllDbs(getAllDbsParams);

        // all methods should return a Promise
        expectToBePromise(getAllDbsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_all_dbs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.end_key).toEqual(endKey);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.start_key).toEqual(startKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAllDbsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getAllDbsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getAllDbsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAllDbsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getAllDbs(getAllDbsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getAllDbs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('postDbsInfo', () => {
    describe('positive tests', () => {
      function __postDbsInfoTest() {
        // Construct the params object for operation postDbsInfo
        const keys = ['testString'];
        const postDbsInfoParams = {
          keys,
        };

        const postDbsInfoResult = cloudantService.postDbsInfo(postDbsInfoParams);

        // all methods should return a Promise
        expectToBePromise(postDbsInfoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_dbs_info', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.keys).toEqual(keys);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postDbsInfoTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postDbsInfoTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postDbsInfoTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const keys = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postDbsInfoParams = {
          keys,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDbsInfo(postDbsInfoParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postDbsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postDbsInfo();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDatabase', () => {
    describe('positive tests', () => {
      function __deleteDatabaseTest() {
        // Construct the params object for operation deleteDatabase
        const db = 'testString';
        const deleteDatabaseParams = {
          db,
        };

        const deleteDatabaseResult = cloudantService.deleteDatabase(deleteDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(deleteDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDatabaseParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDatabase(deleteDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDatabaseInformation', () => {
    describe('positive tests', () => {
      function __getDatabaseInformationTest() {
        // Construct the params object for operation getDatabaseInformation
        const db = 'testString';
        const getDatabaseInformationParams = {
          db,
        };

        const getDatabaseInformationResult = cloudantService.getDatabaseInformation(getDatabaseInformationParams);

        // all methods should return a Promise
        expectToBePromise(getDatabaseInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDatabaseInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDatabaseInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDatabaseInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDatabaseInformationParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDatabaseInformation(getDatabaseInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDatabaseInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDatabaseInformation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putDatabase', () => {
    describe('positive tests', () => {
      function __putDatabaseTest() {
        // Construct the params object for operation putDatabase
        const db = 'testString';
        const partitioned = false;
        const q = 26;
        const putDatabaseParams = {
          db,
          partitioned,
          q,
        };

        const putDatabaseResult = cloudantService.putDatabase(putDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(putDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.partitioned).toEqual(partitioned);
        expect(mockRequestOptions.qs.q).toEqual(q);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putDatabaseParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDatabase(putDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headDocument', () => {
    describe('positive tests', () => {
      function __headDocumentTest() {
        // Construct the params object for operation headDocument
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const latest = false;
        const rev = 'testString';
        const headDocumentParams = {
          db,
          docId,
          ifNoneMatch,
          latest,
          rev,
        };

        const headDocumentResult = cloudantService.headDocument(headDocumentParams);

        // all methods should return a Promise
        expectToBePromise(headDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDocument(headDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postDocument', () => {
    describe('positive tests', () => {
      function __postDocumentTest() {
        // Construct the params object for operation postDocument
        const db = 'testString';
        const document = {};
        const contentType = 'application/json';
        const batch = 'ok';
        const postDocumentParams = {
          db,
          document,
          contentType,
          batch,
        };

        const postDocumentResult = cloudantService.postDocument(postDocumentParams);

        // all methods should return a Promise
        expectToBePromise(postDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(document);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const document = {};
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postDocumentParams = {
          db,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDocument(postDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postAllDocs', () => {
    describe('positive tests', () => {
      function __postAllDocsTest() {
        // Construct the params object for operation postAllDocs
        const db = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startKey = 'testString';
        const postAllDocsParams = {
          db,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          key,
          keys,
          startKey,
        };

        const postAllDocsResult = cloudantService.postAllDocs(postAllDocsParams);

        // all methods should return a Promise
        expectToBePromise(postAllDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postAllDocsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postAllDocsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postAllDocsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postAllDocsParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocs(postAllDocsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postAllDocs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postAllDocsAsStream', () => {
    describe('positive tests', () => {
      function __postAllDocsAsStreamTest() {
        // Construct the params object for operation postAllDocsAsStream
        const db = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startKey = 'testString';
        const postAllDocsAsStreamParams = {
          db,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          key,
          keys,
          startKey,
        };

        const postAllDocsAsStreamResult = cloudantService.postAllDocsAsStream(postAllDocsAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postAllDocsAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postAllDocsAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postAllDocsAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postAllDocsAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postAllDocsAsStreamParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsAsStream(postAllDocsAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postAllDocsAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postAllDocsQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        attEncodingInfo: false,
        attachments: false,
        conflicts: false,
        descending: false,
        includeDocs: false,
        inclusiveEnd: true,
        limit: 0,
        skip: 0,
        updateSeq: false,
        endKey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startKey: 'testString',
      };

      function __postAllDocsQueriesTest() {
        // Construct the params object for operation postAllDocsQueries
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const postAllDocsQueriesParams = {
          db,
          queries,
        };

        const postAllDocsQueriesResult = cloudantService.postAllDocsQueries(postAllDocsQueriesParams);

        // all methods should return a Promise
        expectToBePromise(postAllDocsQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(
          BaseService.convertModel(
            queries,
            CloudantV1.AllDocsQuery.serialize,
          )
        );
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postAllDocsQueriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postAllDocsQueriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postAllDocsQueriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postAllDocsQueriesParams = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsQueries(postAllDocsQueriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postAllDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postAllDocsQueries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postAllDocsQueriesAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        attEncodingInfo: false,
        attachments: false,
        conflicts: false,
        descending: false,
        includeDocs: false,
        inclusiveEnd: true,
        limit: 0,
        skip: 0,
        updateSeq: false,
        endKey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startKey: 'testString',
      };

      function __postAllDocsQueriesAsStreamTest() {
        // Construct the params object for operation postAllDocsQueriesAsStream
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const postAllDocsQueriesAsStreamParams = {
          db,
          queries,
        };

        const postAllDocsQueriesAsStreamResult = cloudantService.postAllDocsQueriesAsStream(postAllDocsQueriesAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postAllDocsQueriesAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(
          BaseService.convertModel(
            queries,
            CloudantV1.AllDocsQuery.serialize,
          )
        );
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postAllDocsQueriesAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postAllDocsQueriesAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postAllDocsQueriesAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postAllDocsQueriesAsStreamParams = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsQueriesAsStream(postAllDocsQueriesAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postAllDocsQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postAllDocsQueriesAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postBulkDocs', () => {
    describe('positive tests', () => {
      function __postBulkDocsTest() {
        // Construct the params object for operation postBulkDocs
        const db = 'testString';
        const bulkDocs = {};
        const postBulkDocsParams = {
          db,
          bulkDocs,
        };

        const postBulkDocsResult = cloudantService.postBulkDocs(postBulkDocsParams);

        // all methods should return a Promise
        expectToBePromise(postBulkDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(CloudantV1.BulkDocs.serialize(bulkDocs));
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postBulkDocsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postBulkDocsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postBulkDocsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const bulkDocs = {};
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postBulkDocsParams = {
          db,
          bulkDocs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkDocs(postBulkDocsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postBulkDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postBulkDocs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postBulkGet', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        attsSince: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'testString',
        rev: 'testString',
      };

      function __postBulkGetTest() {
        // Construct the params object for operation postBulkGet
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const postBulkGetParams = {
          db,
          docs,
          attachments,
          attEncodingInfo,
          latest,
          revs,
        };

        const postBulkGetResult = cloudantService.postBulkGet(postBulkGetParams);

        // all methods should return a Promise
        expectToBePromise(postBulkGetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(
          BaseService.convertModel(
            docs,
            CloudantV1.BulkGetQueryDocument.serialize,
          )
        );
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postBulkGetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postBulkGetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postBulkGetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postBulkGetParams = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGet(postBulkGetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postBulkGet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postBulkGet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postBulkGetAsMixed', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        attsSince: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'testString',
        rev: 'testString',
      };

      function __postBulkGetAsMixedTest() {
        // Construct the params object for operation postBulkGetAsMixed
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const postBulkGetAsMixedParams = {
          db,
          docs,
          attachments,
          attEncodingInfo,
          latest,
          revs,
        };

        const postBulkGetAsMixedResult = cloudantService.postBulkGetAsMixed(postBulkGetAsMixedParams);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsMixedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/mixed';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(
          BaseService.convertModel(
            docs,
            CloudantV1.BulkGetQueryDocument.serialize,
          )
        );
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postBulkGetAsMixedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postBulkGetAsMixedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postBulkGetAsMixedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postBulkGetAsMixedParams = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsMixed(postBulkGetAsMixedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsMixed();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postBulkGetAsRelated', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        attsSince: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'testString',
        rev: 'testString',
      };

      function __postBulkGetAsRelatedTest() {
        // Construct the params object for operation postBulkGetAsRelated
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const postBulkGetAsRelatedParams = {
          db,
          docs,
          attachments,
          attEncodingInfo,
          latest,
          revs,
        };

        const postBulkGetAsRelatedResult = cloudantService.postBulkGetAsRelated(postBulkGetAsRelatedParams);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsRelatedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/related';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(
          BaseService.convertModel(
            docs,
            CloudantV1.BulkGetQueryDocument.serialize,
          )
        );
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postBulkGetAsRelatedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postBulkGetAsRelatedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postBulkGetAsRelatedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postBulkGetAsRelatedParams = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsRelated(postBulkGetAsRelatedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsRelated();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postBulkGetAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        attsSince: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'testString',
        rev: 'testString',
      };

      function __postBulkGetAsStreamTest() {
        // Construct the params object for operation postBulkGetAsStream
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const postBulkGetAsStreamParams = {
          db,
          docs,
          attachments,
          attEncodingInfo,
          latest,
          revs,
        };

        const postBulkGetAsStreamResult = cloudantService.postBulkGetAsStream(postBulkGetAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(
          BaseService.convertModel(
            docs,
            CloudantV1.BulkGetQueryDocument.serialize,
          )
        );
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postBulkGetAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postBulkGetAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postBulkGetAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postBulkGetAsStreamParams = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsStream(postBulkGetAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postBulkGetAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocument', () => {
    describe('positive tests', () => {
      function __deleteDocumentTest() {
        // Construct the params object for operation deleteDocument
        const db = 'testString';
        const docId = 'testString';
        const ifMatch = 'testString';
        const batch = 'ok';
        const rev = 'testString';
        const deleteDocumentParams = {
          db,
          docId,
          ifMatch,
          batch,
          rev,
        };

        const deleteDocumentResult = cloudantService.deleteDocument(deleteDocumentParams);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDocument(deleteDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocument', () => {
    describe('positive tests', () => {
      function __getDocumentTest() {
        // Construct the params object for operation getDocument
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getDocumentParams = {
          db,
          docId,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getDocumentResult = cloudantService.getDocument(getDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocument(getDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentAsMixed', () => {
    describe('positive tests', () => {
      function __getDocumentAsMixedTest() {
        // Construct the params object for operation getDocumentAsMixed
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getDocumentAsMixedParams = {
          db,
          docId,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getDocumentAsMixedResult = cloudantService.getDocumentAsMixed(getDocumentAsMixedParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsMixedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'multipart/mixed';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentAsMixedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDocumentAsMixedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDocumentAsMixedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentAsMixedParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsMixed(getDocumentAsMixedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsMixed();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentAsRelated', () => {
    describe('positive tests', () => {
      function __getDocumentAsRelatedTest() {
        // Construct the params object for operation getDocumentAsRelated
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getDocumentAsRelatedParams = {
          db,
          docId,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getDocumentAsRelatedResult = cloudantService.getDocumentAsRelated(getDocumentAsRelatedParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsRelatedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'multipart/related';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentAsRelatedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDocumentAsRelatedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDocumentAsRelatedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentAsRelatedParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsRelated(getDocumentAsRelatedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsRelated();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentAsStream', () => {
    describe('positive tests', () => {
      function __getDocumentAsStreamTest() {
        // Construct the params object for operation getDocumentAsStream
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getDocumentAsStreamParams = {
          db,
          docId,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getDocumentAsStreamResult = cloudantService.getDocumentAsStream(getDocumentAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDocumentAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDocumentAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentAsStreamParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsStream(getDocumentAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDocumentAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putDocument', () => {
    describe('positive tests', () => {
      function __putDocumentTest() {
        // Construct the params object for operation putDocument
        const db = 'testString';
        const docId = 'testString';
        const document = {};
        const contentType = 'application/json';
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = false;
        const rev = 'testString';
        const putDocumentParams = {
          db,
          docId,
          document,
          contentType,
          ifMatch,
          batch,
          newEdits,
          rev,
        };

        const putDocumentResult = cloudantService.putDocument(putDocumentParams);

        // all methods should return a Promise
        expectToBePromise(putDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body).toEqual(document);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.new_edits).toEqual(newEdits);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const document = {};
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putDocumentParams = {
          db,
          docId,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDocument(putDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headDesignDocument', () => {
    describe('positive tests', () => {
      function __headDesignDocumentTest() {
        // Construct the params object for operation headDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const ifNoneMatch = 'testString';
        const headDesignDocumentParams = {
          db,
          ddoc,
          ifNoneMatch,
        };

        const headDesignDocumentResult = cloudantService.headDesignDocument(headDesignDocumentParams);

        // all methods should return a Promise
        expectToBePromise(headDesignDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headDesignDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headDesignDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headDesignDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headDesignDocumentParams = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDesignDocument(headDesignDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headDesignDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDesignDocument', () => {
    describe('positive tests', () => {
      function __deleteDesignDocumentTest() {
        // Construct the params object for operation deleteDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const ifMatch = 'testString';
        const batch = 'ok';
        const rev = 'testString';
        const deleteDesignDocumentParams = {
          db,
          ddoc,
          ifMatch,
          batch,
          rev,
        };

        const deleteDesignDocumentResult = cloudantService.deleteDesignDocument(deleteDesignDocumentParams);

        // all methods should return a Promise
        expectToBePromise(deleteDesignDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDesignDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteDesignDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteDesignDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDesignDocumentParams = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDesignDocument(deleteDesignDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteDesignDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDesignDocument', () => {
    describe('positive tests', () => {
      function __getDesignDocumentTest() {
        // Construct the params object for operation getDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getDesignDocumentParams = {
          db,
          ddoc,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getDesignDocumentResult = cloudantService.getDesignDocument(getDesignDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getDesignDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDesignDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDesignDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDesignDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDesignDocumentParams = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDesignDocument(getDesignDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDesignDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putDesignDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Attachment
      const attachmentModel = {
        contentType: 'testString',
        data: 'VGhpcyBpcyBhIG1vY2sgYnl0ZSBhcnJheSB2YWx1ZS4=',
        digest: 'testString',
        encodedLength: 0,
        encoding: 'testString',
        follows: true,
        length: 0,
        revpos: 1,
        stub: true,
      };

      // Revisions
      const revisionsModel = {
        ids: ['testString'],
        start: 1,
      };

      // DocumentRevisionStatus
      const documentRevisionStatusModel = {
        rev: 'testString',
        status: 'available',
      };

      // Analyzer
      const analyzerModel = {
        name: 'classic',
        stopwords: ['testString'],
      };

      // AnalyzerConfiguration
      const analyzerConfigurationModel = {
        name: 'classic',
        stopwords: ['testString'],
        fields: { 'key1': analyzerModel },
      };

      // SearchIndexDefinition
      const searchIndexDefinitionModel = {
        analyzer: analyzerConfigurationModel,
        index: 'testString',
      };

      // DesignDocumentOptions
      const designDocumentOptionsModel = {
        partitioned: true,
      };

      // DesignDocumentViewsMapReduce
      const designDocumentViewsMapReduceModel = {
        map: 'testString',
        reduce: 'testString',
      };

      // DesignDocument
      const designDocumentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'testString',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        autoupdate: true,
        filters: { 'key1': 'testString' },
        indexes: { 'key1': searchIndexDefinitionModel },
        language: 'javascript',
        options: designDocumentOptionsModel,
        validateDocUpdate: 'testString',
        views: { 'key1': designDocumentViewsMapReduceModel },
        foo: 'testString',
      };

      function __putDesignDocumentTest() {
        // Construct the params object for operation putDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const designDocument = designDocumentModel;
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = false;
        const rev = 'testString';
        const putDesignDocumentParams = {
          db,
          ddoc,
          designDocument,
          ifMatch,
          batch,
          newEdits,
          rev,
        };

        const putDesignDocumentResult = cloudantService.putDesignDocument(putDesignDocumentParams);

        // all methods should return a Promise
        expectToBePromise(putDesignDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body).toEqual(CloudantV1.DesignDocument.serialize(designDocument));
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.new_edits).toEqual(newEdits);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putDesignDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putDesignDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putDesignDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const designDocument = designDocumentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putDesignDocumentParams = {
          db,
          ddoc,
          designDocument,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDesignDocument(putDesignDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putDesignDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDesignDocumentInformation', () => {
    describe('positive tests', () => {
      function __getDesignDocumentInformationTest() {
        // Construct the params object for operation getDesignDocumentInformation
        const db = 'testString';
        const ddoc = 'testString';
        const getDesignDocumentInformationParams = {
          db,
          ddoc,
        };

        const getDesignDocumentInformationResult = cloudantService.getDesignDocumentInformation(getDesignDocumentInformationParams);

        // all methods should return a Promise
        expectToBePromise(getDesignDocumentInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_info', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDesignDocumentInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDesignDocumentInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDesignDocumentInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDesignDocumentInformationParams = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDesignDocumentInformation(getDesignDocumentInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDesignDocumentInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDesignDocumentInformation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postDesignDocs', () => {
    describe('positive tests', () => {
      function __postDesignDocsTest() {
        // Construct the params object for operation postDesignDocs
        const db = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startKey = 'testString';
        const accept = 'application/json';
        const postDesignDocsParams = {
          db,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          key,
          keys,
          startKey,
          accept,
        };

        const postDesignDocsResult = cloudantService.postDesignDocs(postDesignDocsParams);

        // all methods should return a Promise
        expectToBePromise(postDesignDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design_docs', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postDesignDocsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postDesignDocsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postDesignDocsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postDesignDocsParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDesignDocs(postDesignDocsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postDesignDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postDesignDocs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postDesignDocsQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        attEncodingInfo: false,
        attachments: false,
        conflicts: false,
        descending: false,
        includeDocs: false,
        inclusiveEnd: true,
        limit: 0,
        skip: 0,
        updateSeq: false,
        endKey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startKey: 'testString',
      };

      function __postDesignDocsQueriesTest() {
        // Construct the params object for operation postDesignDocsQueries
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const accept = 'application/json';
        const postDesignDocsQueriesParams = {
          db,
          queries,
          accept,
        };

        const postDesignDocsQueriesResult = cloudantService.postDesignDocsQueries(postDesignDocsQueriesParams);

        // all methods should return a Promise
        expectToBePromise(postDesignDocsQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design_docs/queries', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.body.queries).toEqual(
          BaseService.convertModel(
            queries,
            CloudantV1.AllDocsQuery.serialize,
          )
        );
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postDesignDocsQueriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postDesignDocsQueriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postDesignDocsQueriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postDesignDocsQueriesParams = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDesignDocsQueries(postDesignDocsQueriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postDesignDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postDesignDocsQueries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postView', () => {
    describe('positive tests', () => {
      function __postViewTest() {
        // Construct the params object for operation postView
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const endKeyDocId = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = false;
        const startKey = 'testString';
        const startKeyDocId = 'testString';
        const update = 'true';
        const postViewParams = {
          db,
          ddoc,
          view,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          endKeyDocId,
          group,
          groupLevel,
          key,
          keys,
          reduce,
          stable,
          startKey,
          startKeyDocId,
          update,
        };

        const postViewResult = cloudantService.postView(postViewParams);

        // all methods should return a Promise
        expectToBePromise(postViewResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.end_key_doc_id).toEqual(endKeyDocId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.body.start_key_doc_id).toEqual(startKeyDocId);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postViewTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postViewTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postViewTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postViewParams = {
          db,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postView(postViewParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postView();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postViewAsStream', () => {
    describe('positive tests', () => {
      function __postViewAsStreamTest() {
        // Construct the params object for operation postViewAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const endKeyDocId = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = false;
        const startKey = 'testString';
        const startKeyDocId = 'testString';
        const update = 'true';
        const postViewAsStreamParams = {
          db,
          ddoc,
          view,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          endKeyDocId,
          group,
          groupLevel,
          key,
          keys,
          reduce,
          stable,
          startKey,
          startKeyDocId,
          update,
        };

        const postViewAsStreamResult = cloudantService.postViewAsStream(postViewAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postViewAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.end_key_doc_id).toEqual(endKeyDocId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.body.start_key_doc_id).toEqual(startKeyDocId);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postViewAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postViewAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postViewAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postViewAsStreamParams = {
          db,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewAsStream(postViewAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postViewAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postViewQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ViewQuery
      const viewQueryModel = {
        attEncodingInfo: false,
        attachments: false,
        conflicts: false,
        descending: false,
        includeDocs: false,
        inclusiveEnd: true,
        limit: 0,
        skip: 0,
        updateSeq: false,
        endKey: 'testString',
        endKeyDocId: 'testString',
        group: false,
        groupLevel: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: false,
        startKey: 'testString',
        startKeyDocId: 'testString',
        update: 'true',
      };

      function __postViewQueriesTest() {
        // Construct the params object for operation postViewQueries
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const postViewQueriesParams = {
          db,
          ddoc,
          view,
          queries,
        };

        const postViewQueriesResult = cloudantService.postViewQueries(postViewQueriesParams);

        // all methods should return a Promise
        expectToBePromise(postViewQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(
          BaseService.convertModel(
            queries,
            CloudantV1.ViewQuery.serialize,
          )
        );
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postViewQueriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postViewQueriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postViewQueriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postViewQueriesParams = {
          db,
          ddoc,
          view,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewQueries(postViewQueriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postViewQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postViewQueries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postViewQueriesAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ViewQuery
      const viewQueryModel = {
        attEncodingInfo: false,
        attachments: false,
        conflicts: false,
        descending: false,
        includeDocs: false,
        inclusiveEnd: true,
        limit: 0,
        skip: 0,
        updateSeq: false,
        endKey: 'testString',
        endKeyDocId: 'testString',
        group: false,
        groupLevel: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: false,
        startKey: 'testString',
        startKeyDocId: 'testString',
        update: 'true',
      };

      function __postViewQueriesAsStreamTest() {
        // Construct the params object for operation postViewQueriesAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const postViewQueriesAsStreamParams = {
          db,
          ddoc,
          view,
          queries,
        };

        const postViewQueriesAsStreamResult = cloudantService.postViewQueriesAsStream(postViewQueriesAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postViewQueriesAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(
          BaseService.convertModel(
            queries,
            CloudantV1.ViewQuery.serialize,
          )
        );
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postViewQueriesAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postViewQueriesAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postViewQueriesAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postViewQueriesAsStreamParams = {
          db,
          ddoc,
          view,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewQueriesAsStream(postViewQueriesAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postViewQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postViewQueriesAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPartitionInformation', () => {
    describe('positive tests', () => {
      function __getPartitionInformationTest() {
        // Construct the params object for operation getPartitionInformation
        const db = 'testString';
        const partitionKey = 'testString';
        const getPartitionInformationParams = {
          db,
          partitionKey,
        };

        const getPartitionInformationResult = cloudantService.getPartitionInformation(getPartitionInformationParams);

        // all methods should return a Promise
        expectToBePromise(getPartitionInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPartitionInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getPartitionInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getPartitionInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPartitionInformationParams = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getPartitionInformation(getPartitionInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getPartitionInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getPartitionInformation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionAllDocs', () => {
    describe('positive tests', () => {
      function __postPartitionAllDocsTest() {
        // Construct the params object for operation postPartitionAllDocs
        const db = 'testString';
        const partitionKey = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startKey = 'testString';
        const postPartitionAllDocsParams = {
          db,
          partitionKey,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          key,
          keys,
          startKey,
        };

        const postPartitionAllDocsResult = cloudantService.postPartitionAllDocs(postPartitionAllDocsParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionAllDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionAllDocsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionAllDocsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionAllDocsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionAllDocsParams = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionAllDocs(postPartitionAllDocsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionAllDocs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionAllDocsAsStream', () => {
    describe('positive tests', () => {
      function __postPartitionAllDocsAsStreamTest() {
        // Construct the params object for operation postPartitionAllDocsAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startKey = 'testString';
        const postPartitionAllDocsAsStreamParams = {
          db,
          partitionKey,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          key,
          keys,
          startKey,
        };

        const postPartitionAllDocsAsStreamResult = cloudantService.postPartitionAllDocsAsStream(postPartitionAllDocsAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionAllDocsAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionAllDocsAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionAllDocsAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionAllDocsAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionAllDocsAsStreamParams = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionAllDocsAsStream(postPartitionAllDocsAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionAllDocsAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionSearch', () => {
    describe('positive tests', () => {
      function __postPartitionSearchTest() {
        // Construct the params object for operation postPartitionSearch
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = '</em>';
        const highlightPreTag = '<em>';
        const highlightSize = 100;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 0;
        const sort = ['testString'];
        const stale = 'ok';
        const postPartitionSearchParams = {
          db,
          partitionKey,
          ddoc,
          index,
          query,
          bookmark,
          highlightFields,
          highlightNumber,
          highlightPostTag,
          highlightPreTag,
          highlightSize,
          includeDocs,
          includeFields,
          limit,
          sort,
          stale,
        };

        const postPartitionSearchResult = cloudantService.postPartitionSearch(postPartitionSearchParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionSearchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.highlight_fields).toEqual(highlightFields);
        expect(mockRequestOptions.body.highlight_number).toEqual(highlightNumber);
        expect(mockRequestOptions.body.highlight_post_tag).toEqual(highlightPostTag);
        expect(mockRequestOptions.body.highlight_pre_tag).toEqual(highlightPreTag);
        expect(mockRequestOptions.body.highlight_size).toEqual(highlightSize);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.include_fields).toEqual(includeFields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stale).toEqual(stale);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionSearchTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionSearchTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionSearchTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionSearchParams = {
          db,
          partitionKey,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionSearch(postPartitionSearchParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionSearch();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionSearchAsStream', () => {
    describe('positive tests', () => {
      function __postPartitionSearchAsStreamTest() {
        // Construct the params object for operation postPartitionSearchAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = '</em>';
        const highlightPreTag = '<em>';
        const highlightSize = 100;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 0;
        const sort = ['testString'];
        const stale = 'ok';
        const postPartitionSearchAsStreamParams = {
          db,
          partitionKey,
          ddoc,
          index,
          query,
          bookmark,
          highlightFields,
          highlightNumber,
          highlightPostTag,
          highlightPreTag,
          highlightSize,
          includeDocs,
          includeFields,
          limit,
          sort,
          stale,
        };

        const postPartitionSearchAsStreamResult = cloudantService.postPartitionSearchAsStream(postPartitionSearchAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionSearchAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.highlight_fields).toEqual(highlightFields);
        expect(mockRequestOptions.body.highlight_number).toEqual(highlightNumber);
        expect(mockRequestOptions.body.highlight_post_tag).toEqual(highlightPostTag);
        expect(mockRequestOptions.body.highlight_pre_tag).toEqual(highlightPreTag);
        expect(mockRequestOptions.body.highlight_size).toEqual(highlightSize);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.include_fields).toEqual(includeFields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stale).toEqual(stale);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionSearchAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionSearchAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionSearchAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionSearchAsStreamParams = {
          db,
          partitionKey,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionSearchAsStream(postPartitionSearchAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionSearchAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionView', () => {
    describe('positive tests', () => {
      function __postPartitionViewTest() {
        // Construct the params object for operation postPartitionView
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const endKeyDocId = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const startKey = 'testString';
        const startKeyDocId = 'testString';
        const update = 'true';
        const postPartitionViewParams = {
          db,
          partitionKey,
          ddoc,
          view,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          endKeyDocId,
          group,
          groupLevel,
          key,
          keys,
          reduce,
          startKey,
          startKeyDocId,
          update,
        };

        const postPartitionViewResult = cloudantService.postPartitionView(postPartitionViewParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionViewResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.end_key_doc_id).toEqual(endKeyDocId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.body.start_key_doc_id).toEqual(startKeyDocId);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionViewTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionViewTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionViewTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionViewParams = {
          db,
          partitionKey,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionView(postPartitionViewParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionView();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionViewAsStream', () => {
    describe('positive tests', () => {
      function __postPartitionViewAsStreamTest() {
        // Construct the params object for operation postPartitionViewAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = false;
        const attachments = false;
        const conflicts = false;
        const descending = false;
        const includeDocs = false;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = false;
        const endKey = 'testString';
        const endKeyDocId = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const startKey = 'testString';
        const startKeyDocId = 'testString';
        const update = 'true';
        const postPartitionViewAsStreamParams = {
          db,
          partitionKey,
          ddoc,
          view,
          attEncodingInfo,
          attachments,
          conflicts,
          descending,
          includeDocs,
          inclusiveEnd,
          limit,
          skip,
          updateSeq,
          endKey,
          endKeyDocId,
          group,
          groupLevel,
          key,
          keys,
          reduce,
          startKey,
          startKeyDocId,
          update,
        };

        const postPartitionViewAsStreamResult = cloudantService.postPartitionViewAsStream(postPartitionViewAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionViewAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.descending).toEqual(descending);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.inclusive_end).toEqual(inclusiveEnd);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.update_seq).toEqual(updateSeq);
        expect(mockRequestOptions.body.end_key).toEqual(endKey);
        expect(mockRequestOptions.body.end_key_doc_id).toEqual(endKeyDocId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.start_key).toEqual(startKey);
        expect(mockRequestOptions.body.start_key_doc_id).toEqual(startKeyDocId);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.view).toEqual(view);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionViewAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionViewAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionViewAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionViewAsStreamParams = {
          db,
          partitionKey,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionViewAsStream(postPartitionViewAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionViewAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionExplain', () => {
    describe('positive tests', () => {
      function __postPartitionExplainTest() {
        // Construct the params object for operation postPartitionExplain
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const postPartitionExplainParams = {
          db,
          partitionKey,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
        };

        const postPartitionExplainResult = cloudantService.postPartitionExplain(postPartitionExplainParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionExplainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionExplainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionExplainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionExplainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionExplainParams = {
          db,
          partitionKey,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionExplain(postPartitionExplainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionExplain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionExplain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionFind', () => {
    describe('positive tests', () => {
      function __postPartitionFindTest() {
        // Construct the params object for operation postPartitionFind
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const postPartitionFindParams = {
          db,
          partitionKey,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
        };

        const postPartitionFindResult = cloudantService.postPartitionFind(postPartitionFindParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionFindResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionFindTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionFindTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionFindTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionFindParams = {
          db,
          partitionKey,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionFind(postPartitionFindParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionFind();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postPartitionFindAsStream', () => {
    describe('positive tests', () => {
      function __postPartitionFindAsStreamTest() {
        // Construct the params object for operation postPartitionFindAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const postPartitionFindAsStreamParams = {
          db,
          partitionKey,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
        };

        const postPartitionFindAsStreamResult = cloudantService.postPartitionFindAsStream(postPartitionFindAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postPartitionFindAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_partition/{partition_key}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.partition_key).toEqual(partitionKey);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postPartitionFindAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postPartitionFindAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postPartitionFindAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postPartitionFindAsStreamParams = {
          db,
          partitionKey,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionFindAsStream(postPartitionFindAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postPartitionFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postPartitionFindAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postExplain', () => {
    describe('positive tests', () => {
      function __postExplainTest() {
        // Construct the params object for operation postExplain
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const postExplainParams = {
          db,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
          r,
        };

        const postExplainResult = cloudantService.postExplain(postExplainParams);

        // all methods should return a Promise
        expectToBePromise(postExplainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.body.r).toEqual(r);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postExplainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postExplainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postExplainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postExplainParams = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postExplain(postExplainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postExplain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postExplain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postFind', () => {
    describe('positive tests', () => {
      function __postFindTest() {
        // Construct the params object for operation postFind
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const postFindParams = {
          db,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
          r,
        };

        const postFindResult = cloudantService.postFind(postFindParams);

        // all methods should return a Promise
        expectToBePromise(postFindResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.body.r).toEqual(r);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postFindTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postFindTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postFindTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postFindParams = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postFind(postFindParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postFind();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postFindAsStream', () => {
    describe('positive tests', () => {
      function __postFindAsStreamTest() {
        // Construct the params object for operation postFindAsStream
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 25;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const postFindAsStreamParams = {
          db,
          selector,
          bookmark,
          conflicts,
          executionStats,
          fields,
          limit,
          skip,
          sort,
          stable,
          update,
          useIndex,
          r,
        };

        const postFindAsStreamResult = cloudantService.postFindAsStream(postFindAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postFindAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.body.execution_stats).toEqual(executionStats);
        expect(mockRequestOptions.body.fields).toEqual(fields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.skip).toEqual(skip);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.update).toEqual(update);
        expect(mockRequestOptions.body.use_index).toEqual(useIndex);
        expect(mockRequestOptions.body.r).toEqual(r);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postFindAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postFindAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postFindAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { anyKey: 'anyValue' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postFindAsStreamParams = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postFindAsStream(postFindAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postFindAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getIndexesInformation', () => {
    describe('positive tests', () => {
      function __getIndexesInformationTest() {
        // Construct the params object for operation getIndexesInformation
        const db = 'testString';
        const getIndexesInformationParams = {
          db,
        };

        const getIndexesInformationResult = cloudantService.getIndexesInformation(getIndexesInformationParams);

        // all methods should return a Promise
        expectToBePromise(getIndexesInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_index', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIndexesInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getIndexesInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getIndexesInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIndexesInformationParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getIndexesInformation(getIndexesInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getIndexesInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getIndexesInformation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postIndex', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Analyzer
      const analyzerModel = {
        name: 'classic',
        stopwords: ['testString'],
      };

      // IndexTextOperatorDefaultField
      const indexTextOperatorDefaultFieldModel = {
        analyzer: analyzerModel,
        enabled: true,
      };

      // IndexField
      const indexFieldModel = {
        name: 'testString',
        type: 'boolean',
        foo: 'asc',
      };

      // IndexDefinition
      const indexDefinitionModel = {
        defaultAnalyzer: analyzerModel,
        defaultField: indexTextOperatorDefaultFieldModel,
        fields: [indexFieldModel],
        indexArrayLengths: true,
        partialFilterSelector: { anyKey: 'anyValue' },
      };

      function __postIndexTest() {
        // Construct the params object for operation postIndex
        const db = 'testString';
        const index = indexDefinitionModel;
        const ddoc = 'testString';
        const name = 'testString';
        const partitioned = true;
        const type = 'json';
        const postIndexParams = {
          db,
          index,
          ddoc,
          name,
          partitioned,
          type,
        };

        const postIndexResult = cloudantService.postIndex(postIndexParams);

        // all methods should return a Promise
        expectToBePromise(postIndexResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_index', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.index).toEqual(CloudantV1.IndexDefinition.serialize(indexDefinitionModel));
        expect(mockRequestOptions.body.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.partitioned).toEqual(partitioned);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postIndexTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postIndexTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postIndexTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const index = indexDefinitionModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postIndexParams = {
          db,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postIndex(postIndexParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postIndex();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteIndex', () => {
    describe('positive tests', () => {
      function __deleteIndexTest() {
        // Construct the params object for operation deleteIndex
        const db = 'testString';
        const ddoc = 'testString';
        const type = 'json';
        const index = 'testString';
        const deleteIndexParams = {
          db,
          ddoc,
          type,
          index,
        };

        const deleteIndexResult = cloudantService.deleteIndex(deleteIndexParams);

        // all methods should return a Promise
        expectToBePromise(deleteIndexResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_index/_design/{ddoc}/{type}/{index}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.type).toEqual(type);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteIndexTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteIndexTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteIndexTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const type = 'json';
        const index = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteIndexParams = {
          db,
          ddoc,
          type,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteIndex(deleteIndexParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteIndex();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postSearchAnalyze', () => {
    describe('positive tests', () => {
      function __postSearchAnalyzeTest() {
        // Construct the params object for operation postSearchAnalyze
        const analyzer = 'arabic';
        const text = 'testString';
        const postSearchAnalyzeParams = {
          analyzer,
          text,
        };

        const postSearchAnalyzeResult = cloudantService.postSearchAnalyze(postSearchAnalyzeParams);

        // all methods should return a Promise
        expectToBePromise(postSearchAnalyzeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_search_analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.analyzer).toEqual(analyzer);
        expect(mockRequestOptions.body.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postSearchAnalyzeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postSearchAnalyzeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postSearchAnalyzeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const analyzer = 'arabic';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postSearchAnalyzeParams = {
          analyzer,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearchAnalyze(postSearchAnalyzeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postSearchAnalyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postSearchAnalyze();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postSearch', () => {
    describe('positive tests', () => {
      function __postSearchTest() {
        // Construct the params object for operation postSearch
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = '</em>';
        const highlightPreTag = '<em>';
        const highlightSize = 100;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 0;
        const sort = ['testString'];
        const stale = 'ok';
        const counts = ['testString'];
        const drilldown = [['testString']];
        const groupField = 'testString';
        const groupLimit = 1;
        const groupSort = ['testString'];
        const ranges = { 'key1': { 'key1': { 'key1': 'testString' } } };
        const postSearchParams = {
          db,
          ddoc,
          index,
          query,
          bookmark,
          highlightFields,
          highlightNumber,
          highlightPostTag,
          highlightPreTag,
          highlightSize,
          includeDocs,
          includeFields,
          limit,
          sort,
          stale,
          counts,
          drilldown,
          groupField,
          groupLimit,
          groupSort,
          ranges,
        };

        const postSearchResult = cloudantService.postSearch(postSearchParams);

        // all methods should return a Promise
        expectToBePromise(postSearchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.highlight_fields).toEqual(highlightFields);
        expect(mockRequestOptions.body.highlight_number).toEqual(highlightNumber);
        expect(mockRequestOptions.body.highlight_post_tag).toEqual(highlightPostTag);
        expect(mockRequestOptions.body.highlight_pre_tag).toEqual(highlightPreTag);
        expect(mockRequestOptions.body.highlight_size).toEqual(highlightSize);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.include_fields).toEqual(includeFields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stale).toEqual(stale);
        expect(mockRequestOptions.body.counts).toEqual(counts);
        expect(mockRequestOptions.body.drilldown).toEqual(drilldown);
        expect(mockRequestOptions.body.group_field).toEqual(groupField);
        expect(mockRequestOptions.body.group_limit).toEqual(groupLimit);
        expect(mockRequestOptions.body.group_sort).toEqual(groupSort);
        expect(mockRequestOptions.body.ranges).toEqual(ranges);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postSearchTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postSearchTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postSearchTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postSearchParams = {
          db,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearch(postSearchParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postSearch();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postSearchAsStream', () => {
    describe('positive tests', () => {
      function __postSearchAsStreamTest() {
        // Construct the params object for operation postSearchAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = '</em>';
        const highlightPreTag = '<em>';
        const highlightSize = 100;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 0;
        const sort = ['testString'];
        const stale = 'ok';
        const counts = ['testString'];
        const drilldown = [['testString']];
        const groupField = 'testString';
        const groupLimit = 1;
        const groupSort = ['testString'];
        const ranges = { 'key1': { 'key1': { 'key1': 'testString' } } };
        const postSearchAsStreamParams = {
          db,
          ddoc,
          index,
          query,
          bookmark,
          highlightFields,
          highlightNumber,
          highlightPostTag,
          highlightPreTag,
          highlightSize,
          includeDocs,
          includeFields,
          limit,
          sort,
          stale,
          counts,
          drilldown,
          groupField,
          groupLimit,
          groupSort,
          ranges,
        };

        const postSearchAsStreamResult = cloudantService.postSearchAsStream(postSearchAsStreamParams);

        // all methods should return a Promise
        expectToBePromise(postSearchAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.body.highlight_fields).toEqual(highlightFields);
        expect(mockRequestOptions.body.highlight_number).toEqual(highlightNumber);
        expect(mockRequestOptions.body.highlight_post_tag).toEqual(highlightPostTag);
        expect(mockRequestOptions.body.highlight_pre_tag).toEqual(highlightPreTag);
        expect(mockRequestOptions.body.highlight_size).toEqual(highlightSize);
        expect(mockRequestOptions.body.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.body.include_fields).toEqual(includeFields);
        expect(mockRequestOptions.body.limit).toEqual(limit);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.stale).toEqual(stale);
        expect(mockRequestOptions.body.counts).toEqual(counts);
        expect(mockRequestOptions.body.drilldown).toEqual(drilldown);
        expect(mockRequestOptions.body.group_field).toEqual(groupField);
        expect(mockRequestOptions.body.group_limit).toEqual(groupLimit);
        expect(mockRequestOptions.body.group_sort).toEqual(groupSort);
        expect(mockRequestOptions.body.ranges).toEqual(ranges);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postSearchAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postSearchAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postSearchAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postSearchAsStreamParams = {
          db,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearchAsStream(postSearchAsStreamParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postSearchAsStream();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSearchInfo', () => {
    describe('positive tests', () => {
      function __getSearchInfoTest() {
        // Construct the params object for operation getSearchInfo
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const getSearchInfoParams = {
          db,
          ddoc,
          index,
        };

        const getSearchInfoResult = cloudantService.getSearchInfo(getSearchInfoParams);

        // all methods should return a Promise
        expectToBePromise(getSearchInfoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_search_info/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSearchInfoTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSearchInfoTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSearchInfoTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSearchInfoParams = {
          db,
          ddoc,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSearchInfo(getSearchInfoParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getSearchInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getSearchInfo();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headReplicationDocument', () => {
    describe('positive tests', () => {
      function __headReplicationDocumentTest() {
        // Construct the params object for operation headReplicationDocument
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const headReplicationDocumentParams = {
          docId,
          ifNoneMatch,
        };

        const headReplicationDocumentResult = cloudantService.headReplicationDocument(headReplicationDocumentParams);

        // all methods should return a Promise
        expectToBePromise(headReplicationDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_replicator/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headReplicationDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headReplicationDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headReplicationDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headReplicationDocumentParams = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headReplicationDocument(headReplicationDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headReplicationDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headSchedulerDocument', () => {
    describe('positive tests', () => {
      function __headSchedulerDocumentTest() {
        // Construct the params object for operation headSchedulerDocument
        const docId = 'testString';
        const headSchedulerDocumentParams = {
          docId,
        };

        const headSchedulerDocumentResult = cloudantService.headSchedulerDocument(headSchedulerDocumentParams);

        // all methods should return a Promise
        expectToBePromise(headSchedulerDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/docs/_replicator/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headSchedulerDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headSchedulerDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headSchedulerDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headSchedulerDocumentParams = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headSchedulerDocument(headSchedulerDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headSchedulerDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headSchedulerJob', () => {
    describe('positive tests', () => {
      function __headSchedulerJobTest() {
        // Construct the params object for operation headSchedulerJob
        const jobId = 'testString';
        const headSchedulerJobParams = {
          jobId,
        };

        const headSchedulerJobResult = cloudantService.headSchedulerJob(headSchedulerJobParams);

        // all methods should return a Promise
        expectToBePromise(headSchedulerJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/jobs/{job_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headSchedulerJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headSchedulerJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headSchedulerJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headSchedulerJobParams = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headSchedulerJob(headSchedulerJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headSchedulerJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteReplicationDocument', () => {
    describe('positive tests', () => {
      function __deleteReplicationDocumentTest() {
        // Construct the params object for operation deleteReplicationDocument
        const docId = 'testString';
        const ifMatch = 'testString';
        const batch = 'ok';
        const rev = 'testString';
        const deleteReplicationDocumentParams = {
          docId,
          ifMatch,
          batch,
          rev,
        };

        const deleteReplicationDocumentResult = cloudantService.deleteReplicationDocument(deleteReplicationDocumentParams);

        // all methods should return a Promise
        expectToBePromise(deleteReplicationDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_replicator/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteReplicationDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteReplicationDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteReplicationDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteReplicationDocumentParams = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteReplicationDocument(deleteReplicationDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteReplicationDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReplicationDocument', () => {
    describe('positive tests', () => {
      function __getReplicationDocumentTest() {
        // Construct the params object for operation getReplicationDocument
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const conflicts = false;
        const deletedConflicts = false;
        const latest = false;
        const localSeq = false;
        const meta = false;
        const rev = 'testString';
        const revs = false;
        const revsInfo = false;
        const getReplicationDocumentParams = {
          docId,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          conflicts,
          deletedConflicts,
          latest,
          localSeq,
          meta,
          rev,
          revs,
          revsInfo,
        };

        const getReplicationDocumentResult = cloudantService.getReplicationDocument(getReplicationDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getReplicationDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_replicator/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.conflicts).toEqual(conflicts);
        expect(mockRequestOptions.qs.deleted_conflicts).toEqual(deletedConflicts);
        expect(mockRequestOptions.qs.latest).toEqual(latest);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.qs.meta).toEqual(meta);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.revs).toEqual(revs);
        expect(mockRequestOptions.qs.revs_info).toEqual(revsInfo);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReplicationDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getReplicationDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getReplicationDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReplicationDocumentParams = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getReplicationDocument(getReplicationDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getReplicationDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putReplicationDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Attachment
      const attachmentModel = {
        contentType: 'testString',
        data: 'VGhpcyBpcyBhIG1vY2sgYnl0ZSBhcnJheSB2YWx1ZS4=',
        digest: 'testString',
        encodedLength: 0,
        encoding: 'testString',
        follows: true,
        length: 0,
        revpos: 1,
        stub: true,
      };

      // Revisions
      const revisionsModel = {
        ids: ['testString'],
        start: 1,
      };

      // DocumentRevisionStatus
      const documentRevisionStatusModel = {
        rev: 'testString',
        status: 'available',
      };

      // ReplicationCreateTargetParameters
      const replicationCreateTargetParametersModel = {
        n: 3,
        partitioned: false,
        q: 26,
      };

      // ReplicationDatabaseAuthBasic
      const replicationDatabaseAuthBasicModel = {
        password: 'testString',
        username: 'testString',
      };

      // ReplicationDatabaseAuthIam
      const replicationDatabaseAuthIamModel = {
        apiKey: 'testString',
      };

      // ReplicationDatabaseAuth
      const replicationDatabaseAuthModel = {
        basic: replicationDatabaseAuthBasicModel,
        iam: replicationDatabaseAuthIamModel,
      };

      // ReplicationDatabase
      const replicationDatabaseModel = {
        auth: replicationDatabaseAuthModel,
        headers: { 'key1': 'testString' },
        url: 'testString',
      };

      // UserContext
      const userContextModel = {
        db: 'testString',
        name: 'testString',
        roles: ['_reader'],
      };

      // ReplicationDocument
      const replicationDocumentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'testString',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        cancel: true,
        checkpointInterval: 30000,
        connectionTimeout: 30000,
        continuous: false,
        createTarget: false,
        createTargetParams: replicationCreateTargetParametersModel,
        docIds: ['testString'],
        filter: 'testString',
        httpConnections: 20,
        queryParams: { 'key1': 'testString' },
        retriesPerRequest: 5,
        selector: { anyKey: 'anyValue' },
        sinceSeq: 'testString',
        socketOptions: 'testString',
        source: replicationDatabaseModel,
        sourceProxy: 'testString',
        target: replicationDatabaseModel,
        targetProxy: 'testString',
        useBulkGet: true,
        useCheckpoints: true,
        userCtx: userContextModel,
        winningRevsOnly: false,
        workerBatchSize: 500,
        workerProcesses: 4,
        foo: 'testString',
      };

      function __putReplicationDocumentTest() {
        // Construct the params object for operation putReplicationDocument
        const docId = 'testString';
        const replicationDocument = replicationDocumentModel;
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = false;
        const rev = 'testString';
        const putReplicationDocumentParams = {
          docId,
          replicationDocument,
          ifMatch,
          batch,
          newEdits,
          rev,
        };

        const putReplicationDocumentResult = cloudantService.putReplicationDocument(putReplicationDocumentParams);

        // all methods should return a Promise
        expectToBePromise(putReplicationDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_replicator/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body).toEqual(CloudantV1.ReplicationDocument.serialize(replicationDocument));
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.qs.new_edits).toEqual(newEdits);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putReplicationDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putReplicationDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putReplicationDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const replicationDocument = replicationDocumentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putReplicationDocumentParams = {
          docId,
          replicationDocument,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putReplicationDocument(putReplicationDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putReplicationDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSchedulerDocs', () => {
    describe('positive tests', () => {
      function __getSchedulerDocsTest() {
        // Construct the params object for operation getSchedulerDocs
        const limit = 0;
        const skip = 0;
        const states = ['initializing'];
        const getSchedulerDocsParams = {
          limit,
          skip,
          states,
        };

        const getSchedulerDocsResult = cloudantService.getSchedulerDocs(getSchedulerDocsParams);

        // all methods should return a Promise
        expectToBePromise(getSchedulerDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/docs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.states).toEqual(states);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchedulerDocsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSchedulerDocsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSchedulerDocsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchedulerDocsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerDocs(getSchedulerDocsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getSchedulerDocs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getSchedulerDocument', () => {
    describe('positive tests', () => {
      function __getSchedulerDocumentTest() {
        // Construct the params object for operation getSchedulerDocument
        const docId = 'testString';
        const getSchedulerDocumentParams = {
          docId,
        };

        const getSchedulerDocumentResult = cloudantService.getSchedulerDocument(getSchedulerDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getSchedulerDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/docs/_replicator/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchedulerDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSchedulerDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSchedulerDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchedulerDocumentParams = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerDocument(getSchedulerDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getSchedulerDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSchedulerJobs', () => {
    describe('positive tests', () => {
      function __getSchedulerJobsTest() {
        // Construct the params object for operation getSchedulerJobs
        const limit = 25;
        const skip = 0;
        const getSchedulerJobsParams = {
          limit,
          skip,
        };

        const getSchedulerJobsResult = cloudantService.getSchedulerJobs(getSchedulerJobsParams);

        // all methods should return a Promise
        expectToBePromise(getSchedulerJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchedulerJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSchedulerJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSchedulerJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchedulerJobsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerJobs(getSchedulerJobsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getSchedulerJobs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getSchedulerJob', () => {
    describe('positive tests', () => {
      function __getSchedulerJobTest() {
        // Construct the params object for operation getSchedulerJob
        const jobId = 'testString';
        const getSchedulerJobParams = {
          jobId,
        };

        const getSchedulerJobResult = cloudantService.getSchedulerJob(getSchedulerJobParams);

        // all methods should return a Promise
        expectToBePromise(getSchedulerJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_scheduler/jobs/{job_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchedulerJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSchedulerJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSchedulerJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchedulerJobParams = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerJob(getSchedulerJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getSchedulerJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSessionInformation', () => {
    describe('positive tests', () => {
      function __getSessionInformationTest() {
        // Construct the params object for operation getSessionInformation
        const getSessionInformationParams = {};

        const getSessionInformationResult = cloudantService.getSessionInformation(getSessionInformationParams);

        // all methods should return a Promise
        expectToBePromise(getSessionInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_session', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSessionInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSessionInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSessionInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSessionInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSessionInformation(getSessionInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getSessionInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getSecurity', () => {
    describe('positive tests', () => {
      function __getSecurityTest() {
        // Construct the params object for operation getSecurity
        const db = 'testString';
        const getSecurityParams = {
          db,
        };

        const getSecurityResult = cloudantService.getSecurity(getSecurityParams);

        // all methods should return a Promise
        expectToBePromise(getSecurityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_security', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecurityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getSecurityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getSecurityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecurityParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSecurity(getSecurityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getSecurity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putSecurity', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecurityObject
      const securityObjectModel = {
        names: ['testString'],
        roles: ['testString'],
      };

      function __putSecurityTest() {
        // Construct the params object for operation putSecurity
        const db = 'testString';
        const admins = securityObjectModel;
        const members = securityObjectModel;
        const cloudant = { 'key1': ['_reader'] };
        const couchdbAuthOnly = true;
        const putSecurityParams = {
          db,
          admins,
          members,
          cloudant,
          couchdbAuthOnly,
        };

        const putSecurityResult = cloudantService.putSecurity(putSecurityParams);

        // all methods should return a Promise
        expectToBePromise(putSecurityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_security', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.admins).toEqual(CloudantV1.SecurityObject.serialize(securityObjectModel));
        expect(mockRequestOptions.body.members).toEqual(CloudantV1.SecurityObject.serialize(securityObjectModel));
        expect(mockRequestOptions.body.cloudant).toEqual(cloudant);
        expect(mockRequestOptions.body.couchdb_auth_only).toEqual(couchdbAuthOnly);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putSecurityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putSecurityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putSecurityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putSecurityParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putSecurity(putSecurityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putSecurity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postApiKeys', () => {
    describe('positive tests', () => {
      function __postApiKeysTest() {
        // Construct the params object for operation postApiKeys
        const postApiKeysParams = {};

        const postApiKeysResult = cloudantService.postApiKeys(postApiKeysParams);

        // all methods should return a Promise
        expectToBePromise(postApiKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/api_keys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postApiKeysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postApiKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postApiKeysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postApiKeysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postApiKeys(postApiKeysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.postApiKeys({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('putCloudantSecurityConfiguration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecurityObject
      const securityObjectModel = {
        names: ['testString'],
        roles: ['testString'],
      };

      function __putCloudantSecurityConfigurationTest() {
        // Construct the params object for operation putCloudantSecurityConfiguration
        const db = 'testString';
        const cloudant = { 'key1': ['_reader'] };
        const admins = securityObjectModel;
        const members = securityObjectModel;
        const couchdbAuthOnly = true;
        const putCloudantSecurityConfigurationParams = {
          db,
          cloudant,
          admins,
          members,
          couchdbAuthOnly,
        };

        const putCloudantSecurityConfigurationResult = cloudantService.putCloudantSecurityConfiguration(putCloudantSecurityConfigurationParams);

        // all methods should return a Promise
        expectToBePromise(putCloudantSecurityConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/db/{db}/_security', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cloudant).toEqual(cloudant);
        expect(mockRequestOptions.body.admins).toEqual(CloudantV1.SecurityObject.serialize(securityObjectModel));
        expect(mockRequestOptions.body.members).toEqual(CloudantV1.SecurityObject.serialize(securityObjectModel));
        expect(mockRequestOptions.body.couchdb_auth_only).toEqual(couchdbAuthOnly);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putCloudantSecurityConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putCloudantSecurityConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putCloudantSecurityConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const cloudant = { 'key1': ['_reader'] };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putCloudantSecurityConfigurationParams = {
          db,
          cloudant,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCloudantSecurityConfiguration(putCloudantSecurityConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putCloudantSecurityConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putCloudantSecurityConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCorsInformation', () => {
    describe('positive tests', () => {
      function __getCorsInformationTest() {
        // Construct the params object for operation getCorsInformation
        const getCorsInformationParams = {};

        const getCorsInformationResult = cloudantService.getCorsInformation(getCorsInformationParams);

        // all methods should return a Promise
        expectToBePromise(getCorsInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/config/cors', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCorsInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getCorsInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getCorsInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCorsInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCorsInformation(getCorsInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getCorsInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('putCorsConfiguration', () => {
    describe('positive tests', () => {
      function __putCorsConfigurationTest() {
        // Construct the params object for operation putCorsConfiguration
        const origins = ['testString'];
        const allowCredentials = true;
        const enableCors = true;
        const putCorsConfigurationParams = {
          origins,
          allowCredentials,
          enableCors,
        };

        const putCorsConfigurationResult = cloudantService.putCorsConfiguration(putCorsConfigurationParams);

        // all methods should return a Promise
        expectToBePromise(putCorsConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/config/cors', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.origins).toEqual(origins);
        expect(mockRequestOptions.body.allow_credentials).toEqual(allowCredentials);
        expect(mockRequestOptions.body.enable_cors).toEqual(enableCors);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putCorsConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putCorsConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putCorsConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origins = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putCorsConfigurationParams = {
          origins,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCorsConfiguration(putCorsConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putCorsConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putCorsConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headAttachment', () => {
    describe('positive tests', () => {
      function __headAttachmentTest() {
        // Construct the params object for operation headAttachment
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const ifMatch = 'testString';
        const ifNoneMatch = 'testString';
        const rev = 'testString';
        const headAttachmentParams = {
          db,
          docId,
          attachmentName,
          ifMatch,
          ifNoneMatch,
          rev,
        };

        const headAttachmentResult = cloudantService.headAttachment(headAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(headAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}/{attachment_name}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.path.attachment_name).toEqual(attachmentName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headAttachmentParams = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headAttachment(headAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAttachment', () => {
    describe('positive tests', () => {
      function __deleteAttachmentTest() {
        // Construct the params object for operation deleteAttachment
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const ifMatch = 'testString';
        const rev = 'testString';
        const batch = 'ok';
        const deleteAttachmentParams = {
          db,
          docId,
          attachmentName,
          ifMatch,
          rev,
          batch,
        };

        const deleteAttachmentResult = cloudantService.deleteAttachment(deleteAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}/{attachment_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.path.attachment_name).toEqual(attachmentName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAttachmentParams = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteAttachment(deleteAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAttachment', () => {
    describe('positive tests', () => {
      function __getAttachmentTest() {
        // Construct the params object for operation getAttachment
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const accept = 'testString';
        const ifMatch = 'testString';
        const ifNoneMatch = 'testString';
        const range = 'testString';
        const rev = 'testString';
        const getAttachmentParams = {
          db,
          docId,
          attachmentName,
          accept,
          ifMatch,
          ifNoneMatch,
          range,
          rev,
        };

        const getAttachmentResult = cloudantService.getAttachment(getAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(getAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}/{attachment_name}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        checkUserHeader(createRequestMock, 'Range', range);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.path.attachment_name).toEqual(attachmentName);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAttachmentParams = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getAttachment(getAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putAttachment', () => {
    describe('positive tests', () => {
      function __putAttachmentTest() {
        // Construct the params object for operation putAttachment
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const attachment = Buffer.from('This is a mock file.');
        const contentType = 'application/octet-stream';
        const ifMatch = 'testString';
        const rev = 'testString';
        const putAttachmentParams = {
          db,
          docId,
          attachmentName,
          attachment,
          contentType,
          ifMatch,
          rev,
        };

        const putAttachmentResult = cloudantService.putAttachment(putAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(putAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/{doc_id}/{attachment_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body).toEqual(attachment);
        expect(mockRequestOptions.qs.rev).toEqual(rev);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
        expect(mockRequestOptions.path.attachment_name).toEqual(attachmentName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const attachment = Buffer.from('This is a mock file.');
        const contentType = 'application/octet-stream';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putAttachmentParams = {
          db,
          docId,
          attachmentName,
          attachment,
          contentType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putAttachment(putAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headLocalDocument', () => {
    describe('positive tests', () => {
      function __headLocalDocumentTest() {
        // Construct the params object for operation headLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const headLocalDocumentParams = {
          db,
          docId,
          ifNoneMatch,
        };

        const headLocalDocumentResult = cloudantService.headLocalDocument(headLocalDocumentParams);

        // all methods should return a Promise
        expectToBePromise(headLocalDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_local/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headLocalDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headLocalDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headLocalDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headLocalDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headLocalDocument(headLocalDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.headLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.headLocalDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteLocalDocument', () => {
    describe('positive tests', () => {
      function __deleteLocalDocumentTest() {
        // Construct the params object for operation deleteLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const batch = 'ok';
        const deleteLocalDocumentParams = {
          db,
          docId,
          batch,
        };

        const deleteLocalDocumentResult = cloudantService.deleteLocalDocument(deleteLocalDocumentParams);

        // all methods should return a Promise
        expectToBePromise(deleteLocalDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_local/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLocalDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __deleteLocalDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __deleteLocalDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLocalDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteLocalDocument(deleteLocalDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.deleteLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.deleteLocalDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getLocalDocument', () => {
    describe('positive tests', () => {
      function __getLocalDocumentTest() {
        // Construct the params object for operation getLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const accept = 'application/json';
        const ifNoneMatch = 'testString';
        const attachments = false;
        const attEncodingInfo = false;
        const localSeq = false;
        const getLocalDocumentParams = {
          db,
          docId,
          accept,
          ifNoneMatch,
          attachments,
          attEncodingInfo,
          localSeq,
        };

        const getLocalDocumentResult = cloudantService.getLocalDocument(getLocalDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getLocalDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_local/{doc_id}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(mockRequestOptions.qs.attachments).toEqual(attachments);
        expect(mockRequestOptions.qs.att_encoding_info).toEqual(attEncodingInfo);
        expect(mockRequestOptions.qs.local_seq).toEqual(localSeq);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLocalDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getLocalDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getLocalDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLocalDocumentParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getLocalDocument(getLocalDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getLocalDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('putLocalDocument', () => {
    describe('positive tests', () => {
      function __putLocalDocumentTest() {
        // Construct the params object for operation putLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const document = {};
        const contentType = 'application/json';
        const batch = 'ok';
        const putLocalDocumentParams = {
          db,
          docId,
          document,
          contentType,
          batch,
        };

        const putLocalDocumentResult = cloudantService.putLocalDocument(putLocalDocumentParams);

        // all methods should return a Promise
        expectToBePromise(putLocalDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_local/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(document);
        expect(mockRequestOptions.qs.batch).toEqual(batch);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putLocalDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __putLocalDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __putLocalDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const document = {};
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putLocalDocumentParams = {
          db,
          docId,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putLocalDocument(putLocalDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.putLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.putLocalDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postRevsDiff', () => {
    describe('positive tests', () => {
      function __postRevsDiffTest() {
        // Construct the params object for operation postRevsDiff
        const db = 'testString';
        const documentRevisions = { 'key1': ['testString'] };
        const postRevsDiffParams = {
          db,
          documentRevisions,
        };

        const postRevsDiffResult = cloudantService.postRevsDiff(postRevsDiffParams);

        // all methods should return a Promise
        expectToBePromise(postRevsDiffResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_revs_diff', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(documentRevisions);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postRevsDiffTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postRevsDiffTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postRevsDiffTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const documentRevisions = { 'key1': ['testString'] };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postRevsDiffParams = {
          db,
          documentRevisions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postRevsDiff(postRevsDiffParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postRevsDiff({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postRevsDiff();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getShardsInformation', () => {
    describe('positive tests', () => {
      function __getShardsInformationTest() {
        // Construct the params object for operation getShardsInformation
        const db = 'testString';
        const getShardsInformationParams = {
          db,
        };

        const getShardsInformationResult = cloudantService.getShardsInformation(getShardsInformationParams);

        // all methods should return a Promise
        expectToBePromise(getShardsInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_shards', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getShardsInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getShardsInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getShardsInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getShardsInformationParams = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getShardsInformation(getShardsInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getShardsInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getShardsInformation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentShardsInfo', () => {
    describe('positive tests', () => {
      function __getDocumentShardsInfoTest() {
        // Construct the params object for operation getDocumentShardsInfo
        const db = 'testString';
        const docId = 'testString';
        const getDocumentShardsInfoParams = {
          db,
          docId,
        };

        const getDocumentShardsInfoResult = cloudantService.getDocumentShardsInfo(getDocumentShardsInfoParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentShardsInfoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_shards/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.doc_id).toEqual(docId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentShardsInfoTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getDocumentShardsInfoTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getDocumentShardsInfoTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentShardsInfoParams = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentShardsInfo(getDocumentShardsInfoParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.getDocumentShardsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.getDocumentShardsInfo();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('headUpInformation', () => {
    describe('positive tests', () => {
      function __headUpInformationTest() {
        // Construct the params object for operation headUpInformation
        const headUpInformationParams = {};

        const headUpInformationResult = cloudantService.headUpInformation(headUpInformationParams);

        // all methods should return a Promise
        expectToBePromise(headUpInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_up', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __headUpInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __headUpInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __headUpInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const headUpInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headUpInformation(headUpInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.headUpInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getActiveTasks', () => {
    describe('positive tests', () => {
      function __getActiveTasksTest() {
        // Construct the params object for operation getActiveTasks
        const getActiveTasksParams = {};

        const getActiveTasksResult = cloudantService.getActiveTasks(getActiveTasksParams);

        // all methods should return a Promise
        expectToBePromise(getActiveTasksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_active_tasks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getActiveTasksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getActiveTasksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getActiveTasksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getActiveTasksParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getActiveTasks(getActiveTasksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getActiveTasks({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getUpInformation', () => {
    describe('positive tests', () => {
      function __getUpInformationTest() {
        // Construct the params object for operation getUpInformation
        const getUpInformationParams = {};

        const getUpInformationResult = cloudantService.getUpInformation(getUpInformationParams);

        // all methods should return a Promise
        expectToBePromise(getUpInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_up', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getUpInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getUpInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getUpInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getUpInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getUpInformation(getUpInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getUpInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getActivityTrackerEvents', () => {
    describe('positive tests', () => {
      function __getActivityTrackerEventsTest() {
        // Construct the params object for operation getActivityTrackerEvents
        const getActivityTrackerEventsParams = {};

        const getActivityTrackerEventsResult = cloudantService.getActivityTrackerEvents(getActivityTrackerEventsParams);

        // all methods should return a Promise
        expectToBePromise(getActivityTrackerEventsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/activity_tracker/events', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getActivityTrackerEventsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getActivityTrackerEventsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getActivityTrackerEventsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getActivityTrackerEventsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getActivityTrackerEvents(getActivityTrackerEventsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getActivityTrackerEvents({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('postActivityTrackerEvents', () => {
    describe('positive tests', () => {
      function __postActivityTrackerEventsTest() {
        // Construct the params object for operation postActivityTrackerEvents
        const types = ['management'];
        const postActivityTrackerEventsParams = {
          types,
        };

        const postActivityTrackerEventsResult = cloudantService.postActivityTrackerEvents(postActivityTrackerEventsParams);

        // all methods should return a Promise
        expectToBePromise(postActivityTrackerEventsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/activity_tracker/events', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.types).toEqual(types);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postActivityTrackerEventsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postActivityTrackerEventsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postActivityTrackerEventsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const types = ['management'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postActivityTrackerEventsParams = {
          types,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postActivityTrackerEvents(postActivityTrackerEventsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cloudantService.postActivityTrackerEvents({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cloudantService.postActivityTrackerEvents();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCurrentThroughputInformation', () => {
    describe('positive tests', () => {
      function __getCurrentThroughputInformationTest() {
        // Construct the params object for operation getCurrentThroughputInformation
        const getCurrentThroughputInformationParams = {};

        const getCurrentThroughputInformationResult = cloudantService.getCurrentThroughputInformation(getCurrentThroughputInformationParams);

        // all methods should return a Promise
        expectToBePromise(getCurrentThroughputInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_api/v2/user/current/throughput', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCurrentThroughputInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getCurrentThroughputInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getCurrentThroughputInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCurrentThroughputInformationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCurrentThroughputInformation(getCurrentThroughputInformationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getCurrentThroughputInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
