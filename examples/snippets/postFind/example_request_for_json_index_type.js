// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
const service = CloudantV1.newInstance({});

const selector: CloudantV1.JsonObject = {
  email_verified: {
    '$eq': true
  }
};

const sort: CloudantV1.JsonObject = {
  email: 'desc'
};

service.postFind({
  db: 'users',
  selector: selector,
  fields: ['_id', 'type', 'name', 'email'],
  sort: [sort],
  limit: 3
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getUserByEmail` Cloudant Query "json" index to exist. To create the index, see [Create a new index on a database.](#postindex)
