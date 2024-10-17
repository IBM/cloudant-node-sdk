# Examples for node

## getServerInformation

_GET `/`_

### [Example request](snippets/getServerInformation/example_request.js)

[embedmd]:# (snippets/getServerInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getServerInformation().then(response => {
    console.log(response.result);
});
```

## getActiveTasks

_GET `/_active_tasks`_

### [Example request](snippets/getActiveTasks/example_request.js)

[embedmd]:# (snippets/getActiveTasks/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getActiveTasks().then(response => {
  console.log(response.result);
});
```

## getAllDbs

_GET `/_all_dbs`_

### [Example request](snippets/getAllDbs/example_request.js)

[embedmd]:# (snippets/getAllDbs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getAllDbs().then(response => {
  console.log(response.result);
});
```

## postApiKeys

_POST `/_api/v2/api_keys`_

### [Example request](snippets/postApiKeys/example_request.js)

[embedmd]:# (snippets/postApiKeys/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postApiKeys().then(response => {
  console.log(response.result);
});
```

## putCloudantSecurity

_PUT `/_api/v2/db/{db}/_security`_

### [Example request](snippets/putCloudantSecurity/example_request.js)

[embedmd]:# (snippets/putCloudantSecurity/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putCloudantSecurityConfiguration({
  db: 'products',
  cloudant: {'nobody': ['_reader']}
}).then(response => {
  console.log(response.result);
});
// section: markdown
// The `nobody` username applies to all unauthenticated connection attempts. For example, if an application tries to read data from a database, but didn't identify itself, the task can continue only if the `nobody` user has the role `_reader`.
// section: markdown
// If instead of using Cloudant's security model for managing permissions you opt to use the Apache CouchDB `_users` database (that is using legacy credentials _and_ the `couchdb_auth_only:true` option) then be aware that the user must already exist in `_users` database before adding permissions. For information on the `_users` database, see <a href="https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-work-with-your-account#using-the-users-database-with-cloudant-nosql-db" target="_blank">Using the `_users` database with Cloudant</a>.
```

## getActivityTrackerEvents

_GET `/_api/v2/user/activity_tracker/events`_

### [Example request](snippets/getActivityTrackerEvents/example_request.js)

[embedmd]:# (snippets/getActivityTrackerEvents/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getActivityTrackerEvents().then(response => {
  console.log(response.result);
});
```

## postActivityTrackerEvents

_POST `/_api/v2/user/activity_tracker/events`_

### [Example request](snippets/postActivityTrackerEvents/example_request.js)

[embedmd]:# (snippets/postActivityTrackerEvents/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postActivityTrackerEvents({
  types: ['management'],
}).then(response => {
  console.log(response.result);
});
```

## getCapacityThroughputInformation

_GET `/_api/v2/user/capacity/throughput`_

### [Example request](snippets/getCapacityThroughputInformation/example_request.js)

[embedmd]:# (snippets/getCapacityThroughputInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getCapacityThroughputInformation().then(response => {
  console.log(response.result);
});
```

## putCapacityThroughputConfiguration

_PUT `/_api/v2/user/capacity/throughput`_

### [Example request](snippets/putCapacityThroughputConfiguration/example_request.js)

[embedmd]:# (snippets/putCapacityThroughputConfiguration/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putCapacityThroughputConfiguration({
  blocks: 1,
}).then(response => {
  console.log(response.result);
});
```

## getCorsInformation

_GET `/_api/v2/user/config/cors`_

### [Example request](snippets/getCorsInformation/example_request.js)

[embedmd]:# (snippets/getCorsInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getCorsInformation().then(response => {
  console.log(response.result);
});
```

## putCorsConfiguration

_PUT `/_api/v2/user/config/cors`_

### [Example request](snippets/putCorsConfiguration/example_request.js)

[embedmd]:# (snippets/putCorsConfiguration/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putCorsConfiguration({
  enableCors: true,
  origins: ['https://example.com']
}).then(response => {
  console.log(response.result);
});
```

## getCurrentThroughputInformation

_GET `/_api/v2/user/current/throughput`_

### [Example request](snippets/getCurrentThroughputInformation/example_request.js)

[embedmd]:# (snippets/getCurrentThroughputInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getCurrentThroughputInformation().then(response => {
  console.log(response.result);
});
```

## getDbUpdates

_GET `/_db_updates`_

### [Example request](snippets/getDbUpdates/example_request.js)

[embedmd]:# (snippets/getDbUpdates/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDbUpdates({
  feed: 'normal',
  heartbeat: 10000,
  since: 'now'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This request requires `server_admin` access.
