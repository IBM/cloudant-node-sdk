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

import { pipeline, Readable } from 'node:stream';
import {
  default as CloudantV1,
  DocsResultRow,
  Document,
  PostAllDocsParams,
  PostDesignDocsParams,
  PostFindParams,
  PostPartitionAllDocsParams,
  PostPartitionFindParams,
  PostPartitionSearchParams,
  PostPartitionViewParams,
  PostSearchParams,
  PostViewParams,
  SearchResultRow,
  ViewResultRow,
} from '../../v1';

import { Pager } from './pager';
import { IteratorPager } from './iteratorPager';
import { AllDocsPageIterator } from './allDocsPageIterator';
import { Stream } from '../stream';
import { PageIterator } from './pageIterator';
import { DesignDocsPageIterator } from './designDocsPageIterator';
import { FindPageIterator } from './findPageIterator';
import { AllDocsPartitionPageIterator } from './allDocsPartitionPageIterator';
import { FindPartitionPageIterator } from './findPartitionPageIterator';
import { SearchPartitionPageIterator } from './searchPartitionPageIterator';
import { ViewPageIterator } from './viewPageIterator';
import { SearchPageIterator } from './searchPageIterator';
import { ViewPartitionPageIterator } from './viewPartitionPageIterator';

/**
 * {@link Pagination} is the entry point for pagination features.
 *
 * Use the static methods to create new {@link Pagination} instances. The instances in turn can be
 * used to create:
 *  * {@link Stream} of result rows via {@link rowStream()}
 *  * {@link Stream} of pages via {@link pageStream()}
 *  * {@link AsyncIterableIterator} of result rows via {@link rows()}
 *  * {@link AsyncIterableIterator}s of pages via {@link pages()}
 *  * IBM Cloud SDK style {@link Pager}s via {@link pager()}
 *
 * @param <I> the result row type of the operation.
 */
export class Pagination<I> {
  private pageIterableIterator: PageIterator<I>;

  private constructor(pageIterableIterator: PageIterator<I>) {
    this.pageIterableIterator = pageIterableIterator;
  }

  /**
   * Get a new IBM Cloud SDK style Pager for the operation.
   *
   * This type is useful for retrieving one page at a time through a function call.
   *
   * @return a new IBM Cloud SDK style Pager
   */
  pager(): Pager<I> {
    return new IteratorPager<I>(this.pageIterableIterator);
  }

  /**
   * Get an AsyncIterableIterator for all the pages.
   *
   * This function is useful for handling pages in an enhanced for loop e.g.
   * ```ts
   * for await (const row: ReadonlyArray<DocsResultRow> of Pagination.newPagination(client, PagerType.POST_ALL_DOCS, allDocsParams).pages()){
   *   ...
   * }
   * ```
   *
   * @return an {@link Iterable} over all the pages
   */
  pages(): AsyncIterableIterator<ReadonlyArray<I>> {
    return this.pageIterableIterator;
  }

  /**
   * Get a page by page stream of all the pages.
   *
   * @return a {@link Stream} of all the pages
   */
  pageStream(): Stream<ReadonlyArray<I>> {
    return pipeline(
      Readable.from(this.pages()),
      new Stream<ReadonlyArray<I>>(),
      () => {}
    );
  }

  /**
   * Get an AsyncIterableIterator for all the rows from all the pages.
   *
   * This function is useful for handling rows in an enhanced for loop e.g.
   * ```ts
   * for await (const row: DocsResultRow of Pagination.newPagination(client, PagerType.POST_ALL_DOCS, allDocsParams).rows()) {
   *   ...
   * }
   * ```
   *
   *  @return an {@link AsyncIterableIterator} over all the result rows
   */
  async *rows(): AsyncIterableIterator<I> {
    // eslint-disable-next-line no-restricted-syntax
    for await (const row of this.rowStream()) {
      yield row;
    }
  }

  /**
   * Get a row by row stream of all the rows from all the pages.
   *
   * @return a {@link Stream} of all the result rows
   */
  rowStream(): Stream<I> {
    return pipeline(
      Readable.from(this.pages()).flatMap((item: I) => item),
      new Stream<I>(),
      () => {}
    );
  }

