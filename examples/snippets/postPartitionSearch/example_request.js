// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionSearch({
  db: 'products',
  partitionKey: 'small-appliances',
  ddoc: 'appliances',
  index: 'findByPrice',
  query: 'price:[14 TO 20]'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `findByPrice` Cloudant Search partitioned index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