```

## postDbsInfo

_POST `/_dbs_info`_

### [Example request](snippets/postDbsInfo/example_request.js)

[embedmd]:# (snippets/postDbsInfo/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postDbsInfo({
  keys: ['products', 'users', 'orders']
}).then(response => {
  console.log(response.result);
});
```

## getMembershipInformation

_GET `/_membership`_

### [Example request](snippets/getMembershipInformation/example_request.js)

[embedmd]:# (snippets/getMembershipInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getMembershipInformation().then(response => {
  console.log(response.result);
});
```

## deleteReplicationDocument

_DELETE `/_replicator/{doc_id}`_

### [Example request](snippets/deleteReplicationDocument/example_request.js)

[embedmd]:# (snippets/deleteReplicationDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteReplicationDocument({
  docId: 'repldoc-example',
  rev: '3-a0ccbdc6fe95b4184f9031d086034d85'
}).then(response => {
  console.log(response.result);
});
```

## getReplicationDocument

_GET `/_replicator/{doc_id}`_

### [Example request](snippets/getReplicationDocument/example_request.js)

[embedmd]:# (snippets/getReplicationDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getReplicationDocument({
  docId: 'repldoc-example'
}).then(response => {
  console.log(response.result);
});
```

## headReplicationDocument

_HEAD `/_replicator/{doc_id}`_

### [Example request](snippets/headReplicationDocument/example_request.js)

[embedmd]:# (snippets/headReplicationDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headReplicationDocument({
  docId: 'repldoc-example'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['ETag']);
});
```

## putReplicationDocument

_PUT `/_replicator/{doc_id}`_

### [Example request](snippets/putReplicationDocument/example_request.js)

[embedmd]:# (snippets/putReplicationDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const sourceDb: CloudantV1.ReplicationDatabase = {
  url: '<your-source-service-url>/animaldb'
};

const targetDb: CloudantV1.ReplicationDatabase = {
  auth: {
    iam: {
      'apiKey': '<your-iam-api-key>'
    }
  },
  url: '<your-target-service-url>/animaldb-target'
};

const replDocument: CloudantV1.ReplicationDocument = {
  id: 'repldoc-example',
  createTarget: true,
  source: sourceDb,
  target: targetDb
}

service.putReplicationDocument({
  docId: 'repldoc-example',
  replicationDocument: replDocument
}).then(response => {
  console.log(response.result);
});
```

## getSchedulerDocs

_GET `/_scheduler/docs`_

### [Example request](snippets/getSchedulerDocs/example_request.js)

[embedmd]:# (snippets/getSchedulerDocs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

service.getSchedulerDocs({
  limit: 100,
  states: ['completed']
}).then(response => {
  console.log(response.result);
})
```

## getSchedulerDocument

_GET `/_scheduler/docs/_replicator/{doc_id}`_

### [Example request](snippets/getSchedulerDocument/example_request.js)

[embedmd]:# (snippets/getSchedulerDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSchedulerDocument({
  docId: 'repldoc-example'
}).then(response => {
  console.log(response.result);
});
```

## getSchedulerJobs

_GET `/_scheduler/jobs`_

### [Example request](snippets/getSchedulerJobs/example_request.js)

[embedmd]:# (snippets/getSchedulerJobs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSchedulerJobs({
  limit: 100
}).then(response => {
  console.log(response.result);
});
```

## getSchedulerJob

_GET `/_scheduler/jobs/{job_id}`_

### [Example request](snippets/getSchedulerJob/example_request.js)

[embedmd]:# (snippets/getSchedulerJob/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSchedulerJob({
  jobId: '7b94915cd8c4a0173c77c55cd0443939+continuous'
}).then(response => {
  console.log(response.result);
});
```

## headSchedulerJob

_HEAD `/_scheduler/jobs/{job_id}`_

### [Example request](snippets/headSchedulerJob/example_request.js)

[embedmd]:# (snippets/headSchedulerJob/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headSchedulerJob({
  jobId: '7b94915cd8c4a0173c77c55cd0443939+continuous'
}).then(response => {
  console.log(response.status);
});
```

## postSearchAnalyze

_POST `/_search_analyze`_

### [Example request](snippets/postSearchAnalyze/example_request.js)

[embedmd]:# (snippets/postSearchAnalyze/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postSearchAnalyze({
  analyzer: 'english',
  text: 'running is fun',
}).then(response => {
  console.log(response.result);
});
```

## getSessionInformation

_GET `/_session`_

### [Example request](snippets/getSessionInformation/example_request.js)

[embedmd]:# (snippets/getSessionInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSessionInformation().then(response => {
  console.log(response.result);
});
// section: markdown
// For more details on Session Authentication, see [Authentication.](#authentication)
```

