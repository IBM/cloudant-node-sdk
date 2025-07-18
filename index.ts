/**
 * © Copyright IBM Corporation 2020, 2025. All Rights Reserved.
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

/**
 * @module cloudant-node-sdk
 */

import { default as CloudantV1 } from './cloudant/v1';
export { CloudantV1 };

export {
  BasicAuthenticator,
  IamAuthenticator,
  CouchdbSessionAuthenticator,
  CouchdbSessionAuthenticatorOptions,
} from './auth';

export { ChangesFollower } from './cloudant/features/changesFollower';
export { Stream } from './cloudant/features/stream';
export {
  Pagination,
  PagerType,
} from './cloudant/features/pagination/pagination';
export { Pager } from './cloudant/features/pagination/pager';
