// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc1: CloudantV1.Document = {
  _id: '0007241142412418284',
  _rev: '1-5005d65514fe9e90f8eccf174af5dd64',
  _deleted: true,
}
const eventDoc2: CloudantV1.Document = {
  _id: '0007241142412418285',
  _rev: '1-2d7810b054babeda4812b3924428d6d6',
  _deleted: true,
}

const bulkDocs: CloudantV1.BulkDocs = {  docs: [eventDoc1, eventDoc2]
}

service.postBulkDocs({
  db: 'events',
  bulkDocs: bulkDocs
}).then(response => {
  console.log(response.result);
});
