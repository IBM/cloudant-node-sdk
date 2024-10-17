// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putDatabase({
  db: 'events',
  partitioned: true
}).then(response => {
  console.log(response.result);
});
