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

const createDbAndDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ================
  const client = CloudantV1.newInstance({});

  // 2. Create a database =======================================================
  const exampleDbName = 'orders';

  // Try to create database if it doesn't exist
  try {
    const putDatabaseResult = (
      await client.putDatabase({
        db: exampleDbName,
      })
    ).result;
    if (putDatabaseResult.ok) {
      console.log(`"${exampleDbName}" database created.`);
    }
  } catch (err) {
    if (err.code === 412) {
      console.log('Cannot create "' + exampleDbName + '" database, it already exists.');
    }
  }

  // 3. Create a document =======================================================
  // Create a document object with "example" id
  const exampleDocId = 'example';

  const exampleDocument = { _id: exampleDocId };

  // Add "name" and "joined" fields to the document
  exampleDocument['name'] = 'Bob Smith';
  exampleDocument.joined = '2019-01-24T10:42:99.000Z';

  // Save the document in the database
  const createDocumentResponse = await client.postDocument({
    db: exampleDbName,
    document: exampleDocument,
  });

  // Keep track with the revision number of the document object
  exampleDocument._rev = createDocumentResponse.result.rev;
  console.log('You have created the document:\n' + JSON.stringify(exampleDocument, null, 2));
};

if (require.main === module) {
  createDbAndDoc();
}

module.exports = { createDbAndDoc };
