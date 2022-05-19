// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const revs: CloudantV1.DocumentRevisions = {
  order00077: ['<order00077-existing-revision>', '<2-missing-revision>']
};

service.postMissingRevs({
  db: 'orders',
  missingRevs: revs
}).then(response => {
  console.log(response.result);
});
