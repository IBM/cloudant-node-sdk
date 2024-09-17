/**
 * © Copyright IBM Corporation 2022, 2023. All Rights Reserved.
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

import { PostChangesConstants } from '../../../cloudant/v1';
import { ChangesParamsHelper } from '../../../cloudant/features/changesParamsHelper';

const beginningOfErrorMsg = 'The param';
const endOfErrorMsg = 'invalid when using ChangesFollower.';

const minimumTestParams = { db: 'test' };
const testSeqNumber = '9876-alotofcharactersthatarenotreallyrandom';
const testParams = {
  NULL: {
    isValid: false,
    params: null,
    expectedError: 'PostChangesParams configuration is required.',
  },
  NONE: {
    isValid: false,
    params: {},
    expectedError: 'The param db is required for PostChangesParams.',
  },
  MINIMUM: { isValid: true, params: minimumTestParams },
  INCLUDE_DOCS: {
    isValid: true,
    params: {
      includeDocs: true,
      attEncodingInfo: true,
      attachments: true,
      conflicts: true,
      ...minimumTestParams,
    },
  },
  DOC_IDS: {
    isValid: false,
    params: {
      includeDocs: true,
      filter: '_doc_ids',
      doc_ids: ['foo', 'bar', 'baz'],
      attEncodingInfo: true,
      attachments: true,
      conflicts: true,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=_doc_ids' is ${endOfErrorMsg}`,
  },
  SELECTOR: {
    isValid: true,
    params: {
      includeDocs: true,
      filter: '_selector',
      selector: { selector: { foo: 'bar' } },
      fields: ['foo', 'bar', 'baz'],
      ...minimumTestParams,
    },
  },
  SELECTOR_FILTER: {
    isValid: true,
    params: {
      filter: '_selector',
      ...minimumTestParams,
    },
  },
  DDOC_FILTER: {
    isValid: false,
    params: {
      filter: 'foo/bar',
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=foo/bar' is ${endOfErrorMsg}`,
  },
  DOC_IDS_FILTER: {
    isValid: false,
    params: {
      filter: '_doc_ids',
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=_doc_ids' is ${endOfErrorMsg}`,
  },
  DESIGN_FILTER: {
    isValid: false,
    params: {
      filter: '_design',
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=_design' is ${endOfErrorMsg}`,
  },
  VIEW_FILTER: {
    isValid: false,
    params: {
      filter: '_view',
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=_view' is ${endOfErrorMsg}`,
  },
  VIEW: {
    isvalid: false,
    params: {
      filter: '_view',
      view: 'foo/bar',
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'filter=_view' is ${endOfErrorMsg}`,
  },
  DESCENDING: {
    isValid: false,
    params: {
      descending: true,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'descending' is ${endOfErrorMsg}`,
  },
  FEED: {
    isValid: false,
    params: {
      feed: PostChangesConstants.Feed.CONTINUOUS,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'feed' is ${endOfErrorMsg}`,
  },
  HEARTBEAT: {
    isValid: false,
    params: {
      heartbeat: 150,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'heartbeat' is ${endOfErrorMsg}`,
  },
  LAST_EVENT_ID: {
    isValid: false,
    params: {
      lastEventId: testSeqNumber,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'lastEventId' is ${endOfErrorMsg}`,
  },
  TIMEOUT: {
    isValid: false,
    params: {
      timeout: 3600000,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg} 'timeout' is ${endOfErrorMsg}`,
  },
  MULTI_INVALID: {
    isValid: false,
    params: {
      descending: true,
      feed: PostChangesConstants.Feed.CONTINUOUS,
      heartbeat: 150,
      lastEventId: testSeqNumber,
      timeout: 3600000,
      ...minimumTestParams,
    },
    expectedError: `${beginningOfErrorMsg}s 'descending', 'feed', 'heartbeat',`
      + ` 'lastEventId', 'timeout' are ${endOfErrorMsg}`,
  },
};

function getExpectedParams(params) {
  const expectedParams = params;
  if (params.feed === undefined) {
    expectedParams.feed = PostChangesConstants.Feed.LONGPOLL;
  }
  expectedParams.timeout = ChangesParamsHelper.LONGPOLL_TIMEOUT;
  return expectedParams;
}

export { testParams, testSeqNumber, getExpectedParams };
