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

import { getNewLogger } from 'ibm-cloud-sdk-core';
import { promisify } from 'node:util';
import { ChangesParamsHelper, Mode } from './changesParamsHelper';
import { default as CloudantV1, PostChangesParams } from '../v1';

enum TransientErrorSuppression {
  ALWAYS,
  NEVER,
  TIMER,
}

export class ChangesResultIterableIterator implements AsyncIterableIterator<CloudantV1.ChangesResult> {
  private readonly timeoutPromise = promisify(setTimeout);
  private readonly cancelToken = 'CloudantChangesIteratorCancel';
  private readonly client: CloudantV1;
  private readonly doneResult: IteratorResult<CloudantV1.ChangesResult> = {
    done: true,
    value: undefined,
  };
  private readonly errorTolerance?: number;
  private readonly logger = getNewLogger('cloudant-node-sdk');
  private readonly mode: Mode;
  private readonly promisedConfig: Promise<void>;
  private readonly transientErrorSuppression: TransientErrorSuppression;
  private readonly baseDelay: number = 100;
  private readonly expRetryGate: number = Math.floor(
    Math.log2(ChangesParamsHelper.LONGPOLL_TIMEOUT / this.baseDelay)
  );
  private cancel: (error?: Error) => void;
  private countDown: number;
  private inflight: Promise<any> = null;
  private params: PostChangesParams;
  // Default to "infinite"
  private pending: number = Number.MAX_VALUE;
  private since: string;
  private stopped: boolean = false;
  private successTimestamp: number;
  private retry: number = 0;
  /** @internal */
  static BATCH_SIZE = 10_000;

  constructor(
    client: CloudantV1,
    params: PostChangesParams,
    mode: Mode,
    errorTolerance?: number
  ) {
    this.client = client;
    this.params = params;
    this.mode = mode;
    this.errorTolerance = errorTolerance;
    if (this.params.limit !== undefined) {
      this.logger.debug(`Applying changes limit ${this.params.limit}`);
      this.countDown = this.params.limit;
    }

    if (this.errorTolerance === 0) {
      this.transientErrorSuppression = TransientErrorSuppression.NEVER;
      this.logger.debug('Not suppressing errors.');
    } else if (this.errorTolerance === Number.MAX_VALUE) {
      this.transientErrorSuppression = TransientErrorSuppression.ALWAYS;
      this.logger.debug('Maximum error suppression.');
    } else {
      this.transientErrorSuppression = TransientErrorSuppression.TIMER;
      this.logger.debug(`Suppress errors for ${this.errorTolerance} ms.`);
    }

    if (this.params.since === undefined) {
      this.since = this.mode === Mode.LISTEN ? 'now' : '0';
    } else {
      this.since = this.params.since;
    }

    this.promisedConfig = this.configure();
    this.successTimestamp = Date.now();
  }

