// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const stream = new Readable();
stream.push('This appliance includes...');
stream.push(null);

service.putAttachment({
  db: 'products',
  docId: 'small-appliances:100001',
  attachmentName: 'product_details.txt',
  attachment: stream,
  contentType: 'text/plain'
}).then(response => {
  console.log(response.result);
});
