/**
 * © Copyright IBM Corporation 2020, 2021. All Rights Reserved.
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
import assert from 'node:assert';
import { BasicAuthenticator } from 'ibm-cloud-sdk-core';
import getAuthenticatorFromEnvCloudantExtension
  from '../../lib/getAuthenticatorFromEnvCloudantExtension';
import { CouchdbSessionAuthenticator } from '../../index';

describe('Test getAuthenticatorFromEnvCloudantExtension', () => {
  it('Create couchdb_session authenticator', () => {
    process.env.TEST1_AUTH_TYPE = 'couchdb_session';
    process.env.TEST1_USERNAME = 'username';
    process.env.TEST1_PASSWORD = 'password';
    const auth = getAuthenticatorFromEnvCloudantExtension('test1');

    assert.ok(auth instanceof CouchdbSessionAuthenticator);
    assert.strictEqual(auth.tokenOptions.username, 'username');
    assert.strictEqual(auth.tokenOptions.password, 'password');
  });

  it('Create couchdb_session authenticator with non-standard casing', () => {
    process.env.TEST2_AUTH_TYPE = 'coucHdb_seSsion';
    process.env.TEST2_USERNAME = 'username';
    process.env.TEST2_PASSWORD = 'password';
    const auth = getAuthenticatorFromEnvCloudantExtension('test2');

    assert.ok(auth instanceof CouchdbSessionAuthenticator);
  });

  it('Use invalid authenticator type', () => {
    process.env.TEST3_AUTH_TYPE = 'basic';
    process.env.TEST3_USERNAME = 'username';
    process.env.TEST3_PASSWORD = 'password';
    const auth = getAuthenticatorFromEnvCloudantExtension('test3');
    assert.ok(auth instanceof BasicAuthenticator);
  });

  it('Create couchdb_session authenticator with env auth type alias', () => {
    process.env.TEST4_AUTHTYPE = 'couchdb_session';
    process.env.TEST4_USERNAME = 'username';
    process.env.TEST4_PASSWORD = 'password';
    const auth = getAuthenticatorFromEnvCloudantExtension('test4');

    assert.ok(auth instanceof CouchdbSessionAuthenticator);
    assert.strictEqual(auth.tokenOptions.username, 'username');
    assert.strictEqual(auth.tokenOptions.password, 'password');
  });
});
