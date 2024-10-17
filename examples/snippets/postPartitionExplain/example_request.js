// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector: CloudantV1.Selector = {
  userId: {'$eq': 'abc123'}
}
service.postPartitionExplain({
  db: 'events',
  executionStats: true,
  limit: 10,
  partitionKey: 'ns1HJS13AMkK',
  selector: selector
}).then(response => {
  console.log(response.result);
});
