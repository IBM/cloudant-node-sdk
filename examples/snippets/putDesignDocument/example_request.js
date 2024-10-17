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
