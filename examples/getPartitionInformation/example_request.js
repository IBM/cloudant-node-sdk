// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getPartitionInformation({
  db: 'products',
  partitionKey: 'small-appliances'
}).then(response => {
  console.log(response.result);
});
