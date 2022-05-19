// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteLocalDocument({
  db: 'orders',
  docId: 'local-0007741142412418284'
}).then(response => {
  console.log(response.result);
});
