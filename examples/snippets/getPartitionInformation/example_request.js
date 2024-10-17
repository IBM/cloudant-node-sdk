// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getPartitionInformation({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK'
}).then(response => {
  console.log(response.result);
});
