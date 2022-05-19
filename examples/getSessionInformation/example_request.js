// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSessionInformation().then(response => {
  console.log(response.result);
});
// section: markdown
// For more details on Session Authentication, see [Authentication.](#authentication)
