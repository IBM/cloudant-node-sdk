// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const allDocsQueries: CloudantV1.AllDocsQuery[] = [{
    keys: ['small-appliances:1000042', 'small-appliances:1000043'],
  },
  {
    limit: 3,
    skip: 2
}];

service.postAllDocsQueries({
  db: 'products',
  queries: allDocsQueries
}).then(response => {
  console.log(response.result);
});
