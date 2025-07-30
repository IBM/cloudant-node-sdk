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
import CloudantV1, { Response } from '../../v1';
import { PageIterator } from './pageIterator';

export default abstract class BasePageIterator<
  P extends
    | CloudantV1.PostAllDocsParams
    | CloudantV1.PostPartitionAllDocsParams
    | CloudantV1.PostDesignDocsParams
    | CloudantV1.PostFindParams
    | CloudantV1.PostPartitionFindParams
    | CloudantV1.PostSearchParams
    | CloudantV1.PostPartitionSearchParams
    | CloudantV1.PostViewParams
    | CloudantV1.PostPartitionViewParams,
  R extends
    | CloudantV1.AllDocsResult
    | CloudantV1.FindResult
    | CloudantV1.SearchResult
    | CloudantV1.ViewResult,
  I extends
    | CloudantV1.DocsResultRow
    | CloudantV1.Document
    | CloudantV1.SearchResultRow
    | CloudantV1.ViewResultRow,
> implements PageIterator<I>
{
  protected client: CloudantV1;

  protected pageSize: number;

  protected _hasNext: boolean = true;

  protected nextPageParams: P;

  // The maximum and minimum limit values (i.e. page size)
  protected static MAX_LIMIT = 200;

  protected static MIN_LIMIT = 1;

  constructor(client: CloudantV1, params: P) {
    this.client = client;
    this.validate(params);
    // Set the page size from the supplied params limit
    this.pageSize = this.getPageSize(params);
    // Clone the supplied params into the nextPageParams
    this.nextPageParams = { ...params };
  }

  public async next(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...[value]: [] | [any]
  ): Promise<IteratorResult<ReadonlyArray<I>, any>> {
    if (this._hasNext) {
      const items = await this.nextRequest();
      const readonlyItems: ReadonlyArray<I> = [...items];
      return { done: false, value: readonlyItems };
    }
    return { done: true, value: undefined };
  }

  protected async nextRequest(): Promise<Array<I>> {
    const response = await this.nextRequestFunction().call(
      this.client,
      this.nextPageParams
    );
    const { result }: { result: R } = response;
    const items: Array<I> = this.getItems(result);
    if (items.length < this.pageSize) {
      this._hasNext = false;
    } else {
      this.setNextPageParams(this.nextPageParams, result);
    }
    return items;
  }

  protected abstract getItems(result: R): Array<I>;

  protected abstract setNextPageParams(params: P, result: R): void;

  protected abstract nextRequestFunction(): (params: P) => Promise<Response<R>>;

  protected getLimit(params: P): number {
    return params.limit;
  }

  protected getPageSize(params): number {
    return this.getLimit(params)
      ? this.getLimit(params)
      : BasePageIterator.MAX_LIMIT;
  }

  public [Symbol.asyncIterator](): AsyncIterableIterator<ReadonlyArray<I>> {
    return this;
  }

  hasNext(): boolean {
    return this._hasNext;
  }

  protected validate(params: P): void {
    // != null filters out undefined and null values for limit:
    if (params.limit != null) {
      this.validateLimit(params.limit);
    }
  }

  protected validateParamsAbsent(params: P, paramNames: Array<string>) {
    paramNames.forEach((paramName) => {
      if (params[paramName] !== undefined) {
        throw new Error(this.getValidateParamsAbsentErrorMessage(paramName));
      }
    });
  }

  protected getValidateParamsAbsentErrorMessage(paramName) {
    return `The param '${paramName}' is invalid when using pagination.`;
  }

  private validateLimit(limit: number) {
    // If limit is set check it is within range
    // Else it is unset and we will set the valid default value later
    if (limit > BasePageIterator.MAX_LIMIT) {
      throw new Error(
        `The provided limit ${limit} exceeds the maximum page size value of ${BasePageIterator.MAX_LIMIT}.`
      );
    }
    if (limit < BasePageIterator.MIN_LIMIT) {
      throw new Error(
        `The provided limit ${limit} is lower than the minimum page size value of ${BasePageIterator.MIN_LIMIT}.`
      );
    }
  }
}
