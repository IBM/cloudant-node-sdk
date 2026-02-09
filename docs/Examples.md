# Code examples

<details open>
<summary>Table of Contents</summary>

<!-- toc -->
- [1. Create a database and add a document](#1-create-a-database-and-add-a-document)
- [2. Retrieve information from an existing database](#2-retrieve-information-from-an-existing-database)
- [3. Update your previously created document](#3-update-your-previously-created-document)
- [4. Delete your previously created document](#4-delete-your-previously-created-document)
- [Further code examples](#further-code-examples)
</details>

The following code examples
[authenticate with the environment variables](Authentication.md#authentication-with-environment-variables).

## 1. Create a database and add a document

**Note:** This example code assumes that `orders` database does not exist in your account.

This example code creates `orders` database and adds a new document "example"
into it. To connect, you must set your environment variables with
the *service url*, *authentication type* and *authentication credentials*
of your Cloudant service.

Cloudant environment variable naming starts with a *service name* prefix that identifies your service.
By default, this is `CLOUDANT`, see the settings in the
[authentication with environment variables section](Authentication.md#authentication-with-environment-variables).

If you would like to rename your Cloudant service from `CLOUDANT`,
you must use your defined service name as the prefix for all Cloudant related environment variables.

Once the environment variables are set, you can try out the code examples.

<details open>
<summary>TypeScript:</summary>

```ts
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```ts
interface OrderDocument extends CloudantV1.Document {
  name?: string;
  joined?: string;
  _id: string;
  _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ======================
const client = CloudantV1.newInstance({});

// 2. Create a database =========================================================
const exampleDbName = 'orders';

// Try to create database if it doesn't exist
const createDb = client
  .putDatabase({ db: exampleDbName })
  .then((putDatabaseResult) => {
    if (putDatabaseResult.result.ok) {
      console.log(`"${exampleDbName}" database created."`);
    }
  })
  .catch((err) => {
    if (err.code === 412) {
      console.log(
        `Cannot create "${exampleDbName}" database, it already exists.`
      );
    }
  });

// 3. Create a document =========================================================
// Create a document object with "example" id
const exampleDocId = 'example';

// Setting `_id` for the document is optional when postDocument function is used for CREATE.
// When `_id` is not provided the server will generate one for your document.
const exampleDocument: OrderDocument = { _id: exampleDocId };

// Add "name" and "joined" fields to the document
exampleDocument.name = 'Bob Smith';
exampleDocument.joined = '2019-01-24T10:42:59.000Z';

// Save the document in the database with "postDocument" function
createDb.then(() => {
  client
    .postDocument({
      db: exampleDbName,
      document: exampleDocument,
    })
    // ==========================================================================
    // Note: saving the document can also be done with the "putDocument"
    // function. In this case `docId` is required for a CREATE operation:
    /*
    .putDocument({
      db: exampleDbName,
      docId: exampleDocId,
      document: exampleDocument,
    })
    */
    // ==========================================================================
    .then((createDocumentResponse) => {
      console.log(
        'You have created the document. Response body:\n' +
          JSON.stringify(createDocumentResponse.result, null, 2)
      );
    });
});
```

</details>

<details>
<summary>JavaScript:</summary>

```js
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```js
const createDbAndDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ====================
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
      console.log(
        `Cannot create "${exampleDbName}" database, it already exists.`
      );
    }
  }

  // 3. Create a document =======================================================
  // Create a document object with "example" id
  const exampleDocId = 'example';

  // Setting `_id` for the document is optional when "postDocument" function is used for CREATE.
  // When `_id` is not provided the server will generate one for your document.
  const exampleDocument = { _id: exampleDocId };

  // Add "name" and "joined" fields to the document
  exampleDocument['name'] = 'Bob Smith';
  exampleDocument.joined = '2019-01-24T10:42:59.000Z';

  // Save the document in the database with "postDocument" function
  const createDocumentResponse = await client.postDocument({
    db: exampleDbName,
    document: exampleDocument,
  });

  // ==========================================================================
  // Note: saving the document can also be done with the "putDocument"
  // function. In this case `docId` is required for a CREATE operation:
  /* const createDocumentResponse = await client.putDocument({
       db: exampleDbName,
       docId: exampleDocId,
       document: exampleDocument,
  }); */
  // ==========================================================================

  console.log(
    'You have created the document. Response body:\n' +
      JSON.stringify(createDocumentResponse.result, null, 2)
  );
};

if (require.main === module) {
  createDbAndDoc();
}
```

</details>

When you run the code, you see a result similar to the following output.

```text
"orders" database created.
You have created the document. Response body:
{
  "id": "example",
  "rev": "1-1b403633540686aa32d013fda9041a5d",
  "ok": true
}
```

## 2. Retrieve information from an existing database

**Note**: This example code assumes that you have created both the `orders`
database and the `example` document by
[running the previous example code](#1-create-a-database-and-add-a-document)
successfully. Otherwise, the following error message occurs, "Cannot delete document because either 'orders'
database or 'example' document was not found."

<details open>
<summary>Gather database information example</summary>

<details open>
<summary>TypeScript:</summary>

```ts
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```ts
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
  const documentCount = dbInfo.result.docCount;
  const dbNameResult = dbInfo.result.dbName;

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
```

</details>

<details>
<summary>JavaScript:</summary>

```js
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```js
const getInfoFromExistingDatabase = async () => {
  // 1. Create a client with `CLOUDANT` default service name  ===================
  const client = CloudantV1.newInstance({});

  // 2. Get server information ==================================================
  // call service without parameters:
  const { version } = (await client.getServerInformation()).result;
  console.log(`Server version ${version}`);

  // 3. Get database information for "orders" =================================
  const dbName = 'orders';

  // call service with embedded parameters:
  const dbInfo = await client.getDatabaseInformation({ db: dbName });
  const documentCount = dbInfo.result.docCount;
  const dbNameResult = dbInfo.result.dbName;

  // 4. Show document count in database =========================================
  console.log(
    `Document count in "${dbNameResult}" database is ${documentCount}.`
  );

  // 5. Get "example" document out of the database by document id ===================
  const getDocParams = { db: dbName, docId: 'example' };

  // call service with predefined parameters:
  const documentExample = await client.getDocument(getDocParams);

  // result object is defined as a Document here:
  const { result } = documentExample;

  console.log(
    `Document retrieved from database:\n${JSON.stringify(result, null, 2)}`
  );
};

if (require.main === module) {
  getInfoFromExistingDatabase();
}
```

</details>

</details>
When you run the code, you see a result similar to the following output.

```text
Server version 3.2.1
Document count in "orders" database is 1.
Document retrieved from database:
{
  "_id": "example",
  "_rev": "1-1b403633540686aa32d013fda9041a5d",
  "name": "Bob Smith",
  "joined": "2019-01-24T10:42:59.000Z"
}
```

## 3. Update your previously created document

**Note**: This example code assumes that you have created both the `orders`
database and the `example` document by
[running the previous example code](#1-create-a-database-and-add-a-document)
successfully. Otherwise, the following error message occurs, "Cannot update document because either 'orders'
database or 'example' document was not found."

<details open>
<summary>Update code example</summary>

<details open>
<summary>TypeScript:</summary>

```ts
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```ts
interface OrderDocument extends CloudantV1.Document {
  address?: string;
  joined?: string;
  _id?: string;
  _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ======================
const client = CloudantV1.newInstance({});
// 2. Update the document =======================================================
// Set the options to get the document out of the database if it exists
const exampleDbName = 'orders';

// Try to get the document if it previously existed in the database
const getDocParams: CloudantV1.GetDocumentParams = {
  docId: 'example',
  db: exampleDbName,
};

// ==============================================================================
// Note : for response byte stream use:
/*
const getdocAsStreamParam: CloudantV1.GetDocumentAsStreamParams = {
  docId: 'example',
  db: exampleDbName,
};
client
  .getDocumentAsStream(getdocAsStreamParam)
  .then((documentAsByteStream) => {...});
*/
// ==============================================================================

client
  .getDocument(getDocParams)
  .then((docResult) => {
    // using OrderDocument on getDocument result:
    const document: OrderDocument = docResult.result;

    // Add Bob Smith's address to the document
    document.address = '19 Front Street, Darlington, DL5 1TY';

    // Remove the joined property from document object
    delete document.joined;

    // Update the document in the database
    client
      .postDocument({ db: exampleDbName, document })
      // ========================================================================
      // Note 1: for request byte stream use:
      // .postDocument(
      //   {db: exampleDbName, document: documentAsByteStream}
      // )
      // ========================================================================

      // ========================================================================
      // Note 2: updating the document can also be done with the "putDocument" function.
      // `docId` and `rev` are required for an UPDATE operation,
      // but `rev` can be provided in the document object as `_rev` too:
      /*
      .putDocument({
        db: exampleDbName,
        docId: document._id, // docId is a required parameter
        rev: document._rev,
        document, // _rev in the document object CAN replace above `rev` parameter
      })
      */
      // ========================================================================
      .then((res) => {
        // Keeping track of the latest revision number of the document object
        // is necessary for further UPDATE/DELETE operations:
        document._rev = res.result.rev;
        console.log(
          `You have updated the document:\n${JSON.stringify(document, null, 2)}`
        );
      });
  })
  .catch((err) => {
    if (err.code === 404) {
      console.log(
        `Cannot update document because either "${exampleDbName}" database or the "example" ` +
          `document was not found.`
      );
    }
  });
```

</details>

<details>
<summary>JavaScript:</summary>

```js
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```js
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
```

</details>

</details>
When you run the code, you see a result similar to the following output.

```text
You have updated the document:
{
  "_id": "example",
  "_rev": "2-4e2178e85cffb32d38ba4e451f6ca376",
  "name": "Bob Smith",
  "address": "19 Front Street, Darlington, DL5 1TY"
}
```

## 4. Delete your previously created document

**Note**: This example code assumes that you have created both the `orders`
database and the `example` document by
[running the previous example code](#1-create-a-database-and-add-a-document)
successfully. Otherwise, the following error message occurs, "Cannot delete document because either 'orders'
database or 'example' document was not found."

<details open>
<summary>Delete code example</summary>

<details open>
<summary>TypeScript:</summary>

```ts
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```ts
interface OrderDocument extends CloudantV1.Document {
  name?: string;
  address?: string;
  joined?: string;
  _id?: string;
  _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ======================
const client = CloudantV1.newInstance({});

// 2. Delete the document =======================================================
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
        docId: document._id, // `docId` is required for DELETE
        rev: document._rev, // `rev` is required for DELETE
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
```

</details>

<details>
<summary>JavaScript:</summary>

```js
import { CloudantV1 } from '@ibm-cloud/cloudant';
```

```js
const deleteDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ====================
  const client = CloudantV1.newInstance({});

  // 2. Delete the document =====================================================
  // Set the options to get the document out of the database if it exists
  const exampleDbName = 'orders';
  const exampleDocId = 'example';

  // Try to get the document if it previously existed in the database
  try {
    const document = (
      await client.getDocument({
        docId: exampleDocId,
        db: exampleDbName,
      })
    ).result;

    await client.deleteDocument({
      db: exampleDbName,
      docId: document._id, // `docId` is required for DELETE
      rev: document._rev, // `rev` is required for DELETE
    });
    console.log('You have deleted the document.');
  } catch (err) {
    if (err.code === 404) {
      console.log(
        `Cannot delete document because either "${exampleDbName}" database or the "example" ` +
          `document was not found.`
      );
    }
  }
};

if (require.main === module) {
  deleteDoc();
}
```

</details>

</details>
When you run the code, you see the following output.

```text
You have deleted the document.
```

## Further code examples

For a complete list of code examples, see the [examples directory](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.15/examples#examples-for-node).
