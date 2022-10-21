# Examples for node

## getServerInformation

### get `/`

- [Example request](./getServerInformation/example_request.js)

## getActiveTasks

### get `/_active_tasks`

- [Example request](./getActiveTasks/example_request.js)

## getAllDbs

### get `/_all_dbs`

- [Example request](./getAllDbs/example_request.js)

## postApiKeys

### post `/_api/v2/api_keys`

- [Example request](./postApiKeys/example_request.js)

## putCloudantSecurity

### put `/_api/v2/db/{db}/_security`

- [Example request](./putCloudantSecurity/example_request.js)

## getActivityTrackerEvents

### get `/_api/v2/user/activity_tracker/events`

- [Example request](./getActivityTrackerEvents/example_request.js)

## postActivityTrackerEvents

### post `/_api/v2/user/activity_tracker/events`

- [Example request](./postActivityTrackerEvents/example_request.js)

## getCapacityThroughputInformation

### get `/_api/v2/user/capacity/throughput`

- [Example request](./getCapacityThroughputInformation/example_request.js)

## putCapacityThroughputConfiguration

### put `/_api/v2/user/capacity/throughput`

- [Example request](./putCapacityThroughputConfiguration/example_request.js)

## getCorsInformation

### get `/_api/v2/user/config/cors`

- [Example request](./getCorsInformation/example_request.js)

## putCorsConfiguration

### put `/_api/v2/user/config/cors`

- [Example request](./putCorsConfiguration/example_request.js)

## getCurrentThroughputInformation

### get `/_api/v2/user/current/throughput`

- [Example request](./getCurrentThroughputInformation/example_request.js)

## getDbUpdates

### get `/_db_updates`

- [Example request](./getDbUpdates/example_request.js)

## postDbsInfo

### post `/_dbs_info`

- [Example request](./postDbsInfo/example_request.js)

## getMembershipInformation

### get `/_membership`

- [Example request](./getMembershipInformation/example_request.js)

## deleteReplicationDocument

### delete `/_replicator/{doc_id}`

- [Example request](./deleteReplicationDocument/example_request.js)

## getReplicationDocument

### get `/_replicator/{doc_id}`

- [Example request](./getReplicationDocument/example_request.js)

## headReplicationDocument

### head `/_replicator/{doc_id}`

- [Example request](./headReplicationDocument/example_request.js)

## putReplicationDocument

### put `/_replicator/{doc_id}`

- [Example request](./putReplicationDocument/example_request.js)

## getSchedulerDocs

### get `/_scheduler/docs`

- [Example request](./getSchedulerDocs/example_request.js)

## getSchedulerDocument

### get `/_scheduler/docs/_replicator/{doc_id}`

- [Example request](./getSchedulerDocument/example_request.js)

## getSchedulerJobs

### get `/_scheduler/jobs`

- [Example request](./getSchedulerJobs/example_request.js)

## getSchedulerJob

### get `/_scheduler/jobs/{job_id}`

- [Example request](./getSchedulerJob/example_request.js)

## headSchedulerJob

### head `/_scheduler/jobs/{job_id}`

- [Example request](./headSchedulerJob/example_request.js)

## postSearchAnalyze

### post `/_search_analyze`

- [Example request](./postSearchAnalyze/example_request.js)

## getSessionInformation

### get `/_session`

- [Example request](./getSessionInformation/example_request.js)

## getUpInformation

### get `/_up`

- [Example request](./getUpInformation/example_request.js)

## getUuids

### get `/_uuids`

- [Example request](./getUuids/example_request.js)

## deleteDatabase

### delete `/{db}`

- [Example request](./deleteDatabase/example_request.js)

## getDatabaseInformation

### get `/{db}`

- [Example request](./getDatabaseInformation/example_request.js)

## headDatabase

### head `/{db}`

- [Example request](./headDatabase/example_request.js)

## postDocument

### post `/{db}`

- [Example request](./postDocument/example_request.js)

## putDatabase

### put `/{db}`

- [Example request](./putDatabase/example_request.js)

## postAllDocs

### post `/{db}/_all_docs`

- [Example request](./postAllDocs/example_request.js)
- [Example request as a stream](./postAllDocs/example_request_as_a_stream.js)

## postAllDocsQueries

### post `/{db}/_all_docs/queries`

- [Example request](./postAllDocsQueries/example_request.js)

## postBulkDocs

### post `/{db}/_bulk_docs`

- [Example request: create documents](./postBulkDocs/example_request_create_documents.js)
- [Example request: delete documents](./postBulkDocs/example_request_delete_documents.js)
- [Example request as a stream](./postBulkDocs/example_request_as_a_stream.js)

## postBulkGet

### post `/{db}/_bulk_get`

- [Example request](./postBulkGet/example_request.js)
- [Alternative example request for `open_revs=all`](./postBulkGet/alternative_example_request_for_open_revs_all.js)
- [Alternative example request for `atts_since`](./postBulkGet/alternative_example_request_for_atts_since.js)

## postChanges

### post `/{db}/_changes`

