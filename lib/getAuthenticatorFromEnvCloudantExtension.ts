/**
 * © Copyright IBM Corporation 2020. All Rights Reserved.
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

import {
  Authenticator,
  getAuthenticatorFromEnvironment,
  readExternalSources,
} from 'ibm-cloud-sdk-core';
import { CouchdbSessionAuthenticator } from '../auth';

const COUCHDB_SESSION_AUTH_TYPE = 'couchdb_session';

/**
 * Extend the creating Authenticator from external configuration function with
 * CouchDB specific Session Authenticator possibility.
 *
 * @param {string} serviceName The service name prefix.
 *
 */
export function getAuthenticatorFromEnvCloudantExtension(
  serviceName: string
): Authenticator {
  let auth;
  const credentials = readExternalSources(serviceName);
  if (
    (credentials.authType || '').toLowerCase() === COUCHDB_SESSION_AUTH_TYPE
  ) {
    auth = new CouchdbSessionAuthenticator(credentials);
  } else {
    auth = getAuthenticatorFromEnvironment(serviceName);
  }
  return auth;
}
