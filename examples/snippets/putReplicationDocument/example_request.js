// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const sourceDb: CloudantV1.ReplicationDatabase = {
  url: '<your-source-service-url>/animaldb'
};

const targetDb: CloudantV1.ReplicationDatabase = {
  auth: {
    iam: {
      'api_key': '<your-iam-api-key>'
    }
  },
  url: '<your-target-service-url>' + '/' + 'animaldb-target'
};

const replDocument: CloudantV1.ReplicationDocument = {
  id: 'repldoc-example',
  create_target: true,
  source: sourceDb,
  target: targetDb
}

service.putReplicationDocument({
  docId: 'repldoc-example',
  replicationDocument: replDocument
}).then(response => {
  console.log(response.result);
});
