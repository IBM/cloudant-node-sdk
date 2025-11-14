// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

service.headUpInformation().then(response => {
  console.log('Service is up and healthy');
})
  .catch(err => {
    if (err.code === 503) {
      console.error(`Service is unavailable, status code: ${err.code}, ${err.message}`);
    }
    else {
      console.error(`Issue checking service health, status: ${err.code}, ${err.message}`);
    }
  });
