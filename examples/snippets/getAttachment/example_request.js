// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getAttachment({
  db: 'products',
  docId: '1000042',
  attachmentName: 'product_details.txt'
}).then(response => {
  let attachment = response.result as Readable;
  attachment.pipe(process.stdout);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `1000042` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