  /**
   * Get a {@link Pagination} for the `postAllDocs` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_ALL_DOCS} the operation type to paginate
   * @param params - {@link PostAllDocsParams} for the query
   * @return a {@link DocsResultRow} pager for all the documents in the database
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_ALL_DOCS,
    params: PostAllDocsParams
  ): Pagination<DocsResultRow>;

  /**
   * Get a {@link Pagination} for the `postPartitionAllDocs` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_PARTITION_ALL_DOCS} the operation type to paginate
   * @param params - {@link PostPartitionAllDocsParams} for the query
   * @return a {@link DocsResultRow} pager for all the documents in a database partition
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_PARTITION_ALL_DOCS,
    params: PostPartitionAllDocsParams
  ): Pagination<DocsResultRow>;

  /**
   * Get a {@link Pagination} for the `postDesignDocs` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_DESIGN_DOCS} the operation type to paginate
   * @param params - {@link PostDesignDocsParams} for the query
   * @return a {@link DocsResultRow} pager for all the design documents in a database
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_DESIGN_DOCS,
    params: PostDesignDocsParams
  ): Pagination<DocsResultRow>;

  /**
   * Get a {@link Pagination} for the `postFind` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_FIND} the operation type to paginate
   * @param params - {@link PostFindParams} for the query
   * @return a {@link Document} pager for the result of a find query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_FIND,
    params: PostFindParams
  ): Pagination<Document>;

  /**
   * Get a {@link Pagination} for the `postPartitionFind` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_PARTITION_FIND} the operation type to paginate
   * @param params - {@link PostPartitionFindParams} for the query
   * @return a {@link Document} pager for the result of a partition find query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_PARTITION_FIND,
    params: PostPartitionFindParams
  ): Pagination<Document>;

  /**
   * Get a {@link Pagination} for the `postSearch` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_SEARCH} the operation type to paginate
   * @param params - {@link PostSearchParams} for the query
   * @return a {@link SearchResultRow} pager for the result of a search query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_SEARCH,
    params: PostSearchParams
  ): Pagination<SearchResultRow>;

  /**
   * Get a {@link Pagination} for the `postPartitionSearch` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_PARTITION_SEARCH} the operation type to paginate
   * @param params - {@link PostPartitionSearchParams} for the query
   * @return a {@link SearchResultRow} pager for the result of a partition search query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_PARTITION_SEARCH,
    params: PostPartitionSearchParams
  ): Pagination<SearchResultRow>;

  /**
   * Get a {@link Pagination} for the `postView` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_VIEW} the operation type to paginate
   * @param params - {@link PostViewParams} for the query
   * @return a {@link ViewResultRow} pager for the result of a view query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType.POST_VIEW,
    params: PostViewParams
  ): Pagination<ViewResultRow>;

  /**
   * Get a {@link Pagination} for the `postPartitionView` operation.
   * The page size is configured with the limit parameter of the params.
   *
   * @param client- {@link CloudantV1} client instance to use to make requests
   * @param type - {@link PagerType.POST_PARTITION_VIEW} the operation type to paginate
   * @param params - {@link PostPartitionViewParams} for the query
   * @return a {@link ViewResultRow} pager for the result of a partition view query
   */
  static newPagination(
    client: CloudantV1,
    pagerType: PagerType,
    params: PostPartitionViewParams
  ): Pagination<ViewResultRow>;

  static newPagination(
    client: CloudantV1,
    type: PagerType,
    params:
      | PostAllDocsParams
      | PostDesignDocsParams
      | PostPartitionAllDocsParams
      | PostFindParams
      | PostPartitionFindParams
      | PostSearchParams
      | PostPartitionSearchParams
      | PostViewParams
      | PostPartitionViewParams
  ):
    | Pagination<DocsResultRow>
    | Pagination<Document>
    | Pagination<SearchResultRow>
    | Pagination<ViewResultRow> {
    switch (type) {
      case PagerType.POST_ALL_DOCS:
        return new Pagination<DocsResultRow>(
          new AllDocsPageIterator(client, params as PostAllDocsParams)
        );
      case PagerType.POST_DESIGN_DOCS:
        return new Pagination<DocsResultRow>(
          new DesignDocsPageIterator(client, params as PostDesignDocsParams)
        );
      case PagerType.POST_FIND:
        return new Pagination<Document>(
          new FindPageIterator(client, params as PostFindParams)
        );
      case PagerType.POST_PARTITION_ALL_DOCS:
        return new Pagination<DocsResultRow>(
          new AllDocsPartitionPageIterator(
            client,
            params as PostPartitionAllDocsParams
          )
        );
      case PagerType.POST_PARTITION_FIND:
        return new Pagination<Document>(
          new FindPartitionPageIterator(
            client,
            params as PostPartitionFindParams
          )
        );
      case PagerType.POST_PARTITION_SEARCH:
        return new Pagination<SearchResultRow>(
          new SearchPartitionPageIterator(
            client,
            params as PostPartitionSearchParams
          )
        );
      case PagerType.POST_PARTITION_VIEW:
        return new Pagination<ViewResultRow>(
          new ViewPartitionPageIterator(
            client,
            params as PostPartitionViewParams
          )
        );
      case PagerType.POST_SEARCH:
        return new Pagination<SearchResultRow>(
          new SearchPageIterator(client, params as PostSearchParams)
        );
      case PagerType.POST_VIEW:
        return new Pagination<ViewResultRow>(
          new ViewPageIterator(client, params as PostViewParams)
        );
      default:
        throw new Error(`No implementation available for PagerType ${type}.`);
    }
  }
}

/**
 * Enumeration of the available Pager types
 */
export enum PagerType {
  POST_ALL_DOCS,
  POST_DESIGN_DOCS,
  POST_FIND,
  POST_PARTITION_ALL_DOCS,
  POST_PARTITION_FIND,
  POST_PARTITION_SEARCH,
  POST_PARTITION_VIEW,
  POST_SEARCH,
  POST_VIEW,
}
