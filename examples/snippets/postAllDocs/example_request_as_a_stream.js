// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { createWriteStream } from 'node:fs'

const service = CloudantV1.newInstance({});

service.postAllDocsAsStream({
  db: 'orders',
  includeDocs: true,
  startKey: 'abc',
  limit: 10
}).then(response => {
  const stream = createWriteStream("result.json");
  response.result.pipe(stream);
  response.result.on('end', () => stream.end());
});
