// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector: CloudantV1.Selector = {
  type: {'$eq': 'product'}
}
service.postPartitionFind({
  db: 'products',
  partitionKey: 'small-appliances',
  fields: ['productid', 'name', 'description'],
  selector: selector
}).then(response => {
  console.log(response.result);
});
