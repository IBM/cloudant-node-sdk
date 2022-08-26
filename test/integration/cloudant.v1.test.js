/**
 * (C) Copyright IBM Corp. 2022.
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

/* eslint-disable no-console */

const CloudantV1 = require('../../dist/cloudant/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'cloudant_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('CloudantV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let cloudantService;

  test('Initialise service', async() => {
    cloudantService = CloudantV1.newInstance();

    expect(cloudantService).not.toBeNull();

    const config = readExternalSources(CloudantV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    cloudantService.enableRetries();
  });

  test('getServerInformation()', async () => {
    const res = await cloudantService.getServerInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getMembershipInformation()', async () => {
    const res = await cloudantService.getMembershipInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getUuids()', async () => {
    const params = {
      count: 1,
    };

    const res = await cloudantService.getUuids(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getCapacityThroughputInformation()', async () => {
    const res = await cloudantService.getCapacityThroughputInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putCapacityThroughputConfiguration()', async () => {
    const params = {
      blocks: 0,
    };

    const res = await cloudantService.putCapacityThroughputConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDbUpdates()', async () => {
    const params = {
      feed: 'normal',
      heartbeat: 0,
      timeout: 0,
      since: '0',
    };

    const res = await cloudantService.getDbUpdates(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postChanges()', async () => {
    const params = {
      db: 'testString',
      docIds: ['testString'],
      fields: ['testString'],
      selector: { 'key1': 'testString' },
      lastEventId: 'testString',
      attEncodingInfo: false,
      attachments: false,
      conflicts: false,
      descending: false,
      feed: 'normal',
      filter: 'testString',
      heartbeat: 0,
      includeDocs: false,
      limit: 0,
      seqInterval: 1,
      since: '0',
      style: 'main_only',
      timeout: 0,
      view: 'testString',
    };

    const res = await cloudantService.postChanges(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postChangesAsStream()', async () => {
    const params = {
      db: 'testString',
      docIds: ['testString'],
      fields: ['testString'],
      selector: { 'key1': 'testString' },
      lastEventId: 'testString',
      attEncodingInfo: false,
      attachments: false,
      conflicts: false,
      descending: false,
      feed: 'normal',
      filter: 'testString',
      heartbeat: 0,
      includeDocs: false,
      limit: 0,
      seqInterval: 1,
      since: '0',
      style: 'main_only',
      timeout: 0,
      view: 'testString',
    };

    const res = await cloudantService.postChangesAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headDatabase()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.headDatabase(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getAllDbs()', async () => {
    const params = {
      descending: false,
      endKey: 'testString',
      limit: 0,
      skip: 0,
      startKey: 'testString',
    };

    const res = await cloudantService.getAllDbs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postDbsInfo()', async () => {
    const params = {
      keys: ['testString'],
    };

    const res = await cloudantService.postDbsInfo(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDatabaseInformation()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.getDatabaseInformation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putDatabase()', async () => {
    const params = {
      db: 'testString',
      partitioned: false,
      q: 26,
    };

    const res = await cloudantService.putDatabase(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('headDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
      latest: false,
      rev: 'testString',
    };

    const res = await cloudantService.headDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postDocument()', async () => {
    const params = {
      db: 'testString',
      document: {},
      contentType: 'application/json',
      batch: 'ok',
    };

    const res = await cloudantService.postDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('postAllDocs()', async () => {
    const params = {
      db: 'testString',
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

    const res = await cloudantService.postAllDocs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postAllDocsAsStream()', async () => {
    const params = {
      db: 'testString',
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

    const res = await cloudantService.postAllDocsAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postAllDocsQueries()', async () => {
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
      end_key: 'testString',
      key: 'testString',
      keys: ['testString'],
      start_key: 'testString',
    };

    const params = {
      db: 'testString',
      queries: [allDocsQueryModel],
    };

    const res = await cloudantService.postAllDocsQueries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postAllDocsQueriesAsStream()', async () => {
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
      end_key: 'testString',
      key: 'testString',
      keys: ['testString'],
      start_key: 'testString',
    };

    const params = {
      db: 'testString',
      queries: [allDocsQueryModel],
    };

    const res = await cloudantService.postAllDocsQueriesAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postBulkDocs()', async () => {
    const params = {
      db: 'testString',
      bulkDocs: {"docs": [{}]},
    };

    const res = await cloudantService.postBulkDocs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('postBulkGet()', async () => {
    // Request models needed by this operation.

    // BulkGetQueryDocument
    const bulkGetQueryDocumentModel = {
      atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
      id: 'testString',
      rev: 'testString',
    };

    const params = {
      db: 'testString',
      docs: [bulkGetQueryDocumentModel],
      attachments: false,
      attEncodingInfo: false,
      latest: false,
      revs: false,
    };

    const res = await cloudantService.postBulkGet(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postBulkGetAsMixed()', async () => {
    // Request models needed by this operation.

    // BulkGetQueryDocument
    const bulkGetQueryDocumentModel = {
      atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
      id: 'testString',
      rev: 'testString',
    };

    const params = {
      db: 'testString',
      docs: [bulkGetQueryDocumentModel],
      attachments: false,
      attEncodingInfo: false,
      latest: false,
      revs: false,
    };

    const res = await cloudantService.postBulkGetAsMixed(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postBulkGetAsRelated()', async () => {
    // Request models needed by this operation.

    // BulkGetQueryDocument
    const bulkGetQueryDocumentModel = {
      atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
      id: 'testString',
      rev: 'testString',
    };

    const params = {
      db: 'testString',
      docs: [bulkGetQueryDocumentModel],
      attachments: false,
      attEncodingInfo: false,
      latest: false,
      revs: false,
    };

    const res = await cloudantService.postBulkGetAsRelated(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postBulkGetAsStream()', async () => {
    // Request models needed by this operation.

    // BulkGetQueryDocument
    const bulkGetQueryDocumentModel = {
      atts_since: ['1-99b02e08da151943c2dcb40090160bb8'],
      id: 'testString',
      rev: 'testString',
    };

    const params = {
      db: 'testString',
      docs: [bulkGetQueryDocumentModel],
      attachments: false,
      attEncodingInfo: false,
      latest: false,
      revs: false,
    };

    const res = await cloudantService.postBulkGetAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDocumentAsMixed()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getDocumentAsMixed(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDocumentAsRelated()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getDocumentAsRelated(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDocumentAsStream()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getDocumentAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      document: {},
      contentType: 'application/json',
      ifMatch: 'testString',
      batch: 'ok',
      newEdits: false,
      rev: 'testString',
    };

    const res = await cloudantService.putDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('headDesignDocument()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      ifNoneMatch: 'testString',
    };

    const res = await cloudantService.headDesignDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDesignDocument()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getDesignDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putDesignDocument()', async () => {
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
      foo: 'testString',
    };

    const params = {
      db: 'testString',
      ddoc: 'testString',
      designDocument: designDocumentModel,
      ifMatch: 'testString',
      batch: 'ok',
      newEdits: false,
      rev: 'testString',
    };

    const res = await cloudantService.putDesignDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getDesignDocumentInformation()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
    };

    const res = await cloudantService.getDesignDocumentInformation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postDesignDocs()', async () => {
    const params = {
      db: 'testString',
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
      accept: 'application/json',
    };

    const res = await cloudantService.postDesignDocs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postDesignDocsQueries()', async () => {
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
      end_key: 'testString',
      key: 'testString',
      keys: ['testString'],
      start_key: 'testString',
    };

    const params = {
      db: 'testString',
      queries: [allDocsQueryModel],
      accept: 'application/json',
    };

    const res = await cloudantService.postDesignDocsQueries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postView()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      view: 'testString',
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

    const res = await cloudantService.postView(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postViewAsStream()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      view: 'testString',
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

    const res = await cloudantService.postViewAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postViewQueries()', async () => {
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
      end_key: 'testString',
      end_key_doc_id: 'testString',
      group: false,
      group_level: 1,
      key: 'testString',
      keys: ['testString'],
      reduce: true,
      stable: false,
      start_key: 'testString',
      start_key_doc_id: 'testString',
      update: 'true',
    };

    const params = {
      db: 'testString',
      ddoc: 'testString',
      view: 'testString',
      queries: [viewQueryModel],
    };

    const res = await cloudantService.postViewQueries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postViewQueriesAsStream()', async () => {
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
      end_key: 'testString',
      end_key_doc_id: 'testString',
      group: false,
      group_level: 1,
      key: 'testString',
      keys: ['testString'],
      reduce: true,
      stable: false,
      start_key: 'testString',
      start_key_doc_id: 'testString',
      update: 'true',
    };

    const params = {
      db: 'testString',
      ddoc: 'testString',
      view: 'testString',
      queries: [viewQueryModel],
    };

    const res = await cloudantService.postViewQueriesAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getPartitionInformation()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
    };

    const res = await cloudantService.getPartitionInformation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionAllDocs()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
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

    const res = await cloudantService.postPartitionAllDocs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionAllDocsAsStream()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
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

    const res = await cloudantService.postPartitionAllDocsAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionSearch()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      ddoc: 'testString',
      index: 'testString',
      query: 'testString',
      bookmark: 'testString',
      highlightFields: ['testString'],
      highlightNumber: 1,
      highlightPostTag: '</em>',
      highlightPreTag: '<em>',
      highlightSize: 1,
      includeDocs: false,
      includeFields: ['testString'],
      limit: 0,
      sort: ['testString'],
      stale: 'ok',
    };

    const res = await cloudantService.postPartitionSearch(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionSearchAsStream()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      ddoc: 'testString',
      index: 'testString',
      query: 'testString',
      bookmark: 'testString',
      highlightFields: ['testString'],
      highlightNumber: 1,
      highlightPostTag: '</em>',
      highlightPreTag: '<em>',
      highlightSize: 1,
      includeDocs: false,
      includeFields: ['testString'],
      limit: 0,
      sort: ['testString'],
      stale: 'ok',
    };

    const res = await cloudantService.postPartitionSearchAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionView()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      ddoc: 'testString',
      view: 'testString',
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

    const res = await cloudantService.postPartitionView(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionViewAsStream()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      ddoc: 'testString',
      view: 'testString',
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

    const res = await cloudantService.postPartitionViewAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionFind()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      selector: { 'key1': 'testString' },
      bookmark: 'testString',
      conflicts: true,
      executionStats: true,
      fields: ['testString'],
      limit: 0,
      skip: 0,
      sort: [{ 'key1': 'asc' }],
      stable: true,
      update: 'true',
      useIndex: ['testString'],
    };

    const res = await cloudantService.postPartitionFind(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postPartitionFindAsStream()', async () => {
    const params = {
      db: 'testString',
      partitionKey: 'testString',
      selector: { 'key1': 'testString' },
      bookmark: 'testString',
      conflicts: true,
      executionStats: true,
      fields: ['testString'],
      limit: 0,
      skip: 0,
      sort: [{ 'key1': 'asc' }],
      stable: true,
      update: 'true',
      useIndex: ['testString'],
    };

    const res = await cloudantService.postPartitionFindAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postExplain()', async () => {
    const params = {
      db: 'testString',
      selector: { 'key1': 'testString' },
      bookmark: 'testString',
      conflicts: true,
      executionStats: true,
      fields: ['testString'],
      limit: 0,
      skip: 0,
      sort: [{ 'key1': 'asc' }],
      stable: true,
      update: 'true',
      useIndex: ['testString'],
      r: 1,
    };

    const res = await cloudantService.postExplain(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postFind()', async () => {
    const params = {
      db: 'testString',
      selector: { 'key1': 'testString' },
      bookmark: 'testString',
      conflicts: true,
      executionStats: true,
      fields: ['testString'],
      limit: 0,
      skip: 0,
      sort: [{ 'key1': 'asc' }],
      stable: true,
      update: 'true',
      useIndex: ['testString'],
      r: 1,
    };

    const res = await cloudantService.postFind(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postFindAsStream()', async () => {
    const params = {
      db: 'testString',
      selector: { 'key1': 'testString' },
      bookmark: 'testString',
      conflicts: true,
      executionStats: true,
      fields: ['testString'],
      limit: 0,
      skip: 0,
      sort: [{ 'key1': 'asc' }],
      stable: true,
      update: 'true',
      useIndex: ['testString'],
      r: 1,
    };

    const res = await cloudantService.postFindAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getIndexesInformation()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.getIndexesInformation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postIndex()', async () => {
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

    const params = {
      db: 'testString',
      index: indexDefinitionModel,
      ddoc: 'testString',
      def: indexDefinitionModel,
      name: 'testString',
      partitioned: true,
      type: 'json',
    };

    const res = await cloudantService.postIndex(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postSearchAnalyze()', async () => {
    const params = {
      analyzer: 'arabic',
      text: 'testString',
    };

    const res = await cloudantService.postSearchAnalyze(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postSearch()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      index: 'testString',
      query: 'testString',
      bookmark: 'testString',
      highlightFields: ['testString'],
      highlightNumber: 1,
      highlightPostTag: '</em>',
      highlightPreTag: '<em>',
      highlightSize: 1,
      includeDocs: false,
      includeFields: ['testString'],
      limit: 0,
      sort: ['testString'],
      stale: 'ok',
      counts: ['testString'],
      drilldown: [['testString']],
      groupField: 'testString',
      groupLimit: 1,
      groupSort: ['testString'],
      ranges: { 'key1': { 'key1': { 'key1': 'testString' } } },
    };

    const res = await cloudantService.postSearch(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postSearchAsStream()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      index: 'testString',
      query: 'testString',
      bookmark: 'testString',
      highlightFields: ['testString'],
      highlightNumber: 1,
      highlightPostTag: '</em>',
      highlightPreTag: '<em>',
      highlightSize: 1,
      includeDocs: false,
      includeFields: ['testString'],
      limit: 0,
      sort: ['testString'],
      stale: 'ok',
      counts: ['testString'],
      drilldown: [['testString']],
      groupField: 'testString',
      groupLimit: 1,
      groupSort: ['testString'],
      ranges: { 'key1': { 'key1': { 'key1': 'testString' } } },
    };

    const res = await cloudantService.postSearchAsStream(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSearchInfo()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      index: 'testString',
    };

    const res = await cloudantService.getSearchInfo(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headReplicationDocument()', async () => {
    const params = {
      docId: 'testString',
      ifNoneMatch: 'testString',
    };

    const res = await cloudantService.headReplicationDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headSchedulerDocument()', async () => {
    const params = {
      docId: 'testString',
    };

    const res = await cloudantService.headSchedulerDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headSchedulerJob()', async () => {
    const params = {
      jobId: 'testString',
    };

    const res = await cloudantService.headSchedulerJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getReplicationDocument()', async () => {
    const params = {
      docId: 'testString',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      conflicts: false,
      deletedConflicts: false,
      latest: false,
      localSeq: false,
      meta: false,
      rev: 'testString',
      revs: false,
      revsInfo: false,
    };

    const res = await cloudantService.getReplicationDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putReplicationDocument()', async () => {
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
      q: 26,
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
      winning_revs_only: false,
      worker_batch_size: 1,
      worker_processes: 1,
      foo: 'testString',
    };

    const params = {
      docId: 'testString',
      replicationDocument: replicationDocumentModel,
      ifMatch: 'testString',
      batch: 'ok',
      newEdits: false,
      rev: 'testString',
    };

    const res = await cloudantService.putReplicationDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getSchedulerDocs()', async () => {
    const params = {
      limit: 0,
      skip: 0,
      states: ['initializing'],
    };

    const res = await cloudantService.getSchedulerDocs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSchedulerDocument()', async () => {
    const params = {
      docId: 'testString',
    };

    const res = await cloudantService.getSchedulerDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSchedulerJobs()', async () => {
    const params = {
      limit: 0,
      skip: 0,
    };

    const res = await cloudantService.getSchedulerJobs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSchedulerJob()', async () => {
    const params = {
      jobId: 'testString',
    };

    const res = await cloudantService.getSchedulerJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSessionInformation()', async () => {
    const res = await cloudantService.getSessionInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSecurity()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.getSecurity(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putSecurity()', async () => {
    // Request models needed by this operation.

    // SecurityObject
    const securityObjectModel = {
      names: ['testString'],
      roles: ['testString'],
    };

    const params = {
      db: 'testString',
      admins: securityObjectModel,
      members: securityObjectModel,
      cloudant: { 'key1': ['_reader'] },
      couchdbAuthOnly: true,
    };

    const res = await cloudantService.putSecurity(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postApiKeys()', async () => {
    const res = await cloudantService.postApiKeys();
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('putCloudantSecurityConfiguration()', async () => {
    // Request models needed by this operation.

    // SecurityObject
    const securityObjectModel = {
      names: ['testString'],
      roles: ['testString'],
    };

    const params = {
      db: 'testString',
      cloudant: { 'key1': ['_reader'] },
      admins: securityObjectModel,
      members: securityObjectModel,
      couchdbAuthOnly: true,
    };

    const res = await cloudantService.putCloudantSecurityConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getCorsInformation()', async () => {
    const res = await cloudantService.getCorsInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putCorsConfiguration()', async () => {
    const params = {
      origins: ['testString'],
      allowCredentials: true,
      enableCors: true,
    };

    const res = await cloudantService.putCorsConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headAttachment()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      attachmentName: 'testString',
      ifMatch: 'testString',
      ifNoneMatch: 'testString',
      rev: 'testString',
    };

    const res = await cloudantService.headAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getAttachment()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      attachmentName: 'testString',
      accept: 'testString',
      ifMatch: 'testString',
      ifNoneMatch: 'testString',
      range: 'testString',
      rev: 'testString',
    };

    const res = await cloudantService.getAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putAttachment()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      attachmentName: 'testString',
      attachment: Buffer.from('This is a mock file.'),
      contentType: 'application/octet-stream',
      ifMatch: 'testString',
      rev: 'testString',
    };

    const res = await cloudantService.putAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('headLocalDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifNoneMatch: 'testString',
    };

    const res = await cloudantService.headLocalDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getLocalDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      accept: 'application/json',
      ifNoneMatch: 'testString',
      attachments: false,
      attEncodingInfo: false,
      localSeq: false,
    };

    const res = await cloudantService.getLocalDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('putLocalDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      document: {},
      contentType: 'application/json',
      batch: 'ok',
    };

    const res = await cloudantService.putLocalDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('postRevsDiff()', async () => {
    const params = {
      db: 'testString',
      documentRevisions: { 'key1': ['testString'] },
    };

    const res = await cloudantService.postRevsDiff(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getShardsInformation()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.getShardsInformation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getDocumentShardsInfo()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
    };

    const res = await cloudantService.getDocumentShardsInfo(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('headUpInformation()', async () => {
    const res = await cloudantService.headUpInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getActiveTasks()', async () => {
    const res = await cloudantService.getActiveTasks();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getUpInformation()', async () => {
    const res = await cloudantService.getUpInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getActivityTrackerEvents()', async () => {
    const res = await cloudantService.getActivityTrackerEvents();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('postActivityTrackerEvents()', async () => {
    const params = {
      types: ['management'],
    };

    const res = await cloudantService.postActivityTrackerEvents(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getCurrentThroughputInformation()', async () => {
    const res = await cloudantService.getCurrentThroughputInformation();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteReplicationDocument()', async () => {
    const params = {
      docId: 'testString',
      ifMatch: 'testString',
      batch: 'ok',
      rev: 'testString',
    };

    const res = await cloudantService.deleteReplicationDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteLocalDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      batch: 'ok',
    };

    const res = await cloudantService.deleteLocalDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteIndex()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      type: 'json',
      index: 'testString',
    };

    const res = await cloudantService.deleteIndex(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteDocument()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      ifMatch: 'testString',
      batch: 'ok',
      rev: 'testString',
    };

    const res = await cloudantService.deleteDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteDesignDocument()', async () => {
    const params = {
      db: 'testString',
      ddoc: 'testString',
      ifMatch: 'testString',
      batch: 'ok',
      rev: 'testString',
    };

    const res = await cloudantService.deleteDesignDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteDatabase()', async () => {
    const params = {
      db: 'testString',
    };

    const res = await cloudantService.deleteDatabase(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteAttachment()', async () => {
    const params = {
      db: 'testString',
      docId: 'testString',
      attachmentName: 'testString',
      ifMatch: 'testString',
      rev: 'testString',
      batch: 'ok',
    };

    const res = await cloudantService.deleteAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