## getUpInformation

_GET `/_up`_

### [Example request](snippets/getUpInformation/example_request.js)

[embedmd]:# (snippets/getUpInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getUpInformation().then(response => {
  console.log(response.result);
});
```

## getUuids

_GET `/_uuids`_

### [Example request](snippets/getUuids/example_request.js)

[embedmd]:# (snippets/getUuids/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const uuidsParams: CloudantV1.GetUuidsParams = {
  count: 10
};

service.getUuids(uuidsParams).then(response => {
  console.log(response.result);
});
```

## deleteDatabase

_DELETE `/{db}`_

### [Example request](snippets/deleteDatabase/example_request.js)

[embedmd]:# (snippets/deleteDatabase/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteDatabase({db: '<db-name>'}).then(response => {
  console.log(response.result);
});
```

## getDatabaseInformation

_GET `/{db}`_

### [Example request](snippets/getDatabaseInformation/example_request.js)

[embedmd]:# (snippets/getDatabaseInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDatabaseInformation({db: 'products'}).then(response => {
  console.log(response.result);
});
```

## headDatabase

_HEAD `/{db}`_

### [Example request](snippets/headDatabase/example_request.js)

[embedmd]:# (snippets/headDatabase/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headDatabase({db: 'products'}).then(response => {
  console.log(response.status);
});
```

## postDocument

_POST `/{db}`_

### [Example request](snippets/postDocument/example_request.js)

[embedmd]:# (snippets/postDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const productsDoc: CloudantV1.Document = {
  _id: '1000042',
  type: 'product',
  productId: '1000042',
  brand: 'Salter',
  name: 'Digital Kitchen Scales',
  description: 'Slim Colourful Design Electronic Cooking Appliance for Home / Kitchen, Weigh up to 5kg + Aquatronic for Liquids ml + fl. oz. 15Yr Guarantee - Green',
  price: 14.99,
  image: 'assets/img/0gmsnghhew.jpg'
};

service.postDocument({
  db: 'products',
  document: productsDoc
}).then(response => {
  console.log(response.result);
});
```

## putDatabase

_PUT `/{db}`_

### [Example request](snippets/putDatabase/example_request.js)

[embedmd]:# (snippets/putDatabase/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putDatabase({
  db: 'events',
  partitioned: true
}).then(response => {
  console.log(response.result);
});
```

## postAllDocs

_POST `/{db}/_all_docs`_

### [Example request](snippets/postAllDocs/example_request.js)

[embedmd]:# (snippets/postAllDocs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postAllDocs({
  db: 'orders',
  includeDocs: true,
  startKey: 'abc',
  limit: 10
}).then(response => {
  console.log(response.result);
});
```

### [Example request as a stream](snippets/postAllDocs/example_request_as_a_stream.js)

[embedmd]:# (snippets/postAllDocs/example_request_as_a_stream.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postAllDocsAsStream({
  db: 'orders',
  includeDocs: true,
  startKey: 'abc',
  limit: 10
}).then(response => {
  let stream = fs.createWriteStream("result.json");
  response.result.pipe(stream);
  response.result.on('end', () => stream.end());
});
```

## postAllDocsQueries

_POST `/{db}/_all_docs/queries`_

### [Example request](snippets/postAllDocsQueries/example_request.js)

[embedmd]:# (snippets/postAllDocsQueries/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const allDocsQueries: CloudantV1.AllDocsQuery[] = [{
    keys: ['1000042', '1000043'],
  },
  {
    limit: 3,
    skip: 2
}];

service.postAllDocsQueries({
  db: 'products',
  queries: allDocsQueries
}).then(response => {
  console.log(response.result);
});
```

## postBulkDocs

_POST `/{db}/_bulk_docs`_

### [Example request: create documents](snippets/postBulkDocs/example_request_create_documents.js)

[embedmd]:# (snippets/postBulkDocs/example_request_create_documents.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc1: CloudantV1.Document = {
  _id: 'ns1HJS13AMkK:0007241142412418284',
  type: 'event',
  userId: 'abc123',
  eventType:'addedToBasket',
  productId: '1000042',
  date: '2019-01-28T10:44:22.000Z'
}
const eventDoc2: CloudantV1.Document = {
  _id: 'H8tDIwfadxp9:0007241142412418285',
  type: 'event',
  userId: 'abc234',
  eventType: 'addedToBasket',
  productId: '1000050',
  date: '2019-01-25T20:00:00.000Z'
}

