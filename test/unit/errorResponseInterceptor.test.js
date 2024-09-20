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

const assert = require('assert');
const nock = require('nock');
const { Writable } = require('node:stream');
const { pipeline } = require('node:stream/promises');
const { IncomingMessage } = require('http');
const { getClient } = require('./features/testDataProviders.js');
const {
  errorResponseInterceptor,
} = require('../../lib/errorResponseInterceptor.ts');

// Constants used by most of the test cases:
const TRACE = '338da230c5';
const DB_NAME = 'trial-db';
const DOC_ID = 'trial-doc';
const DOCUMENT_REQUEST = { db: DB_NAME, docId: DOC_ID };
const DB_URL = `http://localhost:5984/${DB_NAME}`;
const ERROR_CODE = 459; // not a common error code because nock is able to fail with that too

let service;
const numberOfBaseInterceptors = 1; // responseInterceptor from core exists already

function getCases() {
  return [
    {
      name: 'test_augment_error',
      mockResponse: { error: 'foo' },
      expectedResponse: {
        error: 'foo',
        errors: [{ message: 'foo', code: 'foo' }],
      },
      mockHeaders: undefined,
      expectedHeaders: { 'content-type': 'application/json' },
    },
    {
      name: 'test_augment_json_charset',
      mockResponse: { error: 'foo', reason: 'Bar.' },
      expectedResponse: {
        error: 'foo',
        reason: 'Bar.',
        errors: [{ code: 'foo', message: 'foo: Bar.' }],
        trace: TRACE,
      },
      mockHeaders: {
        'x-couch-request-id': TRACE,
        'Content-Type': 'application/json; charset=utf-8',
      },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json; charset=utf-8',
      },
    },
    {
      name: 'test_no_augment_stream',
      requestFunction: 'getDocumentAsStream',
      mockResponse: { error: 'foo', reason: 'Bar.' },
      // for now in Node we don't augment stream responses:
      expectedResponse: { error: 'foo', reason: 'Bar.' },
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_no_augment_success',
      responseCode: 200,
      mockResponse: {},
      expectedResponse: {},
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_no_augment_head',
      requestFunction: 'headDocument',
      // axios turns undefined HEAD response "bodies" to empty strings:
      expectedResponse: '',
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
      },
    },
    {
      name: 'test_no_augment_non_json',
      mockResponse: 'foo=Bar.',
      expectedResponse: 'foo=Bar.',
      mockHeaders: {
        'x-couch-request-id': TRACE,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/x-www-form-urlencoded',
      },
    },
    {
      name: 'test_no_augment_no_content_type',
      // body should not be a JSON otherwise content-type becames application/json automatically:
      mockResponse: 'fooBar',
      expectedResponse: 'fooBar',
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: { 'x-couch-request-id': TRACE },
    },
    {
      name: 'test_no_augment_no_error',
      mockResponse: { reason: 'Bar.' },
      expectedResponse: { reason: 'Bar.' },
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_no_augment_invalid_json',
      expectedResponseCode: -1, // error code will be undefined due to a SyntaxError
      mockResponse: '{"err',
      // response result is undefined here
      expectedResponse: undefined,
      // but the response message should have SyntaxError
      expectedResponseMessage: 'SyntaxError',
      mockHeaders: {
        'x-couch-request-id': TRACE,
        'Content-Type': 'application/json',
      },
      expectedHeaders: undefined,
    },
    {
      name: 'test_no_augment_no_error_no_header',
      mockResponse: { reason: 'Qux.', foo: 'bar' },
      expectedResponse: { reason: 'Qux.', foo: 'bar' },
      mockHeaders: undefined,
      // content-type is added to the GET request responses by nock
      expectedHeaders: { 'content-type': 'application/json' },
    },
    {
      name: 'test_augment_error_reason',
      mockResponse: { error: 'foo', reason: 'Bar.' },
      expectedResponse: {
        error: 'foo',
        reason: 'Bar.',
        errors: [{ code: 'foo', message: 'foo: Bar.' }],
        // `trace` is not added to the body because there were neither `trace` nor `x-couch-request-id`
      },
      mockHeaders: undefined,
      // content-type is added to the GET request responses by nock
      expectedHeaders: { 'content-type': 'application/json' },
    },
    {
      name: 'test_no_augment_id_only',
      mockResponse: {},
      expectedResponse: {
        // `errors` is not added to the body because there was no `error`
        // `trace` is not added to the body because there were neither `trace` nor `x-couch-request-id`
      },
      mockHeaders: { 'x-couch-request-id': TRACE },
      // content-type is added to the GET request responses by nock
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_augment_error_with_trace',
      mockResponse: { error: 'foo' },
      expectedResponse: {
        error: 'foo',
        errors: [{ message: 'foo', code: 'foo' }],
        trace: TRACE,
      },
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_augment_error_reason_with_trace',
      mockResponse: { error: 'foo', reason: 'Bar.' },
      expectedResponse: {
        error: 'foo',
        reason: 'Bar.',
        errors: [{ message: 'foo: Bar.', code: 'foo' }],
        trace: TRACE,
      },
      mockHeaders: {
        'x-couch-request-id': TRACE,
      },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_no_augment_existing_trace',
      // trace diffs from x-couch-request-id in header:
      mockResponse: { error: 'foo', reason: 'Bar.', trace: 'fooBar' },
      expectedResponse: { error: 'foo', reason: 'Bar.', trace: 'fooBar' },
      mockHeaders: {
        'x-couch-request-id': TRACE,
      },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_no_augment_existing_errors_no_id',
      mockResponse: {
        error: 'baz',
        reason: 'Qux.',
        errors: [{ code: 'foo', message: 'Bar.' }],
      },
      expectedResponse: {
        error: 'baz',
        reason: 'Qux.',
        errors: [{ code: 'foo', message: 'Bar.' }],
      },
      mockHeaders: undefined, // trace is not appended to the expected response
      expectedHeaders: {
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_augment_trace_existing_errors',
      mockResponse: {
        error: 'baz',
        reason: 'Qux.',
        errors: [{ code: 'foo', message: 'Bar.' }],
      },
      expectedResponse: {
        error: 'baz',
        reason: 'Qux.',
        errors: [{ code: 'foo', message: 'Bar.' }],
        trace: TRACE,
      },
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
    {
      name: 'test_augment_empty_reason_with_trace',
      mockResponse: {
        error: 'baz',
        reason: '',
      },
      expectedResponse: {
        error: 'baz',
        reason: '',
        errors: [{ code: 'baz', message: 'baz' }],
        trace: TRACE,
      },
      mockHeaders: { 'x-couch-request-id': TRACE },
      expectedHeaders: {
        'x-couch-request-id': TRACE,
        'content-type': 'application/json',
      },
    },
  ];
}

