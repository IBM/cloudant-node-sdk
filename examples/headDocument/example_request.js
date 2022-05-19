// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headDocument({
  db: 'events',
  docId: '0007241142412418284'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['etag']);
});
