/**
 * © Copyright IBM Corporation 2023. All Rights Reserved.
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
import { ChangesFollower, CloudantV1 } from '../../../../../index';
const { Writable } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const client = CloudantV1.newInstance();
const changesParams = {
  db: 'example'
};
const changesFollower = new ChangesFollower(client, changesParams);
const changesItemsStream = changesFollower.start();

const destinationStream = new Writable({
  objectMode: true,
  write(changesItem, _, callback) {
    // Option 1: call stop after some condition
    // Note that at least one item
    // must be returned to reach to this point.
    // Additional changes may be processed before the iterator stops.
    changesFollower.stop();
    callback();
  }
});

pipeline(changesItemsStream, destinationStream)
  .then(() =>{
    console.log('Stopped');  
  })
  .catch((err) => {
    console.log(err);
  });

// Option 2: call stop method when you want to end the continuous loop from
// outside the pipeline.
// Normally the call would be made from some other application function
// executing later.
// For example, stop the changesFollower after 1 minute of listening for changes
setTimeout(() => {
  changesFollower.stop();
}, 60000);