const bulkDocs: CloudantV1.BulkDocs = {  docs: [eventDoc1, eventDoc2]
}

service.postBulkDocs({
  db: 'events',
  bulkDocs: bulkDocs
}).then(response => {
  console.log(response.result);
});
```

### [Example request: delete documents](snippets/postBulkDocs/example_request_delete_documents.js)

[embedmd]:# (snippets/postBulkDocs/example_request_delete_documents.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc1: CloudantV1.Document = {
  _id: 'ns1HJS13AMkK:0007241142412418284',
  _rev: '1-5005d65514fe9e90f8eccf174af5dd64',
  _deleted: true,
}
const eventDoc2: CloudantV1.Document = {
  _id: 'H8tDIwfadxp9:0007241142412418285',
  _rev: '1-2d7810b054babeda4812b3924428d6d6',
  _deleted: true,
}

const bulkDocs: CloudantV1.BulkDocs = {  docs: [eventDoc1, eventDoc2]
}

service.postBulkDocs({
  db: 'events',
  bulkDocs: bulkDocs
}).then(response => {
  console.log(response.result);
});
```

### [Example request as a stream](snippets/postBulkDocs/example_request_as_a_stream.js)

[embedmd]:# (snippets/postBulkDocs/example_request_as_a_stream.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

let stream = fs.createReadStream("upload.json");

service.postBulkDocs({
  db: 'events',
  bulkDocs: stream
}).then(response => {
  console.log(response.result);
});
// section: markdown
// Content of upload.json
// section: code
{
  "docs": [
    {
      "_id": "ns1HJS13AMkK:0007241142412418284",
      "type": "event",
      "userId": "abc123",
      "eventType": "addedToBasket",
      "productId": "1000042",
      "date": "2019-01-28T10:44:22.000Z"
    },
    {
      "_id": "H8tDIwfadxp9:0007241142412418285",
      "type": "event",
      "userId": "abc234",
      "eventType": "addedToBasket",
      "productId": "1000050",
      "date": "2019-01-25T20:00:00.000Z"
    }
  ]
}
```

## postBulkGet

_POST `/{db}/_bulk_get`_

### [Example request](snippets/postBulkGet/example_request.js)

[embedmd]:# (snippets/postBulkGet/example_request.js)
```js
// section: code
const service = CloudantV1.newInstance({});

const docId = 'order00067';

const bulkGetDoc1: CloudantV1.BulkGetQueryDocument = {
  id: docId,
  rev: '3-917fa2381192822767f010b95b45325b'
};
const bulkGetDoc2: CloudantV1.BulkGetQueryDocument = {
  id: docId,
  rev: '4-a5be949eeb7296747cc271766e9a498b'
};

const bulkGetDocs: CloudantV1.BulkGetQueryDocument[] = [bulkGetDoc1, bulkGetDoc2];

const postBulkGetParams: CloudantV1.PostBulkGetParams = {
  db: 'orders',
  docs: bulkGetDocs,
};

service.postBulkGet(postBulkGetParams)
  .then(response => {
    console.log(response.result);
  });
```

### [Alternative example request for `open_revs=all`](snippets/postBulkGet/alternative_example_request_for_open_revs_all.js)

[embedmd]:# (snippets/postBulkGet/alternative_example_request_for_open_revs_all.js)
```js
// section: code
const service = CloudantV1.newInstance({});

const bulkGetDocs: CloudantV1.BulkGetQueryDocument[] = [
  {
    id: 'order00067',
  },
];

const postBulkGetParams: CloudantV1.PostBulkGetParams = {
  db: 'orders',
  docs: bulkGetDocs,
};

service.postBulkGet(postBulkGetParams)
  .then(response => {
    console.log(response.result);
});
```

### [Alternative example request for `atts_since`](snippets/postBulkGet/alternative_example_request_for_atts_since.js)

[embedmd]:# (snippets/postBulkGet/alternative_example_request_for_atts_since.js)
```js
// section: code
const service = CloudantV1.newInstance({});

const bulkGetQueryDocuments: CloudantV1.BulkGetQueryDocument[] = [
  {
    id: 'order00058',
    attsSince: ['1-99b02e08da151943c2dcb40090160bb8']
  },
];

const postBulkGetParams: CloudantV1.PostBulkGetParams = {
  db: 'orders',
  docs: bulkGetQueryDocuments,
};

service.postBulkGet(postBulkGetParams)
  .then(response => {
    console.log(response.result);
});
```

## postChanges

_POST `/{db}/_changes`_

### [Example request](snippets/postChanges/example_request.js)

[embedmd]:# (snippets/postChanges/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postChanges({
  db: 'orders'
}).then(response => {
  console.log(response.result);
});
```

