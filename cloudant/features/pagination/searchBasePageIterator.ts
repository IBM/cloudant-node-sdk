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

import {
  default as CloudantV1,
  Response,
  SearchResult,
  SearchResultRow,
} from '../../v1';
import { BookmarkPageIterator } from './bookmarkPageIterator';

export abstract class SearchBasePageIterator<
  P extends CloudantV1.PostSearchParams | CloudantV1.PostPartitionSearchParams,
> extends BookmarkPageIterator<P, SearchResult, SearchResultRow> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: CloudantV1, params: P) {
    super(client, params);
  }

  protected getItems(result: SearchResult): Array<SearchResultRow> {
    return result.rows;
  }
  protected abstract nextRequestFunction(): (
    params: P
  ) => Promise<Response<SearchResult>>;
}
