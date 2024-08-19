# `0.9.0`

The code generator used to produce earlier versions of the SDK created output with some limitations.

Firstly, inconsistent naming conventions.
Properties on function parameter models followed the TypeScript(TS)/JavaScript(JS) camel case convention whilst nested objects within those models and function return object models had the raw CouchDB convention (snake case).
This inconsistency prevented some return objects being easily edited and then used in later calls.

Secondly, some nested structures used a `JsonObject` with a `string` to `any` mapping when a more specific type for the mapping value is preferable.

Version `0.9.0` regenerates the SDK with these limitations resolved.
This means from version `0.9.0` there are a number of breaking changes from earlier versions of the SDK as the SDK API now follows the TS/JS camel case naming convention wherever possible. The exceptions to camel case naming are the CouchDB underscore prefixed metadata properties in documents. These retain their raw names to avoid potential clashes with identically named, but not underscore prefixed, user defined names.

The tables in the next section outline the breaking changes by SDK function. In cases where existing code references the old names users should update the code by [renaming properties](#option-1-renaming-properties). These changes don't impact user-defined property names in documents.
As well as using the new names translation from the raw snake case server-side names to the camel case client-side names (and vice versa) is possible with [built-in functions](#option-2-using-built-in-functions).

No code changes are necessary for the type changes. Before using a wrong type wasn't detected and would likely fail on the server. Now for TS usage the wrong type causes a compile time failure.

## Tables of changes by function

### `deleteAttachment`, `deleteDesignDocument`, `deleteDocument`, `deleteLocalDocument`, `deleteReplicationDocument`, `putAttachment`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DocumentResult`](#cloudantv1documentresult) (`caused_by` property only).

### `getActiveTasks`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.ActiveTask`.

| `CloudantV1.ActiveTask` property name (<`0.9.0`) | `CloudantV1.ActiveTask` property name (>=`0.9.0`) |
| --- | --- |
| `bulk_get_attempts` | `bulkGetAttempts` |
| `bulk_get_docs` | `bulkGetDocs` |
| `changes_done` | `changesDone` |
| `changes_pending` | `changesPending` |
| `checkpoint_interval` | `checkpointInterval` |
| `checkpointed_source_seq` | `checkpointedSourceSeq` |
| `design_document` | `designDocument` |
| `doc_id` | `docId` |
| `doc_write_failures` | `docWriteFailures` |
| `docs_read` | `docsRead` |
| `docs_written` | `docsWritten` |
| `indexer_pid` | `indexerPid` |
| `missing_revisions_found` | `missingRevisionsFound` |
| `process_status` | `processStatus` |
| `replication_id` | `replicationId` |
| `revisions_checked` | `revisionsChecked` |
| `source_seq` | `sourceSeq` |
| `started_on` | `startedOn` |
| `through_seq` | `throughSeq` |
| `total_changes` | `totalChanges` |
| `updated_on` | `updatedOn` |

### `getCorsInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.CorsInformation`.

| `CloudantV1.CorsInformation` property name (<`0.9.0`) | `CloudantV1.CorsInformation` property name (>=`0.9.0`) |
| --- | --- |
| `allow_credentials` | `allowCredentials` |
| `enable_cors` | `enableCors` |

### `getDatabaseInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DatabaseInformation`](#cloudantv1databaseinformation).

### `getDbUpdates`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.DbUpdates`.

| `CloudantV1.DbUpdates` property name (<`0.9.0`) | `CloudantV1.DbUpdates` property name (>=`0.9.0`) |
| --- | --- |
| `results[i]` | Element renames required see [`CloudantV1.DbEvent`](#cloudantv1dbevent) |
| `last_seq` | `lastSeq` |

### `getDesignDocument`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DesignDocument`](#cloudantv1designdocument).

### `getDesignDocumentInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.DesignDocumentInformation` and nested `view_index` `CloudantV1.DesignDocumentViewIndex`.

| `CloudantV1.DesignDocumentInformation` property name (<`0.9.0`) | `CloudantV1.DesignDocumentInformation` property name (>=`0.9.0`) |
| --- | --- |
| `view_index` | `viewIndex` (nested renames also required see next table) |

| `CloudantV1.DesignDocumentViewIndex` property name (<`0.9.0`) | `CloudantV1.DesignDocumentViewIndex` property name (>=`0.9.0`) |
| --- | --- |
| `collator_versions` | `collatorVersions` |
| `compact_running` | `compactRunning` |
| `updater_running` | `updaterRunning` |
| `updates_pending` | `updatesPending` |
| `waiting_clients` | `waitingClients` |
| `waiting_commit` | `waitingCommit` |

### `getDocument`, `getLocalDocument`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.Document`](#cloudantv1document) (`_attachments` only).

### `getIndexesInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.IndexesInformation` and nested `indexes` [`CloudantV1.IndexInformation`](#cloudantv1indexinformation).

| `CloudantV1.IndexesInformation` property name (<`0.9.0`) | `CloudantV1.IndexesInformation` property type (<`0.9.0`) | `CloudantV1.IndexesInformation` property name (>=`0.9.0`) | `CloudantV1.IndexesInformation` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `indexes[i]` | | Element renames required see [`CloudantV1.IndexInformation`](#cloudantv1indexinformation) | |
| `total_rows` | `number` | `totalRows` | `number \| null` |

### `getMembershipInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.MembershipInformation`.

| `CloudantV1.MembershipInformation` property name (<`0.9.0`) | `CloudantV1.MembershipInformation` property name (>=`0.9.0`) |
| --- | --- |
| `all_nodes` | `allNodes` |
| `cluster_nodes` | `clusterNodes` |

### `getPartitionInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.PartitionInformation`.

| `CloudantV1.PartitionInformation` property name (<`0.9.0`) | `CloudantV1.PartitionInformation` property name (>=`0.9.0`) |
| --- | --- |
| `db_name` | `dbName` |
| `doc_count` | `docCount` |
| `doc_del_count` | `docDelCount` |
| `partitioned_indexes` | `partitionedIndexes` |

### `getReplicationDocument`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.ReplicationDocument`](#cloudantv1replicationdocument).

### `getSchedulerDocs`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.SchedulerDocsResult` and nested `docs` [`CloudantV1.SchedulerDocument`](#cloudantv1schedulerdocument).

| `CloudantV1.SchedulerDocsResult` property name (<`0.9.0`) | `CloudantV1.SchedulerDocsResult` property type (<`0.9.0`) | `CloudantV1.SchedulerDocsResult` property name (>=`0.9.0`) | `CloudantV1.SchedulerDocsResult` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `docs[i]` | | Element renames required see [`CloudantV1.SchedulerDocument`](#cloudantv1schedulerdocument) | |
| `total_rows` | `number` | `totalRows` | `number \| null` |

### `getSchedulerDocument`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.SchedulerDocument`](#cloudantv1schedulerdocument).

### `getSchedulerJob`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.SchedulerJob`](#cloudantv1schedulerjob).

### `getSchedulerJobs`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.SchedulerJobsResult` and nested `jobs` [`CloudantV1.SchedulerJob`](#cloudantv1schedulerjob).

| `CloudantV1.SchedulerJobsResult` property name (<`0.9.0`) | `CloudantV1.SchedulerJobsResult` property type (<`0.9.0`) | `CloudantV1.SchedulerJobsResult` property name (>=`0.9.0`) | `CloudantV1.SchedulerJobsResult` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `jobs[i]` | | Element renames required see [`CloudantV1.SchedulerJob`](#cloudantv1schedulerjob) | |
| `total_rows` | `number` | `totalRows` | `number \| null` |

### `getSearchInfo`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.SearchInfoResult` and nested `search_index` `CloudantV1.SearchIndexInfo`.

| `CloudantV1.SearchInfoResult` property name (<`0.9.0`) | `CloudantV1.SearchInfoResult` property name (>=`0.9.0`) |
| --- | --- |
| `search_index` | `searchIndex` (nested renames also required see next table) |

| `CloudantV1.SearchIndexInfo` property name (<`0.9.0`) | `CloudantV1.SearchIndexInfo` property name (>=`0.9.0`) |
| --- | --- |
| `committed_seq` | `committedSeq` |
| `disk_size` | `diskSize` |
| `doc_count` | `docCount` |
| `doc_del_count` | `docDelCount` |
| `pending_seq` | `pendingSeq` |

### `getSecurity`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.Security`.

| `CloudantV1.Security` property name (<`0.9.0`) | `CloudantV1.Security` property name (>=`0.9.0`) |
| --- | --- |
| `couchdb_auth_only` | `couchdbAuthOnly` |

### `getServerInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.ServerInformation`.

| `CloudantV1.ServerInformation` property name (<`0.9.0`) | `CloudantV1.ServerInformation` property name (>=`0.9.0`) |
| --- | --- |
| `features_flags` | `featuresFlags` |

### `getSessionInformation`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.SessionAuthentication` nested in `CloudantV1.SessionInformation` `info`.

| `CloudantV1.SessionInformation` property name (<`0.9.0`) | `CloudantV1.SessionInformation` property name (>=`0.9.0`) |
| --- | --- |
| `info` | Nested renames required see next table |

| `CloudantV1.SessionAuthentication` property name (<`0.9.0`) | `CloudantV1.SessionAuthentication` property name (>=`0.9.0`) |
| --- | --- |
| `authentication_db` | `authenticationDb` |
| `authentication_handlers` | `authenticationHandlers` |

### `postAllDocs`, `postDesignDocs`, `postPartitionAllDocs`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.AllDocsResult`](#cloudantv1alldocsresult).

### `postAllDocsQueries`, `postDesignDocsQueries`

#### Function parameter `params` object changes

Renames properties of nested [`CloudantV1.AllDocsQuery`](#cloudantv1alldocsquery) in `CloudantV1.PostAllDocsQueriesParams` `queries`.

| `CloudantV1.PostAllDocsQueriesParams` property name (<`0.9.0`) | `CloudantV1.PostAllDocsQueriesParams` property name (>=`0.9.0`) |
| --- | --- |
| `queries[i]` | Element renames required see [`CloudantV1.AllDocsQuery`](#cloudantv1alldocsquery) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.AllDocsQueriesResult` and nested `results` [`CloudantV1.AllDocsResult`](#cloudantv1alldocsresult).

| `CloudantV1.AllDocsQueriesResult` property name (<`0.9.0`) | `CloudantV1.AllDocsQueriesResult` property name (>=`0.9.0`) |
| --- | --- |
| `results[i]` | Element renames required see [`CloudantV1.AllDocsResult`](#cloudantv1alldocsresult) |

### `postAllDocsQueriesAsStream`

#### Function parameter `params` object changes

Renames properties of nested [`CloudantV1.AllDocsQuery`](#cloudantv1alldocsquery) in `CloudantV1.PostAllDocsQueriesParams` `queries`.

| `CloudantV1.PostAllDocsQueriesParams` property name (<`0.9.0`) | `CloudantV1.PostAllDocsQueriesParams` property name (>=`0.9.0`) |
| --- | --- |
| `queries[i]` | Element renames required see [`CloudantV1.AllDocsQuery`](#cloudantv1alldocsquery) |

### `postBulkDocs`

#### Function parameter `params` object changes

Renames properties of nested [`CloudantV1.BulkDocs`](#cloudantv1bulkdocs) in `CloudantV1.PostBulkDocsParams` `bulkDocs`.

| `CloudantV1.PostBulkDocsParams` property name (<`0.9.0`) | `CloudantV1.PostBulkDocsParams` property name (>=`0.9.0`) |
| --- | --- |
| `bulkDocs` | Nested renames required see [`CloudantV1.BulkDocs`](#cloudantv1bulkdocs) |

#### Function return `Promise<CloudantV1.Response>` `result` property array changes

Renames properties of nested [`CloudantV1.DocumentResult`](#cloudantv1documentresult).

| Return array element property name (<`0.9.0`) | Return array element property name (>=`0.9.0`) |
| --- | --- |
| `[i]` | Element renames required for `caused_by` only see [`CloudantV1.DocumentResult`](#cloudantv1documentresult) |

### `postBulkGet`

#### Function parameter `params` object changes

Renames properties of nested [`CloudantV1.BulkGetQueryDocument`](#cloudantv1bulkgetquerydocument) in `CloudantV1.PostBulkGetParams` `docs`.

| `CloudantV1.PostBulkGetParams` property name (<`0.9.0`) | `CloudantV1.PostBulkGetParams` property name (>=`0.9.0`) |
| --- | --- |
| `docs` | Element renames required for `atts_since` see [`CloudantV1.BulkGetQueryDocument`](#cloudantv1bulkgetquerydocument) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DocumentResult`](#cloudantv1documentresult) nested in `CloudantV1.BulkGetResult` elements with `error`.

| `CloudantV1.BulkGetResult` property name (<`0.9.0`) | Return object property name (>=`0.9.0`) |
| --- | --- |
| `results[i].docs[i].error` | Element renames required for `caused_by` only see [`CloudantV1.DocumentResult`](#cloudantv1documentresult) |

### `postBulkGetAsMixed`, `postBulkGetAsStream`

#### Function parameter `params` object changes

Renames properties of nested [`CloudantV1.BulkGetQueryDocument`](#cloudantv1bulkgetquerydocument) in `CloudantV1.PostBulkGetParams` `docs`.

| `CloudantV1.PostBulkGetParams` property name (<`0.9.0`) | `CloudantV1.PostBulkGetParams` property name (>=`0.9.0`) |
| --- | --- |
| `docs` | Element renames required for `atts_since` see [`CloudantV1.BulkGetQueryDocument`](#cloudantv1bulkgetquerydocument) |

### `postChanges`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.ChangesResult`.

| `CloudantV1.ChangesResult` property name (<`0.9.0`) | `ChangesResult` property name (>=`0.9.0`) |
| --- | --- |
| `last_seq` | `lastSeq` |

### `postDbsInfo`

#### Function return `Promise<CloudantV1.Response>` `result` property array changes

Renames properties of nested [`CloudantV1.DatabaseInformation`](#cloudantv1databaseinformation) `info` property of elements.

| Return array element property name (<`0.9.0`) | Return array element property name (>=`0.9.0`) |
| --- | --- |
| `[i].info` | Element renames required see [`CloudantV1.DatabaseInformation`](#cloudantv1databaseinformation) |

### `postDocument`, `putDocument`, `putLocalDocument`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.Document`](#cloudantv1document) nested in `CloudantV1.PostDocumentParams`,`CloudantV1.PutDocumentParams` or `CloudantV1.PutLocalDocumentParams` `document`.

| `params` parameter name (<`0.9.0`) | `params` parameter name (>=`0.9.0`) |
| --- | --- |
| `document` | Nested renames required for `_attachments` only see [`CloudantV1.Document`](#cloudantv1document) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DocumentResult`](#cloudantv1documentresult) (`caused_by` property only).

### `postExplain`, `postPartitionExplain`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.ExplainResult` and nested `index` [`CloudantV1.IndexInformation`](#cloudantv1indexinformation), `mrargs` `CloudantV1.ExplainResultMrArgs` and `opts` `CloudantV1.ExplainResult`.

| `CloudantV1.ExplainResult` property name (<`0.9.0`) | `CloudantV1.ExplainResult` property name (>=`0.9.0`) |
| --- | --- |
| `index` | Nested renames required see [`CloudantV1.IndexInformation`](#cloudantv1indexinformation) |
| `mrargs` | Nested renames required see table below |
| `opts` | Nested renames required see table below |

| `CloudantV1.ExplainResultMrArgs` property name (<`0.9.0`) | `CloudantV1.ExplainResultMrArgs` property type (<`0.9.0`) | `CloudantV1.ExplainResultMrArgs` property name (>=`0.9.0`) | `CloudantV1.ExplainResultMrArgs` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `end_key` | `any` | `endKey` | `any \| null` |
| `include_docs` || `includeDocs` ||
| `start_key` | `any` | `startKey` | `any \| null` |
| `view_type` | | `viewType` | |

| `CloudantV1.ExplainResultOpts` property name (<`0.9.0`) | `CloudantV1.ExplainResult` property name (>=`0.9.0`) |
| --- | --- |
| `execution_stats` | `executionStats` |
| `use_index` | `useIndex` |

### `postFind`, `postPartitionFind`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.FindResult` and nested `execution_stats` `CloudantV1.ExecutionStats`.

| `CloudantV1.FindResult` property name (<`0.9.0`) | `CloudantV1.FindResult` property name (>=`0.9.0`) |
| --- | --- |
| `execution_stats` | `executionStats` (nested renames also required see next table) |

| `CloudantV1.ExecutionStats` property name (<`0.9.0`) | `CloudantV1.ExecutionStats` property name (>=`0.9.0`) |
| --- | --- |
| `execution_time_ms` | `executionTimeMs` |
| `results_returned` | `resultsReturned` |
| `total_docs_examined` | `totalDocsExamined` |
| `total_keys_examined` | `totalKeysExamined` |
| `total_quorum_docs_examined` | `totalQuorumDocsExamined` |

### `postIndex`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.IndexDefinition`](#cloudantv1indexdefinition) nested in `CloudantV1.PostIndexParams` `index`.

| `CloudantV1.PostIndexParams` property name (<`0.9.0`) | `CloudantV1.PostIndexParams` property name (>=`0.9.0`) |
| --- | --- |
| `index` | Nested renames required see [`CloudantV1.IndexDefinition`](#cloudantv1indexdefinition) |

### `postRevsDiff`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of returned object.

| Return object property name (<`0.9.0`) | Return object property name (>=`0.9.0`) |
| --- | --- |
| `possible_ancestors` | `possibleAncestors` |

### `postSearch`, `postPartitionSearch`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of `CloudantV1.SearchResult` and nested `doc` [`CloudantV1.Document`](#cloudantv1document).

| `CloudantV1.SearchResult` property name (<`0.9.0`) | `CloudantV1.SearchResult` property type (<`0.9.0`) | `CloudantV1.SearchResult` property name (>=`0.9.0`) | `CloudantV1.SearchResult` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `counts` | `JsonObject` | `counts` | `{[key: string]: JsonObject}` |
| `groups` | | Nested renames required see [`CloudantV1.SearchResultProperties`](#cloudantv1searchresultproperties) | |
| `ranges` | `JsonObject` | `ranges` | `{[key: string]: JsonObject}` |
| `rows[i].doc` | | Nested renames required for `_attachments` only see [`CloudantV1.Document`](#cloudantv1document) | |
| `total_rows` | `number` | `totalRows` | `number \| null` |

### `postView`, `postPartitionView`

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.ViewResult`](#cloudantv1viewresult).

### `postViewQueries`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.ViewQuery`](#cloudantv1viewquery) nested in `CloudantV1.PostViewQueriesParams` `queries`.

| `CloudantV1.PostViewQueriesParams` property name (<`0.9.0`) | `CloudantV1.PostViewQueriesParams` property name (>=`0.9.0`) |
| --- | --- |
| `queries[i]` | Element renames required see [`CloudantV1.ViewQuery`](#cloudantv1viewquery) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

| `CloudantV1.ViewQueriesResult` property name (<`0.9.0`) | `CloudantV1.ViewQueriesResult` property name (>=`0.9.0`) |
| --- | --- |
| `results[i]` | Element renames required see [`CloudantV1.ViewResult`](#cloudantv1viewresult) |

### `postViewQueriesAsStream`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.ViewQuery`](#cloudantv1viewquery) nested in `CloudantV1.PostViewQueriesParams` `queries`.

| `CloudantV1.PostViewQueriesParams` property name (<`0.9.0`) | `CloudantV1.PostViewQueriesParams` property name (>=`0.9.0`) |
| --- | --- |
| `queries[i]` | Element renames required see [`CloudantV1.ViewQuery`](#cloudantv1viewquery) |

### `putDesignDocument`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.DesignDocument`](#cloudantv1designdocument) nested in `CloudantV1.PutDesignDocumentParams` `designDocument`.

| `CloudantV1.PutDesignDocumentParams` property name (<`0.9.0`) | `CloudantV1.PutDesignDocumentParams` property name (>=`0.9.0`) |
| --- | --- |
| `designDocument` | Nested renames required see [`CloudantV1.DesignDocument`](#cloudantv1designdocument) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DocumentResult`](#cloudantv1documentresult) (`caused_by` property only).

### `putReplicationDocument`

#### Function parameter `params` object changes

Renames properties of [`CloudantV1.ReplicationDocument`](#cloudantv1replicationdocument) nested in `CloudantV1.PutReplicationDocumentParams` `replicationDocument`.

| `CloudantV1.PutReplicationDocumentParams` property name (<`0.9.0`) | `CloudantV1.PutReplicationDocumentParams` property name (>=`0.9.0`) |
| --- | --- |
| `replicationDocument` | Nested renames required see [`CloudantV1.ReplicationDocument`](#cloudantv1replicationdocument) |

#### Function return `Promise<CloudantV1.Response>` `result` property object changes

Renames properties of [`CloudantV1.DocumentResult`](#cloudantv1documentresult) (`caused_by` property only).

## Tables of changes for specific types

### `CloudantV1.AllDocsQuery`

| `CloudantV1.AllDocsQuery` property name (<`0.9.0`) | `CloudantV1.AllDocsQuery` property name (>=`0.9.0`) |
| --- | --- |
| `att_encoding_info` | `attEncodingInfo` |
| `include_docs` | `includeDocs` |
| `inclusive_end` | `inclusiveEnd` |
| `update_seq` | `updateSeq` |
| `end_key` | `endKey` |
| `start_key` | `startKey` |

### `CloudantV1.AllDocsResult`

| `CloudantV1.AllDocsResult` property name (<`0.9.0`) | `CloudantV1.AllDocsResult` property type (<`0.9.0`) | `CloudantV1.AllDocsResult` property name (>=`0.9.0`) | `CloudantV1.AllDocsResult` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `rows[i]` || Element renames required for `caused_by` see [`CloudantV1.DocumentResult`](#cloudantv1documentresult) or `doc` `_attachments` only see [`CloudantV1.Document`](#cloudantv1document) ||
| `total_rows` | `number` | `totalRows` | `number \| null` |
| `update_seq` || `updateSeq` ||

### `CloudantV1.AnalyzerConfiguration`

| `CloudantV1.AnalyzerConfiguration` property name (<`0.9.0`) | `CloudantV1.AnalyzerConfiguration` property type (<`0.9.0`) | `CloudantV1.AnalyzerConfiguration` property name (>=`0.9.0`) | `CloudantV1.AnalyzerConfiguration` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `fields` | `JsonObject` | No rename required; type change only | `{[key: string]: Analyzer}` |

### `CloudantV1.Attachment`

| `CloudantV1.Attachment` property name (<`0.9.0`) | `CloudantV1.Attachment` property name (>=`0.9.0`) |
| --- | --- |
| `content_type` | `contentType` |
| `encoded_length` | `encodedLength` |

### `CloudantV1.BulkDocs`

| `CloudantV1.BulkDocs` property name (<`0.9.0`) | `CloudantV1.BulkDocs` property name (>=`0.9.0`) |
| --- | --- |
| `docs[i]` | Element renames required for `_attachments` only see [`CloudantV1.Document`](#cloudantv1document). |
| `new_edits` | `newEdits` |

### `CloudantV1.BulkGetQueryDocument`

| `CloudantV1.BulkGetQueryDocument` property name (<`0.9.0`) | `CloudantV1.BulkGetQueryDocument` property name (>=`0.9.0`) |
| --- | --- |
| `atts_since` | `attsSince` |

### `CloudantV1.DatabaseInformation`

| `CloudantV1.DatabaseInformation` property name (<`0.9.0`) | `CloudantV1.DatabaseInformation` property name (>=`0.9.0`) |
| --- | --- |
| `committed_update_seq` | `committedUpdateSeq` |
| `compact_running` | `compactRunning` |
| `compacted_seq` | `compactedSeq` |
| `db_name` | `dbName` |
| `disk_format_version` | `diskFormatVersion` |
| `doc_count` | `docCount` |
| `doc_del_count` | `docDelCount` |
| `update_seq` | `updateSeq` |
| `partitioned_indexes` | `partitionedIndexes` |

### `CloudantV1.DbEvent`

| `CloudantV1.DbEvent` property name (<`0.9.0`) | `CloudantV1.DbEvent` property name (>=`0.9.0`) |
| --- | --- |
| `db_name` | `dbName` |

### `CloudantV1.DesignDocument`

| `CloudantV1.DesignDocument` property name (<`0.9.0`) | `CloudantV1.DesignDocument` property type (<`0.9.0`) | `CloudantV1.DesignDocument` property name (>=`0.9.0`) | `CloudantV1.DesignDocument` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `_attachments` | `JsonObject` | No rename required; type change only | `{[key: string]: Attachment}` |
| `_attachments[k]` || Element renames required see [`CloudantV1.Attachment`](#cloudantv1attachment) | |
| `indexes` | `JsonObject` | No rename required; type change only | `{[key: string]: SearchIndexDefinition}` |
| `indexes[k]` || No element renames required type change only | See [`CloudantV1.SearchIndexDefinition`](#cloudantv1searchindexdefinition) |
| `validate_doc_update` || `validateDocUpdate` ||
| `views` | `JsonObject` | No rename required; type change only | `{[key: string]: DesignDocumentViewsMapReduce}` |

### `CloudantV1.Document`

| `CloudantV1.Document` property name (<`0.9.0`) | `CloudantV1.Document` property type (<`0.9.0`) | `CloudantV1.Document` property name (>=`0.9.0`) | `CloudantV1.Document` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `_attachments` | `JsonObject` | No rename required; type change only | `{[key: string]: Attachment}` |
| `_attachments[k]` || Element renames required see [`CloudantV1.Attachment`](#cloudantv1attachment) | |

### `CloudantV1.DocumentResult`

| `CloudantV1.DocumentResult` property name (<`0.9.0`) | `CloudantV1.DocumentResult` property name (>=`0.9.0`) |
| --- | --- |
| `caused_by` | `causedBy` |

### `CloudantV1.IndexDefinition`

| `CloudantV1.IndexDefinition` property name (<`0.9.0`) |`CloudantV1.IndexDefinition` property name (>=`0.9.0`) |
| --- | --- |
| `default_analyzer` | `defaultAnalyzer` |
| `default_field` | `defaultField` |
| `index_array_lengths` | `indexArrayLengths` |
| `partial_filter_selector` | `partialFilterSelector` |

### `CloudantV1.IndexInformation`

| `CloudantV1.IndexInformation` property name (<`0.9.0`) | `CloudantV1.IndexInformation` property name (>=`0.9.0`) |
| --- | --- |
| `def` | Nested renames required see [`CloudantV1.IndexDefinition`](#cloudantv1indexdefinition) |

### `CloudantV1.ReplicationDocument`

| `CloudantV1.ReplicationDocument` property name (<`0.9.0`) | `CloudantV1.ReplicationDocument` property type (<`0.9.0`) | `CloudantV1.ReplicationDocument` property name (>=`0.9.0`) | `CloudantV1.ReplicationDocument` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `_attachments` | `JsonObject` | No rename required; type change only | `{[key: string]: Attachment}` |
| `_attachments[k]` || Element renames required see [`CloudantV1.Attachment`](#cloudantv1attachment) | |
| `checkpoint_interval` || `checkpointInterval` ||
| `connection_timeout` || `connectionTimeout` ||
| `create_target` || `createTarget` ||
| `create_target_params` || `createTargetParams` ||
| `doc_ids` || `docIds` ||
| `http_connections` || `httpConnections` ||
| `query_params` || `queryParams` ||
| `retries_per_request` || `retriesPerRequest` ||
| `since_seq` || `sinceSeq` ||
| `socket_options` || `socketOptions` ||
| `source` || Nested renames required see [`CloudantV1.ReplicationDatabase`](#cloudantv1replicationdatabase) (`iam` auth only) ||
| `source_proxy` | `string` | `sourceProxy` | `string \| null` |
| `target` || Nested renames required see [`CloudantV1.ReplicationDatabase`](#cloudantv1replicationdatabase) (`iam` auth only) ||
| `target_proxy` | `string` | `targetProxy` | `string \| null` |
| `use_bulk_get` || `useBulkGet` ||
| `use_checkpoints` || `useCheckpoints` ||
| `user_ctx` || `userCtx` ||
| `winning_revs_only` || `winningRevsOnly` ||
| `worker_batch_size` || `workerBatchSize` ||
| `worker_processes` || `workerProcesses` ||

### `CloudantV1.ReplicationDatabase`

| `CloudantV1.ReplicationDatabase` property name (<`0.9.0`) | `CloudantV1.ReplicationDatabase` property name (>=`0.9.0`) |
| --- | --- |
| `auth` | Nested renames required see next table. (`iam` auth only) |

| `CloudantV1.ReplicationDatabaseAuth` property name (<`0.9.0`) | `CloudantV1.ReplicationDatabaseAuth` property name (>=`0.9.0`) |
| --- | --- |
| `iam` | Nested renames required see next table. |

| `CloudantV1.ReplicationDatabaseAuthIam` property name (<`0.9.0`) | `CloudantV1.ReplicationDatabaseAuthIam` property name (>=`0.9.0`) |
| --- | --- |
| `api_key` | `apiKey` |

### `CloudantV1.SchedulerDocument`

| `CloudantV1.SchedulerDocument` property name (<`0.9.0`) | `CloudantV1.SchedulerDocument` property type (<`0.9.0`) | `CloudantV1.SchedulerDocument` property name (>=`0.9.0`) | `CloudantV1.SchedulerDocument` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `doc_id` || `docId` ||
| `error_count` || `errorCount` ||
| `info` | | Nested renames required see [`CloudantV1.SchedulerInfo`](#cloudantv1schedulerinfo) |
| `last_updated` || `lastUpdated` ||
| `source_proxy` | `string` | `sourceProxy` | `string \| null` |
| `startTime` || `start_time` ||
| `target_proxy` | `string` | `targetProxy` | `string \| null` |

### `CloudantV1.SchedulerInfo`

| `CloudantV1.SchedulerInfo` property name (<`0.9.0`) | `CloudantV1.SchedulerInfo` property type (<`0.9.0`) | `CloudantV1.SchedulerInfo` property name (>=`0.9.0`) | `CloudantV1.SchedulerInfo` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `changes_pending` | `number` | `changesPending` | `number \| null` |
| `checkpointed_source_seq` || `checkpointedSourceSeq` ||
| `doc_write_failures` || `docWriteFailures` ||
| `docs_read` || `docsRead` ||
| `docs_written` || `docsWritten` ||
| `missing_revisions_found` || `missingRevisionsFound` ||
| `revisions_checked` || `revisionsChecked` ||
| `source_seq` || `sourceSeq` ||
| `through_seq` || `throughSeq` ||

### `CloudantV1.SchedulerJob`

| `CloudantV1.SchedulerJob` property name (<`0.9.0`) | `CloudantV1.SchedulerJob` property type (<`0.9.0`) | `CloudantV1.SchedulerJob` property name (>=`0.9.0`) | `CloudantV1.SchedulerJob` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `doc_id` || `docId` ||
| `start_time` || `startTime` ||
| `info` | | Nested renames required see [`CloudantV1.SchedulerInfo`](#cloudantv1schedulerinfo) |


### `CloudantV1.SearchIndexDefinition`

| `CloudantV1.SearchIndexDefinition` property name (<`0.9.0`) | `CloudantV1.SearchIndexDefinition` property name (>=`0.9.0`) |
| --- | --- |
| `analyzer` | No rename required; nested type change only see [`CloudantV1.AnalyzerConfiguration`](#cloudantv1analyzerconfiguration) |

### `CloudantV1.SearchResultProperties`

| `CloudantV1.SearchResultProperties` property name (<`0.9.0`) | `CloudantV1.SearchResultProperties` property type (<`0.9.0`) | `CloudantV1.SearchResultProperties` property name (>=`0.9.0`) | `CloudantV1.SearchResultProperties` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `counts` | `JsonObject` | `counts` | `{[key: string]: JsonObject}` |
| `ranges` | `JsonObject` | `ranges` | `{[key: string]: JsonObject}` |
| `rows[i].doc` | | Nested renames required for `_attachments` only see [`CloudantV1.Document`](#cloudantv1document) | |
| `total_rows` | `number` | `totalRows` | `number \| null` |

### `CloudantV1.ViewQuery`

| `CloudantV1.ViewQuery` property name (<`0.9.0`) | `CloudantV1.ViewQuery` property type (<`0.9.0`) | `CloudantV1.ViewQuery` property name (>=`0.9.0`) | `CloudantV1.ViewQuery` property type (>=`0.9.0`) |
| --- | --- | --- | --- |
| `att_encoding_info` || `attEncodingInfo` ||
| `include_docs` || `includeDocs` ||
| `inclusive_end` || `inclusiveEnd` ||
| `update_seq` || `updateSeq` ||
| `end_key` | `any` | `endKey` | `any \| null` |
| `end_key_doc_id` || `endKeyDocId` ||
| `group_level` || `groupLevel` ||
| `start_key` | `any` | `startKey` | `any \| null` |
| `start_key_doc_id` || `startKeyDocId` ||


### `CloudantV1.ViewResult`

| `CloudantV1.ViewResult` property name (<`0.9.0`) | `CloudantV1.ViewResult` property name (>=`0.9.0`) |
| --- | --- |
| `rows[i]` | Element renames required see [`CloudantV1.ViewResultRow`](#cloudantv1viewresultrow) |
| `update_seq` | `updateSeq` |

### `CloudantV1.ViewResultRow`

| `CloudantV1.ViewResultRow` property name (<`0.9.0`) | `CloudantV1.ViewResultRow` property name (>=`0.9.0`) |
| --- | --- |
| `caused_by` | `causedBy` |
| `doc` | Renames required for `_attachments` only see [`CloudantV1.Document`](#cloudantv1document) |


## Examples

### Option 1 renaming properties

#### Function parameter object property rename example

[`putDesignDocument` function](#putdesigndocument) `validate_doc_update` to `validateDocUpdate`

Before:

```js
const vduFunction: string = 'function (doc) { if (!doc.email) { throw({ forbidden: "Users must have an email." }); }}';

const designDocument: CloudantV1.DesignDocument = {
  validate_doc_update: vduFunction
};

service.putDesignDocument({
  db: 'users',
  designDocument,
  ddoc: 'userValidation'
}).then(response => {
  console.log(response.result);
});
```

After:
```js
const vduFunction: string = 'function (doc) { if (!doc.email) { throw({ forbidden: "Users must have an email." }); }}';

const designDocument: CloudantV1.DesignDocument = {
  validateDocUpdate: vduFunction
};

service.putDesignDocument({
  db: 'users',
  designDocument,
  ddoc: 'userValidation'
}).then(response => {
  console.log(response.result);
});
```


#### Function return object `result` property rename example

[`getDesignDocument` function](#getdesigndocument) `validate_doc_update` to `validateDocUpdate`

Before:
```js
service.getDesignDocument({
  db: 'user',
  ddoc: 'userValidation',
  latest: true
}).then(response => {
  if (response.result.validate_doc_update) {
    console.log('VDU is present.');
  } else {
    console.log('VDU is absent.');
  }
});
```

After:
```js
service.getDesignDocument({
  db: 'user',
  ddoc: 'userValidation',
  latest: true
}).then(response => {
  if (response.result.validateDocUpdate) {
    console.log('VDU is present.');
  } else {
    console.log('VDU is absent.');
  }
});
```

### Option 2 using built-in functions

To get objects with the old property names it is possible to use the built-in `serialize` and `deserialize` functions
from the desired model class.

#### Function parameter example

[`putDesignDocument` function](#putdesigndocument) uses `CloudantV1.DesignDocument` model.

Before:
```js
const vduFunction: string = 'function (doc) { if (!doc.email) { throw({ forbidden: "Users must have an email." }); }}';

const designDocument: CloudantV1.DesignDocument = {
  validate_doc_update: vduFunction
};

service.putDesignDocument({
  db: 'users',
  designDocument,
  ddoc: 'userValidation'
}).then(response => {
  console.log(response.result);
});
```

After:

You can use the `CloudantV1.DesignDocument.deserialize` function to convert literals using the raw CouchDB name formats
to the new SDK name format model with the corrected case convention.

```js
const vduFunction: string = 'function (doc) { if (!doc.email) { throw({ forbidden: "Users must have an email." }); }}';

const designDocument: CloudantV1.DesignDocument = CloudantV1.DesignDocument.deserialize({
  validate_doc_update: vduFunction
});

service.putDesignDocument({
  db: 'users',
  designDocument,
  ddoc: 'userValidation'
}).then(response => {
  console.log(response.result);
});
```

#### Function return example

[`getDesignDocument` function](#getdesigndocument) uses the `CloudantV1.DesignDocument` model.

Before:
```js
service.getDesignDocument({
  db: 'user',
  ddoc: 'userValidation',
  latest: true
}).then(response => {
  if (response.result.validate_doc_update) {
    console.log('VDU is present.');
  } else {
    console.log('VDU is absent.');
  }
});
```

After:

You can use the `CloudantV1.DesignDocument.serialize` function to convert to the raw CouchDB name formats.

```js
service.getDesignDocument({
  db: 'user',
  ddoc: 'userValidation',
  latest: true
}).then(response => {
  if (CloudantV1.DesignDocument.serialize(response.result).validate_doc_update) {
    console.log('VDU is present.');
  } else {
    console.log('VDU is absent.');
  }
});
```
