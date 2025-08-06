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
  TestKeyPageIterator,
  getDefaultTestParams,
  getRequiredTestParams,
  makePageSupplier,
  DEFAULT_PAGE_SIZE,
} = require('./paginationTestHelper.ts');

// KeyPageSupplier supplies pageSize + 1 rows per page, duplicating last row from previous page as next
class KeyPageSupplier {
  constructor(total, pageSize) {
    // there are 2 ways of calling the constructor:
    // 1. when total (type array, reflecting the pages) are provided
    // 2. when total (type number), and pageSize (type number) are provided
    if (Array.isArray(total) && pageSize === undefined) {
      this.pages = total;
    } else {
      this.pages = makePageSupplier(total, pageSize + 1, true);
    }
    this.allItems = Array.from(new Set(this.pages.flatMap((num) => num))); // remove duplications
    this.rowIterator = 0;
  }
}

const mockClient = getClient();

describe('KeyPageIterator tests', () => {
  it('test default page size', async () => {
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getRequiredTestParams()
    );
    expect(pageIterator.pageSize).toBe(DEFAULT_PAGE_SIZE + 1);
  });
  it('test limit page size', async () => {
    const limit = 42;
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getDefaultTestParams(limit)
    );
    // Assert the limit provided as page size
    expect(pageIterator.pageSize).toEqual(limit + 1);
  });
  it('test next page less than limit', async () => {
    const pageSize = 21;
    const mock = new KeyPageSupplier(pageSize, pageSize);
    const pageIterator = new TestKeyPageIterator(
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
    // Assert _hasNext false because n+1 limit is 1 more than user page size
    expect(pageIterator._hasNext).toBe(false);
  });
  it('test next page equal to limit', async () => {
    const pageSize = 14;
    const mock = new KeyPageSupplier(pageSize + 1, pageSize);
    const pageIterator = new TestKeyPageIterator(
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
    // Assert start key is correct, note the result rows start at zero, so pageSize, not pageSize + 1
    expect(pageIterator.nextPageParams.startKey).toEqual(pageSize);
    // Get next page
    const actualSecondPage = await pageIterator.next();
    // Assert first item on second page is correct (again we start at zero, so pageSize not pageSize + 1)
    expect(actualSecondPage.value[0].key).toEqual(pageSize);
    // Assert size is 1
    expect(actualSecondPage.value).toHaveLength(1);
    // Assert second page
    expect(actualSecondPage.value).toEqual(expectedPages[1]);
    // Assert _hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });

  it('test next page equal greater than limit', async () => {
    const pageSize = 7;
    const mock = new KeyPageSupplier(pageSize + 2, pageSize);
    const pageIterator = new TestKeyPageIterator(
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
    // Assert start key is correct, note the result rows start at zero, so pageSize, not pageSize + 1
    expect(pageIterator.nextPageParams.startKey).toEqual(pageSize);
    // Get next page
    const actualSecondPage = await pageIterator.next();
    // Assert first item on second page is correct (again we start at zero, so pageSize not pageSize + 1)
    expect(actualSecondPage.value[0].key).toEqual(pageSize);
    // Assert size is 2
    expect(actualSecondPage.value).toHaveLength(2);
    // Assert second page
    expect(actualSecondPage.value).toEqual(expectedPages[1]);
    // Assert hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });

  it('test getAll()', async () => {
    const pageSize = 3;
    const mock = new KeyPageSupplier(pageSize * 12, pageSize);
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualItems = await pager.getAll();
    expect(actualItems).toEqual(mock.allItems);
  });

  it('test no checkBoundary() by default', async () => {
    const pageSize = 1;
    // Make pages with identical rows
    const pageOne = [1, 1];
    const pageTwo = [1, 1];
    const mock = new KeyPageSupplier([pageOne, pageTwo]);
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    // Get and assert page
    const actualPage = await pageIterator.next();
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert _hasNext true
    expect(pageIterator._hasNext).toBe(true);
    // Boundary check implementation should not throw
    const actualSecondPage = await pageIterator.next();
    expect(actualSecondPage.value).toEqual(expectedPages[1]);
  });

  it('test boundary failure throws on next()', async () => {
    const pageSize = 1;
    // Make pages with identical rows
    const pageOne = [1, 1];
    const pageTwo = [1, 1];
    const mock = new KeyPageSupplier([pageOne, pageTwo]);
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const functionMock = jest.spyOn(pageIterator, 'checkBoundary');
    const errorMessage = 'Test boundary check failure';
    functionMock.mockImplementation(() => errorMessage);
    const expectedPages = mock.pages;
    // Get and assert page
    const actualPage = await pageIterator.next();
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert _hasNext true
    expect(pageIterator._hasNext).toBe(true);

    try {
      // check boundary should throw
      await pageIterator.next();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });

  it('test no boundary check when no items left', async () => {
    const pageSize = 1;
    // Make page with one rows
    const pageOne = [1];
    const mock = new KeyPageSupplier([pageOne]);
    const pageIterator = new TestKeyPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const functionMock = jest.spyOn(pageIterator, 'checkBoundary');
    const errorMessage = 'Test failure, checkBoundary should not be called.';
    functionMock.mockImplementation(() => {
      // Throw here to cause the test to fail if checkBoundary is called.
      throw new Error(errorMessage);
    });
    const expectedPages = mock.pages;
    // Get and assert page
    const actualPage = await pageIterator.next();
    expect(actualPage.value).toEqual(expectedPages[0]);
    // Assert _hasNext false
    expect(pageIterator._hasNext).toBe(false);
  });

  it('test skip removed from subsequent pages', async () => {
    const pageSize = 3;
    const expectedSkip = 17;
    const mock = new KeyPageSupplier(pageSize * 3, pageSize);
    const params = getDefaultTestParams(pageSize);
    params.skip = expectedSkip;
    const pageIterator = new TestKeyPageIterator(mockClient, params, mock);
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    expect(pager.pageIterableIterator.nextPageParams).toHaveProperty('skip');
    expect(pager.pageIterableIterator.nextPageParams.skip).toBe(expectedSkip);
    await pager.getNext();
    expect(pager.pageIterableIterator.nextPageParams).not.toHaveProperty(
      'skip'
    );
  });
});
