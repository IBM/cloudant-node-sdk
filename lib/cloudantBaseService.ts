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

// eslint-disable-next-line max-classes-per-file
import { Authenticator, BaseService, UserOptions } from 'ibm-cloud-sdk-core';
import { CookieJar } from 'tough-cookie';
import { CouchdbSessionAuthenticator } from '../auth';
import { getSdkHeaders } from './common';

/**
 * Set default timeout to 2.5 minutes (= 150000ms)
 */
const READ_TIMEOUT = 150000;

/**
 * Set Validation rules
 */
const DocumentOperations = [
  'deleteDocument',
  'getDocument',
  'headDocument',
  'putDocument',
  'deleteAttachment',
  'getAttachment',
  'headAttachment',
  'putAttachment',
];

const AttachmentOperations = [
  'deleteAttachment',
  'getAttachment',
  'headAttachment',
  'putAttachment',
];

const docIdRule = {
  pathSegment: 'doc_id',
  errorParameterName: 'Document ID',
  operationIds: DocumentOperations,
};

const attIdRule = {
  pathSegment: 'attachment_name',
  errorParameterName: 'Attachment name',
  operationIds: AttachmentOperations,
};

const validationRules = [docIdRule, attIdRule];
const rulesByOperation = {};
validationRules.forEach((rule) => {
  rule.operationIds.forEach((operationId) => {
    if (!(operationId in rulesByOperation)) {
      rulesByOperation[operationId] = [];
    }
    rulesByOperation[operationId].push(rule);
  });
});
Object.freeze(rulesByOperation);

/**
 * --- Classes ---
 */

/**
 * Extend Error interface to access the proper Error definition.
 */
class InvalidArgumentValueError extends Error {
  code?: string;
}

/**
 * Cloudant specific service that extends the base service functions.
 *
 * Cloudant Service make it available to use CouchDB specific Session authentication
 * during service requests.
 */
export default abstract class CloudantBaseService extends BaseService {
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
    if (!('timeout' in userOptions)) {
      userOptions.timeout = READ_TIMEOUT;
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

  /**
   * Extend createRequest to handle document and attachment validation.
   */
  protected createRequest(parameters: any): Promise<any> {
    let operationId = null;
    if ('X-IBMCloud-SDK-Analytics' in parameters.defaultOptions.headers) {
      // Extract operation id
      const analyticsHeader =
        parameters.defaultOptions.headers['X-IBMCloud-SDK-Analytics'];
      [, operationId] = analyticsHeader
        .split(';')
        .find((element) => element.startsWith('operation_id'))
        .split('=');
      // Check if operation id exists in rulesByOperation object
      if (
        operationId != null &&
        Object.keys(rulesByOperation).includes(operationId)
      ) {
        const violatedRules = rulesByOperation[operationId].filter((rule) => {
          // get the path segment e.g. doc_id from the response's path object
          if (
            'path' in parameters.options &&
            rule.pathSegment in parameters.options.path
          ) {
            const segmentToValidate = parameters.options.path[rule.pathSegment];
            return segmentToValidate.startsWith('_');
          }
          return false;
        });
        if (violatedRules.length > 0) {
          const err = new InvalidArgumentValueError(
            `${violatedRules[0].errorParameterName} ${
              parameters.options.path[violatedRules[0].pathSegment]
            } starts with the invalid _ character.`
          );
          err.code = 'ERR_INVALID_ARG_VALUE';
          return Promise.reject(err);
        }
      }
    }
    return super.createRequest(parameters);
  }
}
