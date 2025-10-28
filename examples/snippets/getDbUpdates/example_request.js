// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getDbUpdates({
  feed: 'normal',
  since: 'now'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This request requires `server_admin` access.
