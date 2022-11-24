/**
 * © Copyright IBM Corporation 2023. All Rights Reserved.
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
import { ChangesFollower, CloudantV1 } from '../../../../../index';
import { PostChangesParams } from '../../../../../cloudant/v1';

const client = CloudantV1.newInstance({});
const changesParams: PostChangesParams = {
  db: 'example', // Required: the database name.
  limit: 100, // Optional: return only 100 changes (including duplicates).
  since: '3-g1AG3...' // Optional: start from this sequence ID (e.g. with a value read from persistent storage).
};
const errorTolerance: number = 10000; // 10 second duration to suppress transient errors
const changesFollower: ChangesFollower = new ChangesFollower(
  client, // Required: the Cloudant service client instance.
  changesParams, // Required: changes feed configuration options dict.
  10000 // Optional: suppress transient errors for at least 10 seconds before terminating.
);
