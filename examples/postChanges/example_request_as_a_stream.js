// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.postChangesAsStream({
  db: 'orders'
}).then(response => {
  let stream = fs.createWriteStream("result.json");
  response.result.pipe(stream);
  response.result.on('end', () => stream.end());
});
