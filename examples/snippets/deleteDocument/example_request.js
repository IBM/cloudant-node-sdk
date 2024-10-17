// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

service.deleteDocument({
  db: 'orders',
  docId: 'order00058',
  rev: '1-99b02e08da151943c2dcb40090160bb8'
}).then(response => {
  console.log(response.result);
});
