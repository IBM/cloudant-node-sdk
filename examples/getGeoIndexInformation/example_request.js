// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getGeoIndexInformation({
  db: 'stores',
  ddoc: 'places',
  index: 'pointsInEngland'
}).then(response => {
  console.log(response.result);
});
