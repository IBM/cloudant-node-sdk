// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putCapacityThroughputConfiguration({
  blocks: 1,
}).then(response => {
  console.log(response.result);
});
