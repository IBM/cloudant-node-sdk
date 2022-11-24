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

const core = require('ibm-cloud-sdk-core');
const {
  ChangesFollower,
} = require('../../../cloudant/features/changesFollower.ts');
const { getTransientErrors } = require('./mockErrors');

const { NoAuthAuthenticator } = core;

function mockAuthenticator() {
  const authenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
  authenticatorMock.mockImplementation(() => new NoAuthAuthenticator());
}

function generateRandomHex(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

function generateSeq(size, gen) {
  const randomChars = generateRandomHex(size);
  if (gen !== undefined) {
    return `${gen}-${randomChars}`;
  }
  return randomChars;
}

function mockRandomChangesResultItem() {
  return {
    changes: {
      rev: generateSeq(32, 1),
    },
    deleted: false,
    doc: null,
    id: generateSeq(10),
    seq: generateSeq(512, 1),
  };
}

function mockChangesResultItems(size = ChangesFollower.BATCH_SIZE) {
  const changesResultItems = [];
  for (let start = 0; start < size; start += 1) {
    changesResultItems.push(mockRandomChangesResultItem());
  }
  return changesResultItems;
}

function mockRandomChangesResult(numberOfBatches) {
  let pending = numberOfBatches * ChangesFollower.BATCH_SIZE;
  const mocks = [];
  for (let i = 1; i <= numberOfBatches; i += 1) {
    pending -= ChangesFollower.BATCH_SIZE;
    const changesResultItems = mockChangesResultItems();
    mocks.push({
      result: {
        results: changesResultItems,
        pending,
        last_seq: changesResultItems[changesResultItems.length - 1].seq,
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
        last_seq: generateSeq(512, '1'),
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
      last_seq: changesResultItems[changesResultItems.length - 1].seq,
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

module.exports = {
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
