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

const { getClient } = require('../testDataProviders.js');
const {
  Pagination,
} = require('../../../../cloudant/features/pagination/pagination.ts');
const {
  TestBookmarkPageIterator,
  getDefaultTestParams,
  getRequiredTestParams,
  makePageSupplier,
  DEFAULT_PAGE_SIZE,
} = require('./paginationTestHelper.ts');

// BookmarkPageSupplier supplies pageSize rows per page
class BookmarkPageSupplier {
  constructor(total, pageSize) {
    this.pages = makePageSupplier(total, pageSize);
    this.allItems = this.pages.flatMap((num) => num);
    this.rowIterator = 0;
  }
}

const mockClient = getClient();

describe('BookmarkPageIterator tests', () => {
  it('test default page size', async () => {
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getRequiredTestParams()
    );
    expect(pageIterator.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });
  it('test limit page size', async () => {
    const limit = 42;
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getDefaultTestParams(limit)
    );
    // Assert the limit provided as page size
    expect(pageIterator.pageSize).toEqual(limit);
  });
  it('test next page less than limit', async () => {
    const pageSize = 21;
    const mock = new BookmarkPageSupplier(pageSize - 1, pageSize);
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const actualPage = await pageIterator.next();
    // Assert first page
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert size
    expect(actualPage.value).toHaveLength(pageSize - 1);
    // Assert hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });
  it('test next page equal to limit', async () => {
    const pageSize = 14;
    const mock = new BookmarkPageSupplier(pageSize, pageSize);
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const actualPage = await pageIterator.next();
    // Assert first page
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert size is pageSize
    expect(actualPage.value).toHaveLength(pageSize);
    // Assert hasNext true
    expect(pageIterator._hasNext).toBe(true);
    // Assert bookmark is correct, note the result rows start at zero, so pageSize - 1, not pageSize
    expect(pageIterator.nextPageParams.bookmark).toEqual(
      (pageSize - 1).toString()
    );
    // Get next page
    const actualSecondPage = await pageIterator.next();
    // Assert size is 0
    expect(actualSecondPage.value).toHaveLength(0);
    // Assert hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });

  it('test next page equal greater than limit', async () => {
    const pageSize = 7;
    const mock = new BookmarkPageSupplier(pageSize + 2, pageSize);
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const actualPage = await pageIterator.next();
    // Assert first page
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert size is pageSize
    expect(actualPage.value).toHaveLength(pageSize);
    expect(actualPage.done).toBe(false);
    // Assert hasNext true
    expect(pageIterator._hasNext).toBe(true);
    // Assert bookmark is correct, note the result rows start at zero, so pageSize - 1, not pageSize
    expect(pageIterator.nextPageParams.bookmark).toEqual(
      (pageSize - 1).toString()
    );
    // Get next page
    const actualSecondPage = await pageIterator.next();
    // Assert first item on second page is correct (again we start at zero, so pageSize not pageSize + 1)
    expect(actualSecondPage.value[0]).toEqual(pageSize);
    // Assert size is 2
    expect(actualSecondPage.value).toHaveLength(2);
    // Assert second page
    expect(actualSecondPage.value).toEqual(expectedPages[1]);
    // Assert hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });

  it('test getAll()', async () => {
    const pageSize = 3;
    const mock = new BookmarkPageSupplier(pageSize * 12, pageSize);
    const pageIterator = new TestBookmarkPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualItems = await pager.getAll();
    expect(actualItems).toEqual(mock.allItems);
  });
});
