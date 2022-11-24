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

const MockErrors = {
  TERMINAL_400: { error: { message: 'bad_request', code: 400 } },
  TERMINAL_401: { error: { message: 'unauthorized', code: 401 } },
  TERMINAL_403: { error: { message: 'forbidden', code: 403 } },
  TERMINAL_404: { error: { message: 'not_found', code: 404 } },
  TRANSIENT_429: { error: { message: 'too_many_requests', code: 429 } },
  TRANSIENT_500: { error: { message: 'internal_server_error', code: 500 } },
  TRANSIENT_502: { error: { message: 'BAD_GATEWAY', code: 502 } },
  TRANSIENT_503: { error: { message: 'service_unavailable', code: 503 } },
  TRANSIENT_504: { error: { message: 'GATEWAY_TIMEOUT', code: 504 } },
  // bad json is returned from sdk core as a 200, so it will appear as a resolved value
  TRANSIENT_BAD_JSON: {
    error: new Error(
      'Error processing HTTP response: SyntaxError: Unexpected end of JSON input'
    ),
  },
  TRANSIENT_IO: { error: { message: 'test bad IO' } },
};

function getTerminalErrors() {
  return [
    MockErrors.TERMINAL_400,
    MockErrors.TERMINAL_401,
    MockErrors.TERMINAL_403,
    MockErrors.TERMINAL_404,
  ];
}

function getTransientErrors() {
  return [
    MockErrors.TRANSIENT_429,
    MockErrors.TRANSIENT_500,
    MockErrors.TRANSIENT_503,
    MockErrors.TRANSIENT_504,
    MockErrors.TRANSIENT_BAD_JSON,
    MockErrors.TRANSIENT_IO,
  ];
}

function getErrors() {
  return getTerminalErrors().concat(getTransientErrors());
}

module.exports = {
  MockError: MockErrors,
  getTransientErrors,
  getTerminalErrors,
  getErrors,
};
