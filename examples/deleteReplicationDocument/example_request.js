// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteReplicationDocument({
  docId: 'repldoc-example',
  rev: '3-a0ccbdc6fe95b4184f9031d086034d85'
}).then(response => {
  console.log(response.result);
});
