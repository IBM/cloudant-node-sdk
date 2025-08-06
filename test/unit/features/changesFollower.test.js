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

const {
  ChangesFollower,
} = require('../../../cloudant/features/changesFollower.ts');
const { Mode } = require('../../../cloudant/features/changesParamsHelper.ts');
const {
  ChangesResultIterableIterator,
} = require('../../../cloudant/features/changesResultIterator.ts');
const { testParams } = require('./testParams.js');
const {
  getStates,
  getModesAndLimits,
  getInvalidTimeoutClients,
  getValidTimeoutClients,
  getClient,
} = require('./testDataProviders');
const {
  mockAuthenticator,
  mockAlternatingBatchesAndErrors,
  mockPerpetualSupplier,
  mockPostChangesError,
  generateChangesResultItems,
  generateSeq,
  generateRandomChangesResults,
  mockAlternatingBatchErrorThenPerpetualSupplier,
  mockPerpetualSupplierRespectingLimit,
} = require('./testMocks.js');
const { getTerminalErrors, getTransientErrors } = require('./mockErrors');
const { delay } = require('./testUtils');

const minimumTestParams = testParams.MINIMUM.params;

// don't actually construct an authenticator
mockAuthenticator();

const service = getClient();
let postChangesPromiseMock;
let getDatabaseInformationPromiseMock;

// assertions that are used several times
function assertObjectNumbersOnChangesFollowerStream(stream, batches, done) {
  let count = 0;
  stream.on('data', () => {
    count += 1;
  });
  stream.on('end', () => {
    try {
      expect(count).toBe(batches * ChangesResultIterableIterator.BATCH_SIZE);
      expect(stream.readableEnded).toBe(true);
    } finally {
      done();
    }
  });
}

function stopChangesFollowerAndAssertStreamDidNotError(
  changesFollower,
  stream,
  timeout
) {
  stream.on('error', (err) => {
    throw new Error(
      `Stream should not be errored, but it did with: ${JSON.stringify(err)}`
    );
  });
  // Run for timeout milliseconds against an infinite stream
  delay(timeout).then(() => {
    changesFollower.stop();
  });
}

