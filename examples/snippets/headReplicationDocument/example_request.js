// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headReplicationDocument({
  docId: 'repldoc-example'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['ETag']);
});
