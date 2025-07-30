/**
 * © Copyright IBM Corporation 2021, 2022. All Rights Reserved.
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
import { Cookie, CookieJar, Store } from 'tough-cookie';
import {
  SessionTokenManager,
  SessionTokenManagerOptions,
} from './sessionTokenManager';

interface SessionCookieJar extends CookieJar {
  cloudantPatch: boolean;
  store: Store;
}

interface SessionCookie extends Cookie {
  cloudantPatchUpdateTime: Date;
}

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

  static readonly AUTHTYPE_COUCHDB_SESSION = 'COUCHDB_SESSION';

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
    this.tokenOptions = { ...options };
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
    // Merge the options
    Object.assign(this.tokenOptions, userOptions);

    // START monkey patch for https://github.com/salesforce/tough-cookie/issues/154
    // Check if we've already patched the jar
    const cookieJar = this.tokenOptions.jar as SessionCookieJar;
    if (cookieJar && !cookieJar.cloudantPatch) {
      // Set the patching flag
      cookieJar.cloudantPatch = true;
      // Replace the store's updateCookie function with one that applies a patch to newCookie
      const originalUpdateCookieFn = cookieJar.store.updateCookie;
      cookieJar.store.updateCookie = function updateCookie(
        oldCookie,
        newCookie: SessionCookie,
        cb
      ) {
        // Add current time as an update timestamp to the newCookie
        newCookie.cloudantPatchUpdateTime = new Date();
        // Replace the cookie's expiryTime function with one that uses cloudantPatchUpdateTime
        // in place of creation time to check the expiry.
        const originalExpiryTimeFn = newCookie.expiryTime;
        newCookie.expiryTime = function expiryTime(now) {
          // The original expiryTime check is relative to a time in this order:
          // 1. supplied now argument
          // 2. this.creation (original cookie creation time)
          // 3. current time
          // This patch replaces 2 with an expiry check relative to the cloudantPatchUpdateTime if set instead of
          // the creation time by passing it as the now argument.
          return originalExpiryTimeFn.call(
            newCookie,
            newCookie.cloudantPatchUpdateTime || now
          );
        };
        // Finally, delegate back to the original update function or the fallback put (which is set by Cookie
        // when an update function is not present on the store). Since we always set an update function for our
        // patch we need to also provide that fallback.
        if (originalUpdateCookieFn) {
          originalUpdateCookieFn.call(
            cookieJar.store,
            oldCookie,
            newCookie,
            cb
          );
        } else {
          cookieJar.store.putCookie.call(cookieJar.store, newCookie, cb);
        }
      };
    }
    // END cookie jar monkey patch

    // Set the token manager
    this.tokenManager = new SessionTokenManager(this.tokenOptions);
  }

  /**
   * Returns the authenticator's type ('COUCHDB_SESSION').
   *
   * @returns a string that indicates the authenticator's type
   */
  public override authenticationType(): string {
    return CouchdbSessionAuthenticator.AUTHTYPE_COUCHDB_SESSION;
  }
}
