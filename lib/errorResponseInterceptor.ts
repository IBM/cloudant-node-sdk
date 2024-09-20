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

export function errorResponseInterceptor(axiosError) {
  if (
    axiosError.response && // must have a response
    axiosError.response.status >= 400 &&
    // must have data:
    axiosError.response.data &&
    // must be a JSON
    // which also implies Content-Type starts with application/json:
    axiosError.config.responseType === 'json' &&
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
      // Map x-couch-request-id if available to the trace field
      const trace = axiosError.response.headers['x-couch-request-id'];
      if (trace) {
        // Trace should be omitted if there is no value
        axiosError.response.data.trace = trace;
      }
    }
  }

  return Promise.reject(axiosError);
}
