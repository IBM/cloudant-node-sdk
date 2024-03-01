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
