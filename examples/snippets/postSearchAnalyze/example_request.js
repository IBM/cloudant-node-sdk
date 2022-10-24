// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postSearchAnalyze({
  analyzer: 'english',
  text: 'running is fun',
}).then(response => {
  console.log(response.result);
});
