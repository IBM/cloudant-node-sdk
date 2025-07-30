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
import { pipeline, Readable } from 'node:stream';
import CloudantV1, {
  ChangesResultItem,
  PostChangesParams,
  ChangesResult,
} from '../v1';
import Stream from './stream';
import ChangesParamsHelper from './changesParamsHelper';
import ChangesResultIterableIterator from './changesResultIterator';

/** @internal */
export enum Mode {
  FINITE,
  LISTEN,
}

/**
 * A helper for using the changes feed.
 *
 * There are two modes of operation:
 *  * {@link startOneOff} to fetch the changes from the supplied since sequence
 *    until there are no further pending changes.
 *  * {@link start} to fetch the changes from the supplied since sequence and
 *    then continuing to listen indefinitely for further new changes.
 *
 * The starting sequence ID can be changed for either mode by using
 * {@link CloudantV1.PostChangesParams.since}. By default when using:
 *  * {@link startOneOff} the feed will start from the beginning.
 *  * {@link start} the feed will start from "now".
 *
 * In either mode the {@link Stream} of changes can be terminated early by calling
 * {@link stop}.
 *
 * By default {@link ChangesFollower} will suppress transient errors indefinitely and
 * endeavour to run to completion or listen forever. For applications where that
 * behaviour is not desirable an alternate constructor is available where a
 * {@link errorTolerance} may be specified to limit the time since the last successful
 * response that transient errors will be suppressed.
 *
 * It should be noted that errors considered terminal, for example, the database not
 * existing or invalid credentials are never suppressed and will throw an exception
 * immediately.
 *
 * The {@link CloudantV1.PostChangesParams} model of changes feed options is used to configure
 * the behaviour of the {@link ChangesFollower}. However, a subset of the options are
 * invalid as they are configured internally by the implementation and will cause
 * an {@link Error} to be thrown if supplied. These invalid
 * options are:
 *  * {@link CloudantV1.PostChangesParams.descending}
 *  * {@link CloudantV1.PostChangesParams.feed}
 *  * {@link CloudantV1.PostChangesParams.heartbeat}
 *  * {@link CloudantV1.PostChangesParams.lastEventId}
 *    (use {@link CloudantV1.PostChangesParams.since} instead)
 *  * {@link CloudantV1.PostChangesParams.timeout}
 *
 *
 * Only the value of `_selector` is permitted for
 * the {@link CloudantV1.PostChangesParams.filter} option.
 * Selector based filters perform better than JS based filters and using one
 * of the alternative JS based
 * filter types will cause {@link ChangesFollower} to throw an {@link Error}.
 *
 * It should also be noted that the {@link CloudantV1.PostChangesParams.limit}
 * parameter will truncate the stream at the given number of changes in either
 * operating mode.
 *
 * The {@link ChangesFollower} requires the {@link CloudantV1} client to have
 * HTTP call and read timeouts of at least 1 minute. The default client
 * configuration has sufficiently long timeouts.
 */
export class ChangesFollower {
  /** @internal */
  static BATCH_SIZE = 10_000;

  // Initialization fields
  private readonly client: CloudantV1;

  private readonly params: PostChangesParams;

  private readonly errorTolerance?: number;

  private limit: number;

  private changesResultIterator: ChangesResultIterableIterator;

  /**
   * Create a new {@link ChangesFollower} using the supplied client and params that
   * suppress transient errors and retry for as long as the given `errorTolerance` duration.
   *
   * @param client - {@link CloudantV1} client instance to use to make requests
   * @param params - Changes feed params
   * @param errorTolerance - the duration to suppress errors, measured from the previous
   * successful request. Use `0` to disable error suppression and terminate this {@link ChangesFollower}
   * on any failed request.
   *
   * @throws {Error} if there are invalid params
   */
  constructor(
    client: CloudantV1,
    params: CloudantV1.PostChangesParams,
    errorTolerance?: number
  ) {
    // Validate supplied params
    ChangesParamsHelper.validateParams(params);
    this.limit = params.limit;
    // Setup with the required defaults and merges of user params
    this.params = ChangesParamsHelper.cloneParams(params);
    this.client = client;
    if (errorTolerance < 0) {
      throw new Error('Error tolerance duration must not be negative.');
    }
    // loose equality for null and undefined values
    if (errorTolerance == null) {
      this.errorTolerance = Number.MAX_VALUE;
    } else {
      this.errorTolerance = errorTolerance;
    }
    // Check the timeout is suitable
    const readTimeout = this.client.getTimeout();
    if (
      readTimeout > 0 &&
      readTimeout < ChangesParamsHelper.MIN_CLIENT_TIMEOUT
    ) {
      throw new Error(
        `To use ChangesFollower the client read timeout must be at least ${ChangesParamsHelper.MIN_CLIENT_TIMEOUT} ms. The client read timeout is ${readTimeout} ms.`
      );
    }
  }

  /**
   * Return all available changes and keep listening for new changes until reaching an end condition.
   *
   * The end conditions are:
   *  * a terminal error (e.g. unauthorized client).
   *  * transient errors occur for longer than the error suppression duration.
   *  * the number of changes received reaches the limit specified in the {@link CloudantV1.PostChangesParams} used to instantiate this {@link ChangesFollower}.
   *  * {@link stop} is called.
   *
   * The same change may be received more than once.
   *
   * @return {Stream} at least one {@link ChangesResultItem} per change
   * @throws {Error} if:
   *  * {@link start} or {@link startOneOff} was already called.
   *  * a terminal error or unsuppressed transient error is received from the service when fetching changes.
   */
  start(): Stream<ChangesResultItem> {
    return this.run(Mode.LISTEN);
  }

  /**
   * Return all available changes until there are no further changes pending or
   * reaching an end condition.
   *
   * The end conditions are:
   *  * a terminal error (e.g. unauthorized client).
   *  * transient errors occur for longer than the error suppression duration.
   *  * the number of changes received reaches the limit specified in the {@link CloudantV1.PostChangesParams} used to instantiate this {@link ChangesFollower}.
   *  * {@link stop} is called.
   *
   * The same change may be received more than once.
   *
   * @return {Stream} at least one {@link ChangesResultItem} per change
   * @throws {Error} if:
   *  * {@link start} or {@link startOneOff} was already called.
   *  * a terminal error or unsuppressed transient error is received from the service when fetching changes.
   */
  startOneOff(): Stream<ChangesResultItem> {
    return this.run(Mode.FINITE);
  }

  /**
   * Stop this {@link ChangesFollower}.
   *
   * @throws {Error} if {@link start}
   * or {@link startOneOff} was not called first
   */
  stop() {
    if (this.changesResultIterator) {
      this.changesResultIterator.return();
    } else {
      throw new Error('Cannot stop a feed that is not running.');
    }
  }

  /**
   *
   * @param mode the mode in which to run the ChangesFollower
   * @private
   */
  private run(mode: Mode) {
    if (!this.changesResultIterator) {
      return this.createChangesResultItemsStream(mode);
    } else {
      throw new Error('Cannot start a feed that has already started.');
    }
  }

  private createChangesResultItemsStream(mode: Mode) {
    this.changesResultIterator = new ChangesResultIterableIterator(
      this.client,
      ChangesParamsHelper.cloneParams(this.params, mode),
      mode,
      this.errorTolerance
    );

    let resultsIterator = Readable.from(
      pipeline(
        Readable.from(this.changesResultIterator),
        new Stream<Array<ChangesResultItem>>(),
        () => {}
      )
    ).flatMap((item: ChangesResult) => item.results);

    return pipeline(resultsIterator, new Stream<ChangesResultItem>(), () => {});
  }
}
