// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDesignDocument({
  db: 'products',
  ddoc: 'appliances',
  latest: true
}).then(response => {
  console.log(response.result);
});
