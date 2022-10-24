// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getAttachment({
  db: 'products',
  docId: 'small-appliances:100001',
  attachmentName: 'product_details.txt'
}).then(response => {
  let attachment = response.result as Readable;
  attachment.pipe(process.stdout);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `small-appliances:100001` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