### [Example request as a stream](snippets/postChanges/example_request_as_a_stream.js)

[embedmd]:# (snippets/postChanges/example_request_as_a_stream.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postChangesAsStream({
  db: 'orders'
}).then(response => {
  let stream = fs.createWriteStream("result.json");
  response.result.pipe(stream);
  response.result.on('end', () => stream.end());
});
```

## deleteDesignDocument

_DELETE `/{db}/_design/{ddoc}`_

### [Example request](snippets/deleteDesignDocument/example_request.js)

[embedmd]:# (snippets/deleteDesignDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteDesignDocument({
  db: 'products',
  ddoc: 'appliances',
  rev: '1-98e6a25b3b45df62e7d47095ac15b16a'
}).then(response => {
  console.log(response.result);
});
```

## getDesignDocument

_GET `/{db}/_design/{ddoc}`_

### [Example request](snippets/getDesignDocument/example_request.js)

[embedmd]:# (snippets/getDesignDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDesignDocument({
  db: 'products',
  ddoc: 'appliances',
  latest: true
}).then(response => {
  console.log(response.result);
});
```

## headDesignDocument

_HEAD `/{db}/_design/{ddoc}`_

### [Example request](snippets/headDesignDocument/example_request.js)

[embedmd]:# (snippets/headDesignDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headDesignDocument({
  db: 'events',
  ddoc: 'checkout'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['ETag']);
});
```

## putDesignDocument

_PUT `/{db}/_design/{ddoc}`_

### [Example request](snippets/putDesignDocument/example_request.js)

[embedmd]:# (snippets/putDesignDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const emailViewMapReduce: CloudantV1.DesignDocumentViewsMapReduce = {
  map: 'function(doc) { if(doc.email_verified === true) { emit(doc.email, [doc.name, doc.email_verified, doc.joined]); }}'
}

const userIndex: CloudantV1.SearchIndexDefinition = {
  index: 'function(doc) { index("name", doc.name); index("active", doc.active); }'
}

const designDocument: CloudantV1.DesignDocument = {
  views: {'getVerifiedEmails': emailViewMapReduce},
  indexes: {'activeUsers': userIndex}}

service.putDesignDocument({
  db: 'users',
  designDocument: designDocument,
  ddoc: 'allusers'
}).then(response => {
  console.log(response.result);
});

const productMap: CloudantV1.DesignDocumentViewsMapReduce = {
  map: 'function(doc) { emit(doc.productId, [doc.date, doc.eventType, doc.userId]); }'
}

const dateIndex: CloudantV1.SearchIndexDefinition = {
  index: 'function(doc) { index("date", doc.date); }'
}

const partitionedDesignDoc: CloudantV1.DesignDocument = {
  views: {'byProductId': productMap},
  indexes: {'findByDate': dateIndex}}

service.putDesignDocument({
  db: 'events',
  designDocument: partitionedDesignDoc,
  ddoc: 'checkout'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example creates `allusers` design document in the `users` database and `checkout` design document in the partitioned `events` database.
```

## getDesignDocumentInformation

_GET `/{db}/_design/{ddoc}/_info`_

### [Example request](snippets/getDesignDocumentInformation/example_request.js)

[embedmd]:# (snippets/getDesignDocumentInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDesignDocumentInformation({
  db: 'products',
  ddoc: 'appliances'
}).then(response => {
  console.log(response.result);
});
```

## postSearch

_POST `/{db}/_design/{ddoc}/_search/{index}`_

### [Example request](snippets/postSearch/example_request.js)

[embedmd]:# (snippets/postSearch/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postSearch({
  db: 'users',
  ddoc: 'allusers',
  index: 'activeUsers',
  query: 'name:Jane* AND active:True'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `activeUsers` Cloudant Search index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
```

## getSearchInfo

_GET `/{db}/_design/{ddoc}/_search_info/{index}`_

### [Example request](snippets/getSearchInfo/example_request.js)

[embedmd]:# (snippets/getSearchInfo/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSearchInfo({
  db: 'events',
  ddoc: 'checkout',
  index: 'findByDate'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `findByDate` Cloudant Search partitioned index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
```

## postView

_POST `/{db}/_design/{ddoc}/_view/{view}`_

### [Example request](snippets/postView/example_request.js)

[embedmd]:# (snippets/postView/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postView({
  db: 'users',
  ddoc: 'allusers',
  view: 'getVerifiedEmails'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getVerifiedEmails` view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
```

## postViewQueries

_POST `/{db}/_design/{ddoc}/_view/{view}/queries`_

### [Example request](snippets/postViewQueries/example_request.js)

[embedmd]:# (snippets/postViewQueries/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const viewQueries: CloudantV1.ViewQuery[] = [
  {
    includeDocs: true,
    limit: 5
  },
  {
    descending: true,
    skip: 1
  }
];
service.postViewQueries({
  db: 'users',
  ddoc: 'allusers',
  queries: viewQueries,
  view: 'getVerifiedEmails'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getVerifiedEmails` view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
```

## postDesignDocs

_POST `/{db}/_design_docs`_

### [Example request](snippets/postDesignDocs/example_request.js)

[embedmd]:# (snippets/postDesignDocs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postDesignDocs({
  attachments: true,
  db: 'users'
}).then(response => {
  console.log(response.result);
});
```

## postDesignDocsQueries

_POST `/{db}/_design_docs/queries`_

### [Example request](snippets/postDesignDocsQueries/example_request.js)

[embedmd]:# (snippets/postDesignDocsQueries/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const doc1: CloudantV1.AllDocsQuery = {
  descending: true,
  includeDocs: true,
  limit: 10
};
const doc2: CloudantV1.AllDocsQuery = {
  inclusiveEnd: true,
  key: '_design/allusers',
  skip: 1
};

const allDocsQueries: CloudantV1.AllDocsQuery[] = [doc1, doc2];

service.postDesignDocsQueries({
  db: 'users',
  queries: allDocsQueries
}).then(response => {
  console.log(response.result);
});
```

## postExplain

_POST `/{db}/_explain`_

### [Example request](snippets/postExplain/example_request.js)

[embedmd]:# (snippets/postExplain/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector = {
  type: {
    "$eq": "user"
  }
};

