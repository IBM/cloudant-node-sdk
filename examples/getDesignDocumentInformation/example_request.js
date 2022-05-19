// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDesignDocumentInformation({
  db: 'products',
  ddoc: 'appliances'
}).then(response => {
  console.log(response.result);
});
