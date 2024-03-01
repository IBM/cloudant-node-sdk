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
