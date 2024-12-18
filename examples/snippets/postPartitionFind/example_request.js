// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector: CloudantV1.Selector = {
  userId: {'$eq': 'abc123'}
}
service.postPartitionFind({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK',
  fields: ['productId', 'eventType', 'date'],
  selector: selector
}).then(response => {
  console.log(response.result);
});
