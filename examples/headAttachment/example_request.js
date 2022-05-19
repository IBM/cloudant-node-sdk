// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headAttachment({
  db: 'products',
  docId: 'small-appliances:100001',
  attachmentName: 'product_details.txt'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['content-length']);
  console.log(response.headers['content-type']);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `small-appliances:100001` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
