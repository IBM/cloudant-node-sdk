/**
 * © Copyright IBM Corporation 2020, 2022. All Rights Reserved.
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

import { CloudantV1 } from '../../../../index';

// 1. Create a client with `CLOUDANT` default service name =====================
const client = CloudantV1.newInstance({});

// 2. Get server information ====================================================
// call service without parameters:
client.getServerInformation().then((serverInformation) => {
  const { version } = serverInformation.result;
  console.log(`Server version ${version}`);
});

// 3. Get database information for "orders" ===================================
const dbName = 'orders';

// call service with embedded parameters:
client.getDatabaseInformation({ db: dbName }).then((dbInfo) => {
  const documentCount = dbInfo.result.doc_count;
  const dbNameResult = dbInfo.result.db_name;

  // 4. Show document count in database =========================================
  console.log(
    `Document count in "${dbNameResult}" database is ${documentCount}.`
  );
});

// 5. Get "example" document out of the database by document id =====================
const getDocParams: CloudantV1.GetDocumentParams = {
  db: dbName,
  docId: 'example',
};

// call service with predefined parameters:
client.getDocument(getDocParams).then((documentExample) => {
  // result object is defined as a Document here:
  const { result } = documentExample;
  console.log(
    `Document retrieved from database:\n${JSON.stringify(result, null, 2)}`
  );
});
