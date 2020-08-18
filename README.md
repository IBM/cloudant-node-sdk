<!--
  The example codes and outputs below are generated using the `embedmd` go package.

      https://github.com/campoy/embedmd

  You should regenerate the example codes after making any changes to examples in the test/examples/ folder.

      embedmd -w README.md
  -->

[![Build Status](https://travis-ci.com/IBM/cloudant-node-sdk.svg?branch=master)](https://travis-ci.com/IBM/cloudant-node-sdk)
<!--
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm-version](https://img.shields.io/npm/v/IBM/cloudant-node-sdk.svg)](https://www.npmjs.com/package/@ibmcloud/cloudant)
[![codecov](https://codecov.io/gh/IBM/cloudant-node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/IBM/cloudant-node-sdk)
-->

# IBM Cloudant Node.js SDK Version 0.0.5

Node.js client library to interact with various [Cloudant APIs](https://cloud.ibm.com/apidocs/cloudant?code=node).

Disclaimer: this SDK is being released initially as a **pre-release** version.
Changes might occur which impact applications that use this SDK.

<details>
<summary>Table of Contents</summary>

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting started](#getting-started)
  * [Authentication](#authentication)
    + [IAM authentication](#iam-authentication)
    + [Session cookie authentication](#session-cookie-authentication)
    + [Basic authentication](#basic-authentication)
  * [Code examples](#code-examples)
    + [1. Retrieve information from an existing database](#1-retrieve-information-from-an-existing-database)
    + [2. Create your own database and add a document](#2-create-your-own-database-and-add-a-document)
    + [3. Update your previously created document](#3-update-your-previously-created-document)
    + [4. Delete your previously created document](#4-delete-your-previously-created-document)
- [Using the SDK](#using-the-sdk)
- [Questions](#questions)
- [Issues](#issues)
- [Further resources](#further-resources)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

</details>

## Overview

The IBM Cloudant Node.js SDK allows developers to programmatically interact with [Cloudant](https://cloud.ibm.com/apidocs/cloudant?code=node).

## Features

The purpose of this Node.js SDK is to wrap most of the HTTP request APIs provided by Cloudant and
supply other functions to ease the usage of Cloudant.
This SDK should make life easier for programmers to do what’s really important for them: develop.

Reasons why you should consider using Cloudant SDK for Node.js in your project:

- Supported by IBM Cloudant.
- Includes all the most popular and latest supported endpoints for applications.
- Handles the authentication.
- Familiar user experience of IBM Cloud SDKs.
- `Promise` based design with asynchronous HTTP requests.
- Use either as native JavaScript or take advantage of TypeScript models.

## Prerequisites

- You need an [IBM Cloud][ibm-cloud-onboarding] account.
- **Node.js 10, 12, 14**: This SDK is tested with Node.js versions 10, 12, and 14. It may work on other versions but those are not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install @ibm-cloud/cloudant
```

## Getting started

### Authentication

This library requires some of your [Cloudant service credentials](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud#locating-your-service-credentials) to authenticate with your account.

1. `IAM`, `COUCHDB_SESSION`, `BASIC` or `NOAUTH` **authentication type**.
    1. [*IAM authentication*](#iam-authentication) is highly recommended when your back-end database server is [**Cloudant**](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-ibm-cloud-identity-and-access-management-iam-). This authentication type requires a server-generated `apikey` instead of a user-given password.
    1. [*Session cookie (`COUCHDB_SESSION`) authentication*](#session-cookie-authentication) is recommended for [Apache CouchDB](https://docs.couchdb.org/en/stable/api/server/authn.html#cookie-authentication) or for [Cloudant](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-authentication#cookie-authentication) when IAM is unavailable. It exchanges username and password credentials for an `AuthSession` cookie from the `/_session` endpoint.
    1. [*Basic* (or legacy) *authentication*](#basic-authentication) is good for both [Cloudant](https://cloud.ibm.com/docs/services/Cloudant/api?topic=cloudant-authentication#basic-authentication) and [CouchDB](https://docs.couchdb.org/en/stable/api/server/authn.html#basic-authentication) back-end database servers. This authentication type requires the good old `username` and `password` credentials.
    1. *Noauth* authentication does not need any credentials. Note that this authentication type will only work for queries against a database with read access for everyone.
1. The service `url`

You have to add these properties as your **environment variables**, because some
examples that follow assume that these variables are set.
To learn more about authentication configuration see the related documentation in the
[Cloudant API docs](https://cloud.ibm.com/apidocs/cloudant#authentication?code=node) or in the
[general SDK usage information](https://github.com/IBM/ibm-cloud-sdk-common#authentication).

#### IAM authentication

For Cloudant *IAM authentication* set the following environmental variables by replacing `<url>` and `<apikey>` with your proper [service credentials](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud#locating-your-service-credentials). There is no need to set `CLOUDANT_AUTH_TYPE` to `IAM` because it is the default.

```sh
CLOUDANT_URL=<url>
CLOUDANT_APIKEY=<apikey>
```

#### Session cookie authentication

For `COUCHDB_SESSION` authentication set the following environmental variables by replacing `<url>`, `<username>` and `<password>` with your proper [service credentials](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud#locating-your-service-credentials).

```sh
CLOUDANT_AUTH_TYPE=COUCHDB_SESSION
CLOUDANT_URL=<url>
CLOUDANT_USERNAME=<username>
CLOUDANT_PASSWORD=<password>
```

#### Basic authentication

For *Basic authentication* set the following environmental variables by replacing `<url>`, `<username>` and `<password>` with your proper [service credentials](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud#locating-your-service-credentials).

```sh
CLOUDANT_AUTH_TYPE=BASIC
CLOUDANT_URL=<url>
CLOUDANT_USERNAME=<username>
CLOUDANT_PASSWORD=<password>
```

**Note**: We recommend using [IAM](#iam-authentication) for Cloudant and
[Session](#session-cookie-authentication) for CouchDB authentication.

### Code examples

#### 1. Retrieve information from an existing database

This example code gathers some information about an existing database hosted on the https://examples.cloudant.com
service `url`.
To do this, you need to extend your environment variables with the *service url* and *authentication type* to use
`NOAUTH` authentication while reaching the `animaldb` database.
This step is necessary for the SDK to distinguish the `EXAMPLES` custom service name from the default service name
which is `CLOUDANT`.

```sh
EXAMPLES_URL=https://examples.cloudant.com
EXAMPLES_AUTH_TYPE=NOAUTH
```

Once the environment variables are set, you can try out the code examples.

<details open>
<summary>TypeScript:</summary>

[embedmd]:# (test/examples/src/ts/GetInfoFromExistingDatabase.ts /\/\/ 1./ $)
```ts
// 1. Create a Cloudant client with "EXAMPLES" service name ===================
const examplesClient =
    CloudantV1.newInstance({serviceName:"EXAMPLES"});

// 2. Get server information ==================================================
// call service without parameters:
examplesClient.getServerInformation()
    .then(serverInformation => {
        const version = serverInformation.result.version;
        console.log(`Server version ${version}`);
    });

// 3. Get database information for "animaldb" =================================
const dbName = "animaldb";

// call service with embedded parameters:
examplesClient.getDatabaseInformation({db: dbName})
    .then(dbInfo => {
        const documentCount = dbInfo.result.doc_count;
        const dbNameResult = dbInfo.result.db_name;

        // 4. Show document count in database =================================
        console.log(`Document count in "${dbNameResult}" database is ` +
            documentCount + ".");
    });

// 5. Get zebra document out of the database by document id ===================
const getDocParams:
    CloudantV1.GetDocumentParams = {db: dbName, docId: "zebra"};

// call service with predefined parameters:
examplesClient.getDocument(getDocParams)
    .then(documentAboutZebra => {
        // result object is defined as a Document here:
        const result: CloudantV1.Document = documentAboutZebra.result;
        console.log("Document retrieved from database:\n" +
            JSON.stringify(result, null, 2));
    });
```
</details>

<details>
<summary>JavaScript:</summary>

[embedmd]:# (test/examples/src/js/GetInfoFromExistingDatabase.js /const getInfoFromExistingDatabase/ /getInfoFromExistingDatabase\(\);\n\}/)
```js
const getInfoFromExistingDatabase = async () => {
  // 1. Create a Cloudant client with "EXAMPLES" service name ===================
  const examplesClient = CloudantV1.newInstance({ serviceName: 'EXAMPLES' });

  // 2. Get server information ==================================================
  // call service without parameters:
  const version = (await examplesClient.getServerInformation()).result.version;
  console.log(`Server version ${version}`);

  // 3. Get database information for "animaldb" =================================
  const dbName = 'animaldb';

  // call service with embedded parameters:
  const dbInfo = await examplesClient.getDatabaseInformation({ db: dbName });
  const documentCount = dbInfo.result.doc_count;
  const dbNameResult = dbInfo.result.db_name;

  // 4. Show document count in database =================================
  console.log(`Document count in "${dbNameResult}" database is ` + documentCount + '.');

  // 5. Get zebra document out of the database by document id ===================
  const getDocParams = { db: dbName, docId: 'zebra' };

  // call service with predefined parameters:
  const documentAboutZebra = await examplesClient.getDocument(getDocParams);

  // result object is defined as a Document here:
  const result = documentAboutZebra.result;

  console.log('Document retrieved from database:\n' + JSON.stringify(result, null, 2));
};

if (require.main === module) {
  getInfoFromExistingDatabase();
}
```

</details>

The result of the code is similar to the following output.
The order of the output lines may change due to the asynchronicity.

[embedmd]:# (test/examples/output/GetInfoFromExistingDatabase.txt)
```txt
Server version 2.1.1
Document count in "animaldb" database is 11.
Document retrieved from database:
{
  "_id": "zebra",
  "_rev": "3-750dac460a6cc41e6999f8943b8e603e",
  "wiki_page": "http://en.wikipedia.org/wiki/Plains_zebra",
  "min_length": 2,
  "max_length": 2.5,
  "min_weight": 175,
  "max_weight": 387,
  "class": "mammal",
  "diet": "herbivore"
}
```

#### 2. Create your own database and add a document

Now comes the exciting part of creating your own `orders` database and adding a document
about *Bob Smith* with your own [IAM](#iam-authentication) or [Basic](#basic-authentication) service credentials.

<details open>
<summary>TypeScript:</summary>

[embedmd]:# (test/examples/src/ts/CreateDbAndDoc.ts /interface/ $)
```ts
interface OrderDocument extends CloudantV1.Document {
    name?: string;
    joined?: string;
    _id: string;
    _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ================
const client = CloudantV1.newInstance({});

// 2. Create a database =======================================================
const exampleDbName = "orders";

// Try to create database if it doesn't exist
const createDb = client.putDatabase({db: exampleDbName})
    .then(putDatabaseResult => {
        if (putDatabaseResult.result.ok) {
            console.log(`"${exampleDbName}" database created."`);
        }
    })
    .catch(err => {
        if (err.code === 412){
            console.log("Cannot create \"" + exampleDbName +
                "\" database, it already exists.");
        }
    });

// 3. Create a document =======================================================
// Create a document object with "example" id
const exampleDocId = "example";

// set required _id property on exampleDocument:
const exampleDocument: OrderDocument = {_id: exampleDocId};

// Add "name" and "joined" fields to the document
exampleDocument.name = "Bob Smith";
exampleDocument.joined = "2019-01-24T10:42:99.000Z";

/* Try to get the document and set revision of exampleDocument to the
           latest one if it previously existed in the database */
createDb.then(() => {
    client.getDocument({db: exampleDbName, docId: exampleDocId})
        .then(documentInfo => {
            exampleDocument._rev = documentInfo.result._rev;
            console.log("The document revision for" + exampleDocId +
                "is set to " + exampleDocument._rev);
        })
        .catch(err => {
            if (err.code === 404) {
                // Document does not exist in database
            }
        })
        .finally(() => {
            // Save the document in the database
            client.postDocument({
                    db: exampleDbName,
                    document: exampleDocument
                }
            ).then(createDocumentResponse => {
                // Keep track with the revision number of the document object
                exampleDocument._rev = createDocumentResponse.result.rev;
                console.log("You have created the document:\n" +
                    JSON.stringify(exampleDocument, null, 2));
            });
        });
});
```

</details>

<details>
<summary>JavaScript:</summary>

[embedmd]:# (test/examples/src/js/CreateDbAndDoc.js /const createDbAndDoc/ /createDbAndDoc\(\);\n\}/)
```js
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

  /* Try to get the document and set revision of exampleDocument to the
           latest one if it previously existed in the database */
  try {
    exampleDocument._rev = (
      await client.getDocument({
        db: exampleDbName,
        docId: exampleDocId,
      })
    ).result._rev;
    console.log(
      'The document revision for "' + exampleDocId + '" is set to ' + exampleDocument._rev
    );
  } catch (err) {
    if (err.code === 404) {
      // Document does not exist in database
    }
  } finally {
    // Save the document in the database
    const createDocumentResponse = await client.postDocument({
      db: exampleDbName,
      document: exampleDocument,
    });

    // Keep track with the revision number of the document object
    exampleDocument._rev = createDocumentResponse.result.rev;
    console.log('You have created the document:\n' + JSON.stringify(exampleDocument, null, 2));
  }
};

if (require.main === module) {
  createDbAndDoc();
}
```

</details>

The result of the code is similar to the following output.
The order of the output lines may change due to the asynchronicity.

[embedmd]:# (test/examples/output/CreateDbAndDoc.txt)
```txt
"orders" database created.
You have created the document:
{
  "_id": "example",
  "name": "Bob Smith",
  "joined": "2019-01-24T10:42:99.000Z",
  "_rev": "1-1b403633540686aa32d013fda9041a5d"
}
```

#### 3. Update your previously created document

**Note**: this example code assumes that you have created both the `orders` database and the `example`
document by [running this previous example code](#2-create-your-own-database-and-add-a-document)
successfully, otherwise you get the `Cannot update document because either "orders" database or
"example" document was not found.` message.

<details open>
<summary>TypeScript:</summary>

[embedmd]:# (test/examples/src/ts/UpdateDoc.ts /interface/ $)
```ts
interface OrderDocument extends CloudantV1.Document {
    address?: string;
    joined?: string;
    _id?: string;
    _rev?: string;
}

// 1. Create a client with `CLOUDANT` default service name ================
const client = CloudantV1.newInstance({});
// 2. Update the document =====================================================
// Set the options to get the document out of the database if it exists
const exampleDbName = "orders";

// Try to get the document if it previously existed in the database
const getDocParams: CloudantV1.GetDocumentParams =
    {docId: "example", db: exampleDbName};

client.getDocument(getDocParams)
    .then(docResult => {
        // using OrderDocument on getDocument result:
        const document: OrderDocument = docResult.result;

        // Add Bob Smith's address to the document
        document.address = "19 Front Street, Darlington, DL5 1TY";

        // Remove the joined property from document object
        delete document.joined;

        // Update the document in the database
        client.postDocument({db: exampleDbName, document})
            .then(res => {
                // Keeping track with the revision number of the document object:
                document._rev = res.result.rev;
                console.log("You have updated the document:\n" +
                    JSON.stringify(document, null, 2));
            });
    })
    .catch(err => {
        if (err.code === 404) {
            console.log(
                "Cannot update document because either \"" +
                exampleDbName + "\" database or the \"example\" " +
                "document was not found."
            );
        }
    });
```

</details>

<details>
<summary>JavaScript:</summary>

[embedmd]:# (test/examples/src/js/UpdateDoc.js /const updateDoc/ /updateDoc\(\);\n\}/)
```js
const updateDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ================
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

    // Add Bob Smith's address to the document
    document.address = '19 Front Street, Darlington, DL5 1TY';

    // Remove the joined property from document object
    delete document['joined'];

    // Keeping track with the revision number of the document object:
    document._rev = (
      await client.postDocument({
        db: exampleDbName,
        document: document,
      })
    ).result.rev;

    console.log('You have updated the document:\n' + JSON.stringify(document, null, 2));
  } catch (err) {
    if (err.code === 404) {
      console.log(
        'Cannot update document because either "' +
          exampleDbName +
          '" database or the "example" ' +
          'document was not found.'
      );
    }
  }
};

if (require.main === module) {
  updateDoc();
}
```

</details>

The result of the code is similar to the following output.

[embedmd]:# (test/examples/output/UpdateDoc.txt)
```txt
You have updated the document:
{
  "_id": "example",
  "_rev": "2-70476cf75eb02f55c6c4061aa6941ec8",
  "name": "Bob Smith",
  "address": "19 Front Street, Darlington, DL5 1TY"
}
```

#### 4. Delete your previously created document

**Note**: this example code assumes that you have created both the `orders` database and the `example`
document by [running this previous example code](#2-create-your-own-database-and-add-a-document)
successfully, otherwise you get the `Cannot delete document because either "orders" database or
"example" document was not found.` message.

<details open>
<summary>TypeScript:</summary>

[embedmd]:# (test/examples/src/ts/DeleteDoc.ts /interface/ $)
```ts
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
const exampleDbName = "orders";
const exampleDocId = "example";

// Try to get the document if it previously existed in the database
const getDocParams: CloudantV1.GetDocumentParams =
    {docId: exampleDocId, db: exampleDbName};

client.getDocument(getDocParams)
    .then(docResult => {
        const document: OrderDocument = docResult.result;

        client.deleteDocument({
            db: exampleDbName,
            docId: document._id,
            rev: document._rev}).then(() => {
                console.log("You have deleted the document.");
        });
    })
    .catch(err => {
        if (err.code === 404) {
            console.log(
                "Cannot delete document because either \"" +
                exampleDbName + "\" database or the \"example\" " +
                "document was not found."
            );
        }
    });
```

</details>

<details>
<summary>JavaScript:</summary>

[embedmd]:# (test/examples/src/js/DeleteDoc.js /const deleteDoc/ /deleteDoc\(\);\n\}/)
```js
const deleteDoc = async () => {
  // 1. Create a client with `CLOUDANT` default service name ================
  const client = CloudantV1.newInstance({});

  // 2. Delete the document =============================================
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
      docId: document._id,
      rev: document._rev,
    });
    console.log('You have deleted the document.');
  } catch (err) {
    if (err.code === 404) {
      console.log(
        'Cannot delete document because either "' +
          exampleDbName +
          '" database or the "example" ' +
          'document was not found.'
      );
    }
  }
};

if (require.main === module) {
  deleteDoc();
}
```

</details>

The result of the code is the following output.

[embedmd]:# (test/examples/output/DeleteDoc.txt)
```txt
You have deleted the document.
```

## Using the SDK

For general SDK usage information, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues

If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/cloudant-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Further resources

- [Cloudant API docs](https://cloud.ibm.com/apidocs/cloudant?code=node): API examples for Cloudant Node.js SDK.
- [Cloudant docs](https://cloud.ibm.com/docs/services/Cloudant?topic=cloudant-overview#overview): The official documentation page for Cloudant.
- [Cloudant Learning Center](https://developer.ibm.com/clouddataservices/docs/compose/cloudant/): The official learning center with several useful videos which help you to use Cloudant successfully.
- [Cloudant blog](https://blog.cloudant.com/): Many useful articles how to optimize Cloudant for common problems.

## Open source @ IBM

Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).
