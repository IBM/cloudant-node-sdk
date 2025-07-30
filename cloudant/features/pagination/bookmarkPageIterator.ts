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

export abstract class BookmarkPageIterator<
  P extends
    | CloudantV1.PostFindParams
    | CloudantV1.PostPartitionFindParams
    | CloudantV1.PostSearchParams
    | CloudantV1.PostPartitionSearchParams,
  R extends CloudantV1.FindResult | CloudantV1.SearchResult,
  I,
> extends BasePageIterator<P, R, I> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: CloudantV1, params: P) {
    super(client, params);
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected setBookmark(params: P, bookmark: string) {
    params.bookmark = bookmark;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected getBookmark(result: R): string {
    return result.bookmark;
  }

  protected abstract getItems(result: R): Array<I>;
  protected setNextPageParams(params: P, result: R) {
    const bookmark = this.getBookmark(result);
    this.setBookmark(params, bookmark);
  }
  protected abstract nextRequestFunction(): (params: P) => Promise<Response<R>>;
}
