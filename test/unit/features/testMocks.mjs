/**
 * © Copyright IBM Corporation 2022. All Rights Reserved.
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

import { NoAuthAuthenticator } from 'ibm-cloud-sdk-core';
import { ChangesFollower } from '../../../cloudant/features/changesFollower';
import { getTransientErrors } from './mockErrors';

function mockAuthenticator() {
  const authenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
  authenticatorMock.mockImplementation(() => new NoAuthAuthenticator());
}

function generateSeq(size, gen) {
  const randomChars = ''.padStart(size, '0123456789abcdef');
  if (gen !== undefined) {
    return `${gen}-${randomChars}`;
  }
  return randomChars;
}

function mockRandomChangesResultItem(gen = 1) {
  return {
    changes: {
      rev: generateSeq(32, gen),
    },
    deleted: false,
    doc: null,
    id: `doc${gen}`,
    seq: generateSeq(512, 1),
  };
}

function mockChangesResultItems(
  size = ChangesFollower.BATCH_SIZE,
  startFrom = 1
) {
  const changesResultItems = [];
  for (let s = startFrom; s < startFrom + size; s += 1) {
    changesResultItems.push(mockRandomChangesResultItem(s));
  }
  return changesResultItems;
}

function mockRandomChangesResult(numberOfBatches) {
  const batchSize = ChangesFollower.BATCH_SIZE;
  const total = numberOfBatches * batchSize;
  let pending = total;
  const mocks = [];
  for (let i = 0; i < numberOfBatches; i += 1) {
    pending -= batchSize;
    const changesResultItems = mockChangesResultItems(
      batchSize,
      i * batchSize + 1
    );
    mocks.push({
      result: {
        results: changesResultItems,
        pending,
        lastSeq: changesResultItems[changesResultItems.length - 1].seq,
      },
    });
  }
  return mocks;
}

function mockAlternatingBatchesAndErrors(mock, batches) {
  const mocks = mockRandomChangesResult(batches);
  const transientErrors = getTransientErrors();
  for (let i = 0; i < batches; i += 1) {
    // add a successful batch
    mock.mockImplementationOnce(() => Promise.resolve(mocks[i]));
    // add a transient error
    mock.mockImplementationOnce(() =>
      Promise.reject(transientErrors[i % transientErrors.length])
    );
  }
}

function mockAlternatingBatchErrorThenPerpetualSupplier(batches) {
  // Set the default behavior sends back an empty changes list:
  const mockFn = jest.fn(() =>
    Promise.resolve({
      result: {
        results: [],
        pending: 0,
        lastSeq: generateSeq(512, '1'),
      },
    })
  );
  // The first 2 batches have changes alternating with transient errors:
  mockAlternatingBatchesAndErrors(mockFn, batches);
  return mockFn;
}

function getPerpetualSupplierResponse(size = ChangesFollower.BATCH_SIZE) {
  const changesResultItems = mockChangesResultItems(size);
  return {
    result: {
      results: changesResultItems,
      pending: 5,
      lastSeq: changesResultItems[changesResultItems.length - 1].seq,
    },
  };
}

const perpetualSupplierResponse = getPerpetualSupplierResponse();

function mockPerpetualSupplier(mockFn) {
  const mock = perpetualSupplierResponse;
  mockFn.mockResolvedValue(mock);
}

function mockPostChangesError(mock, error) {
  mock.mockRejectedValue(error.error);
}

function mockPerptualSupplierRespectingLimit(opts) {
  return getPerpetualSupplierResponse(opts.limit);
}

export default {
  mockAuthenticator,
  mockAlternatingBatchesAndErrors,
  mockAlternatingBatchErrorThenPerpetualSupplier,
  mockPostChangesError,
  mockPerpetualSupplier,
  generateChangesResultItems: mockChangesResultItems,
  generateSeq,
  generateRandomChangesResults: mockRandomChangesResult,
  perpetualSupplierResponse,
  mockPerptualSupplierRespectingLimit,
};
