/**
 * © Copyright IBM Corporation 2020, 2022. All Rights Reserved.
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
const { CloudantV1 } = require('../../index.ts');

const cloudant = CloudantV1.newInstance({
  serviceName: 'server',
});
const dbName = process.env.DATABASE_NAME || 'stores';

describe('validate', () => {
  it('delete invalid _design', () =>
    cloudant
      .deleteDocument({
        db: dbName,
        docId: '_design',
      })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Document ID _design starts with the invalid _ character.'
        );
      }));

  it('get invalid _design document ID', () =>
    cloudant
      .getDocument({
        db: dbName,
        docId: '_design',
      })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Document ID _design starts with the invalid _ character.'
        );
      }));

  it('get invalid _design document ID as stream', () =>
    cloudant
      .getDocumentAsStream({
        db: dbName,
        docId: '_design',
      })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Document ID _design starts with the invalid _ character.'
        );
      }));

  it('get invalid _att1 attachment name', () =>
    cloudant
      .getAttachment({
        db: dbName,
        docId: 'doc1',
        attachmentName: '_att1',
      })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Attachment name _att1 starts with the invalid _ character.'
        );
      }));

  it('head invalid _design document ID', () =>
    cloudant
      .headDocument({
        db: dbName,
        docId: '_design',
      })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Document ID _design starts with the invalid _ character.'
        );
      }));

  it('put invalid _design document ID', () =>
    cloudant
      .putDocument({ db: dbName, docId: '_design', document: {} })
      .then(() => {
        assert.fail('should not have response');
      })
      .catch((err) => {
        expect(err.message).toBe(
          'Document ID _design starts with the invalid _ character.'
        );
      }));
});
