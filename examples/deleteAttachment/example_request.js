// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteAttachment({
  db: 'products',
  docId: 'small-appliances:100001',
  attachmentName: 'product_details.txt',
  rev: '4-1a0d1cd6f40472509e9aac646183736a'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `product_details.txt` attachment in `small-appliances:100001` document to exist. To create the attachment, see [Create or modify an attachment.](#putattachment)
