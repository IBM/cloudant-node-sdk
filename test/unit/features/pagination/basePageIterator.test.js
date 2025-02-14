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
const {
  Pagination,
} = require('../../../../cloudant/features/pagination/pagination.ts');
const {
  TestPageIterator,
  PageSupplier,
  getDefaultTestParams,
  getRequiredTestParams,
  DEFAULT_PAGE_SIZE,
  mockClient,
} = require('./paginationTestHelper.ts');

const cannotMixErrorMessage =
  'Cannot mix getAll() and getNext(), use only one method or get a a new Pager.';
const consumedErrorMessage = 'This pager has been consumed, use a new Pager.';

describe('BasePageIterator tests', () => {
  it('test constructor', async () => {
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(42)
    );
    // Assert the client
    expect(pageIterator.getClient()).toEqual(mockClient);
  });

  it('test default page size', async () => {
    const pageIterator = new TestPageIterator(
      mockClient,
      getRequiredTestParams()
    );
    // Assert the default page size
    expect(pageIterator.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });

  it('test limit page size', async () => {
    const limit = 42;
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(limit)
    );
    // Assert the limit provided as page size
    expect(pageIterator.pageSize).toEqual(limit);
  });

  it('test _hasNext is true initially', async () => {
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(42)
    );
    expect(pageIterator._hasNext).toBe(true);
  });

  it('test _hasNext is true for result equal to limit', async () => {
    // Mock a one element page
    const mock = new PageSupplier(1, 1);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(1),
      mock
    );
    // Get the first page (size 1)
    const actualPage = await pageIterator.next();
    // hasNext should return true because results size is the same as limit
    expect(pageIterator._hasNext).toBe(true);
    expect(actualPage.done).toBe(false);
  });

  it('test _hasNext is false for result less than limit', async () => {
    // Mock a zero size page
    const mock = new PageSupplier(0, 0);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(1),
      mock
    );
    // Get the first page (size 0)
    const actualPage = await pageIterator.next();
    // hasNext should return false because results size smaller than limit
    expect(pageIterator._hasNext).toBe(false);
    expect(actualPage.done).toBe(false);
  });

  it('test next() first page', async () => {
    const pageSize = 25;
    const mock = new PageSupplier(pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const actualElement = await pageIterator.next();
    // Assert first page
    expect(actualElement.value).toEqual(mock.pages[0]);
    expect(actualElement.done).toBe(false);
  });

  it('test next() two pages', async () => {
    const pageSize = 3;
    const mock = new PageSupplier(2 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const actualPage = await pageIterator.next();
    expect(actualPage.value).toEqual(expectedPages[0]);
    expect(pageIterator._hasNext).toBe(true);
    expect(actualPage.done).toBe(false);
    const actualPage2 = await pageIterator.next();
    expect(actualPage2.value).toEqual(expectedPages[1]);
    expect(pageIterator._hasNext).toBe(true);
    expect(actualPage2.done).toBe(false);
  });

  it('test next() until empty', async () => {
    const pageSize = 3;
    const mock = new PageSupplier(3 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    let actualItems = [];
    let pageCount = 0;
    while (pageIterator._hasNext) {
      pageCount += 1;
      // eslint-disable-next-line no-await-in-loop
      const page = (await pageIterator.next()).value;
      actualItems = actualItems.concat(page);
      expect(page.length).toBeLessThanOrEqual(pageSize);
    }
    expect(actualItems).toEqual(mock.allItems);
    expect(pageCount).toBeLessThanOrEqual(mock.pages.length);
  });

  it('test next() until smaller', async () => {
    const pageSize = 3;
    const mock = new PageSupplier(10, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    let actualItems = [];
    let pageCount = 0;
    while (pageIterator._hasNext) {
      pageCount += 1;
      // eslint-disable-next-line no-await-in-loop
      const page = (await pageIterator.next()).value;
      actualItems = actualItems.concat(page);
      // Assert each page is the same or smaller than the limit
      // to make sure we aren't getting all the results in a single page
      expect(page.length).toBeLessThanOrEqual(pageSize);
    }
    expect(actualItems).toEqual(mock.allItems);
    expect(pageCount).toBeLessThanOrEqual(mock.pages.length);
  });

  it('test next() eventually returns with done=true', async () => {
    const pageSize = 2;
    const mock = new PageSupplier(pageSize - 1, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const actualPage = await pageIterator.next();
    // Assert first page
    expect(actualPage.value).toEqual(expectedPages[0]);
    // _hasNext false
    expect(pageIterator._hasNext).toBe(false);
    // done is false
    expect(actualPage.done).toBe(false);
    const actualPage2 = await pageIterator.next();
    // Assert undefined
    expect(actualPage2.value).toBeUndefined();
    // _hasNext false
    expect(pageIterator._hasNext).toBe(false);
    // done is true
    expect(actualPage2.done).toBe(true);
  });

  it('test next() throws further error', async () => {
    const pageSize = 5;
    const errorMessage = 'Not found';
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize)
    );
    const functionMock = jest.spyOn(pageIterator, 'nextRequestFunction');
    functionMock.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    let errorHappened = false;
    try {
      await pageIterator.next();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
  });

  it('test iterator calling next() from a for loop', async () => {
    const pageSize = 23;
    const mock = new PageSupplier(3 * pageSize - 1, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    expect(pageIterator).not.toBeNull();
    let pageIteratorIsDone = false;
    for (let i = 0; !pageIteratorIsDone; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const nextItem = await pageIterator.next();
      pageIteratorIsDone = nextItem.done;
      expect(nextItem.value).toEqual(mock.pages[i]);
    }
  });

  it('test setNextPageParams()', async () => {
    const pageSize = 1;
    const mock = new PageSupplier(5 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    expect(pageIterator.nextPageParams.startKey).toBeUndefined();
    let page = 0;
    while (pageIterator._hasNext) {
      // eslint-disable-next-line no-await-in-loop
      await pageIterator.next();
      if (pageIterator._hasNext) {
        expect(pageIterator.nextPageParams.startKey).toEqual(page);
      } else {
        expect(pageIterator.nextPageParams.startKey).toEqual(page - 1);
      }
      page += 1;
    }
  });

  it('test next() resumes after error', async () => {
    const pageSize = 3;
    const errorMessage = 'test error';
    const mock = new PageSupplier(2 * pageSize, pageSize, errorMessage);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const actualPage1 = await pageIterator.next();
    expect(actualPage1.value).toEqual(mock.pages[0]);
    let errorHappened = false;
    try {
      await pageIterator.next();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
    expect(pageIterator._hasNext).toBe(true);
    expect(pageIterator.nextPageParams.startKey).toBe(2);
    const actualPage2 = await pageIterator.next();
    expect(actualPage2.value).toEqual(mock.pages[1]);
  });

  it('test pager.getNext() first page', async () => {
    const pageSize = 7;
    const mock = new PageSupplier(2 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualPage = await pager.getNext();
    // Assert first page
    expect(actualPage).toEqual(mock.pages[0]);
    expect(pager.hasNext()).toBe(true);
  });

  it('test pager.getNext() until empty', async () => {
    const pageSize = 7;
    const mock = new PageSupplier(2 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    let actualItems = [];
    let pageCount = 0;
    while (pager.hasNext()) {
      // eslint-disable-next-line no-await-in-loop
      const page = await pager.getNext();
      actualItems = actualItems.concat(page);
      if (page) {
        // when iteration is done pager.getNext() returns with undefined
        expect(page.length).toBeLessThanOrEqual(pageSize);
        pageCount += 1;
      }
    }
    // Assert items
    expect(actualItems).toEqual(mock.allItems);
    // Assert page count
    expect(pageCount).toBeLessThanOrEqual(mock.pages.length);
    // Assert cannot be called again
    let errorHappened = false;
    try {
      await pager.getNext();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(consumedErrorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
  });

  it('test pager.getAll()', async () => {
    const pageSize = 11;
    const mock = new PageSupplier(71, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualItems = await pager.getAll();
    expect(actualItems).toEqual(mock.allItems);
    // Assert consumed state prevents calling again
    let errorHappened = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(consumedErrorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
  });

  it('test pager.getNext() resumes after error', async () => {
    const pageSize = 3;
    const errorMessage = 'test error';
    const mock = new PageSupplier(2 * pageSize, pageSize, errorMessage);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualPage1 = await pager.getNext();
    expect(actualPage1).toEqual(mock.pages[0]);
    let errorHappened = false;
    try {
      await pager.getNext();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
    expect(pager.hasNext()).toBe(true);
    expect(pageIterator.nextPageParams.startKey).toBe(2);
    const actualPage2 = await pager.getNext();
    expect(actualPage2).toEqual(mock.pages[1]);
  });

  it('test pager.getAll() restarts after error', async () => {
    const pageSize = 11;
    const errorMessage = 'test error';
    const mock = new PageSupplier(71, pageSize, errorMessage, true);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();

    let errorHappened = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
    const actualItems = await pager.getAll();
    expect(actualItems).toEqual(mock.allItems);
    // Assert consumed state prevents calling again
    let errorHappened2 = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(consumedErrorMessage);
      errorHappened2 = true;
    } finally {
      expect(errorHappened2).toBe(true);
    }
  });

  it('test pager.getAll() throws', async () => {
    const pageSize = 11;
    const mock = new PageSupplier(71, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualItems = await pager.getAll();
    expect(actualItems).toEqual(mock.allItems);
    let errorHappened = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(consumedErrorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
  });

  it('test pager.getNext() then pager.getAll() throws', async () => {
    const pageSize = 7;
    const mock = new PageSupplier(2 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const pager = pagination.pager();
    const actualPage1 = await pager.getNext();
    // Assert first page
    expect(actualPage1).toEqual(mock.pages[0]);
    // Assert cannot call getAll once getNext has been called
    let errorHappened = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(cannotMixErrorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
    // Ensure we can call getNext() again
    // Assert second page
    const actualPage2 = await pager.getNext();
    expect(actualPage2).toEqual(mock.pages[1]);
  });

  it('test pager.getAll() then pager.getNext() throws', async () => {
    const pageSize = 1;
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize)
    );
    const pagination = new Pagination(pageIterator);
    const errorMessage = 'test error';
    const functionMock = jest.spyOn(pageIterator, 'nextRequestFunction');
    functionMock.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const pager = pagination.pager();
    let errorHappened = false;
    try {
      await pager.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }

    try {
      await pager.getNext();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(cannotMixErrorMessage);
      errorHappened = true;
    } finally {
      expect(errorHappened).toBe(true);
    }
  });

  it('test pages() iterable', async () => {
    const pageSize = 23;
    const mock = new PageSupplier(3 * pageSize - 1, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    let pageNumber = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const page of pagination.pages()) {
      pageNumber += 1;
      expect(page).toEqual(mock.pages[pageNumber - 1]);
    }
    expect(pageNumber).toBe(3);
  });

  it('test rows() iterable', async () => {
    const pageSize = 23;
    const totalItems = 3 * pageSize - 1;
    const mock = new PageSupplier(totalItems, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const pagination = new Pagination(pageIterator);
    const actualItems = [];
    let rowNumber = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const row of pagination.rows()) {
      rowNumber += 1;
      actualItems.push(row);
      expect(row).toEqual(mock.allItems[rowNumber - 1]);
    }
    expect(rowNumber).toBe(totalItems);
    expect(actualItems).toEqual(mock.allItems);
  });

  it('test pager.pageStream()', (done) => {
    const pageSize = 23;
    const mock = new PageSupplier(4 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedPages = mock.pages;
    const pagination = new Pagination(pageIterator);
    let pageCount = 0;
    const stream = pagination.pageStream();
    stream.on('data', (data) => {
      expect(data).toEqual(expectedPages[pageCount]);
      pageCount += 1;
    });
    stream.on('end', () => {
      expect(pageCount).toEqual(expectedPages.length);
      done();
    });
  });

  it('test pager.rowStream()', (done) => {
    const pageSize = 17;
    const mock = new PageSupplier(4 * pageSize, pageSize);
    const pageIterator = new TestPageIterator(
      mockClient,
      getDefaultTestParams(pageSize),
      mock
    );
    const expectedRows = mock.allItems;
    const pagination = new Pagination(pageIterator);
    const stream = pagination.rowStream();
    let rowCount = 0;
    stream.on('data', (data) => {
      expect(data).toEqual(expectedRows[rowCount]);
      rowCount += 1;
    });
    stream.on('end', () => {
      expect(rowCount).toEqual(expectedRows.length);
      done();
    });
  });
});
