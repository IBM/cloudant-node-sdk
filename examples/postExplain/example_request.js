// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const selector: CloudantV1.Selector = {
  type: {
    "$eq": "user"
  }
};

service.postExplain({
  db: 'users',
  executionStats: true,
  limit: 10,
  selector: selector
}).then(response => {
  console.log(response.result);
});
