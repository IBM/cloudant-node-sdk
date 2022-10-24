// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

service.deleteDocument({
  db: 'events',
  docId: '0007241142412418284',
  rev: '2-9a0d1cd9f40472509e9aac6461837367'
}).then(response => {
  console.log(response.result);
});
