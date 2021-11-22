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

import { CloudantV1 } from '../../../../index';

interface OrderDocument extends CloudantV1.Document {
  name?: string;
  address?: string;
  joined?: string;
  _id?: string;
  _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ================
const client = CloudantV1.newInstance({});

// 2. Delete the document =============================================
// Set the options to get the document out of the database if it exists
const exampleDbName = 'orders';
const exampleDocId = 'example';

// Try to get the document if it previously existed in the database
const getDocParams: CloudantV1.GetDocumentParams = {
  docId: exampleDocId,
  db: exampleDbName,
};

client
  .getDocument(getDocParams)
  .then((docResult) => {
    const document: OrderDocument = docResult.result;

    client
      .deleteDocument({
        db: exampleDbName,
        docId: document._id,
        rev: document._rev,
      })
      .then(() => {
        console.log('You have deleted the document.');
      });
  })
  .catch((err) => {
    if (err.code === 404) {
      console.log(
        `Cannot delete document because either "${exampleDbName}" database or the "example" ` +
          `document was not found.`
      );
    }
  });
