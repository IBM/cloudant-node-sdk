// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteDesignDocument({
  db: 'products',
  ddoc: 'appliances',
  rev: '1-00000000000000000000000000000000'
}).then(response => {
  console.log(response.result);
});
