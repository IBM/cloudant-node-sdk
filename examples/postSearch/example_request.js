// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postSearch({
  db: 'users',
  ddoc: 'allusers',
  index: 'activeUsers',
  query: 'name:Jane* AND active:True'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `activeUsers` Cloudant Search index to exist. To create the design document with this index, see [Create or modify a design document.](#putdesigndocument)
