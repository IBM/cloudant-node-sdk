// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDocumentShardsInfo({
  db: 'products',
  docId: 'small-appliances:1000042'
}).then(response => {
  console.log(response.result);
});
