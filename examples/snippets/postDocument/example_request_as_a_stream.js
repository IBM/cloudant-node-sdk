// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { createReadStream } from 'node:fs'

const service = CloudantV1.newInstance({});

const productsDocStream = createReadStream('products_doc.json')

service.postDocument({
  db: 'products',
  contentType: 'application/json',
  document: productsDocStream
}).then(response => {
  console.log(response.result);
});
