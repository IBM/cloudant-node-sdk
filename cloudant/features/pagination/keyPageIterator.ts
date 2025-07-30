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

import { BasePageIterator } from './basePageIterator';
import CloudantV1, { Response } from '../../v1';

export abstract class KeyPageIterator<
  K,
  P extends
    | CloudantV1.PostAllDocsParams
    | CloudantV1.PostPartitionAllDocsParams
    | CloudantV1.PostDesignDocsParams
    | CloudantV1.PostViewParams
    | CloudantV1.PostPartitionViewParams,
  R extends CloudantV1.AllDocsResult | CloudantV1.ViewResult,
  I extends CloudantV1.DocsResultRow | CloudantV1.ViewResultRow,
> extends BasePageIterator<P, R, I> {
  private boundaryFailure = null;
  constructor(client: CloudantV1, params: P) {
    super(client, params);
    this.setLimit(this.nextPageParams, this.getPageSize(params)); // n+1 items per request
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected setNextKey(params: P, startKey: K) {
    params.startKey = startKey;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected getNextKey(item: I): K {
    return item.key;
  }
  protected abstract setNextKeyId(params: P, startKeyDocId: string);

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected getNextKeyId(item: I): string {
    return item.id;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected setLimit(params: P, limit: number) {
    params.limit = limit;
  }

  protected abstract getItems(result: R): Array<I>;
  protected abstract nextRequestFunction(): (params: P) => Promise<Response<R>>;

  protected setNextPageParams(params: P, result: R): void {
    const items: Array<I> = this.getItems(result);
    const lastItem: I = items[items.length - 1];
    const nextKey: any = this.getNextKey(lastItem);
    const nextKeyId: string = this.getNextKeyId(lastItem);
    this.setNextKey(params, nextKey);
    this.setNextKeyId(params, nextKeyId);
    if (params.skip) {
      delete params.skip;
    }
  }

  protected async nextRequest(): Promise<Array<I>> {
    // If the previous request had the duplicate boundary error
    // throw it now because we cannot safely get the next page.
    if (this.boundaryFailure) {
      throw new Error(this.boundaryFailure);
    }
    const items: Array<I> = await super.nextRequest();
    if (this._hasNext) {
      const lastItem = items.pop();
      if (items.length > 0) {
        const penultimateItem = items[items.length - 1];
        // Defer a throw for a boundary failure to the next request
        this.boundaryFailure = this.checkBoundary(penultimateItem, lastItem);
      }
    }
    return items;
  }

  protected getPageSize(params: P): number {
    return super.getPageSize(params) + 1;
  }

  protected abstract checkBoundary(penultimateItem: I, lastItem: I);

  protected validate(params: P): void {
    super.validate(params);
    this.validateParamsAbsent(params, ['keys', 'key']);
  }
}
