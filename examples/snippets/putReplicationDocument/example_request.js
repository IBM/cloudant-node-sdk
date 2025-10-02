// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const sourceDb: CloudantV1.ReplicationDatabase = {
  url: 'https://~replace-with-source-host~.cloudantnosqldb.appdomain.cloud/animaldb'
};

const targetDb: CloudantV1.ReplicationDatabase = {
  auth: {
    iam: {
      'apiKey': 'a1b2c3d4e5f6f1g4h7j3k6l9m2p5q8s1t4v7x0z3' //use your own IAM API key
    }
  },
  url: 'https://~replace-with-target-host~.cloudantnosqldb.appdomain.cloud/animaldb-target'
};

const replDocument: CloudantV1.ReplicationDocument = {
  id: 'repldoc-example',
  createTarget: true,
  source: sourceDb,
  target: targetDb
}

service.putReplicationDocument({
  docId: 'repldoc-example',
  replicationDocument: replDocument
}).then(response => {
  console.log(response.result);
});
