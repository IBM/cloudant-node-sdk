// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const eventDoc1: CloudantV1.Document = {
  _id: 'ns1HJS13AMkK:0007241142412418284',
  _rev: '1-00000000000000000000000000000000',
  _deleted: true,
}
const eventDoc2: CloudantV1.Document = {
  _id: 'H8tDIwfadxp9:0007241142412418285',
  _rev: '1-00000000000000000000000000000000',
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
