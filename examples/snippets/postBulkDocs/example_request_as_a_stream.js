// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { createReadStream } from 'node:fs'

const service = CloudantV1.newInstance({});

const stream = createReadStream("upload.json");

service.postBulkDocs({
  db: 'events',
  bulkDocs: stream
}).then(response => {
  console.log(response.result);
});
// section: markdown
// Content of upload.json
// section: code
{
  "docs": [
    {
      "_id": "ns1HJS13AMkK:0007241142412418284",
      "type": "event",
      "userId": "abc123",
      "eventType": "addedToBasket",
      "productId": "1000042",
      "date": "2019-01-28T10:44:22.000Z"
    },
    {
      "_id": "H8tDIwfadxp9:0007241142412418285",
      "type": "event",
      "userId": "abc234",
      "eventType": "addedToBasket",
      "productId": "1000050",
      "date": "2019-01-25T20:00:00.000Z"
    }
  ]
}
