// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

service.getSchedulerDocs({
  limit: 100,
  states: ['completed']
}).then(response => {
  console.log(response.result);
})
