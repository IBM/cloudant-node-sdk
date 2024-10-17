// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt'
}).then(response => {
  console.log(response.status);
  console.log(response.headers['Content-Length']);
  console.log(response.headers['Content-Type']);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `1000042` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
