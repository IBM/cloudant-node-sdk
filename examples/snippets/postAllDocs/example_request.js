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
