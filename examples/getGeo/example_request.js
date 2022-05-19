// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.getGeo({
  db: 'stores',
  ddoc: 'places',
  index: 'pointsInEngland',
  bbox: '-50.52,-4.46,54.59,1.45',
  includeDocs: true,
  nearest: true
}).then(response => {
  console.log(response.result);
});
