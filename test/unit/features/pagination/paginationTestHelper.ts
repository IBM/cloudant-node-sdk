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

/* eslint-disable max-classes-per-file */

import { BasePageIterator } from '../../../../cloudant/features/pagination/basePageIterator';
import { FindPageIterator } from '../../../../cloudant/features/pagination/findPageIterator';
import { KeyPageIterator } from '../../../../cloudant/features/pagination/keyPageIterator';
import {
  default as CloudantV1,
  PostViewParams,
  ViewResultRow,
  PostFindParams,
  FindResult,
} from '../../../../cloudant/v1';

import { getClient } from '../testDataProviders';

const {
  PagerType,
} = require('../../../../cloudant/features/pagination/pagination');

export const DEFAULT_PAGE_SIZE = 200;
export const mockClient = getClient();

export class PageSupplier {
  pages: (number | { key: number })[][];
  allItems: any;
  rowIterator: number;
  errorMessage: any;
  resumable: boolean;

  constructor(total, pageSize, errorMessage, resumable = false) {
    this.pages = makePageSupplier(total, pageSize);
    this.allItems = this.pages.flatMap((num) => num);
    this.rowIterator = 0;
    this.errorMessage = errorMessage;
    this.resumable = resumable;
  }
}

export function makePageSupplier(
  total: number,
  pageSize: number,
  isKeyPageSupplier: boolean = false
) {
  const pages: Array<Array<number | { key: number }>> = [];
  let page: Array<number | { key: number }> = [];
  for (let i = 0; i < total; i += 1) {
    const item = isKeyPageSupplier ? { key: i } : i;
    page.push(item);
    if (page.length === pageSize) {
      pages.push(page);
      page = [];
      if (isKeyPageSupplier) {
        page = [item]; // key page supplier next page have this last item as first
      }
    }
  }
  // Add the final page, empty or otherwise
  pages.push(page);
  return pages;
}

export class TestResult {
  rows;
  totalRows;
  docs;
}

/**
 * This test sub-class of BasePageIterator implicitly tests that various abstract methods are correctly
 * called by non-abstract methods in the BasePageIterator.
 */
export class TestPageIterator extends BasePageIterator<
  PostViewParams,
  TestResult,
  ViewResultRow
> {
  pageSupplier;
  callCounter;

  constructor(client: CloudantV1, params: PostViewParams, pageSupplier) {
    super(client, params);
    this.pageSupplier = pageSupplier;
    this.callCounter = 0;
  }

  override getItems(result: TestResult): Array<ViewResultRow> {
    return result.rows;
  }

  setNextPageParams(result: TestResult): void {
    const items: Array<ViewResultRow> = this.getItems(result);
    if (items.length === 0) {
      throw new Error(
        'Test failure: tried to setNextPageParams on empty page.'
      );
    } else {
      const i: ViewResultRow = items[items.length - 1];
      this.setRowOnTestParams(i);
    }
  }

  getClient(): CloudantV1 {
    return this.client;
  }

  // We mock here the responses for the pagination
  // If class is called with a supplier having the errorMessage param
  // we mock an error between the first and second page
  protected nextRequestFunction(): (
    params: PostViewParams
  ) => Promise<CloudantV1.Response<TestResult>> {
    this.callCounter += 1;
    if (!this.pageSupplier.errorMessage || this.callCounter !== 2) {
      return this.mockCall.bind(this);
    }
    if (this.pageSupplier.resumable) {
      // when iterator is resumable, resume rowIterator of pageSupplier after throwing an error
      this.pageSupplier.rowIterator = 0;
    }
    throw new Error(this.pageSupplier.errorMessage);
  }

  private mockCall() {
    const rows = this.pageSupplier.pages[this.pageSupplier.rowIterator];
    this.pageSupplier.rowIterator += 1;
    return { result: { rows } };
  }

  setRowOnTestParams(row: ViewResultRow) {
    this.nextPageParams.startKey = row;
  }
}

export function getDefaultTestParams(limit: number): PostFindParams {
  const params: PostFindParams = getRequiredTestParams();
  params.limit = limit;
  return params;
}

export function getRequiredTestParams(): PostFindParams {
  const params: PostFindParams = {
    db: 'example-database',
    selector: { email_verified: { '$eq': true } },
  };
  return params;
}

export class TestKeyPageIterator extends KeyPageIterator<
  PostViewParams,
  TestResult,
  ViewResultRow
> {
  pageSupplier;
  callCounter;

  constructor(client: CloudantV1, params: PostViewParams, pageSupplier) {
    super(client, params);
    this.pageSupplier = pageSupplier;
    this.callCounter = 0;
  }

  protected override setNextKeyId(startKeyDocId: string) {}

  protected override getItems(result: TestResult): CloudantV1.ViewResultRow[] {
    return result.rows;
  }

  // We mock here the responses for the pagination
  // If class is called with a supplier having the errorMessage param
  // we mock an error between the first and second page
  protected nextRequestFunction(): (
    params: PostViewParams
  ) => Promise<CloudantV1.Response<TestResult>> {
    this.callCounter += 1;
    return this.mockCall.bind(this);
  }

  private mockCall() {
    const rows = this.pageSupplier.pages[this.pageSupplier.rowIterator];
    this.pageSupplier.rowIterator += 1;
    return { result: { rows } };
  }

  protected override checkBoundary(
    penultimateItem: CloudantV1.ViewResultRow,
    lastItem: CloudantV1.ViewResultRow
  ) {
    return null;
  }
}

export class TestBookmarkPageIterator extends FindPageIterator {
  pageSupplier;
  callCounter;

  constructor(client: CloudantV1, params: PostFindParams, pageSupplier) {
    super(client, params);
    this.pageSupplier = pageSupplier;
    this.callCounter = 0;
  }

