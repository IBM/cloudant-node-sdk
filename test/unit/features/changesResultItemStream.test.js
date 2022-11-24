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

const { PassThrough, pipeline } = require('stream');
const {
  ChangesResultItemStream,
} = require('../../../cloudant/features/changesResultItemStream.ts');
const { generateChangesResultItems, generateSeq } = require('./testMocks');
const {
  ChangesFollower,
} = require('../../../cloudant/features/changesFollower.ts');
const { listenOnStreamEvents, getDefaultStreamEvents } = require('./testUtils');

describe('Test ChangesResultItemStream', () => {
  let producerStream;
  let consumerStream; // this is the ChangesResultItemStream

  let producerStreamEvents;
  let consumerStreamEvents;

  beforeEach(() => {
    producerStream = new PassThrough();
    producerStreamEvents = getDefaultStreamEvents();
    consumerStreamEvents = getDefaultStreamEvents();
    listenOnStreamEvents(producerStream, producerStreamEvents);
  });

  it('testObjectValidationDestroysBothStreams', (done) => {
    consumerStream = new ChangesResultItemStream();
    listenOnStreamEvents(consumerStream, consumerStreamEvents);

    // producerStream errors after consumerStream errors with validation error
    producerStream.on('close', () => {
      const errorMsg =
        'Parameter validation errors:\n' +
        '  Missing required parameters: last_seq, pending, results\n' +
        '  Found invalid parameters: not';
      expect(consumerStreamEvents).toEqual({
        closed: true,
        ended: false,
        finished: false,
        errored: errorMsg,
      });
      expect(producerStreamEvents).toEqual({
        closed: true,
        ended: false,
        finished: false,
        errored: errorMsg,
      });
      done();
    });
    pipeline(producerStream, consumerStream, () => {});
    producerStream.emit('data', { not: 'appropriate ChangesResult object' });
  });
  it('testWithoutLimit', (done) => {
    consumerStream = new ChangesResultItemStream();
    listenOnStreamEvents(consumerStream, consumerStreamEvents);

    let count = 0;
    consumerStream.on('data', () => {
      count += 1;
    });

    // consumerStream closes after producerStream is ended
    consumerStream.on('close', () => {
      expect(consumerStreamEvents).toEqual({
        closed: true,
        ended: true,
        finished: true,
        errored: null,
      });
      expect(producerStreamEvents).toEqual({
        closed: true,
        ended: true,
        finished: true,
        errored: null,
      });
      expect(count).toBe(ChangesFollower.BATCH_SIZE);
      done();
    });

    pipeline(producerStream, consumerStream, () => {});
    producerStream.emit('data', {
      results: generateChangesResultItems(),
      pending: 5,
      last_seq: generateSeq(512, '1'),
    });
    producerStream.end();
  });
});
