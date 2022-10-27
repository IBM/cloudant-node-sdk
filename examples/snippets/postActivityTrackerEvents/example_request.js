// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postActivityTrackerEvents({
  types: ['management'],
}).then(response => {
  console.log(response.result);
});
