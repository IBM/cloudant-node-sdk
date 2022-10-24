// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getCapacityThroughputInformation().then(response => {
  console.log(response.result);
});
