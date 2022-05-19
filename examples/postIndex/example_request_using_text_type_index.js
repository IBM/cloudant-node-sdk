// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

// Type "text" index fields require an object with a name and type properties for the field.
const indexField: CloudantV1.IndexField = {
  name: 'address',
  type: 'string'
}

const index: CloudantV1.IndexDefinition = {
  fields: [indexField]
}

service.postIndex({
  db: 'users',
  ddoc: 'text-index',
  name: 'getUserByAddress',
  index: index,
  type: 'text'
}).then(response => {
  console.log(response.result);
});
