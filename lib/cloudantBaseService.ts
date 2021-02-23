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

import { Authenticator, BaseService, UserOptions } from 'ibm-cloud-sdk-core';
// eslint-disable-next-line node/no-unpublished-import
import { CookieJar } from 'tough-cookie';
import { CouchdbSessionAuthenticator } from '../auth';
import { getSdkHeaders } from './common';

/**
 * Cloudant specific service that extends the base service functions.
 *
 * Cloudant Service make it available to use CouchDB specific Session authentication
 * during service requests.
 */
export abstract class CloudantBaseService extends BaseService {
  /**
   * Configuration values to use Cloudant service.
   * @param {Authenticator} userOptions.authenticator CouchdbSessionAuthenticator object can be used
   *   to authenticate requests to the service.
   * @param {string} [userOptions.jar] When CouchdbSessionAuthenticator is the Authenticator, a Cookie Jar
   *   must be in use. So a new jar will be created, if there is no custom one.
   */
  constructor(userOptions: UserOptions) {
    if (userOptions.authenticator instanceof CouchdbSessionAuthenticator) {
      userOptions.jar = userOptions.jar || new CookieJar();
    }
    super(userOptions);
    this.configureSessionAuthenticator();
  }

  /**
   * Set the service URL to send requests to and
   * use the new service URL for CouchDB Session Authentication
   * to claim session token from.
   *
   * @param {string} url The base URL for the service.
   */
  public setServiceUrl(url: string): void {
    super.setServiceUrl(url);
    this.configureSessionAuthenticator();
  }

  /**
   * Configure the service using external configuration
   * Cloudant specific extensions:
   * - Apply the new base service options on CouchdbSessionAuthenticator.
   *
   * @param {string} serviceName The name of the service. Will be used to read from external
   * configuration.
   */
  protected configureService(serviceName: string): void {
    // Read external configuration and set as request defaults.
    super.configureService(serviceName);
    this.configureSessionAuthenticator();
  }

  /**
   * Turn request body compression on or off.
   * Cloudant specific extensions:
   * - Apply the gzip compression option on CouchdbSessionAuthenticator.
   * 
   * @param {boolean} setting Will turn it on if 'true', off if 'false'.
   */
  public setEnableGzipCompression(setting: boolean): void {
    // Read external configuration and set as request defaults.
    super.setEnableGzipCompression(setting);
    this.baseOptions.enableGzipCompression = setting;
    this.configureSessionAuthenticator();    
  }

  /**
   * In case of CouchdbSessionAuthenticator
   * the service options should be applied on it.
   */
  private configureSessionAuthenticator() {
    const auth: Authenticator = this.getAuthenticator();
    if (auth instanceof CouchdbSessionAuthenticator) {
      const serviceClass = this.constructor as typeof BaseService;
      const newHeaders = getSdkHeaders(
        serviceClass.DEFAULT_SERVICE_NAME,
        'v1',
        'authenticatorPostSession'
      );
      if (this.baseOptions.headers === undefined) {
        Object.assign(this.baseOptions, { 'headers': newHeaders });
      } else {
        Object.assign(this.baseOptions.headers, newHeaders);
      }
      (auth as CouchdbSessionAuthenticator).configure(this.baseOptions);
    }
  }
}
