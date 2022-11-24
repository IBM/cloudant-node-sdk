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
const { testParams } = require('./testParams.js');
const { getExpectedParams, testSeqNumber } = require('./testParams');
const { getParams } = require('./testDataProviders');
const {
  ChangesParamsHelper,
} = require('../../../cloudant/features/changesParamsHelper.ts');

describe('Test ChangesParamsHelper', () => {
  it.each(getParams(true))('testCloneOptions', (params) => {
    const paramsName = Object.keys(params)[0];
    const expected = getExpectedParams(params[paramsName]);
    expect(expected).not.toBeNull();
    const cloned = ChangesParamsHelper.cloneParams(expected);
    expect(cloned).not.toBe(expected);
    expect(cloned).toEqual(expected);
  });

  it.each(getParams(true))('testCloneOptionsWithNewLimit', (params) => {
    const paramsName = Object.keys(params)[0];
    const newLimit = 50;
    const original = params[paramsName];
    const expected = getExpectedParams({
      limit: newLimit,
      ...params[paramsName],
    });
    const newLimitParams = ChangesParamsHelper.cloneParams(
      original,
      undefined,
      newLimit
    );
    expect(newLimitParams).not.toBe(original);
    expect(newLimitParams).not.toEqual(original);
    expect(newLimitParams.limit).toEqual(newLimit);
    expect(newLimitParams).toEqual(expected);
  });

  it.each(getParams(true))('testCloneOptionsWithNewSince', (params) => {
    const paramsName = Object.keys(params)[0];
    const newSince = testSeqNumber;
    const original = params[paramsName];
    const expected = getExpectedParams({
      since: newSince,
      ...params[paramsName],
    });
    const newSinceParams = ChangesParamsHelper.cloneParams(original, newSince);
    expect(newSinceParams).not.toBe(original);
    expect(newSinceParams).not.toEqual(original);
    expect(newSinceParams.since).toEqual(newSince);
    expect(newSinceParams).toEqual(expected);
  });

  it.each(getParams(true))('testValidateOptionsValidCases', (params) => {
    const paramsName = Object.keys(params)[0];
    expect(() =>
      ChangesParamsHelper.validateParams(params[paramsName])
    ).not.toThrow(); // no error expected
  });

  it.each(getParams(false))('invalidOptions', (params) => {
    const paramsName = Object.keys(params)[0];
    const { expectedError } = testParams[paramsName];
    expect(() =>
      ChangesParamsHelper.validateParams(params[paramsName])
    ).toThrow(expectedError);
  });
});
