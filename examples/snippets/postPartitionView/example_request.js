// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionView({
  db: 'events',
  ddoc: 'checkout',
  includeDocs: true,
  limit: 10,
  partitionKey: 'ns1HJS13AMkK',
  view: 'byProductId'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `byProductId` partitioned view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
