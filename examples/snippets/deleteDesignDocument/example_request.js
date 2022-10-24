// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteDesignDocument({
  db: 'products',
  ddoc: 'appliances',
  rev: '1-98e6a25b3b45df62e7d47095ac15b16a'
}).then(response => {
  console.log(response.result);
});
