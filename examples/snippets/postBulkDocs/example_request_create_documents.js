// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc1: CloudantV1.Document = {
  _id: 'ns1HJS13AMkK:0007241142412418284',
  type: 'event',
  userId: 'abc123',
  eventType:'addedToBasket',
  productId: '1000042',
  date: '2019-01-28T10:44:22.000Z'
}
const eventDoc2: CloudantV1.Document = {
  _id: 'H8tDIwfadxp9:0007241142412418285',
  type: 'event',
  userId: 'abc234',
  eventType: 'addedToBasket',
  productId: '1000050',
  date: '2019-01-25T20:00:00.000Z'
}

const bulkDocs: CloudantV1.BulkDocs = {  docs: [eventDoc1, eventDoc2]
}

service.postBulkDocs({
  db: 'events',
  bulkDocs: bulkDocs
}).then(response => {
  console.log(response.result);
});
