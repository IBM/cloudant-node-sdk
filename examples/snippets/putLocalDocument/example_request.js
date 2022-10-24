// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const localDocument: CloudantV1.Document = {
  type: 'order',
  user: 'Bob Smith',
  orderid: '0007741142412418284',
  userid: 'abc123',
  total: 214.98,
  deliveryAddress: '19 Front Street, Darlington, DL5 1TY',
  delivered: 'true',
  courier: 'UPS',
  courierid: '15125425151261289',
  date: '2019-01-28T10:44:22.000Z'
}

service.putLocalDocument({
  db: 'orders',
  docId: 'local-0007741142412418284',
  document: localDocument
}).then(response => {
  console.log(response.result);
});
