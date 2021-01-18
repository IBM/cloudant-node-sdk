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
'use strict';

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

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'http://localhost:5984',
};

const cloudantService = new CloudantV1(service);

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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getServerInformation
        const params = {};

        const getServerInformationResult = cloudantService.getServerInformation(params);

        // all methods should return a Promise
        expectToBePromise(getServerInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMembershipInformation
        const params = {};

        const getMembershipInformationResult = cloudantService.getMembershipInformation(params);

        // all methods should return a Promise
        expectToBePromise(getMembershipInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_membership', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_uuids', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['count']).toEqual(count);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCapacityThroughputInformation
        const params = {};

        const getCapacityThroughputInformationResult = cloudantService.getCapacityThroughputInformation(params);

        // all methods should return a Promise
        expectToBePromise(getCapacityThroughputInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/capacity/throughput', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
  describe('putCapacityThroughputInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putCapacityThroughputInformation
        const blocks = 0;
        const params = {
          blocks: blocks,
        };

        const putCapacityThroughputInformationResult = cloudantService.putCapacityThroughputInformation(params);

        // all methods should return a Promise
        expectToBePromise(putCapacityThroughputInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/capacity/throughput', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['blocks']).toEqual(blocks);
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

        cloudantService.putCapacityThroughputInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putCapacityThroughputInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putCapacityThroughputInformationPromise = cloudantService.putCapacityThroughputInformation();
        expectToBePromise(putCapacityThroughputInformationPromise);

        putCapacityThroughputInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDbUpdates', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDbUpdates
        const feed = 'continuous';
        const heartbeat = 0;
        const timeout = 0;
        const since = 'testString';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_db_updates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['feed']).toEqual(feed);
        expect(options.qs['heartbeat']).toEqual(heartbeat);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['since']).toEqual(since);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postChanges
        const db = 'testString';
        const docIds = ['testString'];
        const fields = ['testString'];
        const selector = { 'key1': 'testString' };
        const lastEventId = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const feed = 'continuous';
        const filter = 'testString';
        const heartbeat = 0;
        const includeDocs = true;
        const limit = 0;
        const seqInterval = 1;
        const since = 'testString';
        const style = 'testString';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_changes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Last-Event-ID', lastEventId);
        expect(options.body['doc_ids']).toEqual(docIds);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['selector']).toEqual(selector);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['descending']).toEqual(descending);
        expect(options.qs['feed']).toEqual(feed);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['heartbeat']).toEqual(heartbeat);
        expect(options.qs['include_docs']).toEqual(includeDocs);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['seq_interval']).toEqual(seqInterval);
        expect(options.qs['since']).toEqual(since);
        expect(options.qs['style']).toEqual(style);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['view']).toEqual(view);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postChanges({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postChangesPromise = cloudantService.postChanges();
        expectToBePromise(postChangesPromise);

        postChangesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postChangesAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postChangesAsStream
        const db = 'testString';
        const docIds = ['testString'];
        const fields = ['testString'];
        const selector = { 'key1': 'testString' };
        const lastEventId = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const feed = 'continuous';
        const filter = 'testString';
        const heartbeat = 0;
        const includeDocs = true;
        const limit = 0;
        const seqInterval = 1;
        const since = 'testString';
        const style = 'testString';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_changes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Last-Event-ID', lastEventId);
        expect(options.body['doc_ids']).toEqual(docIds);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['selector']).toEqual(selector);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['descending']).toEqual(descending);
        expect(options.qs['feed']).toEqual(feed);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['heartbeat']).toEqual(heartbeat);
        expect(options.qs['include_docs']).toEqual(includeDocs);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['seq_interval']).toEqual(seqInterval);
        expect(options.qs['since']).toEqual(since);
        expect(options.qs['style']).toEqual(style);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['view']).toEqual(view);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postChangesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postChangesAsStreamPromise = cloudantService.postChangesAsStream();
        expectToBePromise(postChangesAsStreamPromise);

        postChangesAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headDatabase', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headDatabasePromise = cloudantService.headDatabase();
        expectToBePromise(headDatabasePromise);

        headDatabasePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAllDbs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAllDbs
        const descending = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_all_dbs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['descending']).toEqual(descending);
        expect(options.qs['endkey']).toEqual(endkey);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['startkey']).toEqual(startkey);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_dbs_info', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['keys']).toEqual(keys);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postDbsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postDbsInfoPromise = cloudantService.postDbsInfo();
        expectToBePromise(postDbsInfoPromise);

        postDbsInfoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDatabase', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDatabasePromise = cloudantService.deleteDatabase();
        expectToBePromise(deleteDatabasePromise);

        deleteDatabasePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDatabaseInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDatabaseInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDatabaseInformationPromise = cloudantService.getDatabaseInformation();
        expectToBePromise(getDatabaseInformationPromise);

        getDatabaseInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putDatabase', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putDatabase
        const db = 'testString';
        const partitioned = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['partitioned']).toEqual(partitioned);
        expect(options.qs['q']).toEqual(q);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putDatabasePromise = cloudantService.putDatabase();
        expectToBePromise(putDatabasePromise);

        putDatabasePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation headDocument
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const latest = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headDocumentPromise = cloudantService.headDocument();
        expectToBePromise(headDocumentPromise);

        headDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postDocument', () => {
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

      // Document
      const documentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'testString',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        foo: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postDocument
        const db = 'testString';
        const document = documentModel;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(document);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.path['db']).toEqual(db);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const document = documentModel;
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postDocumentPromise = cloudantService.postDocument();
        expectToBePromise(postDocumentPromise);

        postDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postAllDocs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postAllDocs
        const db = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postAllDocsPromise = cloudantService.postAllDocs();
        expectToBePromise(postAllDocsPromise);

        postAllDocsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postAllDocsAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postAllDocsAsStream
        const db = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postAllDocsAsStreamPromise = cloudantService.postAllDocsAsStream();
        expectToBePromise(postAllDocsAsStreamPromise);

        postAllDocsAsStreamPromise.catch(err => {
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
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startkey: 'testString',
      };

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postAllDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postAllDocsQueriesPromise = cloudantService.postAllDocsQueries();
        expectToBePromise(postAllDocsQueriesPromise);

        postAllDocsQueriesPromise.catch(err => {
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
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startkey: 'testString',
      };

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_all_docs/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postAllDocsQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postAllDocsQueriesAsStreamPromise = cloudantService.postAllDocsQueriesAsStream();
        expectToBePromise(postAllDocsQueriesAsStreamPromise);

        postAllDocsQueriesAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postBulkDocs', () => {
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

      // Document
      const documentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'testString',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        foo: 'testString',
      };

      // BulkDocs
      const bulkDocsModel = {
        docs: [documentModel],
        new_edits: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postBulkDocs
        const db = 'testString';
        const bulkDocs = bulkDocsModel;
        const params = {
          db: db,
          bulkDocs: bulkDocs,
        };

        const postBulkDocsResult = cloudantService.postBulkDocs(params);

        // all methods should return a Promise
        expectToBePromise(postBulkDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_bulk_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(bulkDocs);
        expect(options.path['db']).toEqual(db);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const bulkDocs = bulkDocsModel;
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postBulkDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postBulkDocsPromise = cloudantService.postBulkDocs();
        expectToBePromise(postBulkDocsPromise);

        postBulkDocsPromise.catch(err => {
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
        atts_since: ['testString'],
        id: 'testString',
        open_revs: ['testString'],
        rev: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postBulkGet
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = true;
        const attEncodingInfo = true;
        const latest = true;
        const revs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['docs']).toEqual(docs);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postBulkGet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postBulkGetPromise = cloudantService.postBulkGet();
        expectToBePromise(postBulkGetPromise);

        postBulkGetPromise.catch(err => {
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
        atts_since: ['testString'],
        id: 'small-appliances:1000042',
        open_revs: ['testString'],
        rev: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postBulkGetAsMixed
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = true;
        const attEncodingInfo = true;
        const latest = true;
        const revs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/mixed';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['docs']).toEqual(docs);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postBulkGetAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postBulkGetAsMixedPromise = cloudantService.postBulkGetAsMixed();
        expectToBePromise(postBulkGetAsMixedPromise);

        postBulkGetAsMixedPromise.catch(err => {
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
        atts_since: ['testString'],
        id: 'small-appliances:1000042',
        open_revs: ['testString'],
        rev: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postBulkGetAsRelated
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = true;
        const attEncodingInfo = true;
        const latest = true;
        const revs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'multipart/related';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['docs']).toEqual(docs);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postBulkGetAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postBulkGetAsRelatedPromise = cloudantService.postBulkGetAsRelated();
        expectToBePromise(postBulkGetAsRelatedPromise);

        postBulkGetAsRelatedPromise.catch(err => {
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
        atts_since: ['testString'],
        id: 'small-appliances:1000042',
        open_revs: ['testString'],
        rev: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postBulkGetAsStream
        const db = 'testString';
        const docs = [bulkGetQueryDocumentModel];
        const attachments = true;
        const attEncodingInfo = true;
        const latest = true;
        const revs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_bulk_get', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['docs']).toEqual(docs);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postBulkGetAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postBulkGetAsStreamPromise = cloudantService.postBulkGetAsStream();
        expectToBePromise(postBulkGetAsStreamPromise);

        postBulkGetAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDocumentPromise = cloudantService.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocument
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentResult = cloudantService.getDocument(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentPromise = cloudantService.getDocument();
        expectToBePromise(getDocumentPromise);

        getDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentAsMixed', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentAsMixed
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsMixedResult = cloudantService.getDocumentAsMixed(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsMixedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'multipart/mixed';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDocumentAsMixed({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentAsMixedPromise = cloudantService.getDocumentAsMixed();
        expectToBePromise(getDocumentAsMixedPromise);

        getDocumentAsMixedPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentAsRelated', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentAsRelated
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsRelatedResult = cloudantService.getDocumentAsRelated(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsRelatedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'multipart/related';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDocumentAsRelated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentAsRelatedPromise = cloudantService.getDocumentAsRelated();
        expectToBePromise(getDocumentAsRelatedPromise);

        getDocumentAsRelatedPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentAsStream
        const db = 'testString';
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          db: db,
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDocumentAsStreamResult = cloudantService.getDocumentAsStream(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentAsStreamResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDocumentAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentAsStreamPromise = cloudantService.getDocumentAsStream();
        expectToBePromise(getDocumentAsStreamPromise);

        getDocumentAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putDocument', () => {
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

      // Document
      const documentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'exampleid',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        foo: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putDocument
        const db = 'testString';
        const docId = 'testString';
        const document = documentModel;
        const contentType = 'application/json';
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.body).toEqual(document);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['new_edits']).toEqual(newEdits);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const document = documentModel;
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putDocumentPromise = cloudantService.putDocument();
        expectToBePromise(putDocumentPromise);

        putDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headDesignDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headDesignDocumentPromise = cloudantService.headDesignDocument();
        expectToBePromise(headDesignDocumentPromise);

        headDesignDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDesignDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDesignDocumentPromise = cloudantService.deleteDesignDocument();
        expectToBePromise(deleteDesignDocumentPromise);

        deleteDesignDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDesignDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          db: db,
          ddoc: ddoc,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getDesignDocumentResult = cloudantService.getDesignDocument(params);

        // all methods should return a Promise
        expectToBePromise(getDesignDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDesignDocumentPromise = cloudantService.getDesignDocument();
        expectToBePromise(getDesignDocumentPromise);

        getDesignDocumentPromise.catch(err => {
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
        language: 'testString',
        options: designDocumentOptionsModel,
        updates: { 'key1': 'testString' },
        validate_doc_update: { 'key1': 'testString' },
        views: { 'key1': designDocumentViewsMapReduceModel },
        st_indexes: { 'key1': geoIndexDefinitionModel },
        foo: { foo: 'bar' },
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putDesignDocument
        const db = 'testString';
        const ddoc = 'testString';
        const designDocument = designDocumentModel;
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.body).toEqual(designDocument);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['new_edits']).toEqual(newEdits);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putDesignDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putDesignDocumentPromise = cloudantService.putDesignDocument();
        expectToBePromise(putDesignDocumentPromise);

        putDesignDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDesignDocumentInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_info', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDesignDocumentInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDesignDocumentInformationPromise = cloudantService.getDesignDocumentInformation();
        expectToBePromise(getDesignDocumentInformationPromise);

        getDesignDocumentInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postDesignDocs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postDesignDocs
        const db = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design_docs', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postDesignDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postDesignDocsPromise = cloudantService.postDesignDocs();
        expectToBePromise(postDesignDocsPromise);

        postDesignDocsPromise.catch(err => {
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
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startkey: 'testString',
      };

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design_docs/queries', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postDesignDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postDesignDocsQueriesPromise = cloudantService.postDesignDocsQueries();
        expectToBePromise(postDesignDocsQueriesPromise);

        postDesignDocsQueriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postView', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postView
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 0;
        const skip = 0;
        const updateSeq = true;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = true;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['endkey_docid']).toEqual(endkeyDocid);
        expect(options.body['group']).toEqual(group);
        expect(options.body['group_level']).toEqual(groupLevel);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['reduce']).toEqual(reduce);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.body['startkey_docid']).toEqual(startkeyDocid);
        expect(options.body['update']).toEqual(update);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postViewPromise = cloudantService.postView();
        expectToBePromise(postViewPromise);

        postViewPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postViewAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postViewAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = true;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['endkey_docid']).toEqual(endkeyDocid);
        expect(options.body['group']).toEqual(group);
        expect(options.body['group_level']).toEqual(groupLevel);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['reduce']).toEqual(reduce);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.body['startkey_docid']).toEqual(startkeyDocid);
        expect(options.body['update']).toEqual(update);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postViewAsStreamPromise = cloudantService.postViewAsStream();
        expectToBePromise(postViewAsStreamPromise);

        postViewAsStreamPromise.catch(err => {
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
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        endkey_docid: 'testString',
        group: true,
        group_level: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: true,
        startkey: 'testString',
        startkey_docid: 'testString',
        update: 'true',
      };

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postViewQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postViewQueriesPromise = cloudantService.postViewQueries();
        expectToBePromise(postViewQueriesPromise);

        postViewQueriesPromise.catch(err => {
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
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 5,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        endkey_docid: 'testString',
        group: true,
        group_level: 1,
        key: 'testString',
        keys: ['testString'],
        reduce: true,
        stable: true,
        startkey: 'testString',
        startkey_docid: 'testString',
        update: 'true',
      };

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_view/{view}/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postViewQueriesAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postViewQueriesAsStreamPromise = cloudantService.postViewQueriesAsStream();
        expectToBePromise(postViewQueriesAsStreamPromise);

        postViewQueriesAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPartitionInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getPartitionInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPartitionInformationPromise = cloudantService.getPartitionInformation();
        expectToBePromise(getPartitionInformationPromise);

        getPartitionInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionAllDocs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionAllDocs
        const db = 'testString';
        const partitionKey = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionAllDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionAllDocsPromise = cloudantService.postPartitionAllDocs();
        expectToBePromise(postPartitionAllDocsPromise);

        postPartitionAllDocsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionAllDocsAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionAllDocsAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_all_docs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionAllDocsAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionAllDocsAsStreamPromise = cloudantService.postPartitionAllDocsAsStream();
        expectToBePromise(postPartitionAllDocsAsStreamPromise);

        postPartitionAllDocsAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionSearch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionSearch
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = 'testString';
        const highlightPreTag = 'testString';
        const highlightSize = 1;
        const includeDocs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['query']).toEqual(query);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['highlight_fields']).toEqual(highlightFields);
        expect(options.body['highlight_number']).toEqual(highlightNumber);
        expect(options.body['highlight_post_tag']).toEqual(highlightPostTag);
        expect(options.body['highlight_pre_tag']).toEqual(highlightPreTag);
        expect(options.body['highlight_size']).toEqual(highlightSize);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['include_fields']).toEqual(includeFields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stale']).toEqual(stale);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionSearchPromise = cloudantService.postPartitionSearch();
        expectToBePromise(postPartitionSearchPromise);

        postPartitionSearchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionSearchAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionSearchAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = 'testString';
        const highlightPreTag = 'testString';
        const highlightSize = 1;
        const includeDocs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['query']).toEqual(query);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['highlight_fields']).toEqual(highlightFields);
        expect(options.body['highlight_number']).toEqual(highlightNumber);
        expect(options.body['highlight_post_tag']).toEqual(highlightPostTag);
        expect(options.body['highlight_pre_tag']).toEqual(highlightPreTag);
        expect(options.body['highlight_size']).toEqual(highlightSize);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['include_fields']).toEqual(includeFields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stale']).toEqual(stale);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionSearchAsStreamPromise = cloudantService.postPartitionSearchAsStream();
        expectToBePromise(postPartitionSearchAsStreamPromise);

        postPartitionSearchAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionView', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionView
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = true;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['endkey_docid']).toEqual(endkeyDocid);
        expect(options.body['group']).toEqual(group);
        expect(options.body['group_level']).toEqual(groupLevel);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['reduce']).toEqual(reduce);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.body['startkey_docid']).toEqual(startkeyDocid);
        expect(options.body['update']).toEqual(update);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionView({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionViewPromise = cloudantService.postPartitionView();
        expectToBePromise(postPartitionViewPromise);

        postPartitionViewPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionViewAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionViewAsStream
        const db = 'testString';
        const partitionKey = 'testString';
        const ddoc = 'testString';
        const view = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
        const endkey = 'testString';
        const endkeyDocid = 'testString';
        const group = true;
        const groupLevel = 1;
        const key = 'testString';
        const keys = ['testString'];
        const reduce = true;
        const stable = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['endkey_docid']).toEqual(endkeyDocid);
        expect(options.body['group']).toEqual(group);
        expect(options.body['group_level']).toEqual(groupLevel);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['reduce']).toEqual(reduce);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.body['startkey_docid']).toEqual(startkeyDocid);
        expect(options.body['update']).toEqual(update);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['view']).toEqual(view);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionViewAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionViewAsStreamPromise = cloudantService.postPartitionViewAsStream();
        expectToBePromise(postPartitionViewAsStreamPromise);

        postPartitionViewAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionFind', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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
        const update = 'false';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['selector']).toEqual(selector);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['execution_stats']).toEqual(executionStats);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['update']).toEqual(update);
        expect(options.body['use_index']).toEqual(useIndex);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionFindPromise = cloudantService.postPartitionFind();
        expectToBePromise(postPartitionFindPromise);

        postPartitionFindPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postPartitionFindAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postPartitionFindAsStream
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
        const update = 'false';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_partition/{partition_key}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['selector']).toEqual(selector);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['execution_stats']).toEqual(executionStats);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['update']).toEqual(update);
        expect(options.body['use_index']).toEqual(useIndex);
        expect(options.path['db']).toEqual(db);
        expect(options.path['partition_key']).toEqual(partitionKey);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postPartitionFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postPartitionFindAsStreamPromise = cloudantService.postPartitionFindAsStream();
        expectToBePromise(postPartitionFindAsStreamPromise);

        postPartitionFindAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postExplain', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postExplain
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 0;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'false';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['selector']).toEqual(selector);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['execution_stats']).toEqual(executionStats);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['update']).toEqual(update);
        expect(options.body['use_index']).toEqual(useIndex);
        expect(options.body['r']).toEqual(r);
        expect(options.path['db']).toEqual(db);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postExplain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postExplainPromise = cloudantService.postExplain();
        expectToBePromise(postExplainPromise);

        postExplainPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postFind', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postFind
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 3;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'false';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['selector']).toEqual(selector);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['execution_stats']).toEqual(executionStats);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['update']).toEqual(update);
        expect(options.body['use_index']).toEqual(useIndex);
        expect(options.body['r']).toEqual(r);
        expect(options.path['db']).toEqual(db);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postFind({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postFindPromise = cloudantService.postFind();
        expectToBePromise(postFindPromise);

        postFindPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postFindAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postFindAsStream
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
        const bookmark = 'testString';
        const conflicts = true;
        const executionStats = true;
        const fields = ['testString'];
        const limit = 3;
        const skip = 0;
        const sort = [{ 'key1': 'asc' }];
        const stable = true;
        const update = 'false';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_find', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['selector']).toEqual(selector);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['execution_stats']).toEqual(executionStats);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stable']).toEqual(stable);
        expect(options.body['update']).toEqual(update);
        expect(options.body['use_index']).toEqual(useIndex);
        expect(options.body['r']).toEqual(r);
        expect(options.path['db']).toEqual(db);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const selector = { 'key1': { foo: 'bar' } };
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postFindAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postFindAsStreamPromise = cloudantService.postFindAsStream();
        expectToBePromise(postFindAsStreamPromise);

        postFindAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getIndexesInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_index', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getIndexesInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getIndexesInformationPromise = cloudantService.getIndexesInformation();
        expectToBePromise(getIndexesInformationPromise);

        getIndexesInformationPromise.catch(err => {
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
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postIndex
        const db = 'testString';
        const index = indexDefinitionModel;
        const ddoc = 'testString';
        const def = indexDefinitionModel;
        const name = 'testString';
        const partialFilterSelector = { 'key1': 'testString' };
        const partitioned = true;
        const type = 'json';
        const params = {
          db: db,
          index: index,
          ddoc: ddoc,
          def: def,
          name: name,
          partialFilterSelector: partialFilterSelector,
          partitioned: partitioned,
          type: type,
        };

        const postIndexResult = cloudantService.postIndex(params);

        // all methods should return a Promise
        expectToBePromise(postIndexResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_index', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['index']).toEqual(index);
        expect(options.body['ddoc']).toEqual(ddoc);
        expect(options.body['def']).toEqual(def);
        expect(options.body['name']).toEqual(name);
        expect(options.body['partial_filter_selector']).toEqual(partialFilterSelector);
        expect(options.body['partitioned']).toEqual(partitioned);
        expect(options.body['type']).toEqual(type);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postIndexPromise = cloudantService.postIndex();
        expectToBePromise(postIndexPromise);

        postIndexPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteIndex', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_index/_design/{ddoc}/{type}/{index}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['type']).toEqual(type);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteIndex({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteIndexPromise = cloudantService.deleteIndex();
        expectToBePromise(deleteIndexPromise);

        deleteIndexPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postSearchAnalyze', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_search_analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['analyzer']).toEqual(analyzer);
        expect(options.body['text']).toEqual(text);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postSearchAnalyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postSearchAnalyzePromise = cloudantService.postSearchAnalyze();
        expectToBePromise(postSearchAnalyzePromise);

        postSearchAnalyzePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postSearch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postSearch
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = 'testString';
        const highlightPreTag = 'testString';
        const highlightSize = 1;
        const includeDocs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['query']).toEqual(query);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['highlight_fields']).toEqual(highlightFields);
        expect(options.body['highlight_number']).toEqual(highlightNumber);
        expect(options.body['highlight_post_tag']).toEqual(highlightPostTag);
        expect(options.body['highlight_pre_tag']).toEqual(highlightPreTag);
        expect(options.body['highlight_size']).toEqual(highlightSize);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['include_fields']).toEqual(includeFields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stale']).toEqual(stale);
        expect(options.body['counts']).toEqual(counts);
        expect(options.body['drilldown']).toEqual(drilldown);
        expect(options.body['group_field']).toEqual(groupField);
        expect(options.body['group_limit']).toEqual(groupLimit);
        expect(options.body['group_sort']).toEqual(groupSort);
        expect(options.body['ranges']).toEqual(ranges);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postSearch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postSearchPromise = cloudantService.postSearch();
        expectToBePromise(postSearchPromise);

        postSearchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postSearchAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postSearchAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const query = 'testString';
        const bookmark = 'testString';
        const highlightFields = ['testString'];
        const highlightNumber = 1;
        const highlightPostTag = 'testString';
        const highlightPreTag = 'testString';
        const highlightSize = 1;
        const includeDocs = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_search/{index}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['query']).toEqual(query);
        expect(options.body['bookmark']).toEqual(bookmark);
        expect(options.body['highlight_fields']).toEqual(highlightFields);
        expect(options.body['highlight_number']).toEqual(highlightNumber);
        expect(options.body['highlight_post_tag']).toEqual(highlightPostTag);
        expect(options.body['highlight_pre_tag']).toEqual(highlightPreTag);
        expect(options.body['highlight_size']).toEqual(highlightSize);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['include_fields']).toEqual(includeFields);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['stale']).toEqual(stale);
        expect(options.body['counts']).toEqual(counts);
        expect(options.body['drilldown']).toEqual(drilldown);
        expect(options.body['group_field']).toEqual(groupField);
        expect(options.body['group_limit']).toEqual(groupLimit);
        expect(options.body['group_sort']).toEqual(groupSort);
        expect(options.body['ranges']).toEqual(ranges);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postSearchAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postSearchAsStreamPromise = cloudantService.postSearchAsStream();
        expectToBePromise(postSearchAsStreamPromise);

        postSearchAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSearchInfo', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_search_info/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getSearchInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSearchInfoPromise = cloudantService.getSearchInfo();
        expectToBePromise(getSearchInfoPromise);

        getSearchInfoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeo', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGeo
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const bbox = 'testString';
        const bookmark = 'testString';
        const format = 'legacy';
        const g = 'testString';
        const includeDocs = true;
        const lat = -90;
        const limit = 0;
        const lon = -180;
        const nearest = true;
        const radius = 0;
        const rangex = 0;
        const rangey = 0;
        const relation = 'contains';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_geo/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['bbox']).toEqual(bbox);
        expect(options.qs['bookmark']).toEqual(bookmark);
        expect(options.qs['format']).toEqual(format);
        expect(options.qs['g']).toEqual(g);
        expect(options.qs['include_docs']).toEqual(includeDocs);
        expect(options.qs['lat']).toEqual(lat);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['lon']).toEqual(lon);
        expect(options.qs['nearest']).toEqual(nearest);
        expect(options.qs['radius']).toEqual(radius);
        expect(options.qs['rangex']).toEqual(rangex);
        expect(options.qs['rangey']).toEqual(rangey);
        expect(options.qs['relation']).toEqual(relation);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['stale']).toEqual(stale);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getGeo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGeoPromise = cloudantService.getGeo();
        expectToBePromise(getGeoPromise);

        getGeoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeoAsStream', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGeoAsStream
        const db = 'testString';
        const ddoc = 'testString';
        const index = 'testString';
        const bbox = 'testString';
        const bookmark = 'testString';
        const format = 'legacy';
        const g = 'testString';
        const includeDocs = true;
        const lat = -90;
        const limit = 0;
        const lon = -180;
        const nearest = true;
        const radius = 0;
        const rangex = 0;
        const rangey = 0;
        const relation = 'contains';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_geo/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['bbox']).toEqual(bbox);
        expect(options.qs['bookmark']).toEqual(bookmark);
        expect(options.qs['format']).toEqual(format);
        expect(options.qs['g']).toEqual(g);
        expect(options.qs['include_docs']).toEqual(includeDocs);
        expect(options.qs['lat']).toEqual(lat);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['lon']).toEqual(lon);
        expect(options.qs['nearest']).toEqual(nearest);
        expect(options.qs['radius']).toEqual(radius);
        expect(options.qs['rangex']).toEqual(rangex);
        expect(options.qs['rangey']).toEqual(rangey);
        expect(options.qs['relation']).toEqual(relation);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['stale']).toEqual(stale);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getGeoAsStream({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGeoAsStreamPromise = cloudantService.getGeoAsStream();
        expectToBePromise(getGeoAsStreamPromise);

        getGeoAsStreamPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postGeoCleanup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_geo_cleanup', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postGeoCleanup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postGeoCleanupPromise = cloudantService.postGeoCleanup();
        expectToBePromise(postGeoCleanupPromise);

        postGeoCleanupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGeoIndexInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_design/{ddoc}/_geo_info/{index}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['ddoc']).toEqual(ddoc);
        expect(options.path['index']).toEqual(index);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getGeoIndexInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGeoIndexInformationPromise = cloudantService.getGeoIndexInformation();
        expectToBePromise(getGeoIndexInformationPromise);

        getGeoIndexInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headReplicationDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_replicator/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headReplicationDocumentPromise = cloudantService.headReplicationDocument();
        expectToBePromise(headReplicationDocumentPromise);

        headReplicationDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headSchedulerDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/docs/_replicator/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headSchedulerDocumentPromise = cloudantService.headSchedulerDocument();
        expectToBePromise(headSchedulerDocumentPromise);

        headSchedulerDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headSchedulerJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/jobs/{job_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['job_id']).toEqual(jobId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headSchedulerJobPromise = cloudantService.headSchedulerJob();
        expectToBePromise(headSchedulerJobPromise);

        headSchedulerJobPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postReplicate', () => {
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
        partitioned: true,
        q: 1,
      };

      // ReplicationDatabaseAuthIam
      const replicationDatabaseAuthIamModel = {
        api_key: 'testString',
      };

      // ReplicationDatabaseAuth
      const replicationDatabaseAuthModel = {
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
        continuous: true,
        create_target: true,
        create_target_params: replicationCreateTargetParametersModel,
        doc_ids: ['testString'],
        filter: 'testString',
        http_connections: 1,
        query_params: { 'key1': 'testString' },
        retries_per_request: 0,
        selector: { 'key1': { foo: 'bar' } },
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
        foo: { foo: 'bar' },
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postReplicate
        const replicationDocument = replicationDocumentModel;
        const params = {
          replicationDocument: replicationDocument,
        };

        const postReplicateResult = cloudantService.postReplicate(params);

        // all methods should return a Promise
        expectToBePromise(postReplicateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_replicate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(replicationDocument);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const replicationDocument = replicationDocumentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          replicationDocument,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cloudantService.postReplicate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postReplicate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postReplicatePromise = cloudantService.postReplicate();
        expectToBePromise(postReplicatePromise);

        postReplicatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteReplicationDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_replicator/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteReplicationDocumentPromise = cloudantService.deleteReplicationDocument();
        expectToBePromise(deleteReplicationDocumentPromise);

        deleteReplicationDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getReplicationDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getReplicationDocument
        const docId = 'testString';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const conflicts = true;
        const deletedConflicts = true;
        const latest = true;
        const localSeq = true;
        const meta = true;
        const openRevs = ['testString'];
        const rev = 'testString';
        const revs = true;
        const revsInfo = true;
        const params = {
          docId: docId,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          conflicts: conflicts,
          deletedConflicts: deletedConflicts,
          latest: latest,
          localSeq: localSeq,
          meta: meta,
          openRevs: openRevs,
          rev: rev,
          revs: revs,
          revsInfo: revsInfo,
        };

        const getReplicationDocumentResult = cloudantService.getReplicationDocument(params);

        // all methods should return a Promise
        expectToBePromise(getReplicationDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_replicator/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['conflicts']).toEqual(conflicts);
        expect(options.qs['deleted_conflicts']).toEqual(deletedConflicts);
        expect(options.qs['latest']).toEqual(latest);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.qs['meta']).toEqual(meta);
        expect(options.qs['open_revs']).toEqual(openRevs);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['revs']).toEqual(revs);
        expect(options.qs['revs_info']).toEqual(revsInfo);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getReplicationDocumentPromise = cloudantService.getReplicationDocument();
        expectToBePromise(getReplicationDocumentPromise);

        getReplicationDocumentPromise.catch(err => {
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
        partitioned: true,
        q: 1,
      };

      // ReplicationDatabaseAuthIam
      const replicationDatabaseAuthIamModel = {
        api_key: 'testString',
      };

      // ReplicationDatabaseAuth
      const replicationDatabaseAuthModel = {
        iam: replicationDatabaseAuthIamModel,
      };

      // ReplicationDatabase
      const replicationDatabaseModel = {
        auth: replicationDatabaseAuthModel,
        headers: { 'key1': 'testString' },
        url: 'https://examples.cloudant.com/animaldb',
      };

      // UserContext
      const userContextModel = {
        db: 'testString',
        name: 'john',
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
        cancel: false,
        checkpoint_interval: 4500,
        connection_timeout: 15000,
        continuous: true,
        create_target: true,
        create_target_params: replicationCreateTargetParametersModel,
        doc_ids: ['testString'],
        filter: 'ddoc/my_filter',
        http_connections: 10,
        query_params: { 'key1': 'testString' },
        retries_per_request: 3,
        selector: { 'key1': { foo: 'bar' } },
        since_seq: '34-g1AAAAGjeJzLYWBgYMlgTmGQT0lKzi9KdU',
        socket_options: '[{keepalive, true}, {nodelay, false}]',
        source: replicationDatabaseModel,
        source_proxy: 'http://my-source-proxy.example:8888',
        target: replicationDatabaseModel,
        target_proxy: 'http://my-target-proxy.example:8888',
        use_checkpoints: false,
        user_ctx: userContextModel,
        worker_batch_size: 400,
        worker_processes: 3,
        foo: { foo: 'bar' },
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putReplicationDocument
        const docId = 'testString';
        const replicationDocument = replicationDocumentModel;
        const ifMatch = 'testString';
        const batch = 'ok';
        const newEdits = true;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_replicator/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.body).toEqual(replicationDocument);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.qs['new_edits']).toEqual(newEdits);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putReplicationDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putReplicationDocumentPromise = cloudantService.putReplicationDocument();
        expectToBePromise(putReplicationDocumentPromise);

        putReplicationDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSchedulerDocs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/docs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['states']).toEqual(states);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/docs/_replicator/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getSchedulerDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSchedulerDocumentPromise = cloudantService.getSchedulerDocument();
        expectToBePromise(getSchedulerDocumentPromise);

        getSchedulerDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSchedulerJobs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['skip']).toEqual(skip);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_scheduler/jobs/{job_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['job_id']).toEqual(jobId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getSchedulerJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSchedulerJobPromise = cloudantService.getSchedulerJob();
        expectToBePromise(getSchedulerJobPromise);

        getSchedulerJobPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSessionInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSessionInformation
        const params = {};

        const getSessionInformationResult = cloudantService.getSessionInformation(params);

        // all methods should return a Promise
        expectToBePromise(getSessionInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_session', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_security', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecurityPromise = cloudantService.getSecurity();
        expectToBePromise(getSecurityPromise);

        getSecurityPromise.catch(err => {
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

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_security', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['admins']).toEqual(admins);
        expect(options.body['members']).toEqual(members);
        expect(options.body['cloudant']).toEqual(cloudant);
        expect(options.body['couchdb_auth_only']).toEqual(couchdbAuthOnly);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putSecurity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putSecurityPromise = cloudantService.putSecurity();
        expectToBePromise(putSecurityPromise);

        putSecurityPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postApiKeys', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postApiKeys
        const params = {};

        const postApiKeysResult = cloudantService.postApiKeys(params);

        // all methods should return a Promise
        expectToBePromise(postApiKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/api_keys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/db/{db}/_security', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cloudant']).toEqual(cloudant);
        expect(options.body['admins']).toEqual(admins);
        expect(options.body['members']).toEqual(members);
        expect(options.body['couchdb_auth_only']).toEqual(couchdbAuthOnly);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putCloudantSecurityConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putCloudantSecurityConfigurationPromise = cloudantService.putCloudantSecurityConfiguration();
        expectToBePromise(putCloudantSecurityConfigurationPromise);

        putCloudantSecurityConfigurationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCorsInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCorsInformation
        const params = {};

        const getCorsInformationResult = cloudantService.getCorsInformation(params);

        // all methods should return a Promise
        expectToBePromise(getCorsInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/config/cors', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/config/cors', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['origins']).toEqual(origins);
        expect(options.body['allow_credentials']).toEqual(allowCredentials);
        expect(options.body['enable_cors']).toEqual(enableCors);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putCorsConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putCorsConfigurationPromise = cloudantService.putCorsConfiguration();
        expectToBePromise(putCorsConfigurationPromise);

        putCorsConfigurationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}/{attachment_name}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.path['attachment_name']).toEqual(attachmentName);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headAttachmentPromise = cloudantService.headAttachment();
        expectToBePromise(headAttachmentPromise);

        headAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}/{attachment_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.path['attachment_name']).toEqual(attachmentName);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteAttachmentPromise = cloudantService.deleteAttachment();
        expectToBePromise(deleteAttachmentPromise);

        deleteAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}/{attachment_name}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        checkUserHeader(createRequestMock, 'Range', range);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.path['attachment_name']).toEqual(attachmentName);
        expect(options.responseType).toBe('stream');
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAttachmentPromise = cloudantService.getAttachment();
        expectToBePromise(getAttachmentPromise);

        getAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putAttachment
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const attachment = Buffer.from('This is a mock file.');
        const contentType = 'testString';
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/{doc_id}/{attachment_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(options.body).toEqual(attachment);
        expect(options.qs['rev']).toEqual(rev);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
        expect(options.path['attachment_name']).toEqual(attachmentName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const attachmentName = 'testString';
        const attachment = Buffer.from('This is a mock file.');
        const contentType = 'testString';
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putAttachmentPromise = cloudantService.putAttachment();
        expectToBePromise(putAttachmentPromise);

        putAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headLocalDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local/{doc_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.headLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const headLocalDocumentPromise = cloudantService.headLocalDocument();
        expectToBePromise(headLocalDocumentPromise);

        headLocalDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLocalDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local/{doc_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.deleteLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLocalDocumentPromise = cloudantService.deleteLocalDocument();
        expectToBePromise(deleteLocalDocumentPromise);

        deleteLocalDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLocalDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const accept = 'application/json';
        const ifNoneMatch = 'testString';
        const attachments = true;
        const attEncodingInfo = true;
        const attsSince = ['testString'];
        const localSeq = true;
        const params = {
          db: db,
          docId: docId,
          accept: accept,
          ifNoneMatch: ifNoneMatch,
          attachments: attachments,
          attEncodingInfo: attEncodingInfo,
          attsSince: attsSince,
          localSeq: localSeq,
        };

        const getLocalDocumentResult = cloudantService.getLocalDocument(params);

        // all methods should return a Promise
        expectToBePromise(getLocalDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local/{doc_id}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        checkUserHeader(createRequestMock, 'If-None-Match', ifNoneMatch);
        expect(options.qs['attachments']).toEqual(attachments);
        expect(options.qs['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.qs['atts_since']).toEqual(attsSince);
        expect(options.qs['local_seq']).toEqual(localSeq);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLocalDocumentPromise = cloudantService.getLocalDocument();
        expectToBePromise(getLocalDocumentPromise);

        getLocalDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putLocalDocument', () => {
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

      // Document
      const documentModel = {
        _attachments: { 'key1': attachmentModel },
        _conflicts: ['testString'],
        _deleted: true,
        _deleted_conflicts: ['testString'],
        _id: 'exampleid',
        _local_seq: 'testString',
        _rev: 'testString',
        _revisions: revisionsModel,
        _revs_info: [documentRevisionStatusModel],
        foo: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putLocalDocument
        const db = 'testString';
        const docId = 'testString';
        const document = documentModel;
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local/{doc_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(document);
        expect(options.qs['batch']).toEqual(batch);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const db = 'testString';
        const docId = 'testString';
        const document = documentModel;
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.putLocalDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putLocalDocumentPromise = cloudantService.putLocalDocument();
        expectToBePromise(putLocalDocumentPromise);

        putLocalDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postLocalDocs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postLocalDocs
        const db = 'testString';
        const attEncodingInfo = true;
        const attachments = true;
        const conflicts = true;
        const descending = true;
        const includeDocs = true;
        const inclusiveEnd = true;
        const limit = 10;
        const skip = 0;
        const updateSeq = true;
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

        const postLocalDocsResult = cloudantService.postLocalDocs(params);

        // all methods should return a Promise
        expectToBePromise(postLocalDocsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local_docs', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.body['att_encoding_info']).toEqual(attEncodingInfo);
        expect(options.body['attachments']).toEqual(attachments);
        expect(options.body['conflicts']).toEqual(conflicts);
        expect(options.body['descending']).toEqual(descending);
        expect(options.body['include_docs']).toEqual(includeDocs);
        expect(options.body['inclusive_end']).toEqual(inclusiveEnd);
        expect(options.body['limit']).toEqual(limit);
        expect(options.body['skip']).toEqual(skip);
        expect(options.body['update_seq']).toEqual(updateSeq);
        expect(options.body['endkey']).toEqual(endkey);
        expect(options.body['key']).toEqual(key);
        expect(options.body['keys']).toEqual(keys);
        expect(options.body['startkey']).toEqual(startkey);
        expect(options.path['db']).toEqual(db);
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

        cloudantService.postLocalDocs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postLocalDocs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postLocalDocsPromise = cloudantService.postLocalDocs();
        expectToBePromise(postLocalDocsPromise);

        postLocalDocsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postLocalDocsQueries', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AllDocsQuery
      const allDocsQueryModel = {
        att_encoding_info: true,
        attachments: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        inclusive_end: true,
        limit: 0,
        skip: 0,
        update_seq: true,
        endkey: 'testString',
        key: 'testString',
        keys: ['testString'],
        startkey: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postLocalDocsQueries
        const db = 'testString';
        const queries = [allDocsQueryModel];
        const accept = 'application/json';
        const params = {
          db: db,
          queries: queries,
          accept: accept,
        };

        const postLocalDocsQueriesResult = cloudantService.postLocalDocsQueries(params);

        // all methods should return a Promise
        expectToBePromise(postLocalDocsQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_local_docs/queries', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.body['queries']).toEqual(queries);
        expect(options.path['db']).toEqual(db);
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

        cloudantService.postLocalDocsQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postLocalDocsQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postLocalDocsQueriesPromise = cloudantService.postLocalDocsQueries();
        expectToBePromise(postLocalDocsQueriesPromise);

        postLocalDocsQueriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postMissingRevs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postMissingRevs
        const db = 'testString';
        const documentRevisions = { 'key1': ['testString'] };
        const params = {
          db: db,
          documentRevisions: documentRevisions,
        };

        const postMissingRevsResult = cloudantService.postMissingRevs(params);

        // all methods should return a Promise
        expectToBePromise(postMissingRevsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_missing_revs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(documentRevisions);
        expect(options.path['db']).toEqual(db);
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

        cloudantService.postMissingRevs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postMissingRevs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postMissingRevsPromise = cloudantService.postMissingRevs();
        expectToBePromise(postMissingRevsPromise);

        postMissingRevsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('postRevsDiff', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_revs_diff', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(documentRevisions);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postRevsDiff({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postRevsDiffPromise = cloudantService.postRevsDiff();
        expectToBePromise(postRevsDiffPromise);

        postRevsDiffPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getShardsInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_shards', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getShardsInformation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getShardsInformationPromise = cloudantService.getShardsInformation();
        expectToBePromise(getShardsInformationPromise);

        getShardsInformationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentShardsInfo', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/{db}/_shards/{doc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['db']).toEqual(db);
        expect(options.path['doc_id']).toEqual(docId);
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
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.getDocumentShardsInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentShardsInfoPromise = cloudantService.getDocumentShardsInfo();
        expectToBePromise(getDocumentShardsInfoPromise);

        getDocumentShardsInfoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('headUpInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation headUpInformation
        const params = {};

        const headUpInformationResult = cloudantService.headUpInformation(params);

        // all methods should return a Promise
        expectToBePromise(headUpInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_up', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getActiveTasks
        const params = {};

        const getActiveTasksResult = cloudantService.getActiveTasks(params);

        // all methods should return a Promise
        expectToBePromise(getActiveTasksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_active_tasks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getUpInformation
        const params = {};

        const getUpInformationResult = cloudantService.getUpInformation(params);

        // all methods should return a Promise
        expectToBePromise(getUpInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_up', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
  describe('getActivityTrackerEventsInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getActivityTrackerEventsInformation
        const params = {};

        const getActivityTrackerEventsInformationResult = cloudantService.getActivityTrackerEventsInformation(params);

        // all methods should return a Promise
        expectToBePromise(getActivityTrackerEventsInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/activity_tracker/events', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        cloudantService.getActivityTrackerEventsInformation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cloudantService.getActivityTrackerEventsInformation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('postActivityTrackerEventsConfiguration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postActivityTrackerEventsConfiguration
        const types = ['management'];
        const params = {
          types: types,
        };

        const postActivityTrackerEventsConfigurationResult = cloudantService.postActivityTrackerEventsConfiguration(params);

        // all methods should return a Promise
        expectToBePromise(postActivityTrackerEventsConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/activity_tracker/events', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['types']).toEqual(types);
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

        cloudantService.postActivityTrackerEventsConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await cloudantService.postActivityTrackerEventsConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postActivityTrackerEventsConfigurationPromise = cloudantService.postActivityTrackerEventsConfiguration();
        expectToBePromise(postActivityTrackerEventsConfigurationPromise);

        postActivityTrackerEventsConfigurationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCurrentThroughputInformation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCurrentThroughputInformation
        const params = {};

        const getCurrentThroughputInformationResult = cloudantService.getCurrentThroughputInformation(params);

        // all methods should return a Promise
        expectToBePromise(getCurrentThroughputInformationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/_api/v2/user/current/throughput', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
