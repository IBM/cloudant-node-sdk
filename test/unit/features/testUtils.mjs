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

/* eslint-disable no-param-reassign */
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function listenOnStreamEvents(stream, events) {
  stream.on('end', () => {
    events.ended = true;
  });
  stream.on('finish', () => {
    events.finished = true;
  });
  stream.on('error', (err) => {
    events.errored = err.message;
  });
  stream.on('close', () => {
    events.closed = true;
  });
}

function getDefaultStreamEvents() {
  return {
    closed: false,
    ended: false,
    finished: false,
    errored: null,
  };
}

module.exports = {
  delay,
  listenOnStreamEvents,
  getDefaultStreamEvents,
};