service.postExplain({
  db: 'users',
  executionStats: true,
  limit: 10,
  selector: selector
}).then(response => {
  console.log(response.result);
});
```

## postFind

_POST `/{db}/_find`_

### [Example request for "json" index type](snippets/postFind/example_request_for_json_index_type.js)

[embedmd]:# (snippets/postFind/example_request_for_json_index_type.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

const selector: CloudantV1.JsonObject = {
  email_verified: {
    '$eq': true
  }
};

const sort: CloudantV1.JsonObject = {
  email: 'desc'
};

service.postFind({
  db: 'users',
  selector: selector,
  fields: ['_id', 'type', 'name', 'email'],
  sort: [sort],
  limit: 3
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getUserByEmail` Cloudant Query "json" index to exist. To create the index, see [Create a new index on a database.](#postindex)
```

### [Example request for "text" index type](snippets/postFind/example_request_for_text_index_type.js)

[embedmd]:# (snippets/postFind/example_request_for_text_index_type.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

const selector: CloudantV1.JsonObject = {
  address: {
    '$regex': 'Street'
  }
};

service.postFind({
  db: 'users',
  selector: selector,
  fields: ['_id', 'type', 'name', 'email', 'address'],
  limit: 3
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getUserByAddress` Cloudant Query "text" index to exist. To create the index, see [Create a new index on a database.](#postindex)
```

## getIndexesInformation

_GET `/{db}/_index`_

### [Example request](snippets/getIndexesInformation/example_request.js)

[embedmd]:# (snippets/getIndexesInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getIndexesInformation({
  db: 'users'
}).then(response => {
  console.log(response.result);
});
```

## postIndex

_POST `/{db}/_index`_

### [Example request using "json" type index](snippets/postIndex/example_request_using_json_type_index.js)

[embedmd]:# (snippets/postIndex/example_request_using_json_type_index.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

// Type "json" index fields require an object that maps the name of a field to a sort direction.
const indexField: CloudantV1.IndexField = {
  email: 'asc'
}

const index: CloudantV1.IndexDefinition = {
  fields: [indexField]
}

service.postIndex({
  db: 'users',
  ddoc: 'json-index',
  name: 'getUserByEmail',
  index: index,
  type: 'json'
}).then(response => {
  console.log(response.result);
});
```

### [Example request using "text" type index](snippets/postIndex/example_request_using_text_type_index.js)

[embedmd]:# (snippets/postIndex/example_request_using_text_type_index.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

// Type "text" index fields require an object with a name and type properties for the field.
const indexField: CloudantV1.IndexField = {
  name: 'address',
  type: 'string'
}

const index: CloudantV1.IndexDefinition = {
  fields: [indexField]
}

service.postIndex({
  db: 'users',
  ddoc: 'text-index',
  name: 'getUserByAddress',
  index: index,
  type: 'text'
}).then(response => {
  console.log(response.result);
});
```

## deleteIndex

_DELETE `/{db}/_index/_design/{ddoc}/{type}/{index}`_

### [Example request](snippets/deleteIndex/example_request.js)

[embedmd]:# (snippets/deleteIndex/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteIndex({
  db: 'users',
  ddoc: 'json-index',
  index: 'getUserByName',
  type: 'json'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example will fail if `getUserByName` index doesn't exist. To create the index, see [Create a new index on a database.](#postindex)
```

## deleteLocalDocument

_DELETE `/{db}/_local/{doc_id}`_

### [Example request](snippets/deleteLocalDocument/example_request.js)

[embedmd]:# (snippets/deleteLocalDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteLocalDocument({
  db: 'orders',
  docId: 'local-0007741142412418284'
}).then(response => {
  console.log(response.result);
});
```

## getLocalDocument

_GET `/{db}/_local/{doc_id}`_

### [Example request](snippets/getLocalDocument/example_request.js)

[embedmd]:# (snippets/getLocalDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getLocalDocument({
  db: 'orders',
  docId: 'local-0007741142412418284'
}).then(response => {
  console.log(response.result);
});
```

## putLocalDocument

_PUT `/{db}/_local/{doc_id}`_

### [Example request](snippets/putLocalDocument/example_request.js)

[embedmd]:# (snippets/putLocalDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const localDocument: CloudantV1.Document = {
  type: 'order',
  user: 'Bob Smith',
  orderId: '0007741142412418284',
  userId: 'abc123',
  total: 214.98,
  deliveryAddress: '19 Front Street, Darlington, DL5 1TY',
  delivered: 'true',
  courier: 'UPS',
  courierId: '15125425151261289',
  date: '2019-01-28T10:44:22.000Z'
}

service.putLocalDocument({
  db: 'orders',
  docId: 'local-0007741142412418284',
  document: localDocument
}).then(response => {
  console.log(response.result);
});
```

