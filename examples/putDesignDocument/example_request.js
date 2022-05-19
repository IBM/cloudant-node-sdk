// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const emailViewMapReduce: CloudantV1.DesignDocumentViewsMapReduce = {
  map: 'function(doc) { if(doc.email_verified  === true){\n  emit(doc.email, [doc.name, doc.email_verified, doc.joined]) }}'
}

const userIndex: CloudantV1.SearchIndexDefinition = {
  index: 'function (doc) {  index("name", doc.name);  index("active", doc.active);}'
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
  map: 'function(doc) { emit(doc.productid, [doc.brand, doc.name, doc.description]) }'
}

const priceIndex: CloudantV1.SearchIndexDefinition = {
  index: 'function (doc) {  index(\"price\", doc.price);}'
}

const partitionedDesignDoc: CloudantV1.DesignDocument = {
  views: {'byApplianceProdId': productMap},
  indexes: {'findByPrice': priceIndex}}

service.putDesignDocument({
  db: 'products',
  designDocument: partitionedDesignDoc,
  ddoc: 'appliances'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example creates `allusers` design document in the `users` database and `appliances` design document in the partitioned `products` database.
