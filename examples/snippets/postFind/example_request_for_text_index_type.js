// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

const selector: CloudantV1.JsonObject = {
  address: {
    '$exists': true
  }
};

service.postFind({
  db: 'users',
  selector: selector,
  fields: ['_id', 'type', 'name', 'email', 'address'],
  limit: 3
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getUserByAddress` Cloudant Query "text" index to exist. To create the index, see [Create a new index on a database.](#postindex)
