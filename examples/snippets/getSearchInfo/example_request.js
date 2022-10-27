// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getSearchInfo({
  db: 'products',
  ddoc: 'appliances',
  index: 'findByPrice'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `findByPrice` Cloudant Search partitioned index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
