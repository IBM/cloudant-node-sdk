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
  PostPartitionSearchParams,
  Response,
  SearchResult,
} from '../../v1';
import { SearchBasePageIterator } from './searchBasePageIterator';

export class SearchPartitionPageIterator extends SearchBasePageIterator<PostPartitionSearchParams> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: CloudantV1, params: PostPartitionSearchParams) {
    super(client, params);
  }

  protected nextRequestFunction(): (
    params: PostPartitionSearchParams
  ) => Promise<Response<SearchResult>> {
    return this.client.postPartitionSearch;
  }
}