## getPartitionInformation

_GET `/{db}/_partition/{partition_key}`_

### [Example request](snippets/getPartitionInformation/example_request.js)

[embedmd]:# (snippets/getPartitionInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getPartitionInformation({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK'
}).then(response => {
  console.log(response.result);
});
```

## postPartitionAllDocs

_POST `/{db}/_partition/{partition_key}/_all_docs`_

### [Example request](snippets/postPartitionAllDocs/example_request.js)

[embedmd]:# (snippets/postPartitionAllDocs/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionAllDocs({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK',
  includeDocs: true
}).then(response => {
  console.log(response.result);
});
```

## postPartitionSearch

_POST `/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}`_

### [Example request](snippets/postPartitionSearch/example_request.js)

[embedmd]:# (snippets/postPartitionSearch/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionSearch({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK',
  ddoc: 'checkout',
  index: 'findByDate',
  query: 'date:[2019-01-01T12:00:00.000Z TO 2019-01-31T12:00:00.000Z]'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `findByDate` Cloudant Search partitioned index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
```

## postPartitionView

_POST `/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}`_

### [Example request](snippets/postPartitionView/example_request.js)

[embedmd]:# (snippets/postPartitionView/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionView({
  db: 'events',
  ddoc: 'checkout',
  includeDocs: true,
  limit: 10,
  partitionKey: 'ns1HJS13AMkK',
  view: 'byProductId'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `byProductId` partitioned view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
```

## postPartitionExplain

_POST `/{db}/_partition/{partition_key}/_explain`_

### [Example request](snippets/postPartitionExplain/example_request.js)

## postPartitionFind

_POST `/{db}/_partition/{partition_key}/_find`_

### [Example request](snippets/postPartitionFind/example_request.js)

[embedmd]:# (snippets/postPartitionFind/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector: CloudantV1.Selector = {
  userId: {'$eq': 'abc123'}
}
service.postPartitionFind({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK',
  fields: ['productId', 'eventType', 'date'],
  selector: selector
}).then(response => {
  console.log(response.result);
});
```

## postRevsDiff

_POST `/{db}/_revs_diff`_

### [Example request](snippets/postRevsDiff/example_request.js)

[embedmd]:# (snippets/postRevsDiff/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const revsDiff: CloudantV1.DocumentRevisions = {
  order00077: [
    "<1-missing-revision>",
    "<2-missing-revision>",
    "<3-possible-ancestor-revision>"
  ]
}

service.postRevsDiff({
  db: 'orders',
  revsDiffRequest: revsDiff
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the example revisions in the POST body to be replaced with valid revisions.
```

## getSecurity

_GET `/{db}/_security`_

### [Example request](snippets/getSecurity/example_request.js)

