// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

// Type "json" index fields require an object that maps the name of a field to a sort direction.
const indexField: CloudantV1.IndexField = {
  email: 'asc'
}

const index: CloudantV1.IndexDefinition = {
  fields: [indexField]
}

service.postIndex({
  db: 'users',
  ddoc: 'json-index',
  name: 'getUserByEmail',
  index: index,
  type: 'json'
}).then(response => {
  console.log(response.result);
});
