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

import { OutgoingHttpHeaders } from 'node:http';
import {
  getCurrentTime,
  TokenManager,
  UserOptions,
  validateInput,
} from 'ibm-cloud-sdk-core';

/** Configuration options for CouchDB session token retrieval. */
export interface SessionTokenManagerOptions extends UserOptions {
  /** The username portion of CouchDB session authentication. */
  username: string;
  /** The password portion of CouchDB session authentication. */
  password: string;
}

/**
 * Token Manager of CouchDB session token.
 *
 * The Token Manager performs basic auth with username and password
 * to acquire session tokens.
 */
export class SessionTokenManager extends TokenManager {
  protected requiredOptions: string[] = [
    'username',
    'password',
    'serviceUrl',
    'jar',
  ];

  private tokenName: string;

  private options: SessionTokenManagerOptions;

  /**
   * Create a new [[SessionTokenManager]] instance. For internal use by
   * CouchdbSessionAuthenticator only.
   *
   * @param {object} options Configuration options.
   * @param {string} options.username The username portion of CouchDB Session authentication.
   * @param {string} options.password The password portion of CouchDB Session authentication.
   * @param {string} options.serviceUrl The endpoint for session token requests.
   * @param {any} options.jar The Cookie jar for session token storage.
   * @param {boolean} [options.disableSslVerification] A flag that indicates
   *   whether verification of the token server's SSL certificate should be
   *   disabled or not.
   * @param {object<string, string>} [options.headers] Headers to be sent with every
   *   outbound HTTP requests to token services.
   * @constructor
   */
  constructor(options: SessionTokenManagerOptions) {
    super(options);

    validateInput(options, this.requiredOptions);

    this.options = options;
    this.tokenName = 'AuthSession';
  }

  /**
   * Only base service specific headers are in use.
   *
   * @param {OutgoingHttpHeaders} headers - the new set of headers as an object
   * @returns {Error}
   */
  // eslint-disable-next-line class-methods-use-this
  public setHeaders(headers: OutgoingHttpHeaders): void {
    const errMsg =
      'During CouchDB Session Authentication only `request` service headers are in use';
    throw new Error(errMsg);
  }

  /**
   * Request a session token using basic credentials.
   *
   * @returns {Promise}
   */
  protected requestToken(): Promise<any> {
    if (!this.options.headers) {
      this.options.headers = {};
    }
    // these cannot be overwritten
    const parameters = {
      options: {
        headers: this.options.headers,
        url: `${this.options.serviceUrl}/_session`,
        method: 'POST',
        body: {
          username: this.options.username,
          password: this.options.password,
        },
      },
    };
    return this.requestWrapperInstance.sendRequest(parameters);
  }

  /**
   * From the response parse and save session token into field `accessToken`.
   * Calculate expiration and refresh time from the received response
   * and store them in fields `expireTime` and `refreshTime`.
   *
   * @param tokenResponse - Response object from session token request
   * @private
   * @returns {void}
   */
  protected saveTokenInfo(tokenResponse): void {
    const sessionCookie = tokenResponse.headers['set-cookie'];
    if (!Array.isArray(sessionCookie)) {
      const err = 'Set-Cookie header not present in response';
      throw new Error(err);
    }
    let sessionToken = null;
    let expireTime = null;
    let refreshTime = null;
    for (let i = 0; i < sessionCookie.length && sessionToken == null; i += 1) {
      sessionToken = new RegExp('AuthSession=([^;]*);').exec(sessionCookie[i]);
      if (sessionToken != null) {
        expireTime = new RegExp('.*Expires=([^;]*);').exec(sessionCookie[i]);
        refreshTime = new RegExp('.*Max-Age=([^;]*);').exec(sessionCookie[i]);
      }
    }
    if (sessionToken == null) {
      const err = 'Session token not present in response';
      throw new Error(err);
    }
    [, this.accessToken] = sessionToken;
    const fractionOfTtl = 0.8;
    if (expireTime == null) {
      if (refreshTime == null) {
        this.expireTime = 0;
        this.refreshTime = 0;
      } else {
        this.expireTime = Number(refreshTime[1]) + getCurrentTime();
        this.refreshTime =
          Number(refreshTime[1]) * fractionOfTtl + getCurrentTime();
      }
    } else {
      // Store expire time in seconds
      this.expireTime = Date.parse(expireTime[1]) / 1000;
      // Set refresh time from the expire time
      const timeToLive = this.expireTime - getCurrentTime();
      this.refreshTime = this.expireTime - timeToLive * (1.0 - fractionOfTtl);
    }
  }
}
