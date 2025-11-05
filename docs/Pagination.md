# Pagination

<details open>
<summary>Table of Contents</summary>

<!-- toc -->
- [Introduction](#introduction)
- [Limitations](#limitations)
- [Capacity considerations](#capacity-considerations)
- [Available operations](#available-operations)
- [Creating a pagination](#creating-a-pagination)
  * [Initialize the service](#initialize-the-service)
  * [Set the options](#set-the-options)
  * [Create the pagination](#create-the-pagination)
- [Using pagination](#using-pagination)
  - [Stream pages](#stream-pages)
  - [Stream rows](#stream-rows)
  * [Iterate pages](#iterate-pages)
  * [Iterate rows](#iterate-rows)
  * [Pager](#pager)
    + [Get each page from a pager](#get-each-page-from-a-pager)
    + [Get all results from a pager](#get-all-results-from-a-pager)
</details>

## Introduction

The pagination feature (currently beta) accepts options for a single operation and automatically
creates the multiple requests to the server necessary to page through the results a fixed number at a time.

Pagination is a best-practice to break apart large queries into multiple server requests.
This has a number of advantages:
* Keeping requests within server imposed limits, for example
  * `200` max results for text search
  * `2000` max results for partitioned queries
* Fetching only the necessary data, for example
  * User finds required result on first page, no need to continue fetching results
* Reducing the duration of any individual query
  * Reduce risk of query timing out on the server
  * Reduce risk of network request timeouts

## Limitations

Limitations of pagination:
* Forward only, no backwards paging
* Limitations on `_all_docs` and `_design_docs` operations
  * No pagination for `key` option.
    There is no need to paginate as IDs are unique and this returns only a single row.
    This is better achieved with a single document get request.
  * No pagination for `keys` option.
* Limitations on `_view` operations
  * No pagination for `key` option. Pass the same `key` as a start and end key instead.
  * No pagination for `keys` option.
  * Views that emit multiple identical keys (with the same or different values)
    from the same document cannot paginate if those key rows with the same ID
    span a page boundary.
    The pagination feature detects this condition and an error occurs.
    It may be possible to workaround using a different page size.
* Limitations on `_search` operations
  * No pagination of grouped results.
  * No pagination of faceted `counts` or `ranges` results.

## Capacity considerations

Pagination can make many requests rapidly from a single program call.

For IBM Cloudant take care to ensure you have appropriate plan capacity
in place to avoid consuming all the permitted requests.
If there is no remaining plan allowance and retries are not enabled or insufficient
then a `429 Too Many Requests` error occurs.

## Available operations

Pagination is available for these operations:
* Query all documents [global](https://cloud.ibm.com/apidocs/cloudant?code=node#postalldocs)
  and [partitioned](https://cloud.ibm.com/apidocs/cloudant?code=node#postpartitionalldocs)
  * [Global all documents examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/allDocsPagination.ts)
  * [Partitioned all documents examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/partitionAllDocsPagination.ts)
* Query all [design documents](https://cloud.ibm.com/apidocs/cloudant?code=node#postdesigndocs)
  * [Design documents examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/designDocsPagination.ts)
* Query with selector syntax [global](https://cloud.ibm.com/apidocs/cloudant?code=node#postfind)
  and [partitioned](https://cloud.ibm.com/apidocs/cloudant?code=node#postpartitionfind)
  * [Global find selector query examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/findPagination.ts)
  * [Partitioned find selector query examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/partitionFindPagination.ts)
* Query a search index [global](https://cloud.ibm.com/apidocs/cloudant?code=node#postsearch)
  and [partitioned](https://cloud.ibm.com/apidocs/cloudant?code=node#postpartitionsearch)
  * [Global search examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/searchPagination.ts)
  * [Partitioned search examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/partitionSearchPagination.ts)
* Query a MapReduce view [global](https://cloud.ibm.com/apidocs/cloudant?code=node#postview)
  and [partitioned](https://cloud.ibm.com/apidocs/cloudant?code=node#postpartitionview)
  * [Global view examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/viewPagination.ts)
  * [Partitioned view examples](https://github.com/IBM/cloudant-node-sdk/tree/v0.12.11/test/examples/src/features/pagination/ts/partitionViewPagination.ts)

The examples presented in this `README` are for all documents in a partition.
The links in the list are to equivalent examples for each of the other available operations.

## Creating a pagination

Make a new pagination from a client
and the options for the chosen operation.
Use the `limit` option to configure the page size (default and maximum `200`).

Imports required for these examples:

<details open>
<summary>TypeScript:</summary>

```ts
import {
  CloudantV1,
  PagerType,
  Pagination,
  Pager,
  Stream,
} from '@ibm-cloud/cloudant';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
```

</details>

<details>
<summary>JavaScript:</summary>

```js
import { CloudantV1, Pagination, PagerType } from '@ibm-cloud/cloudant';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
```

</details>

### Initialize the service

<details open>
<summary>TypeScript:</summary>

```ts
// Initialize service
const client: CloudantV1 = CloudantV1.newInstance({});
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Initialize service
const client = CloudantV1.newInstance();
```

</details>

### Set the options

<details open>
<summary>TypeScript:</summary>

```ts
// Setup params
const paginationParams: CloudantV1.PostPartitionAllDocsParams = {
  db: 'events', // Required: the database name.
  limit: 50, // Optional: limit parameter sets the page size. Default and max is 200.
  partitionKey: 'ns1HJS13AMkK', // query only this partition
};
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Setup params
const paginationParams = {
  db: 'events', // Required: the database name.
  limit: 50, // Optional: limit parameter sets the page size. Default and max is 200.
  partitionKey: 'ns1HJS13AMkK', // query only this partition
};
```

</details>

### Create the pagination

<details open>
<summary>TypeScript:</summary>

```ts
// Create pagination
// pagination can be reused without side-effects as a factory for async iterables, streams or pagers
const pagination: Pagination<CloudantV1.DocsResultRow> =
  Pagination.newPagination(
    client, // Required: the Cloudant service client instance.
    PagerType.POST_PARTITION_ALL_DOCS, // Required: Pager type
    paginationParams // Required: pagination configuration params are fixed at pagination creation time
  );
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Create pagination
// pagination can be reused without side-effects as a factory for async iterables, streams or pagers
const pagination = Pagination.newPagination(
  client, // Required: the Cloudant service client instance.
  PagerType.POST_PARTITION_ALL_DOCS, // Required: Pager type
  paginationParams // Required: pagination configuration params are fixed at pagination creation time
);
```

</details>

## Using pagination

Once you have a pagination factory there are multiple options available.
* Stream pages
* Stream rows
* Iterate pages
* Iterate rows
* Get each page from a pager
* Get all results from a pager

All the paging styles produce equivalent results and make identical page requests.
The style of paging to choose depends on the use case requirements
in particular whether to process a page at a time or a row at a time.

The pagination factory is reusable and can repeatedly produce new instances
of the same or different pagination styles for the same operation options.

Here are examples for each paging style.

##### Stream pages

Streaming pages is ideal for lazy processing of pages
and leveraging Node.js's built-in stream utilities.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: stream pages
const pageStream: Stream<ReadonlyArray<CloudantV1.DocsResultRow>> =
  pagination.pageStream(); // a new stream of the pages
const destinationPageStream = new Writable({
  objectMode: true,
  write(page: Array<CloudantV1.DocsResultRow>, _, callback) {
    // Do something with page
    callback();
  },
});
(async () => {
  await pipeline(pageStream, destinationPageStream)
    .then(() => {
      console.log('Page stream is done');
    })
    .catch((err) => {
      console.log(err);
    });
})();
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: stream pages
const pageStream = pagination.pageStream(); // a new stream of the pages
const destinationPageStream = new Writable({
  objectMode: true,
  write(page, _, callback) {
    // Do something with page
    callback();
  },
});
(async () => {
  await pipeline(pageStream, destinationPageStream)
    .then(() => {
      console.log('Page stream is done');
    })
    .catch((err) => {
      console.log(err);
    });
})();
```

</details>

##### Stream rows

Streaming pages is ideal for lazy processing of rows
and leveraging Node.js's built-in stream utilities.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: stream rows
const rowStream: Stream<CloudantV1.DocsResultRow> = pagination.rowStream(); // a new stream of the rows
const destinationRowStream = new Writable({
  objectMode: true,
  write(row: CloudantV1.DocsResultRow, _, callback) {
    // Do something with row
    callback();
  },
});
(async () => {
  await pipeline(rowStream, destinationRowStream)
    .then(() => {
      console.log('Row stream is done');
    })
    .catch((err) => {
      console.log(err);
    });
})();
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: stream rows
const rowStream = pagination.rowStream(); // a new stream of the rows
const destinationRowStream = new Writable({
  objectMode: true,
  write(row, _, callback) {
    // Do something with row
    callback();
  },
});
(async () => {
  await pipeline(rowStream, destinationRowStream)
    .then(() => {
      console.log('Row stream is done');
    })
    .catch((err) => {
      console.log(err);
    });
})();
```

</details>

### Iterate pages

Iterating pages is ideal for using a for await...of statement to process a page at a time.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: iterate pages with for await...of statement
(async () => {
  for await (const page of pagination.pages()) {
    // Do something with page
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties, like
// `next()`, `done`, value`, can be used on the iterator returned from pages().
// As `next()` returns with a Promise, use `await` or `.then()` on it.
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: iterate pages with for await...of statement
(async () => {
  for await (const page of pagination.pages()) {
    // Do something with page
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties, like
// `next()`, `done`, value`, can be used on the iterator returned from pages().
// As `next()` returns with a Promise, use `await` or `.then()` on it.
```

</details>

### Iterate rows

Iterating rows is ideal for using a for await...of statement to process a result row at a time.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: iterate rows with for await...of statement
(async () => {
  for await (const row of pagination.rows()) {
    // Do something with row
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties:
// `next()`, `done`, value`, can be also used on rows().
// As `next(`)` returns with a Promise, make sure using `await` or `.then()` on it.
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: iterate rows with for await...of statement
(async () => {
  for await (const row of pagination.rows()) {
    // Do something with row
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties:
// `next()`, `done`, value`, can be also used on rows().
// As `next(`)` returns with a Promise, make sure using `await` or `.then()` on it.
```

</details>

### Pager

The pager style is similar to other [IBM Cloud SDKs](https://github.com/IBM/ibm-cloud-sdk-common?tab=readme-ov-file#pagination).
Users familiar with that style of pagination may find using them preferable
to the native language style iterators.

In the Cloudant SDKs these pagers are single use and traverse the complete set of pages once and only once.
After exhaustion they cannot be re-used, simply create a new one from the pagination factory if needed.

Pagers are only valid for one of either page at a time or getting all results.
For example, calling for the next page then calling for all results causes an error.

#### Get each page from a pager

This is useful for calling to retrieve one page at a time, for example,
in a user interface with a "next page" interaction.

If calling for the next page errors, it is valid to call for the next page again
to continue paging.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: use pager next page
// For retrieving one page at a time with a function call.
const pager: Pager<CloudantV1.DocsResultRow> = pagination.pager();
(async () => {
  if (pager.hasNext()) {
    const page: Array<CloudantV1.DocsResultRow> = await pager.getNext();
    // Do something with page
  }
})();
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: use pager next page
// For retrieving one page at a time with a function call.
const pager = pagination.pager();
(async () => {
  if (pager.hasNext()) {
    const page = await pager.getNext();
    // Do something with page
  }
})();
```

</details>

#### Get all results from a pager

This is useful to retrieve all results in a single call.
However, this approach requires sufficient memory for the entire collection of results.
So although it may be convenient for small result sets generally prefer iterating pages
or rows with the other paging styles, especially for large result sets.

If calling for all the results errors, then calling for all the results again restarts the pagination.

<details open>
<summary>TypeScript:</summary>

```ts
// Option: use pager all results
// For retrieving all result rows in a single list
// Note: all result rows may be very large!
// Preferably use streams/iterables instead of getAll for memory efficiency with large result sets.
const allPager: Pager<CloudantV1.DocsResultRow> = pagination.pager();
(async () => {
  const allRows: Array<CloudantV1.DocsResultRow> = await allPager.getAll();
  for (const row of allRows) {
    // Do something with row
  }
})();
```

</details>

<details>
<summary>JavaScript:</summary>

```js
// Option: use pager all results
// For retrieving all result rows in a single list
// Note: all result rows may be very large!
// Preferably use streams/iterables instead of getAll for memory efficiency with large result sets.
const allPager = pagination.pager();
(async () => {
  const allRows = await allPager.getAll();
  for (const row of allRows) {
    // Do something with row
  }
})();
```

</details>