describe('Test ChangesFollower', () => {
  const originalBatchSize = ChangesResultIterableIterator.BATCH_SIZE;
  function setBatchSize(size) {
    // modify batch size from 10_000 to size for the sake of quick iteration
    ChangesResultIterableIterator.BATCH_SIZE = size;
  }

  beforeEach(() => {
    postChangesPromiseMock = jest.spyOn(service, 'postChanges');
    getDatabaseInformationPromiseMock = jest.spyOn(
      service,
      'getDatabaseInformation'
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    // Reset the batch size in case it was modified by a test
    ChangesResultIterableIterator.BATCH_SIZE = originalBatchSize;
  });
  describe('Initialization', () => {
    it('testInitialization', () => {
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const changesFollower = new ChangesFollower(service, minimumTestParams);
      }).not.toThrow();
    });
    it('testInitializationInvalidOptions', () => {
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const changesFollower = new ChangesFollower(
          service,
          testParams.MULTI_INVALID.params
        );
      }).toThrow(testParams.MULTI_INVALID.expectedError);
    });
    it('testInitializationNegativeTolerance', () => {
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const changesFollower = new ChangesFollower(
          service,
          minimumTestParams,
          -1
        );
      }).toThrow('Error tolerance duration must not be negative.');
    });
    it('testInitializationWithNullErrorTolerance', () => {
      const changesFollower = new ChangesFollower(
        service,
        minimumTestParams,
        null
      );
      expect(changesFollower.errorTolerance).toEqual(Number.MAX_VALUE);
    });
    it('testInitializationWithUndefinedErrorTolerance', () => {
      // implicitly set to undefined
      const changesFollowerImpl = new ChangesFollower(
        service,
        minimumTestParams
      );
      expect(changesFollowerImpl.errorTolerance).toEqual(Number.MAX_VALUE);
      // explicitly set to undefined
      const changesFollowerExpl = new ChangesFollower(
        service,
        minimumTestParams,
        undefined
      );
      expect(changesFollowerExpl.errorTolerance).toEqual(Number.MAX_VALUE);
    });
    it.each(getInvalidTimeoutClients())(
      'testInitializationInvalidTimeoutClients $timeout',
      (client) => {
        expect(() => {
          // eslint-disable-next-line no-unused-vars
          const changesFollower = new ChangesFollower(
            client,
            minimumTestParams
          );
        }).toThrow(
          `To use ChangesFollower the client read timeout must be at least 60000 ms. The client read timeout is ${client.getTimeout()} ms.`
        );
      }
    );
    it.each(getValidTimeoutClients())(
      'testInitializationValidTimeoutClients $timeout',
      (client) => {
        expect(() => {
          // eslint-disable-next-line no-unused-vars
          const changesFollower = new ChangesFollower(
            client,
            minimumTestParams
          );
        }).not.toThrow();
      }
    );
  });
  describe('FINITE mode', () => {
    /**
     * Completes successfully for a fixed number of batches.
     */
    it('testStartOneOff', (done) => {
      const batches = 6;
      setBatchSize(3);
      const mocks = generateRandomChangesResults(batches);
      for (let i = 0; i < batches; i += 1) {
        postChangesPromiseMock.mockResolvedValueOnce(mocks[i]);
      }

      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream = changesFollower.startOneOff();
      assertObjectNumbersOnChangesFollowerStream(stream, batches, done);
    });

    /**
     * Errors for all terminal errors.
     */
    it.each(getTerminalErrors())(
      'testStartOneOffTerminalErrors $message',
      (terminalError, done) => {
        mockPostChangesError(postChangesPromiseMock, terminalError);

        const changesFollower = new ChangesFollower(service, minimumTestParams);
        changesFollower.startOneOff().on('error', (err) => {
          try {
            expect(err.message).toEqual(terminalError.error.message);
          } finally {
            done();
          }
        });
      }
    );

    /**
     * Errors for all transient errors when not suppressing.
     */
    it.each(getTransientErrors())(
      'testStartOneOffTransientErrorsNoSuppression $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(
          service,
          minimumTestParams,
          0
        );
        changesFollower.startOneOff().on('error', (err) => {
          try {
            expect(err.message).toEqual(transientError.error.message);
          } finally {
            done();
          }
        });
      }
    );

    /**
     * Repeatedly encountering transient errors will terminate with an exception after a duration.
     */
    it.each(getTransientErrors())(
      'testStartOneOffTransientErrorsWithSuppressionDuration $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(
          service,
          minimumTestParams,
          100
        );
        changesFollower.startOneOff().on('error', (err) => {
          try {
            expect(err.message).toEqual(transientError.error.message);
          } finally {
            done();
          }
        });
      }
    );

    /**
     * Repeatedly encountering transient errors will complete successfully if not exceeding the duration.
     */
    it('testStartOneOffTransientErrorsWithSuppressionDurationCompletes', (done) => {
      const batches = 5;
      setBatchSize(3);
      mockAlternatingBatchesAndErrors(postChangesPromiseMock, batches);

      const changesFollower = new ChangesFollower(
        service,
        minimumTestParams,
        100
      );
      const stream = changesFollower.startOneOff();
      assertObjectNumbersOnChangesFollowerStream(stream, batches, done);
    });

    /**
     * Repeatedly encountering transient errors will keep trying indefinitely with max suppression.
     */
    it.each(getTransientErrors())(
      'testStartOneOffTransientErrorsMaxSuppressionDoesNotComplete $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(service, minimumTestParams);
        const stream = changesFollower.startOneOff();
        stream.on('data', (data) => {
          throw new Error(
            `There should not be data on the stream, but was: ${data}`
          );
        });
        stream.on('end', () => {
          done();
        });
        stopChangesFollowerAndAssertStreamDidNotError(
          changesFollower,
          stream,
          500
        );
      }
    );

    /**
     * Encountering transient errors will complete successfully with max suppression.
     */
    it('testStartOneOffTransientErrorsMaxSuppressionDoesComplete', (done) => {
      const batches = 4;
      setBatchSize(3);
      const mocks = generateRandomChangesResults(batches);
      for (let i = 0; i < batches; i += 1) {
        postChangesPromiseMock.mockResolvedValueOnce(mocks[i]);
      }

      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream = changesFollower.startOneOff();
      assertObjectNumbersOnChangesFollowerStream(stream, batches, done);
    });
    /**
     * The LISTEN case is covered in start tests because they won't stop by themselves.
     */
    it('testStop', (done) => {
      setBatchSize(100);
      service.postChanges = jest.fn(() =>
        Promise.resolve({
          result: {
            results: generateChangesResultItems(),
            pending: 5,
            lastSeq: generateSeq(512, '1'),
          },
        })
      );
      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream = changesFollower.startOneOff();
      let count = 0;
      stream.on('data', () => {
        count += 1;
      });
      stream.on('end', () => {
        try {
          expect(count).toBeGreaterThan(
            2 * ChangesResultIterableIterator.BATCH_SIZE + 1
          );
        } finally {
          done();
        }
      });
      stopChangesFollowerAndAssertStreamDidNotError(
        changesFollower,
        stream,
        2000 // Run for 2 seconds against an infinite stream
      );
    });
  });
  /**
   * Listening mode tests can terminate for errors, but not when changes complete so the helper stops the feed after the
   * duration when not an error case.
   */
  describe('LISTEN mode', () => {
    /**
     *  Completes successfully (after stopping) with some batches.
     */
    it('testStart', (done) => {
      setBatchSize(1000);
      mockPerpetualSupplier(postChangesPromiseMock);
      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream = changesFollower.start();
      let count = 0;
      stream.on('data', () => {
        count += 1;
      });
      stream.on('end', () => {
        try {
          expect(count).toBeGreaterThan(
            2 * ChangesResultIterableIterator.BATCH_SIZE + 1
          );
        } finally {
          done();
        }
      });
      stopChangesFollowerAndAssertStreamDidNotError(
        changesFollower,
        stream,
        2000 // Run for 2 seconds against an infinite stream
      );
    });

    /**
     * Errors for all terminal errors.
     */
    it.each(getTerminalErrors())(
      'testStartTerminalErrors $message',
      (terminalError, done) => {
        mockPostChangesError(postChangesPromiseMock, terminalError);

        const changesFollower = new ChangesFollower(service, minimumTestParams);
        changesFollower.start().on('error', (err) => {
          expect(err.message).toEqual(terminalError.error.message);
          done();
        });
      }
    );
    /**
     * Errors for all transient errors when not suppressing.
     */
    it.each(getTransientErrors())(
      'testStartTransientErrorsNoSuppression $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(
          service,
          minimumTestParams,
          0
        );
        changesFollower.start().on('error', (err) => {
          try {
            expect(err.message).toEqual(transientError.error.message);
          } finally {
            done();
          }
        });
      }
    );
    /**
     * Errors for all transient errors when exceeding the suppression duration.
     */
    it.each(getTransientErrors())(
      'testStartTransientErrorsWithSuppressionDurationErrorTermination $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(
          service,
          minimumTestParams,
          100
        );
        const startTime = Date.now();
        changesFollower.start().on('error', (err) => {
          try {
            // Assert that it ran longer than the suppression duration
            expect(Date.now() - startTime).toBeGreaterThanOrEqual(100);
            expect(err.message).toEqual(transientError.error.message);
          } finally {
            done();
          }
        });
      }
    );
    /**
     * Gets changes and can be stopped cleanly with transient errors when not exceeding the suppression duration.
     */
    it('testStartTransientErrorsWithSuppressionDurationAllChanges', (done) => {
      setBatchSize(3);
      const batches = 2;
      service.postChanges =
        mockAlternatingBatchErrorThenPerpetualSupplier(batches);

      const changesFollower = new ChangesFollower(
        service,
        minimumTestParams,
        100
      );
      const stream = changesFollower.start();
      let count = 0;
      stream.on('data', () => {
        count += 1;
      });
      stream.on('end', () => {
        try {
          expect(count).toEqual(
            batches * ChangesResultIterableIterator.BATCH_SIZE
          );
        } finally {
          done();
        }
      });
      stopChangesFollowerAndAssertStreamDidNotError(
        changesFollower,
        stream,
        1000
      );
    });
    /**
     * Keeps running with transient errors (until stopped cleanly) with max suppression.
     */
    it.each(getTransientErrors())(
      'testStartTransientErrorsWithMaxSuppression $message',
      (transientError, done) => {
        mockPostChangesError(postChangesPromiseMock, transientError);

        const changesFollower = new ChangesFollower(service, minimumTestParams);
        const stream = changesFollower.start();
        let count = 0;
        stream.on('data', () => {
          count += 1;
        });
        stream.on('end', () => {
          try {
            expect(count).toBe(0);
          } finally {
            done();
          }
        });
        stopChangesFollowerAndAssertStreamDidNotError(
          changesFollower,
          stream,
          500
        );
      }
    );
    /**
     * Runs through multiple transient errors with max suppression to receive changes until stopped.
     */
    it('testStartTransientErrorsWithMaxSuppressionAllChanges', (done) => {
      setBatchSize(3);
      const batches = 3;
      service.postChanges =
        mockAlternatingBatchErrorThenPerpetualSupplier(batches);

      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream = changesFollower.start();
      let count = 0;
      stream.on('data', () => {
        count += 1;
      });
      stream.on('end', () => {
        try {
          expect(count).toEqual(
            batches * ChangesResultIterableIterator.BATCH_SIZE
          );
        } finally {
          done();
        }
      });
      stopChangesFollowerAndAssertStreamDidNotError(
        changesFollower,
        stream,
        500
      );
    });
  });
  /**
   * Checks that a follower can only be started once.
   */
  it.each(getStates())(
    'testStateErrors $firstCallMode $secondCallMode',
    (modes, done) => {
      setBatchSize(3);
      mockPerpetualSupplier(postChangesPromiseMock);
      const changesFollower = new ChangesFollower(service, minimumTestParams);
      const stream =
        modes.firstCallMode === Mode.FINITE
          ? changesFollower.startOneOff()
          : changesFollower.start();
      stream.on('data', () => {}); // end will not be emitted unless the data is completely consumed
      stream.on('end', () => {
        done();
      });
      expect(() => {
        try {
          if (modes.secondCallMode === Mode.FINITE) {
            changesFollower.startOneOff();
          } else {
            changesFollower.start();
          }
        } finally {
          changesFollower.stop();
        }
      }).toThrow('Cannot start a feed that has already started.');
    }
  );
  /**
   * Checks that setting a limit terminates the stream early for both modes and limits smaller, the same and larger than the default
   * batch size.
   */
  it.each(getModesAndLimits(50))(
    'testLimit $mode $limit',
    (modeAndLimit, done) => {
      // Use a batch size of 50 for speed.
      // Note size also passed to test parameter generator.
      setBatchSize(50);
      postChangesPromiseMock.mockImplementation(
        mockPerpetualSupplierRespectingLimit
      );
      const changesFollower = new ChangesFollower(service, {
        limit: modeAndLimit.limit,
        ...minimumTestParams,
      });
      const stream =
        modeAndLimit.mode === Mode.FINITE
          ? changesFollower.startOneOff()
          : changesFollower.start();
      let count = 0;
      stream.on('data', () => {
        count += 1;
      });
      stream.on('end', () => {
        try {
          expect(count).toEqual(modeAndLimit.limit);
        } finally {
          done();
        }
      });
    }
  );
  /**
   * Checks that setting includeDocs forces a calculation of batch size and asserts the size.
   *
   * Mocks a DB of 500_000 docs of 523 bytes each to give an expected batch size of 5125
   *
   * 523 bytes + 500 bytes of changes overhead = 1023 bytes
   * 5 MiB / 1023 bytes = 5125 docs per batch (rounded down)
   */
  it('testBatchSize', (done) => {
    const docCount = 500000;

    getDatabaseInformationPromiseMock.mockImplementation(() =>
      Promise.resolve({
        result: {
          docCount,
          sizes: { external: docCount * 523 },
        },
      })
    );
    const batches = 1;
    const mocks = generateRandomChangesResults(batches);
    for (let i = 0; i < batches; i += 1) {
      postChangesPromiseMock.mockResolvedValueOnce(mocks[i]);
    }
    const changesFollower = new ChangesFollower(
      service,
      {
        includeDocs: true,
        ...minimumTestParams,
      },
      0 // Use no error tolerance
    );
    const stream = changesFollower.startOneOff();
    stream.on('data', () => {}); // end will not be emitted unless the data is completely consumed
    stream.on('end', () => {
      try {
        expect(postChangesPromiseMock.mock.lastCall[0].limit).toBe(5125);
      } finally {
        done();
      }
    });
  });
  /**
   * Checks that setting includeDocs forces a calculation of batch size and asserts the size.
   *
   * Mocks a DB with one doc and nearly 5 MB of size. The batch calculation will be 0, but
   * a minimum batch size of 1 should be applied.
   *
   */
  it('testBatchSizeMin', (done) => {
    const docCount = 1;

    getDatabaseInformationPromiseMock.mockImplementation(() =>
      Promise.resolve({
        result: {
          docCount,
          sizes: { external: 5 * 1024 * 1024 - 1 },
        },
      })
    );
    const batches = 1;
    const mocks = generateRandomChangesResults(batches);
    for (let i = 0; i < batches; i += 1) {
      postChangesPromiseMock.mockResolvedValueOnce(mocks[i]);
    }
    const changesFollower = new ChangesFollower(
      service,
      {
        includeDocs: true,
        ...minimumTestParams,
      },
      0 // Use no error tolerance
    );
    const stream = changesFollower.startOneOff();
    stream.on('data', () => {}); // end will not be emitted unless the data is completely consumed
    stream.on('end', () => {
      try {
        expect(postChangesPromiseMock.mock.lastCall[0].limit).toBe(1);
      } finally {
        done();
      }
    });
  });
  it('testBatchSizeLimit', (done) => {
    const docCount = 500000;

    getDatabaseInformationPromiseMock.mockImplementation(() =>
      Promise.resolve({
        result: {
          docCount,
          sizes: { external: docCount * 523 },
        },
      })
    );
    const batches = 1;
    const mocks = generateRandomChangesResults(batches);
    for (let i = 0; i < batches; i += 1) {
      postChangesPromiseMock.mockResolvedValueOnce(mocks[i]);
    }
    const changesFollower = new ChangesFollower(
      service,
      {
        includeDocs: true,
        limit: 1000,
        ...minimumTestParams,
      },
      0 // Use no error tolerance
    );
    const stream = changesFollower.startOneOff();
    stream.on('data', () => {}); // end will not be emitted unless the data is completely consumed
    stream.on('end', () => {
      try {
        expect(postChangesPromiseMock.mock.lastCall[0].limit).toBe(1000);
      } finally {
        done();
      }
    });
  });
});
