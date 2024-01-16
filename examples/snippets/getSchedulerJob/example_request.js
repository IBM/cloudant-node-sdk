// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSchedulerJob({
  jobId: '7b94915cd8c4a0173c77c55cd0443939+continuous'
}).then(response => {
  console.log(response.result);
});
