// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc: CloudantV1.Document = {
  type: 'event',
  userId: 'abc123',
  eventType: 'addedToBasket',
  productId: '1000042',
  date: '2019-01-28T10:44:22.000Z'
};

service.putDocument({
  db: 'events',
  docId: 'ns1HJS13AMkK:0007241142412418284',
  document: eventDoc
}).then(response => {
  console.log(response.result);
});
