// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const revsDiff: CloudantV1.DocumentRevisions = {
  order00077: [
    "<1-missing-revision>",
    "<2-missing-revision>",
    "<3-possible-ancestor-revision>"
  ]
}

service.postRevsDiff({
  db: 'orders',
  revsDiffRequest: revsDiff
}).then(response => {
  console.log(response.result);
});
// section: markdown
// This example requires the example revisions in the POST body to be replaced with valid revisions.
