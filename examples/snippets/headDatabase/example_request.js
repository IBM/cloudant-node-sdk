// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headDatabase({db: 'products'}).then(response => {
  console.log(response.status);
});
