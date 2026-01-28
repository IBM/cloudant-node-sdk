// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

let productsDocStream = fs.createReadStream("upload.json");

service.postDocument({
  db: 'products',
  contentType: 'application/json',
  document: productsDocStream
}).then(response => {
  console.log(response.result);
});
