// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const uuidsParams: CloudantV1.GetUuidsParams = {
  count: 10
};

service.getUuids(uuidsParams).then(response => {
  console.log(response.result);
});
