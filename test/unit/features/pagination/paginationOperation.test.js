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
  PagerType,
  Pagination,
} = require('../../../../cloudant/features/pagination/pagination.ts');
const { getErrors } = require('../mockErrors.js');
const { getClient } = require('../testDataProviders.js');
const {
  PaginationMockSupport,
  PaginationMockResponse,
  DEFAULT_PAGE_SIZE,
} = require('./paginationTestHelper.ts');

const mockClient = getClient();

function getTestPageParams(total, pageSize, name) {
  return {
    total,
    pageSize,
    name,
  };
}

function getPageSets() {
  const pageSize = 10;
  return [
    getTestPageParams(0, pageSize, 'Empty page'), // Empty page
    getTestPageParams(1, pageSize, 'Partial page'), // Partial page
    getTestPageParams(pageSize - 1, pageSize, 'One less than a whole page'), // One less than a whole page
    getTestPageParams(pageSize, pageSize, 'Exactly one page'), // Exactly one page
    getTestPageParams(pageSize + 1, pageSize, 'One more than a whole page'), // One more than a whole page
    getTestPageParams(3 * pageSize, pageSize, 'Multiple pages, exact'), // Multiple pages, exact
    getTestPageParams(3 * pageSize + 1, pageSize, 'Multiple pages, plus one'), // Multiple pages, plus one
    getTestPageParams(
      4 * pageSize - 1,
      pageSize,
      'Multiple pages, partial finish'
    ), // Multiple pages, partial finish
  ];
}

function getPagerTypes() {
  // TS enums are mapped name:ordinal and ordinal:name so filter to just the ordinals
  return Object.keys(PagerType).filter((key) => Number.isNaN(Number(key)));
}

function getPagesAndErrors() {
  return [
    { i: 0, name: 'error on first page' },
    { i: 1, name: 'error on second page' },
  ];
}

