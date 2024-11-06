/**
 * © Copyright IBM Corporation 2024. All Rights Reserved.
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

const { pipeline } = require('node:stream/promises');
const { Writable, Readable } = require('node:stream');

export function errorResponseInterceptor(axiosError) {
  if (
    axiosError.response && // must have a response
    axiosError.response.status >= 400 &&
    // must have data:
    axiosError.response.data &&
    // must be a JSON request
    // which also implies Content-Type starts with application/json:
    (axiosError.config.responseType === 'json' ||
      // or a stream request with application/json
      // that has had the response converted to an object
      (axiosError.config.responseType === 'stream' &&
        axiosError.response.headers['content-type'].startsWith(
          'application/json'
        ) &&
        !(axiosError.response.data instanceof Readable))) &&
    // must be a valid JSON:
    // which also implies it is not a HEAD method:
    axiosError.response.data instanceof Object &&
    !axiosError.response.data.trace
  ) {
    // Map the error/reason if available
    // and not already have errors array:
    if (!axiosError.response.data.errors && axiosError.response.data.error) {
      const error = {
        code: axiosError.response.data.error,
        message: axiosError.response.data.error,
      };
      if (axiosError.response.data.reason) {
        error.message += `: ${axiosError.response.data.reason}`;
      }
      // Add the new error as part of an errors array.
      axiosError.response.data.errors = [error];
    }
    if (axiosError.response.data.errors) {
      // Map x-request-id or x-couch-request-id if available to the trace field
      const trace =
        axiosError.response.headers['x-request-id'] ||
        axiosError.response.headers['x-couch-request-id'];
      if (trace) {
        // Trace should be omitted if there is no value
        axiosError.response.data.trace = trace;
      }
    }
  }

  return Promise.reject(axiosError);
}

/**
 * Axios interceptor to convert errors for streaming cases into
 * JSON objects.
 *
 * This means users can handle rejections for AsStream cases in
 * the same way as normal error rejections and we can apply the
 * errorResponseInterceptor to augment the errors.
 *
 * @param axiosError
 * @returns rejected promise with the stream body transoformed
 */
export async function errorResponseStreamConverter(axiosError) {
  if (
    axiosError.response && // must have a response
    axiosError.response.status >= 400 &&
    // must have data:
    axiosError.response.data &&
    // Must be a JSON response
    axiosError.response.headers['content-type']?.startsWith(
      'application/json'
    ) &&
    // this is for streaming requests
    axiosError.config.responseType === 'stream' &&
    // must be a stream
    axiosError.response.data instanceof Readable
  ) {
    let data = '';
    await pipeline(
      axiosError.response.data,
      new Writable({
        write: (c, e, cb) => {
          data += c;
          cb();
        },
      })
    );
    try {
      axiosError.response.data = JSON.parse(data);
    } catch (e) {
      // JSON parse failure, just use the original
      // error stream as a string, matching axios behavior
      // for broken JSON
      axiosError.response.data = data;
    }
  }

  return Promise.reject(axiosError);
}
