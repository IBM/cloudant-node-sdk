/**
 * © Copyright IBM Corporation 2020. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

const { CloudantV1 } = require('../../../../index.ts');

// when you change this file, please run test/examples/src/js/CreateOutputs.js so that the output files are updated

const getInfoFromExistingDatabase = async () => {
  // 1. Create a Cloudant client with "EXAMPLES" service name ===================
  const client = CloudantV1.newInstance({ serviceName: 'EXAMPLES' });

  // 2. Get server information ==================================================
  // call service without parameters:
  const version = (await client.getServerInformation()).result.version;
  console.log(`Server version ${version}`);

  // 3. Get database information for "animaldb" =================================
  const dbName = 'animaldb';

  // call service with embedded parameters:
  const dbInfo = await client.getDatabaseInformation({ db: dbName });
  const documentCount = dbInfo.result.doc_count;
  const dbNameResult = dbInfo.result.db_name;

  // 4. Show document count in database =================================
  console.log(`Document count in "${dbNameResult}" database is ` + documentCount + '.');

  // 5. Get zebra document out of the database by document id ===================
  const getDocParams = { db: dbName, docId: 'zebra' };

  // call service with predefined parameters:
  const documentAboutZebra = await client.getDocument(getDocParams);

  // result object is defined as a Document here:
  const result = documentAboutZebra.result;

  console.log('Document retrieved from database:\n' + JSON.stringify(result, null, 2));
};

if (require.main === module) {
  getInfoFromExistingDatabase();
}

module.exports = { getInfoFromExistingDatabase };
