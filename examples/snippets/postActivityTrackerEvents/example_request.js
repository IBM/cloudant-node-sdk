// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postActivityTrackerEvents({
  types: [
    CloudantV1.ActivityTrackerEvents.Constants.Types.MANAGEMENT,
    CloudantV1.ActivityTrackerEvents.Constants.Types.DATA
  ],
}).then(response => {
  console.log(response.result);
});
