// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.putCorsConfiguration({
  enableCors: true,
  origins: ['https://example.com']
}).then(response => {
  console.log(response.result);
});
