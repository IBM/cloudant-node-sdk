// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const viewQueries: CloudantV1.ViewQuery[] = [
  {
    include_docs: true,
    limit: 5
  },
  {
    descending: true,
    skip: 1
  }
];
service.postViewQueries({
  db: 'users',
  ddoc: 'allusers',
  queries: viewQueries,
  view: 'getVerifiedEmails'
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the `getVerifiedEmails` view to exist. To create the design document with this view, see [Create or modify a design document.](#putdesigndocument)
