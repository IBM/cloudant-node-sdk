/**
 * © Copyright IBM Corporation 2021. All Rights Reserved.
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

import { Authenticator, UserOptions, validateInput } from 'ibm-cloud-sdk-core';
import {
  SessionTokenManager,
  SessionTokenManagerOptions,
} from './sessionTokenManager';

/** Configuration options for CouchDB session authentication. */
export type CouchdbSessionAuthenticatorOptions = {
  /** The username to be used in CouchDB session authentication. */
  username: string;
  /** The password to be used in CouchDB session authentication. */
  password: string;
};

/**
 * The CouchdbSessionAuthenticator is used to get CouchDB session authentication information to
 *   requests.
 *
 * CouchDB Session Authenticator stores Authentication data in a Cookie Jar and
 * that will be used during a request.
 * The following token information are stored in the CookieJar.
 *
 *     Cookie-Content: AuthSession=<sessionToken>; Expires=<expirationDate>; Max-Age=<refreshmentTimeInSeconds>
 *                     Version=1; Path=/; HttpOnly; Secure
 *
 */
export class CouchdbSessionAuthenticator extends Authenticator {
  protected tokenManager: SessionTokenManager;
  protected requiredOptions: ['username', 'password'];
  private tokenOptions: SessionTokenManagerOptions;

  /**
   * Create a new CouchdbSessionAuthenticator instance.
   *
   * @param {object} options Configuration options for session authentication.
   * @param {string} options.username The username portion of session authentication.
   * @param {string} options.password The password portion of session authentication.
   * @throws {Error} The configuration options are not valid.
   */
  constructor(options: CouchdbSessionAuthenticatorOptions) {
    super();
    validateInput(options, this.requiredOptions);
    this.tokenOptions = Object.assign({}, options);
  }

  /**
   * Acquire a session token that will be stored in a Cookie Jar.
   * The same jar will be in use in the `request`.
   *
   * @param {object} requestOptions - The request to augment with authentication
   *   information.
   * @param {object.<string, string>} requestOptions.headers - The headers the
   *   authentication information will be added to.
   */
  public authenticate(requestOptions: object): Promise<void> {
    return this.tokenManager.getToken();
  }

  /**
   * Configure the TokenManager to use all the `request` settings
   * together with the basic credentials.
   *
   * @param {object} userOptions - Configuration values for a `request` service.
   */
  public configure(userOptions: UserOptions) {
    Object.assign(this.tokenOptions, userOptions);
    this.tokenManager = new SessionTokenManager(this.tokenOptions);
  }
}
