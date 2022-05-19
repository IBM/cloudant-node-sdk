// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionAllDocs({
  db: 'products',
  partitionKey: 'small-appliances',
  includeDocs: true
}).then(response => {
  console.log(response.result);
});
