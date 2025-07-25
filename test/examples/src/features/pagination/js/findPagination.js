/**
 * © Copyright IBM Corporation 2025. All Rights Reserved.
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
import { CloudantV1, Pagination, PagerType } from '@ibm-cloud/cloudant';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// Initialize service
const client = CloudantV1.newInstance();

// Setup params
const paginationParams = {
  db: 'shoppers', // Required: the database name.
  limit: 50, // Optional: limit parameter sets the page size. Default and max is 200.
  fields: ['_id', 'type', 'name', 'email'], // return these fields
  selector: { email_verified: { '$eq': true } }, // select docs with verified emails
  sort: [{ email: 'desc' }],
};

// Create pagination
// pagination can be reused without side-effects as a factory for async iterables, streams or pagers
const pagination = Pagination.newPagination(
  client, // Required: the Cloudant service client instance.
  PagerType.POST_FIND, // Required: Pager type
  paginationParams // Required: pagination configuration params are fixed at pagination creation time
);

// Option: iterate pages with for await...of statement
(async () => {
  for await (const page of pagination.pages()) {
    // Do something with page
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties, like
// `next()`, `done`, value`, can be used on the iterator returned from pages().
// As `next()` returns with a Promise, use `await` or `.then()` on it.

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

// Option: iterate rows with for await...of statement
(async () => {
  for await (const row of pagination.rows()) {
    // Do something with row
  }
})();
// Note: Alternatively to for await....of the iterator protocol functions and properties:
// `next()`, `done`, value`, can be also used on rows().
// As `next(`)` returns with a Promise, make sure using `await` or `.then()` on it.

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

// Option: use pager next page
// For retrieving one page at a time with a function call.
const pager = pagination.pager();
(async () => {
  if (pager.hasNext()) {
    const page = await pager.getNext();
    // Do something with page
  }
})();

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
