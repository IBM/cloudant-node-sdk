/**
 * © Copyright IBM Corporation 2022, 2025. All Rights Reserved.
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

import { PostChangesConstants, PostChangesParams } from '../v1';
import { Mode } from './changesFollower';

export default class ChangesParamsHelper {
  /**
   * Set minimum client timeout to 1 minute (= 60 000 ms).
   * 1 minute is the sort of number that very likely to be used as a client timeout,
   * so it makes sense to set as our minimum client timeout.
   */
  static MIN_CLIENT_TIMEOUT: number = 60_000;

  /**
   * Set longpoll timeout to {@link MIN_CLIENT_TIMEOUT} - 3 second (= 3000 ms).
   * To give the changes request a chance to be answered before the client timeout
   * it is set to 3 seconds less.
   */
  static LONGPOLL_TIMEOUT = this.MIN_CLIENT_TIMEOUT - 3000;

  static cloneParams(
    params: PostChangesParams,
    mode?: Mode,
    since?: string,
    limit?: number
  ): PostChangesParams {
    let clonedParams: PostChangesParams = {
      db: params.db,
      attEncodingInfo: params.attEncodingInfo,
      attachments: params.attachments,
      conflicts: params.conflicts,
      // no descending
      docIds: params.docIds,
      fields: params.fields,
      filter: params.filter,
      // no heartbeat
      includeDocs: params.includeDocs,
      // no lastEventId
      limit: limit ? limit : params.limit,
      selector: params.selector,
      seqInterval: params.seqInterval,
      since: since ? since : params.since,
      style: params.style,
      view: params.view,
    };
    if (mode === Mode.FINITE) {
      clonedParams.feed = PostChangesConstants.Feed.NORMAL;
    } else if (mode === Mode.LISTEN) {
      clonedParams.feed = PostChangesConstants.Feed.LONGPOLL;
      clonedParams.timeout = this.LONGPOLL_TIMEOUT;
    }
    return clonedParams;
  }

  static validateParams(params: PostChangesParams) {
    if (!params) {
      throw new Error('PostChangesParams configuration is required.');
    }
    if (!('db' in params) || !params.db) {
      throw new Error('The param db is required for PostChangesParams.');
    }
    let invalidParams = [];
    let paramsShouldBeUndefined = [
      'descending',
      'feed',
      'heartbeat',
      'lastEventId',
      'timeout',
    ];
    for (let paramName of paramsShouldBeUndefined) {
      if (paramName in params) {
        invalidParams.push(`'${paramName}'`);
      }
    }
    if ('filter' in params && params.filter !== '_selector') {
      invalidParams.push(`'filter=${params.filter}'`);
    }

    let errorMsg = '';
    if (invalidParams.length > 0) {
      const invalidParamsAsText = invalidParams.join(', ');
      errorMsg = `The params ${invalidParamsAsText} are invalid when using ChangesFollower.`;
      if (invalidParams.length === 1) {
        errorMsg = `The param ${invalidParamsAsText} is invalid when using ChangesFollower.`;
      }
    }

    if (errorMsg.length > 0) {
      throw new Error(errorMsg);
    }
  }
}
