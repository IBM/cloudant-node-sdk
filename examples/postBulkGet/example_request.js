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
