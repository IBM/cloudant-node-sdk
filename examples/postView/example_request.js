// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postView({
  db: 'users',
  ddoc: 'allusers',
  view: 'getVerifiedEmails'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getVerifiedEmails` view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
