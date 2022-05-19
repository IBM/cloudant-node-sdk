// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postGeoCleanup({
  db: 'stores'
}).then(response => {
  console.log(response.result);
});
