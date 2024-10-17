// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postPartitionSearch({
  db: 'events',
  partitionKey: 'ns1HJS13AMkK',
  ddoc: 'checkout',
  index: 'findByDate',
  query: 'date:[2019-01-01T12:00:00.000Z TO 2019-01-31T12:00:00.000Z]'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `findByDate` Cloudant Search partitioned index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
