/**
 * (C) Copyright IBM Corp. 2021.
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
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

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

// dont actually create a request
const createRequestMock = jest.spyOn(cloudantService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('CloudantV1', () => {
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
        const params = {};

        const getServerInformationResult = cloudantService.getServerInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getServerInformation(params);
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
        const params = {};

        const getMembershipInformationResult = cloudantService.getMembershipInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getMembershipInformation(params);
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
        const params = {
          count: count,
        };

        const getUuidsResult = cloudantService.getUuids(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getUuids(params);
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
        const params = {};

        const getCapacityThroughputInformationResult = cloudantService.getCapacityThroughputInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCapacityThroughputInformation(params);
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
        const params = {
          blocks: blocks,
        };

        const putCapacityThroughputConfigurationResult = cloudantService.putCapacityThroughputConfiguration(params);

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
        const params = {
          blocks,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCapacityThroughputConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putCapacityThroughputConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putCapacityThroughputConfigurationPromise = cloudantService.putCapacityThroughputConfiguration();
        expectToBePromise(putCapacityThroughputConfigurationPromise);

        putCapacityThroughputConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDbUpdates', () => {
    describe('positive tests', () => {
      function __getDbUpdatesTest() {
        // Construct the params object for operation getDbUpdates
        const feed = 'normal';
        const heartbeat = 0;
        const timeout = 0;
        const since = '0';
        const params = {
          feed: feed,
          heartbeat: heartbeat,
          timeout: timeout,
          since: since,
        };

        const getDbUpdatesResult = cloudantService.getDbUpdates(params);

        // all methods should return a Promise
        expectToBePromise(getDbUpdatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/_db_updates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.feed).toEqual(feed);
        expect(mockRequestOptions.qs.heartbeat).toEqual(heartbeat);
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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDbUpdates(params);
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
        const selector = { 'key1': 'testString' };
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
        const timeout = 0;
        const view = 'testString';
        const params = {
          db: db,
          docIds: docIds,
          fields: fields,
          selector: selector,
          lastEventId: lastEventId,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          feed: feed,
          filter: filter,
          heartbeat: heartbeat,
          includeDocs: includeDocs,
          limit: limit,
          seqInterval: seqInterval,
          since: since,
          style: style,
          timeout: timeout,
          view: view,
        };

        const postChangesResult = cloudantService.postChanges(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postChanges(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postChanges({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postChangesPromise = cloudantService.postChanges();
        expectToBePromise(postChangesPromise);

        postChangesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postChangesAsStream', () => {
    describe('positive tests', () => {
      function __postChangesAsStreamTest() {
        // Construct the params object for operation postChangesAsStream
        const db = 'testString';
        const docIds = ['0007741142412418284'];
        const fields = ['testString'];
        const selector = { 'key1': 'testString' };
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
        const timeout = 0;
        const view = 'testString';
        const params = {
          db: db,
          docIds: docIds,
          fields: fields,
          selector: selector,
          lastEventId: lastEventId,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          feed: feed,
          filter: filter,
          heartbeat: heartbeat,
          includeDocs: includeDocs,
          limit: limit,
          seqInterval: seqInterval,
          since: since,
          style: style,
          timeout: timeout,
          view: view,
        };

        const postChangesAsStreamResult = cloudantService.postChangesAsStream(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postChangesAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postChangesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postChangesAsStreamPromise = cloudantService.postChangesAsStream();
        expectToBePromise(postChangesAsStreamPromise);

        postChangesAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headDatabase', () => {
    describe('positive tests', () => {
      function __headDatabaseTest() {
        // Construct the params object for operation headDatabase
        const db = 'testString';
        const params = {
          db: db,
        };

        const headDatabaseResult = cloudantService.headDatabase(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDatabase(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headDatabasePromise = cloudantService.headDatabase();
        expectToBePromise(headDatabasePromise);

        headDatabasePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAllDbs', () => {
    describe('positive tests', () => {
      function __getAllDbsTest() {
        // Construct the params object for operation getAllDbs
        const descending = false;
        const endkey = 'testString';
        const limit = 0;
        const skip = 0;
        const startkey = 'testString';
        const params = {
          descending: descending,
          endkey: endkey,
          limit: limit,
          skip: skip,
          startkey: startkey,
        };

        const getAllDbsResult = cloudantService.getAllDbs(params);

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
        expect(mockRequestOptions.qs.endkey).toEqual(endkey);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.startkey).toEqual(startkey);
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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getAllDbs(params);
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
        const params = {
          keys: keys,
        };

        const postDbsInfoResult = cloudantService.postDbsInfo(params);

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
        const params = {
          keys,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDbsInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postDbsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postDbsInfoPromise = cloudantService.postDbsInfo();
        expectToBePromise(postDbsInfoPromise);

        postDbsInfoPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDatabase', () => {
    describe('positive tests', () => {
      function __deleteDatabaseTest() {
        // Construct the params object for operation deleteDatabase
        const db = 'testString';
        const params = {
          db: db,
        };

        const deleteDatabaseResult = cloudantService.deleteDatabase(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDatabase(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDatabasePromise = cloudantService.deleteDatabase();
        expectToBePromise(deleteDatabasePromise);

        deleteDatabasePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDatabaseInformation', () => {
    describe('positive tests', () => {
      function __getDatabaseInformationTest() {
        // Construct the params object for operation getDatabaseInformation
        const db = 'testString';
        const params = {
          db: db,
        };

        const getDatabaseInformationResult = cloudantService.getDatabaseInformation(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDatabaseInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDatabaseInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDatabaseInformationPromise = cloudantService.getDatabaseInformation();
        expectToBePromise(getDatabaseInformationPromise);

        getDatabaseInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putDatabase', () => {
    describe('positive tests', () => {
      function __putDatabaseTest() {
        // Construct the params object for operation putDatabase
        const db = 'testString';
        const partitioned = false;
        const q = 1;
        const params = {
          db: db,
          partitioned: partitioned,
          q: q,
        };

        const putDatabaseResult = cloudantService.putDatabase(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDatabase(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putDatabasePromise = cloudantService.putDatabase();
        expectToBePromise(putDatabasePromise);

        putDatabasePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          latest: latest,
          rev: rev,
        };

        const headDocumentResult = cloudantService.headDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headDocumentPromise = cloudantService.headDocument();
        expectToBePromise(headDocumentPromise);

        headDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          document: document,
          contentType: contentType,
          batch: batch,
        };

        const postDocumentResult = cloudantService.postDocument(params);

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
        const params = {
          db,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postDocumentPromise = cloudantService.postDocument();
        expectToBePromise(postDocumentPromise);

        postDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const endkey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startkey = 'testString';
        const params = {
          db: db,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          key: key,
          keys: keys,
          startkey: startkey,
        };

        const postAllDocsResult = cloudantService.postAllDocs(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postAllDocsPromise = cloudantService.postAllDocs();
        expectToBePromise(postAllDocsPromise);

        postAllDocsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startkey = '0007741142412418284';
        const params = {
          db: db,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          key: key,
          keys: keys,
          startkey: startkey,
        };

        const postAllDocsAsStreamResult = cloudantService.postAllDocsAsStream(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postAllDocsAsStreamPromise = cloudantService.postAllDocsAsStream();
        expectToBePromise(postAllDocsAsStreamPromise);

        postAllDocsAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postAllDocsQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        att_encoding_info: false,
        attachments: false,
        conflicts: false,
        descending: false,
        include_docs: false,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: false,
        endkey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startkey: 'testString',
      };

      function __postAllDocsQueriesTest() {
        // Construct the params object for operation postAllDocsQueries
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const params = {
          db: db,
          queries: queries,
        };

        const postAllDocsQueriesResult = cloudantService.postAllDocsQueries(params);

        // all methods should return a Promise
        expectToBePromise(postAllDocsQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(queries);
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
        const params = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postAllDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postAllDocsQueriesPromise = cloudantService.postAllDocsQueries();
        expectToBePromise(postAllDocsQueriesPromise);

        postAllDocsQueriesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postAllDocsQueriesAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        att_encoding_info: false,
        attachments: false,
        conflicts: false,
        descending: false,
        include_docs: false,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: false,
        endkey: 'testString',
        key: 'testString',
        keys: ['small-appliances:1000042', 'small-appliances:1000043'],
        startkey: 'testString',
      };

      function __postAllDocsQueriesAsStreamTest() {
        // Construct the params object for operation postAllDocsQueriesAsStream
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const params = {
          db: db,
          queries: queries,
        };

        const postAllDocsQueriesAsStreamResult = cloudantService.postAllDocsQueriesAsStream(params);

        // all methods should return a Promise
        expectToBePromise(postAllDocsQueriesAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(queries);
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
        const params = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postAllDocsQueriesAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postAllDocsQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postAllDocsQueriesAsStreamPromise = cloudantService.postAllDocsQueriesAsStream();
        expectToBePromise(postAllDocsQueriesAsStreamPromise);

        postAllDocsQueriesAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkDocs', () => {
    describe('positive tests', () => {
      function __postBulkDocsTest() {
        // Construct the params object for operation postBulkDocs
        const db = 'testString';
        const bulkDocs = {};
        const params = {
          db: db,
          bulkDocs: bulkDocs,
        };

        const postBulkDocsResult = cloudantService.postBulkDocs(params);

        // all methods should return a Promise
        expectToBePromise(postBulkDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(bulkDocs);
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
        const params = {
          db,
          bulkDocs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkDocs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postBulkDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postBulkDocsPromise = cloudantService.postBulkDocs();
        expectToBePromise(postBulkDocsPromise);

        postBulkDocsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkGet', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
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
        const params = {
          db: db,
          docs: docs,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          latest: latest,
          revs: revs,
        };

        const postBulkGetResult = cloudantService.postBulkGet(params);

        // all methods should return a Promise
        expectToBePromise(postBulkGetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(docs);
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
        const params = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postBulkGet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postBulkGetPromise = cloudantService.postBulkGet();
        expectToBePromise(postBulkGetPromise);

        postBulkGetPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkGetAsMixed', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'order00067',
        rev: '3-917fa2381192822767f010b95b45325b',
      };

      function __postBulkGetAsMixedTest() {
        // Construct the params object for operation postBulkGetAsMixed
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const params = {
          db: db,
          docs: docs,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          latest: latest,
          revs: revs,
        };

        const postBulkGetAsMixedResult = cloudantService.postBulkGetAsMixed(params);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsMixedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/mixed';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(docs);
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
        const params = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsMixed(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postBulkGetAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postBulkGetAsMixedPromise = cloudantService.postBulkGetAsMixed();
        expectToBePromise(postBulkGetAsMixedPromise);

        postBulkGetAsMixedPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkGetAsRelated', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'order00067',
        rev: '3-917fa2381192822767f010b95b45325b',
      };

      function __postBulkGetAsRelatedTest() {
        // Construct the params object for operation postBulkGetAsRelated
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const params = {
          db: db,
          docs: docs,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          latest: latest,
          revs: revs,
        };

        const postBulkGetAsRelatedResult = cloudantService.postBulkGetAsRelated(params);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsRelatedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/related';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(docs);
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
        const params = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsRelated(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postBulkGetAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postBulkGetAsRelatedPromise = cloudantService.postBulkGetAsRelated();
        expectToBePromise(postBulkGetAsRelatedPromise);

        postBulkGetAsRelatedPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkGetAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkGetQueryDocument
      const bulkGetQueryDocumentModel = {
        atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
        id: 'order00067',
        rev: '3-917fa2381192822767f010b95b45325b',
      };

      function __postBulkGetAsStreamTest() {
        // Construct the params object for operation postBulkGetAsStream
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = false;
        const attEncodingInfo = false;
        const latest = false;
        const revs = false;
        const params = {
          db: db,
          docs: docs,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          latest: latest,
          revs: revs,
        };

        const postBulkGetAsStreamResult = cloudantService.postBulkGetAsStream(params);

        // all methods should return a Promise
        expectToBePromise(postBulkGetAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.docs).toEqual(docs);
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
        const params = {
          db,
          docs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postBulkGetAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postBulkGetAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postBulkGetAsStreamPromise = cloudantService.postBulkGetAsStream();
        expectToBePromise(postBulkGetAsStreamPromise);

        postBulkGetAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifMatch: ifMatch,
          batch: batch,
          rev: rev,
        };

        const deleteDocumentResult = cloudantService.deleteDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDocumentPromise = cloudantService.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentResult = cloudantService.getDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentPromise = cloudantService.getDocument();
        expectToBePromise(getDocumentPromise);

        getDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsMixedResult = cloudantService.getDocumentAsMixed(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsMixed(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDocumentAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentAsMixedPromise = cloudantService.getDocumentAsMixed();
        expectToBePromise(getDocumentAsMixedPromise);

        getDocumentAsMixedPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsRelatedResult = cloudantService.getDocumentAsRelated(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsRelated(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDocumentAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentAsRelatedPromise = cloudantService.getDocumentAsRelated();
        expectToBePromise(getDocumentAsRelatedPromise);

        getDocumentAsRelatedPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsStreamResult = cloudantService.getDocumentAsStream(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDocumentAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentAsStreamPromise = cloudantService.getDocumentAsStream();
        expectToBePromise(getDocumentAsStreamPromise);

        getDocumentAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          document: document,
          contentType: contentType,
          ifMatch: ifMatch,
          batch: batch,
          newEdits: newEdits,
          rev: rev,
        };

        const putDocumentResult = cloudantService.putDocument(params);

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
        const params = {
          db,
          docId,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putDocumentPromise = cloudantService.putDocument();
        expectToBePromise(putDocumentPromise);

        putDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          ddoc: ddoc,
          ifNoneMatch: ifNoneMatch,
        };

        const headDesignDocumentResult = cloudantService.headDesignDocument(params);

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
        const params = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headDesignDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headDesignDocumentPromise = cloudantService.headDesignDocument();
        expectToBePromise(headDesignDocumentPromise);

        headDesignDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          ddoc: ddoc,
          ifMatch: ifMatch,
          batch: batch,
          rev: rev,
        };

        const deleteDesignDocumentResult = cloudantService.deleteDesignDocument(params);

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
        const params = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteDesignDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDesignDocumentPromise = cloudantService.deleteDesignDocument();
        expectToBePromise(deleteDesignDocumentPromise);

        deleteDesignDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          ddoc: ddoc,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDesignDocumentResult = cloudantService.getDesignDocument(params);

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
        const params = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDesignDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDesignDocumentPromise = cloudantService.getDesignDocument();
        expectToBePromise(getDesignDocumentPromise);

        getDesignDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putDesignDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Attachment
      const attachmentModel = {
        content_type: 'testString',
        data: 'This is a mock byte array value.',
        digest: 'testString',
        encoded_length: 0,
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

      // GeoIndexDefinition
      const geoIndexDefinitionModel = {
        index: 'testString',
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
        validate_doc_update: 'testString',
        views: { 'key1': designDocumentViewsMapReduceModel },
        st_indexes: { 'key1': geoIndexDefinitionModel },
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
        const params = {
          db: db,
          ddoc: ddoc,
          designDocument: designDocument,
          ifMatch: ifMatch,
          batch: batch,
          newEdits: newEdits,
          rev: rev,
        };

        const putDesignDocumentResult = cloudantService.putDesignDocument(params);

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
        expect(mockRequestOptions.body).toEqual(designDocument);
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
        const params = {
          db,
          ddoc,
          designDocument,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putDesignDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putDesignDocumentPromise = cloudantService.putDesignDocument();
        expectToBePromise(putDesignDocumentPromise);

        putDesignDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDesignDocumentInformation', () => {
    describe('positive tests', () => {
      function __getDesignDocumentInformationTest() {
        // Construct the params object for operation getDesignDocumentInformation
        const db = 'testString';
        const ddoc = 'testString';
        const params = {
          db: db,
          ddoc: ddoc,
        };

        const getDesignDocumentInformationResult = cloudantService.getDesignDocumentInformation(params);

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
        const params = {
          db,
          ddoc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDesignDocumentInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDesignDocumentInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDesignDocumentInformationPromise = cloudantService.getDesignDocumentInformation();
        expectToBePromise(getDesignDocumentInformationPromise);

        getDesignDocumentInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startkey = '0007741142412418284';
        const accept = 'application/json';
        const params = {
          db: db,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          key: key,
          keys: keys,
          startkey: startkey,
          accept: accept,
        };

        const postDesignDocsResult = cloudantService.postDesignDocs(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDesignDocs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postDesignDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postDesignDocsPromise = cloudantService.postDesignDocs();
        expectToBePromise(postDesignDocsPromise);

        postDesignDocsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postDesignDocsQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        att_encoding_info: false,
        attachments: false,
        conflicts: false,
        descending: false,
        include_docs: false,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: false,
        endkey: 'testString',
        key: 'testString',
        keys: ['small-appliances:1000042', 'small-appliances:1000043'],
        startkey: 'testString',
      };

      function __postDesignDocsQueriesTest() {
        // Construct the params object for operation postDesignDocsQueries
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const accept = 'application/json';
        const params = {
          db: db,
          queries: queries,
          accept: accept,
        };

        const postDesignDocsQueriesResult = cloudantService.postDesignDocsQueries(params);

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
        expect(mockRequestOptions.body.queries).toEqual(queries);
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
        const params = {
          db,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postDesignDocsQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postDesignDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postDesignDocsQueriesPromise = cloudantService.postDesignDocsQueries();
        expectToBePromise(postDesignDocsQueriesPromise);

        postDesignDocsQueriesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = false;
        const startkey = 'testString';
        const startkeyDocid = 'testString';
        const update = 'true';
        const params = {
          db: db,
          ddoc: ddoc,
          view: view,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          endkeyDocid: endkeyDocid,
          group: group,
          groupLevel: groupLevel,
          key: key,
          keys: keys,
          reduce: reduce,
          stable: stable,
          startkey: startkey,
          startkeyDocid: startkeyDocid,
          update: update,
        };

        const postViewResult = cloudantService.postView(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.endkey_docid).toEqual(endkeyDocid);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
        expect(mockRequestOptions.body.startkey_docid).toEqual(startkeyDocid);
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
        const params = {
          db,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postView(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postViewPromise = cloudantService.postView();
        expectToBePromise(postViewPromise);

        postViewPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['examplekey'];
        const reduce = true;
        const stable = false;
        const startkey = 'testString';
        const startkeyDocid = 'testString';
        const update = 'true';
        const params = {
          db: db,
          ddoc: ddoc,
          view: view,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          endkeyDocid: endkeyDocid,
          group: group,
          groupLevel: groupLevel,
          key: key,
          keys: keys,
          reduce: reduce,
          stable: stable,
          startkey: startkey,
          startkeyDocid: startkeyDocid,
          update: update,
        };

        const postViewAsStreamResult = cloudantService.postViewAsStream(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.endkey_docid).toEqual(endkeyDocid);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
        expect(mockRequestOptions.body.startkey_docid).toEqual(startkeyDocid);
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
        const params = {
          db,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postViewAsStreamPromise = cloudantService.postViewAsStream();
        expectToBePromise(postViewAsStreamPromise);

        postViewAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postViewQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ViewQuery
      const viewQueryModel = {
        att_encoding_info: false,
        attachments: false,
        conflicts: false,
        descending: false,
        include_docs: false,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: false,
        endkey: 'testString',
        endkey_docid: 'testString',
        group: false,
        group_level: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: false,
        startkey: 'testString',
        startkey_docid: 'testString',
        update: 'true',
      };

      function __postViewQueriesTest() {
        // Construct the params object for operation postViewQueries
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const params = {
          db: db,
          ddoc: ddoc,
          view: view,
          queries: queries,
        };

        const postViewQueriesResult = cloudantService.postViewQueries(params);

        // all methods should return a Promise
        expectToBePromise(postViewQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(queries);
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
        const params = {
          db,
          ddoc,
          view,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postViewQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postViewQueriesPromise = cloudantService.postViewQueries();
        expectToBePromise(postViewQueriesPromise);

        postViewQueriesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postViewQueriesAsStream', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ViewQuery
      const viewQueryModel = {
        att_encoding_info: false,
        attachments: false,
        conflicts: false,
        descending: false,
        include_docs: true,
        inclusive_end: true,
        limit: 5,
        skip: 0,
        update_seq: false,
        endkey: 'testString',
        endkey_docid: 'testString',
        group: false,
        group_level: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: false,
        startkey: 'testString',
        startkey_docid: 'testString',
        update: 'true',
      };

      function __postViewQueriesAsStreamTest() {
        // Construct the params object for operation postViewQueriesAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const queries = [viewQueryModel];
        const params = {
          db: db,
          ddoc: ddoc,
          view: view,
          queries: queries,
        };

        const postViewQueriesAsStreamResult = cloudantService.postViewQueriesAsStream(params);

        // all methods should return a Promise
        expectToBePromise(postViewQueriesAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.queries).toEqual(queries);
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
        const params = {
          db,
          ddoc,
          view,
          queries,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postViewQueriesAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postViewQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postViewQueriesAsStreamPromise = cloudantService.postViewQueriesAsStream();
        expectToBePromise(postViewQueriesAsStreamPromise);

        postViewQueriesAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPartitionInformation', () => {
    describe('positive tests', () => {
      function __getPartitionInformationTest() {
        // Construct the params object for operation getPartitionInformation
        const db = 'testString';
        const partitionKey = 'testString';
        const params = {
          db: db,
          partitionKey: partitionKey,
        };

        const getPartitionInformationResult = cloudantService.getPartitionInformation(params);

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
        const params = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getPartitionInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getPartitionInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getPartitionInformationPromise = cloudantService.getPartitionInformation();
        expectToBePromise(getPartitionInformationPromise);

        getPartitionInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startkey = '0007741142412418284';
        const params = {
          db: db,
          partitionKey: partitionKey,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          key: key,
          keys: keys,
          startkey: startkey,
        };

        const postPartitionAllDocsResult = cloudantService.postPartitionAllDocs(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
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
        const params = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionAllDocs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionAllDocsPromise = cloudantService.postPartitionAllDocs();
        expectToBePromise(postPartitionAllDocsPromise);

        postPartitionAllDocsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const key = 'testString';
        const keys = ['testString'];
        const startkey = '0007741142412418284';
        const params = {
          db: db,
          partitionKey: partitionKey,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          key: key,
          keys: keys,
          startkey: startkey,
        };

        const postPartitionAllDocsAsStreamResult = cloudantService.postPartitionAllDocsAsStream(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
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
        const params = {
          db,
          partitionKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionAllDocsAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionAllDocsAsStreamPromise = cloudantService.postPartitionAllDocsAsStream();
        expectToBePromise(postPartitionAllDocsAsStreamPromise);

        postPartitionAllDocsAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const highlightSize = 1;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 0;
        const sort = ['testString'];
        const stale = 'ok';
        const params = {
          db: db,
          partitionKey: partitionKey,
          ddoc: ddoc,
          index: index,
          query: query,
          bookmark: bookmark,
          highlightFields: highlightFields,
          highlightNumber: highlightNumber,
          highlightPostTag: highlightPostTag,
          highlightPreTag: highlightPreTag,
          highlightSize: highlightSize,
          includeDocs: includeDocs,
          includeFields: includeFields,
          limit: limit,
          sort: sort,
          stale: stale,
        };

        const postPartitionSearchResult = cloudantService.postPartitionSearch(params);

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
        const params = {
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

        cloudantService.postPartitionSearch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionSearchPromise = cloudantService.postPartitionSearch();
        expectToBePromise(postPartitionSearchPromise);

        postPartitionSearchPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const highlightSize = 1;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 3;
        const sort = ['testString'];
        const stale = 'ok';
        const params = {
          db: db,
          partitionKey: partitionKey,
          ddoc: ddoc,
          index: index,
          query: query,
          bookmark: bookmark,
          highlightFields: highlightFields,
          highlightNumber: highlightNumber,
          highlightPostTag: highlightPostTag,
          highlightPreTag: highlightPreTag,
          highlightSize: highlightSize,
          includeDocs: includeDocs,
          includeFields: includeFields,
          limit: limit,
          sort: sort,
          stale: stale,
        };

        const postPartitionSearchAsStreamResult = cloudantService.postPartitionSearchAsStream(params);

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
        const params = {
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

        cloudantService.postPartitionSearchAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionSearchAsStreamPromise = cloudantService.postPartitionSearchAsStream();
        expectToBePromise(postPartitionSearchAsStreamPromise);

        postPartitionSearchAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['examplekey'];
        const reduce = true;
        const stable = false;
        const startkey = 'testString';
        const startkeyDocid = 'testString';
        const update = 'true';
        const params = {
          db: db,
          partitionKey: partitionKey,
          ddoc: ddoc,
          view: view,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          endkeyDocid: endkeyDocid,
          group: group,
          groupLevel: groupLevel,
          key: key,
          keys: keys,
          reduce: reduce,
          stable: stable,
          startkey: startkey,
          startkeyDocid: startkeyDocid,
          update: update,
        };

        const postPartitionViewResult = cloudantService.postPartitionView(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.endkey_docid).toEqual(endkeyDocid);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
        expect(mockRequestOptions.body.startkey_docid).toEqual(startkeyDocid);
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
        const params = {
          db,
          partitionKey,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionView(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionViewPromise = cloudantService.postPartitionView();
        expectToBePromise(postPartitionViewPromise);

        postPartitionViewPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = false;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = false;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['examplekey'];
        const reduce = true;
        const stable = false;
        const startkey = 'testString';
        const startkeyDocid = 'testString';
        const update = 'true';
        const params = {
          db: db,
          partitionKey: partitionKey,
          ddoc: ddoc,
          view: view,
          attEncodingInfo: attEncodingInfo,
          attachments: attachments,
          conflicts: conflicts,
          descending: descending,
          includeDocs: includeDocs,
          inclusiveEnd: inclusiveEnd,
          limit: limit,
          skip: skip,
          updateSeq: updateSeq,
          endkey: endkey,
          endkeyDocid: endkeyDocid,
          group: group,
          groupLevel: groupLevel,
          key: key,
          keys: keys,
          reduce: reduce,
          stable: stable,
          startkey: startkey,
          startkeyDocid: startkeyDocid,
          update: update,
        };

        const postPartitionViewAsStreamResult = cloudantService.postPartitionViewAsStream(params);

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
        expect(mockRequestOptions.body.endkey).toEqual(endkey);
        expect(mockRequestOptions.body.endkey_docid).toEqual(endkeyDocid);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.group_level).toEqual(groupLevel);
        expect(mockRequestOptions.body.key).toEqual(key);
        expect(mockRequestOptions.body.keys).toEqual(keys);
        expect(mockRequestOptions.body.reduce).toEqual(reduce);
        expect(mockRequestOptions.body.stable).toEqual(stable);
        expect(mockRequestOptions.body.startkey).toEqual(startkey);
        expect(mockRequestOptions.body.startkey_docid).toEqual(startkeyDocid);
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
        const params = {
          db,
          partitionKey,
          ddoc,
          view,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionViewAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionViewAsStreamPromise = cloudantService.postPartitionViewAsStream();
        expectToBePromise(postPartitionViewAsStreamPromise);

        postPartitionViewAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionFind', () => {
    describe('positive tests', () => {
      function __postPartitionFindTest() {
        // Construct the params object for operation postPartitionFind
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { 'key1': 'testString' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 0;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const params = {
          db: db,
          partitionKey: partitionKey,
          selector: selector,
          bookmark: bookmark,
          conflicts: conflicts,
          executionStats: executionStats,
          fields: fields,
          limit: limit,
          skip: skip,
          sort: sort,
          stable: stable,
          update: update,
          useIndex: useIndex,
        };

        const postPartitionFindResult = cloudantService.postPartitionFind(params);

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
        const selector = { 'key1': 'testString' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          partitionKey,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionFind(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionFindPromise = cloudantService.postPartitionFind();
        expectToBePromise(postPartitionFindPromise);

        postPartitionFindPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionFindAsStream', () => {
    describe('positive tests', () => {
      function __postPartitionFindAsStreamTest() {
        // Construct the params object for operation postPartitionFindAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const selector = { 'key1': 'testString' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['productid', 'name', 'description'];
        const limit = 0;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const params = {
          db: db,
          partitionKey: partitionKey,
          selector: selector,
          bookmark: bookmark,
          conflicts: conflicts,
          executionStats: executionStats,
          fields: fields,
          limit: limit,
          skip: skip,
          sort: sort,
          stable: stable,
          update: update,
          useIndex: useIndex,
        };

        const postPartitionFindAsStreamResult = cloudantService.postPartitionFindAsStream(params);

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
        const selector = { 'key1': 'testString' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          partitionKey,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postPartitionFindAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postPartitionFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postPartitionFindAsStreamPromise = cloudantService.postPartitionFindAsStream();
        expectToBePromise(postPartitionFindAsStreamPromise);

        postPartitionFindAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postExplain', () => {
    describe('positive tests', () => {
      function __postExplainTest() {
        // Construct the params object for operation postExplain
        const db = 'testString';
        const selector = { 'key1': 'testString' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 0;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const params = {
          db: db,
          selector: selector,
          bookmark: bookmark,
          conflicts: conflicts,
          executionStats: executionStats,
          fields: fields,
          limit: limit,
          skip: skip,
          sort: sort,
          stable: stable,
          update: update,
          useIndex: useIndex,
          r: r,
        };

        const postExplainResult = cloudantService.postExplain(params);

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
        const selector = { 'key1': 'testString' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postExplain(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postExplain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postExplainPromise = cloudantService.postExplain();
        expectToBePromise(postExplainPromise);

        postExplainPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postFind', () => {
    describe('positive tests', () => {
      function __postFindTest() {
        // Construct the params object for operation postFind
        const db = 'testString';
        const selector = { 'key1': 'testString' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['_id', 'type', 'name', 'email'];
        const limit = 3;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const params = {
          db: db,
          selector: selector,
          bookmark: bookmark,
          conflicts: conflicts,
          executionStats: executionStats,
          fields: fields,
          limit: limit,
          skip: skip,
          sort: sort,
          stable: stable,
          update: update,
          useIndex: useIndex,
          r: r,
        };

        const postFindResult = cloudantService.postFind(params);

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
        const selector = { 'key1': 'testString' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postFind(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postFindPromise = cloudantService.postFind();
        expectToBePromise(postFindPromise);

        postFindPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postFindAsStream', () => {
    describe('positive tests', () => {
      function __postFindAsStreamTest() {
        // Construct the params object for operation postFindAsStream
        const db = 'testString';
        const selector = { 'key1': 'testString' };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['_id', 'type', 'name', 'email'];
        const limit = 3;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'true';
        const useIndex = ['testString'];
        const r = 1;
        const params = {
          db: db,
          selector: selector,
          bookmark: bookmark,
          conflicts: conflicts,
          executionStats: executionStats,
          fields: fields,
          limit: limit,
          skip: skip,
          sort: sort,
          stable: stable,
          update: update,
          useIndex: useIndex,
          r: r,
        };

        const postFindAsStreamResult = cloudantService.postFindAsStream(params);

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
        const selector = { 'key1': 'testString' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postFindAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postFindAsStreamPromise = cloudantService.postFindAsStream();
        expectToBePromise(postFindAsStreamPromise);

        postFindAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getIndexesInformation', () => {
    describe('positive tests', () => {
      function __getIndexesInformationTest() {
        // Construct the params object for operation getIndexesInformation
        const db = 'testString';
        const params = {
          db: db,
        };

        const getIndexesInformationResult = cloudantService.getIndexesInformation(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getIndexesInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getIndexesInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getIndexesInformationPromise = cloudantService.getIndexesInformation();
        expectToBePromise(getIndexesInformationPromise);

        getIndexesInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        default_analyzer: analyzerModel,
        default_field: indexTextOperatorDefaultFieldModel,
        fields: [indexFieldModel],
        index_array_lengths: true,
        partial_filter_selector: { 'key1': 'testString' },
      };

      function __postIndexTest() {
        // Construct the params object for operation postIndex
        const db = 'testString';
        const index = indexDefinitionModel;
        const ddoc = 'testString';
        const def = indexDefinitionModel;
        const name = 'testString';
        const partitioned = true;
        const type = 'json';
        const params = {
          db: db,
          index: index,
          ddoc: ddoc,
          def: def,
          name: name,
          partitioned: partitioned,
          type: type,
        };

        const postIndexResult = cloudantService.postIndex(params);

        // all methods should return a Promise
        expectToBePromise(postIndexResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_index', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.index).toEqual(index);
        expect(mockRequestOptions.body.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.body.def).toEqual(def);
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
        const params = {
          db,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postIndex(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postIndexPromise = cloudantService.postIndex();
        expectToBePromise(postIndexPromise);

        postIndexPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          ddoc: ddoc,
          type: type,
          index: index,
        };

        const deleteIndexResult = cloudantService.deleteIndex(params);

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
        const params = {
          db,
          ddoc,
          type,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteIndex(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteIndexPromise = cloudantService.deleteIndex();
        expectToBePromise(deleteIndexPromise);

        deleteIndexPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postSearchAnalyze', () => {
    describe('positive tests', () => {
      function __postSearchAnalyzeTest() {
        // Construct the params object for operation postSearchAnalyze
        const analyzer = 'arabic';
        const text = 'testString';
        const params = {
          analyzer: analyzer,
          text: text,
        };

        const postSearchAnalyzeResult = cloudantService.postSearchAnalyze(params);

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
        const params = {
          analyzer,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearchAnalyze(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postSearchAnalyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postSearchAnalyzePromise = cloudantService.postSearchAnalyze();
        expectToBePromise(postSearchAnalyzePromise);

        postSearchAnalyzePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const highlightSize = 1;
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
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
          query: query,
          bookmark: bookmark,
          highlightFields: highlightFields,
          highlightNumber: highlightNumber,
          highlightPostTag: highlightPostTag,
          highlightPreTag: highlightPreTag,
          highlightSize: highlightSize,
          includeDocs: includeDocs,
          includeFields: includeFields,
          limit: limit,
          sort: sort,
          stale: stale,
          counts: counts,
          drilldown: drilldown,
          groupField: groupField,
          groupLimit: groupLimit,
          groupSort: groupSort,
          ranges: ranges,
        };

        const postSearchResult = cloudantService.postSearch(params);

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
        const params = {
          db,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postSearchPromise = cloudantService.postSearch();
        expectToBePromise(postSearchPromise);

        postSearchPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const highlightSize = 1;
        const includeDocs = false;
        const includeFields = ['testString'];
        const limit = 3;
        const sort = ['testString'];
        const stale = 'ok';
        const counts = ['testString'];
        const drilldown = [['testString']];
        const groupField = 'testString';
        const groupLimit = 1;
        const groupSort = ['testString'];
        const ranges = { 'key1': { 'key1': { 'key1': 'testString' } } };
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
          query: query,
          bookmark: bookmark,
          highlightFields: highlightFields,
          highlightNumber: highlightNumber,
          highlightPostTag: highlightPostTag,
          highlightPreTag: highlightPreTag,
          highlightSize: highlightSize,
          includeDocs: includeDocs,
          includeFields: includeFields,
          limit: limit,
          sort: sort,
          stale: stale,
          counts: counts,
          drilldown: drilldown,
          groupField: groupField,
          groupLimit: groupLimit,
          groupSort: groupSort,
          ranges: ranges,
        };

        const postSearchAsStreamResult = cloudantService.postSearchAsStream(params);

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
        const params = {
          db,
          ddoc,
          index,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postSearchAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postSearchAsStreamPromise = cloudantService.postSearchAsStream();
        expectToBePromise(postSearchAsStreamPromise);

        postSearchAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
        };

        const getSearchInfoResult = cloudantService.getSearchInfo(params);

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
        const params = {
          db,
          ddoc,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSearchInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getSearchInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSearchInfoPromise = cloudantService.getSearchInfo();
        expectToBePromise(getSearchInfoPromise);

        getSearchInfoPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeo', () => {
    describe('positive tests', () => {
      function __getGeoTest() {
        // Construct the params object for operation getGeo
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const bbox = 'testString';
        const bookmark = 'testString';
        const format = 'view';
        const g = 'testString';
        const includeDocs = false;
        const lat = -90;
        const limit = 0;
        const lon = -180;
        const nearest = false;
        const radius = 0;
        const rangex = 0;
        const rangey = 0;
        const relation = 'intersects';
        const skip = 0;
        const stale = 'ok';
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
          bbox: bbox,
          bookmark: bookmark,
          format: format,
          g: g,
          includeDocs: includeDocs,
          lat: lat,
          limit: limit,
          lon: lon,
          nearest: nearest,
          radius: radius,
          rangex: rangex,
          rangey: rangey,
          relation: relation,
          skip: skip,
          stale: stale,
        };

        const getGeoResult = cloudantService.getGeo(params);

        // all methods should return a Promise
        expectToBePromise(getGeoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_geo/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.bbox).toEqual(bbox);
        expect(mockRequestOptions.qs.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.g).toEqual(g);
        expect(mockRequestOptions.qs.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.qs.lat).toEqual(lat);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lon).toEqual(lon);
        expect(mockRequestOptions.qs.nearest).toEqual(nearest);
        expect(mockRequestOptions.qs.radius).toEqual(radius);
        expect(mockRequestOptions.qs.rangex).toEqual(rangex);
        expect(mockRequestOptions.qs.rangey).toEqual(rangey);
        expect(mockRequestOptions.qs.relation).toEqual(relation);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.stale).toEqual(stale);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGeoTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getGeoTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getGeoTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          ddoc,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getGeo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getGeo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGeoPromise = cloudantService.getGeo();
        expectToBePromise(getGeoPromise);

        getGeoPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeoAsStream', () => {
    describe('positive tests', () => {
      function __getGeoAsStreamTest() {
        // Construct the params object for operation getGeoAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const bbox = 'testString';
        const bookmark = 'testString';
        const format = 'view';
        const g = 'testString';
        const includeDocs = false;
        const lat = -90;
        const limit = 0;
        const lon = -180;
        const nearest = false;
        const radius = 0;
        const rangex = 0;
        const rangey = 0;
        const relation = 'intersects';
        const skip = 0;
        const stale = 'ok';
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
          bbox: bbox,
          bookmark: bookmark,
          format: format,
          g: g,
          includeDocs: includeDocs,
          lat: lat,
          limit: limit,
          lon: lon,
          nearest: nearest,
          radius: radius,
          rangex: rangex,
          rangey: rangey,
          relation: relation,
          skip: skip,
          stale: stale,
        };

        const getGeoAsStreamResult = cloudantService.getGeoAsStream(params);

        // all methods should return a Promise
        expectToBePromise(getGeoAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_geo/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.bbox).toEqual(bbox);
        expect(mockRequestOptions.qs.bookmark).toEqual(bookmark);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.g).toEqual(g);
        expect(mockRequestOptions.qs.include_docs).toEqual(includeDocs);
        expect(mockRequestOptions.qs.lat).toEqual(lat);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lon).toEqual(lon);
        expect(mockRequestOptions.qs.nearest).toEqual(nearest);
        expect(mockRequestOptions.qs.radius).toEqual(radius);
        expect(mockRequestOptions.qs.rangex).toEqual(rangex);
        expect(mockRequestOptions.qs.rangey).toEqual(rangey);
        expect(mockRequestOptions.qs.relation).toEqual(relation);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.stale).toEqual(stale);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGeoAsStreamTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getGeoAsStreamTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getGeoAsStreamTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          ddoc,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getGeoAsStream(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getGeoAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGeoAsStreamPromise = cloudantService.getGeoAsStream();
        expectToBePromise(getGeoAsStreamPromise);

        getGeoAsStreamPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postGeoCleanup', () => {
    describe('positive tests', () => {
      function __postGeoCleanupTest() {
        // Construct the params object for operation postGeoCleanup
        const db = 'testString';
        const params = {
          db: db,
        };

        const postGeoCleanupResult = cloudantService.postGeoCleanup(params);

        // all methods should return a Promise
        expectToBePromise(postGeoCleanupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_geo_cleanup', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postGeoCleanupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __postGeoCleanupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __postGeoCleanupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postGeoCleanup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postGeoCleanup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postGeoCleanupPromise = cloudantService.postGeoCleanup();
        expectToBePromise(postGeoCleanupPromise);

        postGeoCleanupPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeoIndexInformation', () => {
    describe('positive tests', () => {
      function __getGeoIndexInformationTest() {
        // Construct the params object for operation getGeoIndexInformation
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const params = {
          db: db,
          ddoc: ddoc,
          index: index,
        };

        const getGeoIndexInformationResult = cloudantService.getGeoIndexInformation(params);

        // all methods should return a Promise
        expectToBePromise(getGeoIndexInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_design/{ddoc}/_geo_info/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.db).toEqual(db);
        expect(mockRequestOptions.path.ddoc).toEqual(ddoc);
        expect(mockRequestOptions.path.index).toEqual(index);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGeoIndexInformationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cloudantService.enableRetries();
        __getGeoIndexInformationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cloudantService.disableRetries();
        __getGeoIndexInformationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          db,
          ddoc,
          index,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getGeoIndexInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getGeoIndexInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGeoIndexInformationPromise = cloudantService.getGeoIndexInformation();
        expectToBePromise(getGeoIndexInformationPromise);

        getGeoIndexInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headReplicationDocument', () => {
    describe('positive tests', () => {
      function __headReplicationDocumentTest() {
        // Construct the params object for operation headReplicationDocument
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const params = {
          docId: docId,
          ifNoneMatch: ifNoneMatch,
        };

        const headReplicationDocumentResult = cloudantService.headReplicationDocument(params);

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
        const params = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headReplicationDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headReplicationDocumentPromise = cloudantService.headReplicationDocument();
        expectToBePromise(headReplicationDocumentPromise);

        headReplicationDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headSchedulerDocument', () => {
    describe('positive tests', () => {
      function __headSchedulerDocumentTest() {
        // Construct the params object for operation headSchedulerDocument
        const docId = 'testString';
        const params = {
          docId: docId,
        };

        const headSchedulerDocumentResult = cloudantService.headSchedulerDocument(params);

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
        const params = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headSchedulerDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headSchedulerDocumentPromise = cloudantService.headSchedulerDocument();
        expectToBePromise(headSchedulerDocumentPromise);

        headSchedulerDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headSchedulerJob', () => {
    describe('positive tests', () => {
      function __headSchedulerJobTest() {
        // Construct the params object for operation headSchedulerJob
        const jobId = 'testString';
        const params = {
          jobId: jobId,
        };

        const headSchedulerJobResult = cloudantService.headSchedulerJob(params);

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
        const params = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headSchedulerJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headSchedulerJobPromise = cloudantService.headSchedulerJob();
        expectToBePromise(headSchedulerJobPromise);

        headSchedulerJobPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          docId: docId,
          ifMatch: ifMatch,
          batch: batch,
          rev: rev,
        };

        const deleteReplicationDocumentResult = cloudantService.deleteReplicationDocument(params);

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
        const params = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteReplicationDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteReplicationDocumentPromise = cloudantService.deleteReplicationDocument();
        expectToBePromise(deleteReplicationDocumentPromise);

        deleteReplicationDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getReplicationDocumentResult = cloudantService.getReplicationDocument(params);

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
        const params = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getReplicationDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getReplicationDocumentPromise = cloudantService.getReplicationDocument();
        expectToBePromise(getReplicationDocumentPromise);

        getReplicationDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putReplicationDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Attachment
      const attachmentModel = {
        content_type: 'testString',
        data: 'This is a mock byte array value.',
        digest: 'testString',
        encoded_length: 0,
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
        n: 1,
        partitioned: false,
        q: 1,
      };

      // ReplicationDatabaseAuthBasic
      const replicationDatabaseAuthBasicModel = {
        password: 'testString',
        username: 'testString',
      };

      // ReplicationDatabaseAuthIam
      const replicationDatabaseAuthIamModel = {
        api_key: 'testString',
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
        checkpoint_interval: 0,
        connection_timeout: 0,
        continuous: false,
        create_target: false,
        create_target_params: replicationCreateTargetParametersModel,
        doc_ids: ['testString'],
        filter: 'testString',
        http_connections: 1,
        query_params: { 'key1': 'testString' },
        retries_per_request: 0,
        selector: { 'key1': 'testString' },
        since_seq: 'testString',
        socket_options: 'testString',
        source: replicationDatabaseModel,
        source_proxy: 'testString',
        target: replicationDatabaseModel,
        target_proxy: 'testString',
        use_checkpoints: true,
        user_ctx: userContextModel,
        worker_batch_size: 1,
        worker_processes: 1,
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
        const params = {
          docId: docId,
          replicationDocument: replicationDocument,
          ifMatch: ifMatch,
          batch: batch,
          newEdits: newEdits,
          rev: rev,
        };

        const putReplicationDocumentResult = cloudantService.putReplicationDocument(params);

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
        expect(mockRequestOptions.body).toEqual(replicationDocument);
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
        const params = {
          docId,
          replicationDocument,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putReplicationDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putReplicationDocumentPromise = cloudantService.putReplicationDocument();
        expectToBePromise(putReplicationDocumentPromise);

        putReplicationDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          limit: limit,
          skip: skip,
          states: states,
        };

        const getSchedulerDocsResult = cloudantService.getSchedulerDocs(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerDocs(params);
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
        const params = {
          docId: docId,
        };

        const getSchedulerDocumentResult = cloudantService.getSchedulerDocument(params);

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
        const params = {
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSchedulerDocumentPromise = cloudantService.getSchedulerDocument();
        expectToBePromise(getSchedulerDocumentPromise);

        getSchedulerDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSchedulerJobs', () => {
    describe('positive tests', () => {
      function __getSchedulerJobsTest() {
        // Construct the params object for operation getSchedulerJobs
        const limit = 0;
        const skip = 0;
        const params = {
          limit: limit,
          skip: skip,
        };

        const getSchedulerJobsResult = cloudantService.getSchedulerJobs(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerJobs(params);
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
        const params = {
          jobId: jobId,
        };

        const getSchedulerJobResult = cloudantService.getSchedulerJob(params);

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
        const params = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSchedulerJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSchedulerJobPromise = cloudantService.getSchedulerJob();
        expectToBePromise(getSchedulerJobPromise);

        getSchedulerJobPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSessionInformation', () => {
    describe('positive tests', () => {
      function __getSessionInformationTest() {
        // Construct the params object for operation getSessionInformation
        const params = {};

        const getSessionInformationResult = cloudantService.getSessionInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSessionInformation(params);
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
        const params = {
          db: db,
        };

        const getSecurityResult = cloudantService.getSecurity(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getSecurity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecurityPromise = cloudantService.getSecurity();
        expectToBePromise(getSecurityPromise);

        getSecurityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          admins: admins,
          members: members,
          cloudant: cloudant,
          couchdbAuthOnly: couchdbAuthOnly,
        };

        const putSecurityResult = cloudantService.putSecurity(params);

        // all methods should return a Promise
        expectToBePromise(putSecurityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{db}/_security', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.admins).toEqual(admins);
        expect(mockRequestOptions.body.members).toEqual(members);
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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putSecurity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putSecurityPromise = cloudantService.putSecurity();
        expectToBePromise(putSecurityPromise);

        putSecurityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postApiKeys', () => {
    describe('positive tests', () => {
      function __postApiKeysTest() {
        // Construct the params object for operation postApiKeys
        const params = {};

        const postApiKeysResult = cloudantService.postApiKeys(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postApiKeys(params);
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
        const params = {
          db: db,
          cloudant: cloudant,
          admins: admins,
          members: members,
          couchdbAuthOnly: couchdbAuthOnly,
        };

        const putCloudantSecurityConfigurationResult = cloudantService.putCloudantSecurityConfiguration(params);

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
        expect(mockRequestOptions.body.admins).toEqual(admins);
        expect(mockRequestOptions.body.members).toEqual(members);
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
        const params = {
          db,
          cloudant,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCloudantSecurityConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putCloudantSecurityConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putCloudantSecurityConfigurationPromise = cloudantService.putCloudantSecurityConfiguration();
        expectToBePromise(putCloudantSecurityConfigurationPromise);

        putCloudantSecurityConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCorsInformation', () => {
    describe('positive tests', () => {
      function __getCorsInformationTest() {
        // Construct the params object for operation getCorsInformation
        const params = {};

        const getCorsInformationResult = cloudantService.getCorsInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCorsInformation(params);
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
        const params = {
          origins: origins,
          allowCredentials: allowCredentials,
          enableCors: enableCors,
        };

        const putCorsConfigurationResult = cloudantService.putCorsConfiguration(params);

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
        const params = {
          origins,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putCorsConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putCorsConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putCorsConfigurationPromise = cloudantService.putCorsConfiguration();
        expectToBePromise(putCorsConfigurationPromise);

        putCorsConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          attachmentName: attachmentName,
          ifMatch: ifMatch,
          ifNoneMatch: ifNoneMatch,
          rev: rev,
        };

        const headAttachmentResult = cloudantService.headAttachment(params);

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
        const params = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headAttachmentPromise = cloudantService.headAttachment();
        expectToBePromise(headAttachmentPromise);

        headAttachmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          attachmentName: attachmentName,
          ifMatch: ifMatch,
          rev: rev,
          batch: batch,
        };

        const deleteAttachmentResult = cloudantService.deleteAttachment(params);

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
        const params = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteAttachmentPromise = cloudantService.deleteAttachment();
        expectToBePromise(deleteAttachmentPromise);

        deleteAttachmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          attachmentName: attachmentName,
          accept: accept,
          ifMatch: ifMatch,
          ifNoneMatch: ifNoneMatch,
          range: range,
          rev: rev,
        };

        const getAttachmentResult = cloudantService.getAttachment(params);

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
        const params = {
          db,
          docId,
          attachmentName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getAttachmentPromise = cloudantService.getAttachment();
        expectToBePromise(getAttachmentPromise);

        getAttachmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          attachmentName: attachmentName,
          attachment: attachment,
          contentType: contentType,
          ifMatch: ifMatch,
          rev: rev,
        };

        const putAttachmentResult = cloudantService.putAttachment(params);

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
        const params = {
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

        cloudantService.putAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putAttachmentPromise = cloudantService.putAttachment();
        expectToBePromise(putAttachmentPromise);

        putAttachmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
        };

        const headLocalDocumentResult = cloudantService.headLocalDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headLocalDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.headLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const headLocalDocumentPromise = cloudantService.headLocalDocument();
        expectToBePromise(headLocalDocumentPromise);

        headLocalDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          batch: batch,
        };

        const deleteLocalDocumentResult = cloudantService.deleteLocalDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.deleteLocalDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.deleteLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteLocalDocumentPromise = cloudantService.deleteLocalDocument();
        expectToBePromise(deleteLocalDocumentPromise);

        deleteLocalDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          accept: accept,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          localSeq: localSeq,
        };

        const getLocalDocumentResult = cloudantService.getLocalDocument(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getLocalDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getLocalDocumentPromise = cloudantService.getLocalDocument();
        expectToBePromise(getLocalDocumentPromise);

        getLocalDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        const params = {
          db: db,
          docId: docId,
          document: document,
          contentType: contentType,
          batch: batch,
        };

        const putLocalDocumentResult = cloudantService.putLocalDocument(params);

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
        const params = {
          db,
          docId,
          document,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.putLocalDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.putLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putLocalDocumentPromise = cloudantService.putLocalDocument();
        expectToBePromise(putLocalDocumentPromise);

        putLocalDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postRevsDiff', () => {
    describe('positive tests', () => {
      function __postRevsDiffTest() {
        // Construct the params object for operation postRevsDiff
        const db = 'testString';
        const documentRevisions = { 'key1': ['testString'] };
        const params = {
          db: db,
          documentRevisions: documentRevisions,
        };

        const postRevsDiffResult = cloudantService.postRevsDiff(params);

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
        const params = {
          db,
          documentRevisions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postRevsDiff(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postRevsDiff({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postRevsDiffPromise = cloudantService.postRevsDiff();
        expectToBePromise(postRevsDiffPromise);

        postRevsDiffPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getShardsInformation', () => {
    describe('positive tests', () => {
      function __getShardsInformationTest() {
        // Construct the params object for operation getShardsInformation
        const db = 'testString';
        const params = {
          db: db,
        };

        const getShardsInformationResult = cloudantService.getShardsInformation(params);

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
        const params = {
          db,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getShardsInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getShardsInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getShardsInformationPromise = cloudantService.getShardsInformation();
        expectToBePromise(getShardsInformationPromise);

        getShardsInformationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentShardsInfo', () => {
    describe('positive tests', () => {
      function __getDocumentShardsInfoTest() {
        // Construct the params object for operation getDocumentShardsInfo
        const db = 'testString';
        const docId = 'testString';
        const params = {
          db: db,
          docId: docId,
        };

        const getDocumentShardsInfoResult = cloudantService.getDocumentShardsInfo(params);

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
        const params = {
          db,
          docId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getDocumentShardsInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.getDocumentShardsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentShardsInfoPromise = cloudantService.getDocumentShardsInfo();
        expectToBePromise(getDocumentShardsInfoPromise);

        getDocumentShardsInfoPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headUpInformation', () => {
    describe('positive tests', () => {
      function __headUpInformationTest() {
        // Construct the params object for operation headUpInformation
        const params = {};

        const headUpInformationResult = cloudantService.headUpInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.headUpInformation(params);
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
        const params = {};

        const getActiveTasksResult = cloudantService.getActiveTasks(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getActiveTasks(params);
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
        const params = {};

        const getUpInformationResult = cloudantService.getUpInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getUpInformation(params);
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
        const params = {};

        const getActivityTrackerEventsResult = cloudantService.getActivityTrackerEvents(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getActivityTrackerEvents(params);
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
        const params = {
          types: types,
        };

        const postActivityTrackerEventsResult = cloudantService.postActivityTrackerEvents(params);

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
        const params = {
          types,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postActivityTrackerEvents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await cloudantService.postActivityTrackerEvents({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postActivityTrackerEventsPromise = cloudantService.postActivityTrackerEvents();
        expectToBePromise(postActivityTrackerEventsPromise);

        postActivityTrackerEventsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCurrentThroughputInformation', () => {
    describe('positive tests', () => {
      function __getCurrentThroughputInformationTest() {
        // Construct the params object for operation getCurrentThroughputInformation
        const params = {};

        const getCurrentThroughputInformationResult = cloudantService.getCurrentThroughputInformation(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.getCurrentThroughputInformation(params);
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
