/**
 * © Copyright IBM Corporation 2025. All Rights Reserved.
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
const {
  BasePageIterator,
} = require('../../../../cloudant/features/pagination/basePageIterator.ts');
const {
  SearchPageIterator,
} = require('../../../../cloudant/features/pagination/searchPageIterator.ts');
const { getClient } = require('../testDataProviders.js');
const {
  TestKeyPageIterator,
  TestBookmarkPageIterator,
  getRequiredTestParams,
} = require('./paginationTestHelper.ts');

const mockClient = getClient();

function getInvalidLimitCases() {
  return [
    {
      'name': 'params validation limit less than min',
      'limit': BasePageIterator.MIN_LIMIT - 1,
      'errorMsg': `The provided limit ${BasePageIterator.MIN_LIMIT - 1} is lower than the minimum page size value of ${BasePageIterator.MIN_LIMIT}.`,
    },
    {
      'name': 'params validation limit greater than max',
      'limit': BasePageIterator.MAX_LIMIT + 1,
      'errorMsg': `The provided limit ${BasePageIterator.MAX_LIMIT + 1} exceeds the maximum page size value of ${BasePageIterator.MAX_LIMIT}.`,
    },
  ];
}

function getValidLimitCases() {
  return [
    {
      'name': 'params validation limit is min',
      'limit': BasePageIterator.MIN_LIMIT,
    },
    {
      'name': 'params validation limit less than max',
      'limit': BasePageIterator.MAX_LIMIT - 1,
    },
    {
      'name': 'params validation limit is max',
      'limit': BasePageIterator.MAX_LIMIT,
    },
    {
      'name': 'params validation limit is undefined',
      'limit': undefined,
    },
    {
      'name': 'params validation limit is null',
      'limit': null,
    },
  ];
}

function getInvalidSearchParams() {
  return [
    { name: 'counts' },
    { name: 'group_field' },
    { name: 'group_limit' },
    { name: 'group_sort' },
    { name: 'ranges' },
  ];
}

describe('Params validation tests', () => {
  describe('KeyPagerIterator params validation tests', () => {
    it.each(getInvalidLimitCases())('$name', (test) => {
      const params = getRequiredTestParams();
      params.limit = test.limit;
      const t = () => new TestKeyPageIterator(mockClient, params);
      expect(t).toThrow(Error);
      expect(t).toThrow(test.errorMsg);
    });
    it.each(getValidLimitCases())('$name', (test) => {
      const params = getRequiredTestParams();
      params.limit = test.limit;
      expect(() => new TestKeyPageIterator(mockClient, params)).not.toThrow();
    });
    it('params validation errors for keys', () => {
      const params = getRequiredTestParams();
      params.keys = ['key1', 'key2'];
      const t = () => new TestKeyPageIterator(mockClient, params);
      expect(t).toThrow(Error);
      expect(t).toThrow(`The param 'keys' is invalid when using pagination.`);
    });
  });

  describe('BookmarkPagerIterator params validation tests', () => {
    it.each(getInvalidLimitCases())('$name', (test) => {
      const params = getRequiredTestParams();
      params.limit = test.limit;
      const t = () => new TestBookmarkPageIterator(mockClient, params);
      expect(t).toThrow(Error);
      expect(t).toThrow(test.errorMsg);
    });
    it.each(getValidLimitCases())('$name', (test) => {
      const params = getRequiredTestParams();
      params.limit = test.limit;
      expect(
        () => new TestBookmarkPageIterator(mockClient, params)
      ).not.toThrow();
    });
  });

  describe('Search params validation tests', () => {
    it.each(getInvalidSearchParams())(
      'params validation errors for facet value $name',
      (invalidParam) => {
        const params = getRequiredTestParams();
        params[invalidParam.name] = 'test value';
        const t = () => new SearchPageIterator(mockClient, params);
        expect(t).toThrow(Error);
        expect(t).toThrow(
          `The param '${invalidParam.name}' is invalid when using pagination.`
        );
      }
    );
  });
});