describe.each(getPagerTypes())('Pagination operation tests', (pagerType) => {
  let actualPageCount;
  let actualItems;
  let functionMock;
  beforeEach(() => {
    actualPageCount = 0;
    actualItems = [];
    functionMock = jest.spyOn(
      mockClient,
      PaginationMockSupport.mockOperation(PagerType[pagerType])
    );
  });
  it.each(getPageSets())(
    `test pager() on ${pagerType} - $name`,
    async (pageSet) => {
      const pager = Pagination.newPagination(mockClient, PagerType[pagerType], {
        limit: pageSet.pageSize,
      }).pager();
      const mockResponses = new PaginationMockResponse(
        pageSet.total,
        pageSet.pageSize,
        pagerType
      );
      functionMock.mockImplementation(() => mockResponses.getNextPage());
      while (pager.hasNext()) {
        // eslint-disable-next-line no-await-in-loop
        const page = await pager.getNext();
        actualPageCount += 1;
        // eslint-disable-next-line no-restricted-syntax
        for (const row of page) {
          const id = PaginationMockSupport.findPagers.includes(pagerType)
            ? row._id
            : row.id;
          actualItems.push(id);
        }
      }
      expect(actualPageCount).toEqual(mockResponses.pages.length);
      expect(actualItems).toHaveLength(mockResponses.totalItems);
    }
  );
  it.each(getPageSets())(
    `test pageStream() on ${pagerType} - $name`,
    (pageSet, done) => {
      const pageStream = Pagination.newPagination(
        mockClient,
        PagerType[pagerType],
        {
          limit: pageSet.pageSize,
        }
      ).pageStream();
      const mockResponses = new PaginationMockResponse(
        pageSet.total,
        pageSet.pageSize,
        pagerType
      );
      functionMock.mockImplementation(() => mockResponses.getNextPage());
      pageStream.on('data', (page) => {
        actualPageCount += 1;
        // eslint-disable-next-line no-restricted-syntax
        for (const row of page) {
          const id = PaginationMockSupport.findPagers.includes(pagerType)
            ? row._id
            : row.id;
          actualItems.push(id);
        }
      });
      pageStream.on('end', () => {
        expect(actualPageCount).toEqual(mockResponses.pages.length);
        expect(actualItems).toHaveLength(mockResponses.totalItems);
        done();
      });
    }
  );
  it.each(getPageSets())(
    `test pages() on ${pagerType} - $name`,
    async (pageSet) => {
      const pages = Pagination.newPagination(mockClient, PagerType[pagerType], {
        limit: pageSet.pageSize,
      }).pages();
      const mockResponses = new PaginationMockResponse(
        pageSet.total,
        pageSet.pageSize,
        pagerType
      );
      functionMock.mockImplementation(() => mockResponses.getNextPage());
      // eslint-disable-next-line no-restricted-syntax
      for await (const page of pages) {
        actualPageCount += 1;
        // eslint-disable-next-line no-restricted-syntax
        for (const row of page) {
          const id = PaginationMockSupport.findPagers.includes(pagerType)
            ? row._id
            : row.id;
          actualItems.push(id);
        }
      }
      expect(actualPageCount).toEqual(mockResponses.pages.length);
      expect(actualItems).toHaveLength(mockResponses.totalItems);
    }
  );
  it.each(getPageSets())(
    `test rowStream() on ${pagerType} - $name`,
    (pageSet, done) => {
      const rowStream = Pagination.newPagination(
        mockClient,
        PagerType[pagerType],
        {
          limit: pageSet.pageSize,
        }
      ).rowStream();
      const mockResponses = new PaginationMockResponse(
        pageSet.total,
        pageSet.pageSize,
        pagerType
      );
      functionMock.mockImplementation(() => mockResponses.getNextPage());
      rowStream.on('data', (row) => {
        const id = PaginationMockSupport.findPagers.includes(pagerType)
          ? row._id
          : row.id;
        actualItems.push(id);
      });
      rowStream.on('end', () => {
        expect(actualItems).toHaveLength(mockResponses.totalItems);
        done();
      });
    }
  );
  it.each(getPageSets())(
    `test rows() on ${pagerType} - $name`,
    async (pageSet) => {
      const rows = Pagination.newPagination(mockClient, PagerType[pagerType], {
        limit: pageSet.pageSize,
      }).rows();
      const mockResponses = new PaginationMockResponse(
        pageSet.total,
        pageSet.pageSize,
        pagerType
      );
      functionMock.mockImplementation(() => mockResponses.getNextPage());
      // eslint-disable-next-line no-restricted-syntax
      for await (const row of rows) {
        const id = PaginationMockSupport.findPagers.includes(pagerType)
          ? row._id
          : row.id;
        actualItems.push(id);
      }
      expect(actualItems).toHaveLength(mockResponses.totalItems);
    }
  );
  describe.each(getErrors())(`test $error.message`, (error) => {
    describe.each(getPagesAndErrors())(`$name`, (errorOnPage) => {
      let pageSize;
      let mockResponses;
      let errorHappened;
      beforeEach(() => {
        pageSize = DEFAULT_PAGE_SIZE;
        errorHappened = false;
        mockResponses = new PaginationMockResponse(
          2 * pageSize,
          pageSize,
          pagerType
        );
        if (errorOnPage.i === 0) {
          functionMock
            .mockRejectedValueOnce(error.error)
            .mockImplementation(() => mockResponses.getNextPage());
        } else {
          functionMock
            .mockImplementationOnce(() => mockResponses.getNextPage())
            .mockRejectedValueOnce(error.error)
            .mockImplementation(() => mockResponses.getNextPage());
        }
      });
      afterEach(() => {
        // eslint-disable-next-line jest/no-standalone-expect
        expect(errorHappened).toBeTruthy();
      });
      it(`pager() on ${pagerType}`, async () => {
        const pager = Pagination.newPagination(
          mockClient,
          PagerType[pagerType],
          {
            limit: pageSize,
          }
        ).pager();
        while (pager.hasNext()) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const page = await pager.getNext();
            actualPageCount += 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const row of page) {
              const id = PaginationMockSupport.findPagers.includes(pagerType)
                ? row._id
                : row.id;
              actualItems.push(id);
            }
          } catch (err) {
            expect(err).toBe(error.error);
            // the error happened after actualPageCount:
            expect(actualPageCount).toBe(errorOnPage.i);
            expect(actualItems).toHaveLength(pageSize * errorOnPage.i);
            errorHappened = true;
          }
        }
        // eventually all pages arrive:
        expect(actualPageCount).toEqual(mockResponses.pages.length);
        expect(actualItems).toHaveLength(mockResponses.totalItems);
      });
      it(`pageStream() on ${pagerType}`, (done) => {
        const pageStream = Pagination.newPagination(
          mockClient,
          PagerType[pagerType],
          {
            limit: pageSize,
          }
        ).pageStream();
        pageStream.on('data', (page) => {
          actualPageCount += 1;
          // eslint-disable-next-line no-restricted-syntax
          for (const row of page) {
            const id = PaginationMockSupport.findPagers.includes(pagerType)
              ? row._id
              : row.id;
            actualItems.push(id);
          }
        });
        pageStream.on('error', (err) => {
          expect(err).toBe(error.error);
          // eventually pages arrive before the error event:
          expect(actualPageCount).toBe(errorOnPage.i);
          expect(actualItems).toHaveLength(pageSize * errorOnPage.i);
          errorHappened = true;
          done();
        });
      });
      it(`pages() on ${pagerType}`, async () => {
        const pages = Pagination.newPagination(
          mockClient,
          PagerType[pagerType],
          {
            limit: pageSize,
          }
        ).pages();
        try {
          // eslint-disable-next-line no-restricted-syntax
          for await (const page of pages) {
            actualPageCount += 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const row of page) {
              const id = PaginationMockSupport.findPagers.includes(pagerType)
                ? row._id
                : row.id;
              actualItems.push(id);
            }
          }
        } catch (err) {
          expect(err).toBe(error.error);
          // the error happened after actualPageCount:
          expect(actualPageCount).toBe(errorOnPage.i);
          expect(actualItems).toHaveLength(pageSize * errorOnPage.i);
          errorHappened = true;
        }
      });
      it(`rowStream() on ${pagerType}`, (done) => {
        const rowStream = Pagination.newPagination(
          mockClient,
          PagerType[pagerType],
          {
            limit: pageSize,
          }
        ).rowStream();
        rowStream.on('data', (row) => {
          const id = PaginationMockSupport.findPagers.includes(pagerType)
            ? row._id
            : row.id;
          actualItems.push(id);
        });
        rowStream.on('error', (err) => {
          expect(err).toBe(error.error);
          // eventually rows arrive before the error event:
          expect(actualItems).toHaveLength(pageSize * errorOnPage.i);
          errorHappened = true;
          done();
        });
      });
      it(`rows() on ${pagerType}`, async () => {
        const rows = Pagination.newPagination(
          mockClient,
          PagerType[pagerType],
          {
            limit: pageSize,
          }
        ).rows();

        try {
          // eslint-disable-next-line no-restricted-syntax
          for await (const row of rows) {
            const id = PaginationMockSupport.findPagers.includes(pagerType)
              ? row._id
              : row.id;
            actualItems.push(id);
          }
        } catch (err) {
          expect(err).toBe(error.error);
          // eventually rows arrive before the error event:
          expect(actualItems).toHaveLength(pageSize * errorOnPage.i);
          errorHappened = true;
        }
      });
    });
  });
});
