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

const {
  Action,
  getClient,
  getModes,
  getSuppressionSequences,
} = require('./testDataProviders');
const {
  ChangesResultIterableIterator,
} = require('../../../cloudant/features/changesResultIterator.ts');
const { Mode } = require('../../../cloudant/features/changesParamsHelper.ts');
const { testParams } = require('./testParams');
const {
  generateRandomChangesResults,
  mockPerpetualSupplier,
  perpetualSupplierResponse,
  mockPostChangesError,
  mockPerpetualSupplierRespectingLimit,
} = require('./testMocks');
const {
  ChangesParamsHelper,
} = require('../../../cloudant/features/changesParamsHelper.ts');
const {
  getTransientErrors,
  getTerminalErrors,
  getErrors,
  MockError,
} = require('./mockErrors');
const { delay } = require('./testUtils');

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
    const originalBatchSize = ChangesResultIterableIterator.BATCH_SIZE;
    beforeAll(() => {
      // Monkey patch to reduce the batch size for speed,
      // Node seems slow at generating mock changes!
      ChangesResultIterableIterator.BATCH_SIZE = 42;
    });
    afterAll(() => {
      // Reset the batch size
      ChangesResultIterableIterator.BATCH_SIZE = originalBatchSize;
    });
    beforeEach(() => {
      postChangesPromiseMock.mockImplementation(
        mockPerpetualSupplierRespectingLimit
      );
    });
    it('Limit less than batch size', () => {
      const limit = 15;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          mode,
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
      const limit = ChangesResultIterableIterator.BATCH_SIZE;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          mode,
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
      ChangesResultIterableIterator.BATCH_SIZE = 42;
      const limit = 2 * ChangesResultIterableIterator.BATCH_SIZE;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          mode,
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
          expect(result.value.results).toHaveLength(
            ChangesResultIterableIterator.BATCH_SIZE
          );
        })
        .then(() => testIterator.next())
        .then((result) => {
          expect(result.done).toBeFalsy();
          expect(result.value).toBeTruthy();
          expect(result.value.results).toBeTruthy();
          expect(result.value.results).toHaveLength(
            ChangesResultIterableIterator.BATCH_SIZE
          );
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
      const limit = ChangesResultIterableIterator.BATCH_SIZE + delta;
      const testIterator = new ChangesResultIterableIterator(
        service,
        ChangesParamsHelper.cloneParams(
          testParams.MINIMUM.params,
          undefined,
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
          expect(result.value.results).toHaveLength(
            ChangesResultIterableIterator.BATCH_SIZE
          );
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
    describe('with suppression sequences', () => {
      const originalBatchSize = ChangesResultIterableIterator.BATCH_SIZE;
      beforeAll(() => {
        // Monkey patch to reduce the batch size for speed,
        // Node seems slow at generating mock changes and
        // deep equals on large batches takes a long time!
        ChangesResultIterableIterator.BATCH_SIZE = 7;
      });
      afterAll(() => {
        // Reset the batch size
        ChangesResultIterableIterator.BATCH_SIZE = originalBatchSize;
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

describe('Test seqMarkers', () => {
  let seqMarkersPostChangesPromiseMock;

  beforeEach(() => {
    seqMarkersPostChangesPromiseMock = jest.spyOn(service, 'postChanges');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------------------------------
  // Page type factory
  //
  // pageType(type, base) builds a mock postChanges response for one of 9 types:
  //
  //   Type 1: rows=[b, b+1],     lastSeq=b+1  (last row == last_seq, no nulls)
  //   Type 2: rows=[b, b+1],     lastSeq=b+2  (last row != last_seq, no nulls)
  //   Type 3: rows=[null, b+1],  lastSeq=b+1  (leading null, last row == last_seq)
  //   Type 4: rows=[null, b+1],  lastSeq=b+2  (leading null, last row != last_seq)
  //   Type 5: rows=[b, null],    lastSeq=b+1  (trailing null last row)
  //   Type 6: rows=[b, null],    lastSeq=b+2  (trailing null last row, last_seq beyond)
  //   Type 7: rows=[null, null], lastSeq=b+1  (all nulls)
  //   Type 8: rows=[null, null], lastSeq=b+2  (all nulls, last_seq beyond)
  //   Type 9: rows=[],           lastSeq=b    (empty page)
  //
  // What gets stored in seqMarkers per type:
  //   Types 1,3: ROW('(b+1)-aa'), PAGE('(b+1)-aa')
  //   Types 2,4: ROW('(b+1)-aa'), PAGE('(b+2)-aa')
  //   Types 5,7: ROW(null),       PAGE('(b+1)-aa')
  //   Types 6,8: ROW(null),       PAGE('(b+2)-aa')
  //   Type  9:   PAGE('b-aa')  (no ROW)
  //
  // Bases should be spaced at least 3 apart; multiples of 10 are idiomatic.
  // --------------------------------------------------------------------------
  const seq = (n) => `${n}-aa`;

  const pageType = (type, base) => {
    const makeRow = (s) => ({ id: 'doc', seq: s, changes: [] });
    switch (type) {
      case 1:
        return {
          results: [makeRow(seq(base)), makeRow(seq(base + 1))],
          lastSeq: seq(base + 1),
          pending: 0,
        };
      case 2:
        return {
          results: [makeRow(seq(base)), makeRow(seq(base + 1))],
          lastSeq: seq(base + 2),
          pending: 0,
        };
      case 3:
        return {
          results: [makeRow(null), makeRow(seq(base + 1))],
          lastSeq: seq(base + 1),
          pending: 0,
        };
      case 4:
        return {
          results: [makeRow(null), makeRow(seq(base + 1))],
          lastSeq: seq(base + 2),
          pending: 0,
        };
      case 5:
        return {
          results: [makeRow(seq(base)), makeRow(null)],
          lastSeq: seq(base + 1),
          pending: 0,
        };
      case 6:
        return {
          results: [makeRow(seq(base)), makeRow(null)],
          lastSeq: seq(base + 2),
          pending: 0,
        };
      case 7:
        return {
          results: [makeRow(null), makeRow(null)],
          lastSeq: seq(base + 1),
          pending: 0,
        };
      case 8:
        return {
          results: [makeRow(null), makeRow(null)],
          lastSeq: seq(base + 2),
          pending: 0,
        };
      case 9:
        return { results: [], lastSeq: seq(base), pending: 0 };
      default:
        throw new Error(`Unknown page type: ${type}`);
    }
  };

  // Helper: create an iterator, feed it the given pages via next(), return it.
  // Sets pending > 0 on all but the last page so the FINITE iterator keeps fetching.
  const createIteratorWithPages = async (pages) => {
    const params = ChangesParamsHelper.cloneParams(testParams.MINIMUM.params);
    const iterator = new ChangesResultIterableIterator(
      service,
      params,
      Mode.FINITE
    );
    for (let i = 0; i < pages.length; i += 1) {
      const page = {
        ...pages[i],
        pending: i < pages.length - 1 ? pages.length - 1 - i : 0,
      };
      seqMarkersPostChangesPromiseMock.mockResolvedValueOnce({ result: page });
      // eslint-disable-next-line no-await-in-loop
      await iterator.next();
    }
    return iterator;
  };

  // Helper: populate iterator with pages and call lastSeqSince directly.
  const lastSeqSince = async (pages, querySeq) => {
    const iterator = await createIteratorWithPages(pages);
    return iterator.lastSeqSince(querySeq);
  };

  // --------------------------------------------------------------------------
  // Not-found / empty edge cases
  // --------------------------------------------------------------------------

  it('testLastSeqSinceNotFound', async () => {
    const result = await lastSeqSince([pageType(1, 10)], '999-ff');
    expect(result).toBe('999-ff');
  });

  it('testLastSeqSinceEmptySeqMarkers', async () => {
    const result = await lastSeqSince([], '1-aa');
    expect(result).toBe('1-aa');
  });

  // --------------------------------------------------------------------------
  // Per-page-type: single page
  // --------------------------------------------------------------------------

  it.each([
    ['Type 1: last row seq (== last_seq)', 1, 10, seq(11), seq(11)],
    ['Type 3: last row seq (== last_seq)', 3, 10, seq(11), seq(11)],
    ['Type 2: last row seq → last_seq', 2, 10, seq(11), seq(12)],
    ['Type 2: last_seq key → itself', 2, 10, seq(12), seq(12)],
    ['Type 4: last row seq → last_seq', 4, 10, seq(11), seq(12)],
    ['Type 4: last_seq key → itself', 4, 10, seq(12), seq(12)],
    ['Type 5: non-stored row seq unchanged', 5, 10, seq(10), seq(10)],
    ['Type 5: last_seq key → itself', 5, 10, seq(11), seq(11)],
    ['Type 6: non-stored row seq unchanged', 6, 10, seq(10), seq(10)],
    ['Type 6: last_seq key → itself', 6, 10, seq(12), seq(12)],
    ['Type 7: last_seq key → itself', 7, 10, seq(11), seq(11)],
    ['Type 8: last_seq key → itself', 8, 10, seq(12), seq(12)],
    ['Type 9: last_seq key → itself', 9, 10, seq(10), seq(10)],
  ])(
    'testLastSeqSinceAlone: %s',
    async (name, type, base, querySeq, expectedSeq) => {
      const result = await lastSeqSince([pageType(type, base)], querySeq);
      expect(result).toBe(expectedSeq);
    }
  );

  // --------------------------------------------------------------------------
  // Per-page-type: followed by a non-empty page (type 1 at base 20)
  //
  // Page 2 inserts ROW('21-aa') which blocks advancement.
  // --------------------------------------------------------------------------

  it.each([
    ['Type 1 + non-empty: blocked by p2 ROW', 1, 10, seq(11), seq(11)],
    ['Type 2 + non-empty: last row seq → last_seq p1', 2, 10, seq(11), seq(12)],
    ['Type 2 + non-empty: last_seq key → last_seq p1', 2, 10, seq(12), seq(12)],
    ['Type 3 + non-empty: blocked by p2 ROW', 3, 10, seq(11), seq(11)],
    ['Type 4 + non-empty: last row seq → last_seq p1', 4, 10, seq(11), seq(12)],
    ['Type 4 + non-empty: last_seq key → last_seq p1', 4, 10, seq(12), seq(12)],
    ['Type 5 + non-empty: blocked by p2 ROW', 5, 10, seq(11), seq(11)],
    ['Type 6 + non-empty: blocked by p2 ROW', 6, 10, seq(12), seq(12)],
    ['Type 7 + non-empty: blocked by p2 ROW', 7, 10, seq(11), seq(11)],
    ['Type 8 + non-empty: blocked by p2 ROW', 8, 10, seq(12), seq(12)],
    ['Type 9 + non-empty: blocked by p2 ROW', 9, 10, seq(10), seq(10)],
  ])(
    'testLastSeqSinceFollowedByNonEmpty: %s',
    async (name, type, base, querySeq, expectedSeq) => {
      const result = await lastSeqSince(
        [pageType(type, base), pageType(1, 20)],
        querySeq
      );
      expect(result).toBe(expectedSeq);
    }
  );

  // --------------------------------------------------------------------------
  // Per-page-type: followed by an empty page (type 9 at base 20)
  //
  // Page 2 inserts only PAGE('20-aa') — no ROW to block, advances to '20-aa'.
  // --------------------------------------------------------------------------

  it.each([
    ['Type 1 + empty: advances to p2 last_seq', 1, 10, seq(11), seq(20)],
    ['Type 2 + empty: last row seq advances to p2', 2, 10, seq(11), seq(20)],
    ['Type 2 + empty: last_seq key advances to p2', 2, 10, seq(12), seq(20)],
    ['Type 3 + empty: advances to p2 last_seq', 3, 10, seq(11), seq(20)],
    ['Type 4 + empty: last row seq advances to p2', 4, 10, seq(11), seq(20)],
    ['Type 4 + empty: last_seq key advances to p2', 4, 10, seq(12), seq(20)],
    ['Type 5 + empty: last_seq advances to p2', 5, 10, seq(11), seq(20)],
    ['Type 6 + empty: last_seq advances to p2', 6, 10, seq(12), seq(20)],
    ['Type 7 + empty: last_seq advances to p2', 7, 10, seq(11), seq(20)],
    ['Type 8 + empty: last_seq advances to p2', 8, 10, seq(12), seq(20)],
    ['Type 9 + empty: advances to p2 last_seq', 9, 10, seq(10), seq(20)],
  ])(
    'testLastSeqSinceFollowedByEmpty: %s',
    async (name, type, base, querySeq, expectedSeq) => {
      const result = await lastSeqSince(
        [pageType(type, base), pageType(9, 20)],
        querySeq
      );
      expect(result).toBe(expectedSeq);
    }
  );

  // --------------------------------------------------------------------------
  // All 8 three-page sequences of empty (E=type 9) and non-empty (N=type 1).
  // Query from page 1's last_seq key. E adds only PAGE; N adds ROW+PAGE.
  // --------------------------------------------------------------------------

  it.each([
    [
      'NNN: blocked by p2 ROW → p1 last_seq',
      [1, 1, 1],
      [10, 20, 30],
      seq(11),
      seq(11),
    ],
    [
      'NNE: blocked by p2 ROW → p1 last_seq',
      [1, 1, 9],
      [10, 20, 30],
      seq(11),
      seq(11),
    ],
    [
      'NEE: advances through both empty pages',
      [1, 9, 9],
      [10, 20, 30],
      seq(11),
      seq(30),
    ],
    [
      'NEN: advances through p2 empty, stops at p3',
      [1, 9, 1],
      [10, 20, 30],
      seq(11),
      seq(20),
    ],
    [
      'ENN: blocked by p2 ROW → p1 last_seq',
      [9, 1, 1],
      [10, 20, 30],
      seq(10),
      seq(10),
    ],
    [
      'ENE: blocked by p2 ROW → p1 last_seq',
      [9, 1, 9],
      [10, 20, 30],
      seq(10),
      seq(10),
    ],
    [
      'EEN: advances through p2, stops at p3 ROW',
      [9, 9, 1],
      [10, 20, 30],
      seq(10),
      seq(20),
    ],
    [
      'EEE: advances through all three empty pages',
      [9, 9, 9],
      [10, 20, 30],
      seq(10),
      seq(30),
    ],
  ])(
    'testLastSeqSince3PageSequence: %s',
    async (name, types, bases, querySeq, expectedSeq) => {
      const pages = types.map((t, i) => pageType(t, bases[i]));
      const result = await lastSeqSince(pages, querySeq);
      expect(result).toBe(expectedSeq);
    }
  );

  // --------------------------------------------------------------------------
  // Eviction
  //
  // Each non-empty page adds 2 entries (ROW + PAGE). With CAPACITY=200 and
  // EVICTION_COUNT=20, adding 101 pages triggers one eviction of the oldest
  // 20 entries (first 10 pages). Entries for page 0 (base=0) should be gone;
  // entries for the most recent page (base=1000) should still be present.
  // --------------------------------------------------------------------------

  it('testLastSeqSinceEviction', async () => {
    const pages = [];
    for (let i = 0; i < 101; i += 1) {
      pages.push(pageType(2, i * 10));
    }
    const iterator = await createIteratorWithPages(pages);

    // Page 0 (base=0): row=seq(1), page=seq(2) — evicted
    expect(iterator.lastSeqSince(seq(1))).toBe(seq(1));
    expect(iterator.lastSeqSince(seq(2))).toBe(seq(2));

    // Most recent page (base=1000): row=seq(1001), page=seq(1002) — still present
    expect(iterator.lastSeqSince(seq(1001))).toBe(seq(1002));
    expect(iterator.lastSeqSince(seq(1002))).toBe(seq(1002));
  });
});
