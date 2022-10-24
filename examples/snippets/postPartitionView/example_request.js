// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionView({
  db: 'products',
  ddoc: 'appliances',
  includeDocs: true,
  limit: 10,
  partitionKey: 'small-appliances',
  view: 'byApplianceProdId'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `byApplianceProdId` partitioned view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
