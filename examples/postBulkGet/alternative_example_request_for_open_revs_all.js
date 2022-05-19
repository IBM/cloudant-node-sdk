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
