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

import { Stream } from './stream';
import { TransformCallback } from 'node:stream';
import { validateParams } from 'ibm-cloud-sdk-core';
import CloudantV1 from '../v1';

export class ChangesResultItemStream extends Stream<CloudantV1.ChangesResultItem> {
  _transform(
    chunk: CloudantV1.ChangesResult,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    const validationError = this.getValidationError(chunk);
    if (validationError !== null) {
      this.destroy(validationError);
    } else {
      for (let result of chunk.results) {
        this.push(result);
      }
    }
    callback();
  }

  private getValidationError(params) {
    const requiredParams = ['lastSeq', 'pending', 'results'];
    return validateParams(params, requiredParams, requiredParams);
  }
}