[embedmd]:# (snippets/getSecurity/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSecurity({
  db: 'products'
}).then(response => {
  console.log(response.result);
});
```

## putSecurity

_PUT `/{db}/_security`_

### [Example request](snippets/putSecurity/example_request.js)

[embedmd]:# (snippets/putSecurity/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const members: CloudantV1.SecurityObject = {
  names: ['user1', 'user2'],
  roles: ['developers']
};

service.putSecurity({
  db: 'products',
  members: members
}).then(response => {
  console.log(response.result);
});
// section: markdown
// The `nobody` username applies to all unauthenticated connection attempts. For example, if an application tries to read data from a database, but didn't identify itself, the task can continue only if the `nobody` user has the role `_reader`.
// section: markdown
// If instead of using Cloudant's security model for managing permissions you opt to use the Apache CouchDB `_users` database (that is using legacy credentials _and_ the `couchdb_auth_only:true` option) then be aware that the user must already exist in `_users` database before adding permissions. For information on the `_users` database, see <a href="https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-work-with-your-account#using-the-users-database-with-cloudant-nosql-db" target="_blank">Using the `_users` database with Cloudant</a>.
```

## getShardsInformation

_GET `/{db}/_shards`_

### [Example request](snippets/getShardsInformation/example_request.js)

[embedmd]:# (snippets/getShardsInformation/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getShardsInformation({
  db: 'products'
}).then(response => {
  console.log(response.result);
});
```

## getDocumentShardsInfo

_GET `/{db}/_shards/{doc_id}`_

### [Example request](snippets/getDocumentShardsInfo/example_request.js)

[embedmd]:# (snippets/getDocumentShardsInfo/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDocumentShardsInfo({
  db: 'products',
  docId: '1000042'
}).then(response => {
  console.log(response.result);
});
```

## deleteDocument

_DELETE `/{db}/{doc_id}`_

### [Example request](snippets/deleteDocument/example_request.js)

[embedmd]:# (snippets/deleteDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

service.deleteDocument({
  db: 'orders',
  docId: 'order00058',
  rev: '1-99b02e08da151943c2dcb40090160bb8'
}).then(response => {
  console.log(response.result);
});
```

## getDocument

_GET `/{db}/{doc_id}`_

### [Example request](snippets/getDocument/example_request.js)

[embedmd]:# (snippets/getDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDocument({
  db: 'products',
  docId: '1000042'
}).then(response => {
  console.log(response.result);
});
```

## headDocument

_HEAD `/{db}/{doc_id}`_

### [Example request](snippets/headDocument/example_request.js)

[embedmd]:# (snippets/headDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headDocument({
  db: 'orders',
  docId: 'order00058'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['ETag']);
});
```

## putDocument

_PUT `/{db}/{doc_id}`_

### [Example request](snippets/putDocument/example_request.js)

[embedmd]:# (snippets/putDocument/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc: CloudantV1.Document = {
  type: 'event',
  userId: 'abc123',
  eventType: 'addedToBasket',
  productId: '1000042',
  date: '2019-01-28T10:44:22.000Z'
};

service.putDocument({
  db: 'events',
  docId: 'ns1HJS13AMkK:0007241142412418284',
  document: eventDoc
}).then(response => {
  console.log(response.result);
});
```

## deleteAttachment

_DELETE `/{db}/{doc_id}/{attachment_name}`_

### [Example request](snippets/deleteAttachment/example_request.js)

[embedmd]:# (snippets/deleteAttachment/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt',
  rev: '4-1a0d1cd6f40472509e9aac646183736a'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `1000042` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
```

## getAttachment

_GET `/{db}/{doc_id}/{attachment_name}`_

### [Example request](snippets/getAttachment/example_request.js)

[embedmd]:# (snippets/getAttachment/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt'
}).then(response => {
  let attachment = response.result as Readable;
  attachment.pipe(process.stdout);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `1000042` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
```

## headAttachment

_HEAD `/{db}/{doc_id}/{attachment_name}`_

### [Example request](snippets/headAttachment/example_request.js)

[embedmd]:# (snippets/headAttachment/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['Content-Length']);
  console.log(response.headers['Content-Type']);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `1000042` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
```

## putAttachment

_PUT `/{db}/{doc_id}/{attachment_name}`_

### [Example request](snippets/putAttachment/example_request.js)

[embedmd]:# (snippets/putAttachment/example_request.js)
```js
// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const stream = new Readable();
stream.push('This appliance includes...');
stream.push(null);

service.putAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt',
  attachment: stream,
  contentType: 'text/plain'
}).then(response => {
  console.log(response.result);
});
```
