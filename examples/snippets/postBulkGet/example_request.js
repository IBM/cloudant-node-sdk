// section: code
const service = CloudantV1.newInstance({});

const docId = 'order00067';

const bulkGetDoc1: CloudantV1.BulkGetQueryDocument = {
  id: docId,
  rev: '3-22222222222222222222222222222222'
};
const bulkGetDoc2: CloudantV1.BulkGetQueryDocument = {
  id: docId,
  rev: '4-33333333333333333333333333333333'
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
