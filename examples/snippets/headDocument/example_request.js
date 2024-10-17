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