  protected override getItems(result: FindResult): CloudantV1.Document[] {
    return result.docs;
  }

  // This is just a placeholder, so we can mock the function from the tests
  protected nextRequestFunction(): (
    params: CloudantV1.PostFindParams
  ) => Promise<CloudantV1.Response<FindResult>> {
    this.callCounter += 1;
    return this.mockCall.bind(this);
  }

  private mockCall() {
    const docs = this.pageSupplier.pages[this.pageSupplier.rowIterator];
    this.pageSupplier.rowIterator += 1;
    let result: { result: { docs: number[]; bookmark?: string } } = {
      result: { docs },
    };
    if (docs.length > 0) {
      result = { result: { docs, bookmark: docs[docs.length - 1].toString() } };
    }
    return result;
  }
}

export class PaginationMockSupport {
  static allDocsPagers = [
    PagerType.POST_ALL_DOCS,
    PagerType.POST_PARTITION_ALL_DOCS,
    PagerType.POST_DESIGN_DOCS,
  ];
  static viewPagers = [PagerType.POST_VIEW, PagerType.POST_PARTITION_VIEW];
  static findPagers = [PagerType.POST_FIND, PagerType.POST_PARTITION_FIND];
  static searchPagers = [
    PagerType.POST_SEARCH,
    PagerType.POST_PARTITION_SEARCH,
  ];
  // the key pager types (n+1 paging)
  static keyPagers = PaginationMockSupport.allDocsPagers.concat(
    PaginationMockSupport.viewPagers
  );
  static bookmarkPagers = PaginationMockSupport.findPagers.concat(
    PaginationMockSupport.searchPagers
  );

  static mockOperation(pagerType) {
    switch (pagerType) {
      case PagerType.POST_ALL_DOCS:
        return 'postAllDocs';
      case PagerType.POST_DESIGN_DOCS:
        return 'postDesignDocs';
      case PagerType.POST_FIND:
        return 'postFind';
      case PagerType.POST_PARTITION_ALL_DOCS:
        return 'postPartitionAllDocs';
      case PagerType.POST_PARTITION_FIND:
        return 'postPartitionFind';
      case PagerType.POST_PARTITION_SEARCH:
        return 'postPartitionSearch';
      case PagerType.POST_PARTITION_VIEW:
        return 'postPartitionView';
      case PagerType.POST_SEARCH:
        return 'postSearch';
      case PagerType.POST_VIEW:
        return 'postView';
      default:
        throw new Error(`Unknown pager type of ${pagerType}, fail test.`);
    }
  }

  static makeWrapper(pagerType, total, rows) {
    if (PaginationMockSupport.keyPagers.includes(pagerType)) {
      return { 'total_rows': total, 'rows': rows };
    }
    if (PaginationMockSupport.bookmarkPagers.includes(pagerType)) {
      const emptyPageBookmark = 'emptyPageBookmark';
      const lastRow = rows.length > 0 ? rows[rows.length - 1] : undefined;
      if (PaginationMockSupport.findPagers.includes(pagerType)) {
        return {
          'bookmark': lastRow ? lastRow._id : emptyPageBookmark,
          'docs': rows,
        };
      }
      if (PaginationMockSupport.searchPagers.includes(pagerType)) {
        return {
          'bookmark': lastRow ? lastRow.id : emptyPageBookmark,
          'total_rows': total,
          'rows': rows,
        };
      }
    }
    throw new Error(`Unknown pager type of ${pagerType}, fail test.`);
  }

  static makeRow(pagerType, i) {
    const id = `testDoc${i}`;
    const rev = `1-abc${i}`;
    if (PaginationMockSupport.keyPagers.includes(pagerType)) {
      const key = PaginationMockSupport.viewPagers.includes(pagerType) ? i : id;
      const value = PaginationMockSupport.viewPagers.includes(pagerType)
        ? 1
        : { 'rev': rev };
      return { 'id': id, 'key': key, 'value': value };
    }
    if (PaginationMockSupport.findPagers.includes(pagerType)) {
      return { '_id': id, '_rev': rev, 'testField': i };
    }
    if (PaginationMockSupport.searchPagers.includes(pagerType)) {
      return { 'fields': {}, 'id': id };
    }
    throw new Error(`Unknown pager type of ${pagerType}, fail test.`);
  }
}

export class PaginationMockResponse {
  totalItems;
  pageSize;
  pages;
  pagerType;
  plusOnePaging;
  expectedPages;
  pageIterator;

  constructor(totalItems, pageSize, pagerType) {
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.pagerType = pagerType;
    this.plusOnePaging = PaginationMockSupport.keyPagers.includes(
      PagerType[pagerType]
    );
    this.pages = this.wrapPages();
    this.expectedPages = [];
    this.pageIterator = 0;
  }

  wrapPages() {
    const pages = [];
    // Add an n+1 row for key based paging
    const pageSize = this.plusOnePaging ? this.pageSize + 1 : this.pageSize;
    makePageSupplier(this.totalItems, pageSize, this.plusOnePaging).forEach(
      (page) => {
        const pageWithWrappedRows = [];
        page.forEach((row) => {
          const modifiedRow = PaginationMockSupport.makeRow(
            PagerType[this.pagerType],
            row
          );
          pageWithWrappedRows.push(modifiedRow);
        });
        pages.push(
          PaginationMockSupport.makeWrapper(
            PagerType[this.pagerType],
            this.totalItems,
            pageWithWrappedRows
          )
        );
      }
    );
    return pages;
  }

  getNextPage() {
    const nextPage = this.pages[this.pageIterator];
    this.pageIterator += 1;
    return { result: nextPage };
  }
}