- [Example request](./postChanges/example_request.js)
- [Example request as a stream](./postChanges/example_request_as_a_stream.js)

## deleteDesignDocument

### delete `/{db}/_design/{ddoc}`

- [Example request](./deleteDesignDocument/example_request.js)

## getDesignDocument

### get `/{db}/_design/{ddoc}`

- [Example request](./getDesignDocument/example_request.js)

## headDesignDocument

### head `/{db}/_design/{ddoc}`

- [Example request](./headDesignDocument/example_request.js)

## putDesignDocument

### put `/{db}/_design/{ddoc}`

- [Example request](./putDesignDocument/example_request.js)

## getDesignDocumentInformation

### get `/{db}/_design/{ddoc}/_info`

- [Example request](./getDesignDocumentInformation/example_request.js)

## postSearch

### post `/{db}/_design/{ddoc}/_search/{index}`

- [Example request](./postSearch/example_request.js)

## getSearchInfo

### get `/{db}/_design/{ddoc}/_search_info/{index}`

- [Example request](./getSearchInfo/example_request.js)

## postView

### post `/{db}/_design/{ddoc}/_view/{view}`

- [Example request](./postView/example_request.js)

## postViewQueries

### post `/{db}/_design/{ddoc}/_view/{view}/queries`

- [Example request](./postViewQueries/example_request.js)

## postDesignDocs

### post `/{db}/_design_docs`

- [Example request](./postDesignDocs/example_request.js)

## postDesignDocsQueries

### post `/{db}/_design_docs/queries`

- [Example request](./postDesignDocsQueries/example_request.js)

## postExplain

### post `/{db}/_explain`

- [Example request](./postExplain/example_request.js)

## postFind

### post `/{db}/_find`

- [Example request for "json" index type](./postFind/example_request_for_json_index_type.js)
- [Example request for "text" index type](./postFind/example_request_for_text_index_type.js)

## getIndexesInformation

### get `/{db}/_index`

- [Example request](./getIndexesInformation/example_request.js)

## postIndex

### post `/{db}/_index`

- [Example request using "json" type index](./postIndex/example_request_using_json_type_index.js)
- [Example request using "text" type index](./postIndex/example_request_using_text_type_index.js)

## deleteIndex

### delete `/{db}/_index/_design/{ddoc}/{type}/{index}`

- [Example request](./deleteIndex/example_request.js)

## deleteLocalDocument

### delete `/{db}/_local/{doc_id}`

- [Example request](./deleteLocalDocument/example_request.js)

## getLocalDocument

### get `/{db}/_local/{doc_id}`

- [Example request](./getLocalDocument/example_request.js)

## putLocalDocument

### put `/{db}/_local/{doc_id}`

- [Example request](./putLocalDocument/example_request.js)

## postMissingRevs

### post `/{db}/_missing_revs`

- [Example request](./postMissingRevs/example_request.js)

## getPartitionInformation

### get `/{db}/_partition/{partition_key}`

- [Example request](./getPartitionInformation/example_request.js)

## postPartitionAllDocs

### post `/{db}/_partition/{partition_key}/_all_docs`

- [Example request](./postPartitionAllDocs/example_request.js)

## postPartitionSearch

### post `/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}`

- [Example request](./postPartitionSearch/example_request.js)

## postPartitionView

### post `/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}`

- [Example request](./postPartitionView/example_request.js)

## postPartitionFind

### post `/{db}/_partition/{partition_key}/_find`

- [Example request](./postPartitionFind/example_request.js)

## postRevsDiff

### post `/{db}/_revs_diff`

- [Example request](./postRevsDiff/example_request.js)

## getSecurity

### get `/{db}/_security`

- [Example request](./getSecurity/example_request.js)

## putSecurity

### put `/{db}/_security`

- [Example request](./putSecurity/example_request.js)

## getShardsInformation

### get `/{db}/_shards`

- [Example request](./getShardsInformation/example_request.js)

## getDocumentShardsInfo

### get `/{db}/_shards/{doc_id}`

- [Example request](./getDocumentShardsInfo/example_request.js)

## deleteDocument

### delete `/{db}/{doc_id}`

- [Example request](./deleteDocument/example_request.js)

## getDocument

### get `/{db}/{doc_id}`

- [Example request](./getDocument/example_request.js)

## headDocument

### head `/{db}/{doc_id}`

- [Example request](./headDocument/example_request.js)

## putDocument

### put `/{db}/{doc_id}`

- [Example request](./putDocument/example_request.js)

## deleteAttachment

### delete `/{db}/{doc_id}/{attachment_name}`

- [Example request](./deleteAttachment/example_request.js)

## getAttachment

### get `/{db}/{doc_id}/{attachment_name}`

- [Example request](./getAttachment/example_request.js)

## headAttachment

### head `/{db}/{doc_id}/{attachment_name}`

- [Example request](./headAttachment/example_request.js)

## putAttachment

### put `/{db}/{doc_id}/{attachment_name}`

- [Example request](./putAttachment/example_request.js)
