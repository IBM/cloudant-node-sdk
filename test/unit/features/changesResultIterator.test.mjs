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

import { Action, getClient, getModes, getSuppressionSequences } from './testDataProviders';
import {
  ChangesResultIterableIterator
} from '../../../cloudant/features/changesResultIterator';
import { testParams } from './testParams';
import {
  generateRandomChangesResults,
  mockPerpetualSupplier,
  perpetualSupplierResponse,
  mockPostChangesError,
  mockPerptualSupplierRespectingLimit
} from './testMocks';
import { ChangesParamsHelper } from '../../../cloudant/features/changesParamsHelper';
import { ChangesFollower, Mode } from '../../../cloudant/features/changesFollower';
import { getTransientErrors, getTerminalErrors, getErrors, MockError } from './mockErrors';
import { delay } from './testUtils';

const service = getClient();
let postChangesPromiseMock;
let DEFAULT_PARAMS;

describe.each(getModes())('Test ChangesResultIterator %s', (mode) => {
  const emptyResult = {
    results: [],
    lastSeq: mode === Mode.LISTEN ? 'now' : '0',
    pending: Number.MAX_VALUE,
  };
  beforeEach(() => {
    // Normally ChangesFollower clones the params when constructing
    // the ChangesResultIterableIterator and the iterator will modify
    // params as it goes. So we need a clean start in beforeEach if
    // we are going to use DEFAULT_PARAMS across multiple tests.
    DEFAULT_PARAMS = ChangesParamsHelper.cloneParams(testParams.MINIMUM.params);
    postChangesPromiseMock = jest.spyOn(service, 'postChanges');
  });
  it('testNext', (done) => {
    mockPerpetualSupplier(postChangesPromiseMock);
    const testIterator = new ChangesResultIterableIterator(
      service,
      DEFAULT_PARAMS,
      mode
    );
    testIterator.next().then((result) => {
      const expectedResponse = perpetualSupplierResponse;
      expect(result.value).toEqual(expectedResponse.result);
      expect(result.done).toBeFalsy();
      // shut down the iterator:
      testIterator.return();
      done();
    });
  });
  it.each(getErrors())(
    'testNextWithZeroErrorTolerance $message',
    (error, done) => {
      mockPostChangesError(postChangesPromiseMock, error);
      const testIterator = new ChangesResultIterableIterator(
        service,
        DEFAULT_PARAMS,
        mode,
        0
      );
      testIterator.next().catch((err) => {
        expect(err).toEqual(error.error);
        done();
      });
    }
  );
  describe('testNextWithMaxErrorTolerance', () => {
    let testIterator;
    beforeEach(() => {
      testIterator = new ChangesResultIterableIterator(
        service,
        DEFAULT_PARAMS,
        mode,
        Number.MAX_VALUE
      );
    });
    it.each(getTransientErrors())(
      'transientErrors $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);
        testIterator.next().then((result) => {
          expect(result.value).toEqual(emptyResult);
          expect(result.done).toBeFalsy();
          // shut down the iterator:
          testIterator.return();
          done();
        });
      }
    );
    it.each(getTerminalErrors())(
      'terminalErrors $message',
      async (terminalError) => {
        mockPostChangesError(postChangesPromiseMock, terminalError);
        await testIterator.next().catch((err) => {
          expect(err).toEqual(terminalError.error);
        });
      }
    );
  });
  describe('Test iterator next with limits', () => {
    const originalBatchSize = ChangesFollower.BATCH_SIZE;
    beforeAll(() => {
      // Monkey patch to reduce the batch size for speed,
      // Node seems slow at generating mock changes!
      ChangesFollower.BATCH_SIZE = 42;
    });
    afterAll(() => {
      // Reset the batch size
      ChangesFollower.BATCH_SIZE = originalBatchSize;
    });
    beforeEach(() => {
      postChangesPromiseMock.mockImplementation(
        mockPerptualSupplierRespectingLimit
      );
    });
    it('Limit less than batch size', () => {
      const limit = 15;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          undefined,
          limit
        ),
        mode,
        Number.MAX_VALUE
      );
      return testIterator
        .next()
        .then((result) => {
          // Note we don't return done: true
          // alongside actual results even if it
          // is the last result.
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(limit);
        })
        .then(() => testIterator.next())
        .then((result) => {
          // There should be no more results
          expect(result.done).toBeTruthy();
          expect(result.value).toBeUndefined();
        });
    });
    it('Limit of batch size', () => {
      const limit = ChangesFollower.BATCH_SIZE;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          undefined,
          limit
        ),
        mode,
        Number.MAX_VALUE
      );
      return testIterator
        .next()
        .then((result) => {
          // Note we don't return done: true
          // alongside actual results even if it
          // is the last result.
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(limit);
        })
        .then(() => testIterator.next())
        .then((result) => {
          // There should be no more results
          expect(result.done).toBeTruthy();
          expect(result.value).toBeUndefined();
        });
    });
    it('Limit of batch multiple', () => {
      // Reduce batch size for speed
      ChangesFollower.BATCH_SIZE = 42;
      const limit = 2 * ChangesFollower.BATCH_SIZE;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          undefined,
          limit
        ),
        mode,
        Number.MAX_VALUE
      );
      return testIterator
        .next()
        .then((result) => {
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(ChangesFollower.BATCH_SIZE);
        })
        .then(() => testIterator.next())
        .then((result) => {
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(ChangesFollower.BATCH_SIZE);
        })
        .then(() => testIterator.next())
        .then((result) => {
          // There should be no more results
          expect(result.done).toBeTruthy();
          expect(result.value).toBeUndefined();
        });
    });
    it('Limit final partial batch', () => {
      const delta = 17;
      const limit = ChangesFollower.BATCH_SIZE + delta;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          undefined,
          limit
        ),
        mode,
        Number.MAX_VALUE
      );
      return testIterator
        .next()
        .then((result) => {
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(ChangesFollower.BATCH_SIZE);
        })
        .then(() => testIterator.next())
        .then((result) => {
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(delta);
        })
        .then(() => testIterator.next())
        .then((result) => {
          // There should be no more results
          expect(result.done).toBeTruthy();
          expect(result.value).toBeUndefined();
        });
    });
  });
  describe('testNextWithFiniteErrorTolerance', () => {
    // When we are testing with sequences the retry backoff time comes into play
    // on a first retry this is a max of 100 ms.
    // Our tolerance time needs to be higher than that, add 50% because Node timing is inexact.
    const TOLERANCE_TIME = 150;
    // Dwell time is the length we wait before for an error tolerance to lapse
    // and must be longer than tolerance time.
    const DWELL_TIME = 200;
    let testIterator;
    beforeEach(() => {
      testIterator = new ChangesResultIterableIterator(
        service,
        DEFAULT_PARAMS,
        mode,
        TOLERANCE_TIME
      );
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it.each(getTransientErrors())(
      'transientErrors $message',
      (transientError) => {
        mockPostChangesError(postChangesPromiseMock, transientError);
        return testIterator
          .next()
          .then((firstResult) => {
            expect(firstResult.done).toBeFalsy();
            expect(firstResult.value).toEqual(emptyResult);
          })
          .then(() => delay(DWELL_TIME))
          .then(() =>
            expect(testIterator.next()).rejects.toEqual(transientError.error)
          );
      }
    );
    it.each(getTerminalErrors())('terminalErrors $message', (terminalError) => {
      mockPostChangesError(postChangesPromiseMock, terminalError);
      return expect(testIterator.next()).rejects.toEqual(terminalError.error);
    });
    describe('with supppresion sequences', () => {
      const originalBatchSize = ChangesFollower.BATCH_SIZE;
      beforeAll(() => {
        // Monkey patch to reduce the batch size for speed,
        // Node seems slow at generating mock changes and
        // deep equals on large batches takes a long time!
        ChangesFollower.BATCH_SIZE = 7;
      });
      afterAll(() => {
        // Reset the batch size
        ChangesFollower.BATCH_SIZE = originalBatchSize;
      });
      test.each(getSuppressionSequences())('$first $second $third', (seq) => {
        const error = MockError.TRANSIENT_429;
        // We mock 3 batches because we don't want to reach pending 0
        // and we might have 2 success responses.
        const mockedSuccessResponses = generateRandomChangesResults(3);
        const expectedResults = [];
        let result = emptyResult;
        // Prepare the necessary mocks, according to the sequence
        seq.all().forEach((action) => {
          switch (action) {
            case Action.SUCCESS: {
              const mockResponse = mockedSuccessResponses.shift();
              result = mockResponse.result;
              expectedResults.push(result);
              postChangesPromiseMock.mockResolvedValueOnce(
                // Queue the next success batch
                mockResponse
              );
              break;
            }
            case Action.SUPPRESS:
              // Expected a suppression result, which will have
              // the pending/lastSeq of the previous success
              // response or the empty response if there hasn't
              // been a success.
              expectedResults.push({
                lastSeq: result.lastSeq,
                pending: result.pending,
                results: [],
              });
            // Fallthrough
            case Action.THROW:
              postChangesPromiseMock.mockRejectedValueOnce(error);
              break;
            default:
              throw new Error('Undefined action');
          }
        });
        // Promise chain to test the sequence
        return testIterator
          .next()
          .then((firstResult) => {
            // First call, should not error
            expect(firstResult.done).toBeFalsy();
            expect(firstResult.value).toEqual(expectedResults.shift());
          })
          .then(() => testIterator.next())
          .then((secondResult) => {
            expect(secondResult.done).toBeFalsy();
            // Second call should not error
            expect(secondResult.value).toEqual(expectedResults.shift());
            // Prepare for the third & final action
            // In the cases we don't want to suppress we should
            // delay by the errorTolerance dwell time.
            if (seq.third !== Action.SUPPRESS) {
              return delay(DWELL_TIME);
            }
            return Promise.resolve();
          })
          .then(() => {
            switch (seq.third) {
              case Action.THROW:
                return expect(testIterator.next()).rejects.toEqual(error);
              case Action.SUCCESS:
              case Action.SUPPRESS:
                return expect(testIterator.next()).resolves.toEqual({
                  done: false,
                  value: expectedResults.shift(),
                });
              default:
                throw new Error('Undefined action');
            }
          });
      });
    });
  });

  // Validate that retries have a backoff
  it('testRetry', async () => {
    mockPostChangesError(postChangesPromiseMock, MockError.TRANSIENT_429);
    const testIterator = new ChangesResultIterableIterator(
      service,
      DEFAULT_PARAMS,
      mode,
      Number.MAX_VALUE
    );
    const startTime = Date.now();
    // Random jitter means backoff can be as low as 1 ms
    // Test by iterating for 300 ms or a max of 1000 iterations
    // Pass the test if we have fewer than 300 iterations, fail
    // if we exceed that since it means it is not backing off.
    for (let requestCounter = 0; requestCounter < 1000; requestCounter += 1) {
      if (Date.now() < startTime + 300) {
        expect(requestCounter).toBeLessThan(999);
        // eslint-disable-next-line no-await-in-loop
        await testIterator.next();
      } else {
        expect(requestCounter).toBeLessThan(300);
        break;
      }
    }
    // shut down the iterator:
    return testIterator.return();
  });
});
