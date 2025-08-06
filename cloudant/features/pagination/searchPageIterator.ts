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

import { PostSearchParams, Response, SearchResult } from '../../v1';
import { SearchBasePageIterator } from './searchBasePageIterator';

export class SearchPageIterator extends SearchBasePageIterator<PostSearchParams> {
  protected nextRequestFunction(): (
    params: PostSearchParams
  ) => Promise<Response<SearchResult>> {
    return this.client.postSearch;
  }

  protected validate(params: PostSearchParams): void {
    super.validate(params);
    this.validateParamsAbsent(params, [
      'counts',
      'group_field',
      'group_limit',
      'group_sort',
      'ranges',
    ]);
  }
}
