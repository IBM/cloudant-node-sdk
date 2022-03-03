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

/* eslint-disable no-console */

const { CloudantV1 } = require('../../../../index.ts');

// when you change this file, please run test/examples/src/js/CreateOutputs.js so that the output files are updated

const updateDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ====================
  const client = CloudantV1.newInstance({});
  // 2. Update the document =====================================================
  // Set the options to get the document out of the database if it exists
  const exampleDbName = 'orders';

  // Try to get the document if it previously existed in the database
  try {
    const document = (
      await client.getDocument({
        docId: 'example',
        db: exampleDbName,
      })
    ).result;

    // ==========================================================================
    // Note: for response byte stream use:
    /*
    const documentAsByteStream = (
      await client.getDocumentAsStream({
        docId: 'example',
        db: exampleDbName,
      })
    ).result;
    */
    // ==========================================================================

    // Add Bob Smith's address to the document
    document.address = '19 Front Street, Darlington, DL5 1TY';

    // Remove the joined property from document object
    delete document['joined'];

    // Keeping track of the latest revision number of the document object
    // is necessary for further UPDATE/DELETE operations:
    document._rev = (
      await client.postDocument({
        db: exampleDbName,
        document, // _id and _rev MUST be inside the document object
      })
    ).result.rev;

    // ==========================================================================
    // Note 1: for request byte stream use:
    /*
    document._rev = (
      await client.postDocument({
        db: exampleDbName,
        document: documentAsByteStream,
      })
    ).result.rev;
     */
    // ==========================================================================

    // ==========================================================================
    // Note 2: updating the document can also be done with the "putDocument" function.
    // `docId` and `rev` are required for an UPDATE operation,
    // but `rev` can be provided in the document object as `_rev` too:
    /*
    document._rev = (
      await client.putDocument({
        db: exampleDbName,
        docId: document._id, // docId is a required parameter
        rev: document._rev,
        document // _rev in the document object CAN replace above `rev` parameter
      })
    ).result.rev;
    */
    // ==========================================================================

    console.log(
      `You have updated the document:\n${JSON.stringify(document, null, 2)}`
    );
  } catch (err) {
    if (err.code === 404) {
      console.log(
        `Cannot update document because either "${exampleDbName}" database or the "example" ` +
          `document was not found.`
      );
    }
  }
};

if (require.main === module) {
  updateDoc();
}

module.exports = { updateDoc };
