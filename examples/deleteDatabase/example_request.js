// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteDatabase({db: '<db-name>'}).then(response => {
  console.log(response.result);
});
