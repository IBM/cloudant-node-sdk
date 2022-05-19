// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postDbsInfo({
  keys: ['products', 'users', 'orders']
}).then(response => {
  console.log(response.result);
});