// Take the result stream from an error
// and convert it to a JSON object
async function getJsonErrorFromStreamError(streamError) {
  let data = '';
  await pipeline(
    streamError.result,
    new Writable({
      write: (c, e, cb) => {
        data += c;
        cb();
      },
    })
  );
  return JSON.parse(data);
}

describe('test errorResponseInterceptor', () => {
  beforeEach(() => {
    nock.cleanAll();
    service = getClient(); // new client at each run
  });

  it.each(getCases())('$name', async (test) => {
    // prepare request function name, response method, response code
    const requestFunction = test.requestFunction
      ? test.requestFunction
      : 'getDocument';
    const responseMethod = requestFunction.split(/(?=[A-Z])/)[0];
    const responseCode = test.responseCode ? test.responseCode : ERROR_CODE;
    // mock response
    nock(DB_URL)
      [responseMethod](`/${DOC_ID}`)
      .reply(responseCode, test.mockResponse, test.mockHeaders);
    let responseIsSaved = false;

    // declare variables for assertions
    let responseStatus;
    let responseHeaders;
    let responseResult;
    let responseMessage;
    let responseStack;

    await service[requestFunction](DOCUMENT_REQUEST)
      .then((response) => {
        responseStatus = response.status;
        responseHeaders = response.headers.toJSON();
        responseResult = response.result;
        responseIsSaved = true;
      })
      .catch(async (onrejected) => {
        if (!responseIsSaved) {
          responseStatus = onrejected.status;
          if (onrejected.headers) {
            responseHeaders = onrejected.headers.toJSON();
          }
          // Get JSON when result is a stream:
          if (onrejected.result instanceof IncomingMessage) {
            responseResult = await getJsonErrorFromStreamError(onrejected);
          } else {
            responseResult = onrejected.result;
          }
          responseMessage = onrejected.message;
          responseStack = onrejected.stack;
          responseIsSaved = true;
        }
      });
    // response was saved in either the then or the catch block:
    assert.ok(responseIsSaved);
    if (test.expectedResponseCode === -1) {
      // responseStatus is undefined for edge case test_no_augment_invalid_json:
      assert.equal(responseStatus, undefined);
    } else {
      assert.equal(responseStatus, responseCode);
    }
    assert.deepEqual(responseHeaders, test.expectedHeaders);
    assert.deepStrictEqual(responseResult, test.expectedResponse);
    if (test.expectedResponseMessage) {
      // check message includes SyntaxError for edge case test_no_augment_invalid_json:
      assert.ok(responseMessage.includes(test.expectedResponseMessage));
      assert.ok(!responseStack.includes('errorResponseInterceptor'));
    }
  });

  it('test_added', async () => {
    const expectedNumberOfResponseInterceptors = numberOfBaseInterceptors + 1;
    assert.strictEqual(
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers.length,
      expectedNumberOfResponseInterceptors
    );
    // check whether errorResponseInterceptor is set as a new interceptor for rejected responses
    const actualErrorResponseInterceptor =
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers[expectedNumberOfResponseInterceptors - 1].rejected;
    assert.deepStrictEqual(
      Object.getPrototypeOf(actualErrorResponseInterceptor),
      Object.getPrototypeOf(errorResponseInterceptor)
    );
  });
  it('test_added_via_configureService', async () => {
    // Before configureService:
    let expectedNumberOfResponseInterceptors = numberOfBaseInterceptors + 1;
    assert.strictEqual(
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers.length,
      expectedNumberOfResponseInterceptors
    );
    // check whether errorResponseInterceptor is set as a new interceptor for rejected responses
    let actualErrorResponseInterceptor =
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers[expectedNumberOfResponseInterceptors - 1].rejected;
    assert.deepStrictEqual(
      Object.getPrototypeOf(actualErrorResponseInterceptor),
      Object.getPrototypeOf(errorResponseInterceptor)
    );
    // get number of service response interceptors before configureService
    expectedNumberOfResponseInterceptors =
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers.length; // after configureService we should get the same number of interceptors

    service.configureService('apple'); // configureService overrides the interceptors as well

    // After configureService:
    assert.strictEqual(
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers.length,
      expectedNumberOfResponseInterceptors
    );
    // check whether errorResponseInterceptor is set as a new interceptor for rejected responses
    actualErrorResponseInterceptor =
      service.requestWrapperInstance.axiosInstance.interceptors.response
        .handlers[expectedNumberOfResponseInterceptors - 1].rejected;
    assert.deepStrictEqual(
      Object.getPrototypeOf(actualErrorResponseInterceptor),
      Object.getPrototypeOf(errorResponseInterceptor)
    );
  });
});
