// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postIndexInfo({
  db: 'recipes',
  keys: ['_design/cookbook'],
  type: ['search']
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `cookbook` design document to exist with a Cloudant Search index. To create the design document, see [Create or modify a design document.](#putdesigndocument)
