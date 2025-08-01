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

import { PassThrough, TransformCallback, TransformOptions } from 'node:stream';

export class Stream<T> extends PassThrough {
  constructor(opts?: TransformOptions) {
    super({
      ...opts,
      objectMode: true, // sets readableObjectMode and writableObjectMode to true
      highWaterMark: 1,
    });
  }

  push(chunk: T, encoding?: BufferEncoding): boolean {
    return super.push(chunk, encoding);
  }

  read(size?: number): T {
    return super.read(size);
  }

  _transform(chunk: T, encoding: BufferEncoding, callback: TransformCallback) {
    super._transform(chunk, encoding, callback);
  }
}