  async configure() {
    if (this.params.includeDocs) {
      return this.client
        .getDatabaseInformation({
          db: this.params.db,
        })
        .then((info) => {
          if (
            info.result &&
            'docCount' in info.result &&
            info.result.docCount > 0 &&
            'sizes' in info.result &&
            'external' in info.result.sizes &&
            info.result.sizes.external > 0
          ) {
            // Calculate an average doc size + typical change content size
            // and try to keep each batch to be about 5 MB
            this.params.limit =
              Math.floor(
                (5 * 1024 * 1024) /
                  (info.result.sizes.external / info.result.docCount + 500)
              ) || 1;
          }
        });
    }
    this.params.limit = ChangesResultIterableIterator.BATCH_SIZE;
    return Promise.resolve();
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<CloudantV1.ChangesResult> {
    return this;
  }

  async return(value?: any): Promise<IteratorResult<CloudantV1.ChangesResult>> {
    this.logger.debug('Iterator return entry.');
    if (!this.stopped) {
      this.logger.debug('Setting stopped flag.');
      this.stopped = true;
      if (this.cancel) {
        this.logger.debug('Cancelling inflight requests.');
        this.cancel(new Error(this.cancelToken));
      }
    }
    this.logger.debug('Iterator return exiting done.');
    return this.doneResult;
  }

  async next(value?: any): Promise<IteratorResult<CloudantV1.ChangesResult>> {
    this.logger.debug('Iterator next entry.');
    // Stop the iterator if stopped is set to true.
    if (this.stopped) {
      this.logger.debug('Already stopped, iterator next exiting done.');
      return this.doneResult;
    }

    // Await the async config and also
    // yield to the event loop so our long-running requests don't enqueue
    // more long-running requests on the same microtask queue and
    // end up blocking I/O.
    await Promise.all([
      this.promisedConfig,
      new Promise((resolve) => {
        setImmediate(resolve);
        // eslint-disable-next-line no-useless-return
        return;
      }),
    ]);

    this.logger.debug('Making next request.');

    // Make a new cancellable promise that can race with the request
    // in case the follower is stopped.
    let resolveCancellable;
    const cancellable: Promise<CloudantV1.Response<CloudantV1.ChangesResult>> =
      new Promise((resolve, reject) => {
        resolveCancellable = resolve;
        this.cancel = reject;
      });
    return Promise.race([
      cancellable,
      this.client.postChanges(
        ChangesParamsHelper.cloneParams(
          this.params,
          this.mode,
          this.since,
          this.countDown && this.countDown < this.params.limit
            ? this.countDown
            : undefined
        )
      ),
    ])
      .then((response) => {
        this.logger.debug('Got next response.');

        // Reset the retry counter
        this.retry = 0;
        if (
          this.transientErrorSuppression === TransientErrorSuppression.TIMER
        ) {
          this.logger.debug('Setting new timestamp for timer suppression');
          this.successTimestamp = Date.now();
        }

        this.since = response.result.lastSeq;
        this.pending = response.result.pending;

        if (this.mode === Mode.FINITE && this.pending === 0) {
          this.logger.debug('No more changes pending, setting stopped flag.');
          this.stopped = true;
        }

        if (this.countDown !== undefined) {
          this.logger.debug('Decrementing limit.');
          this.countDown -= response.result.results.length;
          if (this.countDown <= 0) {
            this.logger.debug('Limit reached, setting stopped flag.');
            this.stopped = true;
          }
        }
        this.logger.debug('Iterator next exiting with result.');
        return { done: false, value: response.result };
      })
      .catch((err) => {
        this.logger.debug(`Caught error ${err.message}`);
        if (err.message === this.cancelToken) {
          this.logger.debug('Iterator next exiting cancelled.');
          return this.doneResult;
        }
        switch (this.transientErrorSuppression) {
          case TransientErrorSuppression.ALWAYS:
            break;
          case TransientErrorSuppression.TIMER:
            if (Date.now() < this.successTimestamp + this.errorTolerance) {
              break;
            }
            this.logger.debug('Error tolerance deadline exceeded.');
          // In the case the timer has been exceeded we want to throw so
          // fall through
          case TransientErrorSuppression.NEVER:
            this.logger.verbose(`ChangesResultStream stream: ${err.message}`);
            throw err;
          default:
            err.message =
              `${err.message}\nMeanwhile this other error happened: ` +
              `No implementation available for TransientErrorSuppression of ${this.transientErrorSuppression}.`;
            throw err;
        }
        switch (err.code) {
          case 400:
          case 401:
          case 403:
          case 404:
            // Terminal error, stop running
            this.logger.debug('Terminal error');
            this.logger.verbose(`ChangesResultStream stream: ${err.message}`);
            throw err;
          default: {
            // Note this includes Errors
            // which handles cases like disconnections and incomplete
            // bodies where we may have received a successful response
            // code, but couldn't e.g. parse the body
            this.logger.verbose(`Suppressing transient error ${err.message}.`);
            const emptyChangesResultPromise: IteratorResult<CloudantV1.ChangesResult> =
              {
                done: false,
                value: {
                  lastSeq: this.since,
                  pending: this.pending,
                  results: [],
                },
              };
            let expDelay: number;
            if (this.retry > this.expRetryGate) {
              // If we've exceeded the cap, use the timeout value
              expDelay = ChangesParamsHelper.LONGPOLL_TIMEOUT;
            } else {
              expDelay = 2 ** this.retry * this.baseDelay;
            }
            const delay: number = Math.round(Math.random() * expDelay) + 1;
            this.logger.debug(`Backing off for ${delay} ms.`);
            this.retry += 1;
            return this.timeoutPromise(delay).then(() => {
              this.logger.debug(`Iterator next exiting with empty result.`);
              return emptyChangesResultPromise;
            });
          }
        }
      })
      .finally(() => {
        this.logger.debug('Cleaning up cancellable.');
        this.cancel = null;
        // Resolve the cancellable to ensure clean up can happen
        resolveCancellable();
      });
  }
}
