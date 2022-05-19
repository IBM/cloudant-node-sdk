// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.deleteIndex({
  db: 'users',
  ddoc: 'json-index',
  index: 'getUserByName',
  type: 'json'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example will fail if `getUserByName` index doesn't exist. To create the index, see [Create a new index on a database.](#postindex)
