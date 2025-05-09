/**
 * (C) Copyright IBM Corp. 2025.
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

import extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
  Authenticator,
  BaseService,
  SDKLogger,
  UserOptions,
  getAuthenticatorFromEnvironment,
  getNewLogger,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';
import CloudantBaseService from '../lib/cloudantBaseService';
import getAuthenticatorFromEnvCloudantExtension from '../lib/getAuthenticatorFromEnvCloudantExtension';

/* eslint @typescript-eslint/no-use-before-define: 0 */
/* eslint max-classes-per-file: 0 */

/**
 * NoSQL database based on Apache CouchDB
 *
 * See: https://cloud.ibm.com/docs/services/Cloudant/
 */

class CloudantV1 extends CloudantBaseService {
  static _logger: SDKLogger = getNewLogger('CloudantV1');

  static DEFAULT_SERVICE_URL: string = 'https://~replace-with-cloudant-host~.cloudantnosqldb.appdomain.cloud';

  static DEFAULT_SERVICE_NAME: string = 'cloudant';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CloudantV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {CloudantV1}
   */

  public static newInstance(options: UserOptions): CloudantV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvCloudantExtension(options.serviceName);
    }
    const service = new CloudantV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a CloudantV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CloudantV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    // enable gzip compression of request bodies
    options.enableGzipCompression = true;
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(CloudantV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * server
   ************************/

  /**
   * Retrieve server instance information.
   *
   * When you access the root of an instance, IBM Cloudant returns meta-information about the instance. The response
   * includes a JSON structure that contains information about the server, including a welcome message and the server's
   * version.
   *
   * **Tip:**  The authentication for this endpoint is only enforced when using IAM.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ServerInformation>>}
   */
  public getServerInformation(
    params?: CloudantV1.GetServerInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.ServerInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getServerInformation');

    const parameters = {
      options: {
        url: '/',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ServerInformation.deserialize,
    );
  }

  /**
   * Retrieve provisioned throughput capacity information.
   *
   * View the amount of provisioned throughput capacity that is allocated to an IBM Cloudant instance and what is the
   * target provisioned throughput capacity.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>>}
   */
  public getCapacityThroughputInformation(
    params?: CloudantV1.GetCapacityThroughputInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCapacityThroughputInformation');

    const parameters = {
      options: {
        url: '/_api/v2/user/capacity/throughput',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CapacityThroughputInformation.deserialize,
    );
  }

  /**
   * Update the target provisioned throughput capacity.
   *
   * Sets the target provisioned throughput capacity for an IBM Cloudant instance. When target capacity is changed, the
   * current capacity asynchronously changes to meet the target capacity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.blocks - A number of blocks of throughput units. A block consists of 100 reads/sec, 50
   * writes/sec, and 5 global queries/sec of provisioned throughput capacity. Not available for some plans.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>>}
   */
  public putCapacityThroughputConfiguration(
    params: CloudantV1.PutCapacityThroughputConfigurationParams
  ): Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>> {
    const _params = { ...params };
    const _requiredParams = ['blocks'];
    const _validParams = ['blocks', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'blocks': _params.blocks,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putCapacityThroughputConfiguration');

    const parameters = {
      options: {
        url: '/_api/v2/user/capacity/throughput',
        method: 'PUT',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CapacityThroughputInformation.deserialize,
    );
  }

  /**
   * Retrieve one or more UUIDs.
   *
   * Requests one or more Universally Unique Identifiers (UUIDs) from the instance. The response is a JSON object that
   * provides a list of UUIDs.
   *
   * **Tip:**  The authentication for this endpoint is only enforced when using IAM.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.count] - Query parameter to specify the number of UUIDs to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.UuidsResult>>}
   */
  public getUuids(
    params?: CloudantV1.GetUuidsParams
  ): Promise<CloudantV1.Response<CloudantV1.UuidsResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['count', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'count': _params.count,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getUuids');

    const parameters = {
      options: {
        url: '/_uuids',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.UuidsResult.deserialize,
    );
  }
  /*************************
   * changes
   ************************/

  /**
   * Retrieve change events for all databases.
   *
   * **This endpoint is not available in IBM Cloudant.**
   *
   * Lists changes to databases, like a global changes feed. Types of changes include updating the database and creating
   * or deleting a database. Like the changes feed, the feed is not guaranteed to return changes in the correct order
   * and might repeat changes. Polling modes for this method work like polling modes for the changes feed.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.descending] - Query parameter to specify whether to return the documents in descending by
   * key order.
   * @param {string} [params.feed] - Query parameter to specify the changes feed type.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Off by default and only applicable for
   * `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be `true`
   * to use a value of `60000`.
   *
   * **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
   * environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
   * Instead, consider one of the following options:
   *   * Use the `timeout` parameter with a value that is compatible with your network environment.
   *   * Switch to scheduled usage of one of the non-continuous changes feed types
   *     (`normal` or `longpoll`).
   *   * Use TCP keepalive.
   * @param {number} [params.limit] - Query parameter to specify the number of returned documents to limit the result
   * to.
   * @param {number} [params.timeout] - Query parameter to specify the maximum period in milliseconds to wait for a
   * change before the response is sent, even if there are no results. Only applicable for `longpoll` or `continuous`
   * feeds. Default value is specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also
   * the default maximum timeout to prevent undetected dead connections.
   * @param {string} [params.since] - Query parameter to specify to start the results from the change immediately after
   * the given update sequence. Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DbUpdates>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public getDbUpdates(
    params?: CloudantV1.GetDbUpdatesParams
  ): Promise<CloudantV1.Response<CloudantV1.DbUpdates>> {
    CloudantV1._logger.warn('A deprecated operation has been invoked: getDbUpdates');
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['descending', 'feed', 'heartbeat', 'limit', 'timeout', 'since', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'descending': _params.descending,
      'feed': _params.feed,
      'heartbeat': _params.heartbeat,
      'limit': _params.limit,
      'timeout': _params.timeout,
      'since': _params.since,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDbUpdates');

    const parameters = {
      options: {
        url: '/_db_updates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DbUpdates.deserialize,
    );
  }

  /**
   * Query the database document changes feed.
   *
   * Requests the database changes feed in the same way as `GET /{db}/_changes` does. It is widely used with the
   * `filter` query parameter because it allows one to pass more information to the filter.
   *
   * ### Note
   *
   * Before using the changes feed read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-faq-using-changes-feed) to understand the limitations and
   * appropriate use cases.
   *
   * If you need to pass parameters to dynamically change the filtered content use the `_selector` filter type for
   * better performance and compatibility. The SDKs have full support for change requests using selector filters, but
   * don't support passing parameters to design document filters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string[]} [params.docIds] - Schema for a list of document IDs.
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {JsonObject} [params.selector] - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {string} [params.lastEventId] - Header parameter to specify the ID of the last events received by the server
   * on a previous connection. Overrides `since` query parameter.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Query parameter to specify whether to return the documents in descending by
   * key order.
   * @param {string} [params.feed] - Query parameter to specify the changes feed type.
   * @param {string} [params.filter] - Query parameter to specify a filter to emit only specific events from the changes
   * stream.
   *
   * The built-in filter types are:
   *   * `_design` - Returns only changes to design documents.
   *   * `_doc_ids` - Returns changes for documents with an ID matching one specified in
   *       `doc_ids` request body parameter. (`POST` only)
   *   * `_selector` - Returns changes for documents that match the `selector`
   *       request body parameter. The selector syntax is the same as used for
   *       `_find`. (`POST` only)
   *   * `_view` - Returns changes for documents that match an existing map
   *       function in the view specified by the query parameter `view`.
   *
   * Additionally, the value can be the name of a JS filter function from a design document. For example:
   * `design_doc/filtername`.
   *
   * **Note:** For better performance use the built-in `_selector`, `_design` or `_doc_ids` filters rather than JS based
   * `_view` or design document filters. If you need to pass values to change the filtered content use the `_selector`
   * filter type.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Off by default and only applicable for
   * `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be `true`
   * to use a value of `60000`.
   *
   * **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
   * environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
   * Instead, consider one of the following options:
   *   * Use the `timeout` parameter with a value that is compatible with your network environment.
   *   * Switch to scheduled usage of one of the non-continuous changes feed types
   *     (`normal` or `longpoll`).
   *   * Use TCP keepalive.
   * @param {boolean} [params.includeDocs] - Query parameter to specify whether to include the full content of the
   * documents in the response.
   * @param {number} [params.limit] - Query parameter to specify the number of returned documents to limit the result
   * to.
   * @param {number} [params.seqInterval] - Query parameter to specify that the update seq should only be calculated
   * with every Nth result returned. When fetching changes in a batch, setting <code>seq_interval=&lt;batch
   * size&gt;</code>, where &lt;batch size&gt; is the number of results requested per batch, load can be reduced on the
   * source database as computing the seq value across many shards (especially in highly-sharded databases) is
   * expensive.
   * @param {string} [params.since] - Query parameter to specify to start the results from the change immediately after
   * the given update sequence. Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
   * @param {string} [params.style] - Query parameter to specify how many revisions are returned in the changes array.
   * The default, `main_only`, will only return the current "winning" revision; all_docs will return all leaf revisions
   * (including conflicts and deleted former conflicts).
   * @param {number} [params.timeout] - Query parameter to specify the maximum period in milliseconds to wait for a
   * change before the response is sent, even if there are no results. Only applicable for `longpoll` or `continuous`
   * feeds. Default value is specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also
   * the default maximum timeout to prevent undetected dead connections.
   * @param {string} [params.view] - Query parameter to specify a view function as a filter. Documents pass the filter
   * if the view's map function emits at least one record for them.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ChangesResult>>}
   */
  public postChanges(
    params: CloudantV1.PostChangesParams
  ): Promise<CloudantV1.Response<CloudantV1.ChangesResult>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'docIds', 'fields', 'selector', 'lastEventId', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'feed', 'filter', 'heartbeat', 'includeDocs', 'limit', 'seqInterval', 'since', 'style', 'timeout', 'view', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'doc_ids': _params.docIds,
      'fields': _params.fields,
      'selector': _params.selector,
    };

    const query = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'feed': _params.feed,
      'filter': _params.filter,
      'heartbeat': _params.heartbeat,
      'include_docs': _params.includeDocs,
      'limit': _params.limit,
      'seq_interval': _params.seqInterval,
      'since': _params.since,
      'style': _params.style,
      'timeout': _params.timeout,
      'view': _params.view,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postChanges');

    const parameters = {
      options: {
        url: '/{db}/_changes',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Last-Event-ID': _params.lastEventId,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ChangesResult.deserialize,
    );
  }

  /**
   * Query the database document changes feed as stream.
   *
   * Requests the database changes feed in the same way as `GET /{db}/_changes` does. It is widely used with the
   * `filter` query parameter because it allows one to pass more information to the filter.
   *
   * ### Note
   *
   * Before using the changes feed read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-faq-using-changes-feed) to understand the limitations and
   * appropriate use cases.
   *
   * If you need to pass parameters to dynamically change the filtered content use the `_selector` filter type for
   * better performance and compatibility. The SDKs have full support for change requests using selector filters, but
   * don't support passing parameters to design document filters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string[]} [params.docIds] - Schema for a list of document IDs.
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {JsonObject} [params.selector] - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {string} [params.lastEventId] - Header parameter to specify the ID of the last events received by the server
   * on a previous connection. Overrides `since` query parameter.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Query parameter to specify whether to return the documents in descending by
   * key order.
   * @param {string} [params.feed] - Query parameter to specify the changes feed type.
   * @param {string} [params.filter] - Query parameter to specify a filter to emit only specific events from the changes
   * stream.
   *
   * The built-in filter types are:
   *   * `_design` - Returns only changes to design documents.
   *   * `_doc_ids` - Returns changes for documents with an ID matching one specified in
   *       `doc_ids` request body parameter. (`POST` only)
   *   * `_selector` - Returns changes for documents that match the `selector`
   *       request body parameter. The selector syntax is the same as used for
   *       `_find`. (`POST` only)
   *   * `_view` - Returns changes for documents that match an existing map
   *       function in the view specified by the query parameter `view`.
   *
   * Additionally, the value can be the name of a JS filter function from a design document. For example:
   * `design_doc/filtername`.
   *
   * **Note:** For better performance use the built-in `_selector`, `_design` or `_doc_ids` filters rather than JS based
   * `_view` or design document filters. If you need to pass values to change the filtered content use the `_selector`
   * filter type.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Off by default and only applicable for
   * `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be `true`
   * to use a value of `60000`.
   *
   * **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
   * environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
   * Instead, consider one of the following options:
   *   * Use the `timeout` parameter with a value that is compatible with your network environment.
   *   * Switch to scheduled usage of one of the non-continuous changes feed types
   *     (`normal` or `longpoll`).
   *   * Use TCP keepalive.
   * @param {boolean} [params.includeDocs] - Query parameter to specify whether to include the full content of the
   * documents in the response.
   * @param {number} [params.limit] - Query parameter to specify the number of returned documents to limit the result
   * to.
   * @param {number} [params.seqInterval] - Query parameter to specify that the update seq should only be calculated
   * with every Nth result returned. When fetching changes in a batch, setting <code>seq_interval=&lt;batch
   * size&gt;</code>, where &lt;batch size&gt; is the number of results requested per batch, load can be reduced on the
   * source database as computing the seq value across many shards (especially in highly-sharded databases) is
   * expensive.
   * @param {string} [params.since] - Query parameter to specify to start the results from the change immediately after
   * the given update sequence. Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
   * @param {string} [params.style] - Query parameter to specify how many revisions are returned in the changes array.
   * The default, `main_only`, will only return the current "winning" revision; all_docs will return all leaf revisions
   * (including conflicts and deleted former conflicts).
   * @param {number} [params.timeout] - Query parameter to specify the maximum period in milliseconds to wait for a
   * change before the response is sent, even if there are no results. Only applicable for `longpoll` or `continuous`
   * feeds. Default value is specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also
   * the default maximum timeout to prevent undetected dead connections.
   * @param {string} [params.view] - Query parameter to specify a view function as a filter. Documents pass the filter
   * if the view's map function emits at least one record for them.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postChangesAsStream(
    params: CloudantV1.PostChangesAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'docIds', 'fields', 'selector', 'lastEventId', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'feed', 'filter', 'heartbeat', 'includeDocs', 'limit', 'seqInterval', 'since', 'style', 'timeout', 'view', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'doc_ids': _params.docIds,
      'fields': _params.fields,
      'selector': _params.selector,
    };

    const query = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'feed': _params.feed,
      'filter': _params.filter,
      'heartbeat': _params.heartbeat,
      'include_docs': _params.includeDocs,
      'limit': _params.limit,
      'seq_interval': _params.seqInterval,
      'since': _params.since,
      'style': _params.style,
      'timeout': _params.timeout,
      'view': _params.view,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postChangesAsStream');

    const parameters = {
      options: {
        url: '/{db}/_changes',
        method: 'POST',
        body,
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Last-Event-ID': _params.lastEventId,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * databases
   ************************/

  /**
   * Retrieve the HTTP headers for a database.
   *
   * Returns the HTTP headers that contain a minimal amount of information about the specified database. Since the
   * response body is empty, using the HEAD method is a lightweight way to check if the database exists or not.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headDatabase(
    params: CloudantV1.HeadDatabaseParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headDatabase');

    const parameters = {
      options: {
        url: '/{db}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a list of all database names in the instance.
   *
   * Query to retrieve a list of database names from the instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.descending] - Query parameter to specify whether to return the documents in descending by
   * key order.
   * @param {string} [params.endKey] - Query parameter to specify to stop returning records when the specified key is
   * reached. String representation of any JSON type that matches the key type emitted by the view function.
   * @param {number} [params.limit] - Query parameter to specify the number of returned documents to limit the result
   * to.
   * @param {number} [params.skip] - Query parameter to specify the number of records before starting to return the
   * results.
   * @param {string} [params.startKey] - Query parameter to specify to start returning records from the specified key.
   * String representation of any JSON type that matches the key type emitted by the view function.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<string[]>>}
   */
  public getAllDbs(
    params?: CloudantV1.GetAllDbsParams
  ): Promise<CloudantV1.Response<string[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['descending', 'endKey', 'limit', 'skip', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'descending': _params.descending,
      'end_key': _params.endKey,
      'limit': _params.limit,
      'skip': _params.skip,
      'start_key': _params.startKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getAllDbs');

    const parameters = {
      options: {
        url: '/_all_dbs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query information about multiple databases.
   *
   * This operation enables you to request information about multiple databases in a single request, instead of issuing
   * multiple `GET /{db}` requests. It returns a list that contains an information object for each database specified in
   * the request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.keys - A list of database names.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DbsInfoResult[]>>}
   */
  public postDbsInfo(
    params: CloudantV1.PostDbsInfoParams
  ): Promise<CloudantV1.Response<CloudantV1.DbsInfoResult[]>> {
    const _params = { ...params };
    const _requiredParams = ['keys'];
    const _validParams = ['keys', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'keys': _params.keys,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postDbsInfo');

    const parameters = {
      options: {
        url: '/_dbs_info',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DbsInfoResult.deserialize,
    );
  }

  /**
   * Delete a database.
   *
   * Deletes the specified database and all documents and attachments contained within it. To avoid deleting a database,
   * the server responds with a 400 HTTP status code when the request URL includes a `?rev=` parameter. This response
   * suggests that a user wanted to delete a document but forgot to add the document ID to the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public deleteDatabase(
    params: CloudantV1.DeleteDatabaseParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDatabase');

    const parameters = {
      options: {
        url: '/{db}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }

  /**
   * Retrieve information about a database.
   *
   * Retrieve detailed information about the database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DatabaseInformation>>}
   */
  public getDatabaseInformation(
    params: CloudantV1.GetDatabaseInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.DatabaseInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDatabaseInformation');

    const parameters = {
      options: {
        url: '/{db}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DatabaseInformation.deserialize,
    );
  }

  /**
   * Create a database.
   *
   * Create a new database with the requested properties.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {boolean} [params.partitioned] - Query parameter to specify whether to enable database partitions when
   * creating a database.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partitioned-databases-database-partitioning)
   * to understand the limitations and appropriate use cases.
   * @param {number} [params.q] - The number of shards in the database. Each shard is a partition of the hash value
   * range. Cloudant recommends using the default value for most databases. However, if your database is expected to be
   * larger than 250 GB or have a lot of indexes, you may need to adjust the settings. In these cases, it's best to
   * reach out to IBM Cloudant customer support for guidance on how to meet your specific needs and requirements.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putDatabase(
    params: CloudantV1.PutDatabaseParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'partitioned', 'q', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'partitioned': _params.partitioned,
      'q': _params.q,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putDatabase');

    const parameters = {
      options: {
        url: '/{db}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }
  /*************************
   * documents
   ************************/

  /**
   * Retrieve the HTTP headers for the document.
   *
   * This method supports the same query arguments as the `GET /{db}/{docid}` method, but only the header information
   * (including document size and the revision as an ETag) is returned. The ETag header shows the current revision for
   * the requested document, and the Content-Length specifies the length of the data if the document was requested in
   * full. Add any of the query arguments, then the resulting HTTP headers that correspond to it are returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headDocument(
    params: CloudantV1.HeadDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'latest', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'latest': _params.latest,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headDocument');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'HEAD',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create or modify a document in a database.
   *
   * Creates or modifies a document in the specified database by using the supplied JSON document.
   *
   * For creation, you may specify the document ID but you should not specify the revision. If you don't specify the
   * document ID, then the server generates an ID for your document.
   *
   * For modification, you must specify the document ID and a revision identifier in the JSON document.
   *
   * If your document ID includes the `_local/` or `_design/` prefix, then this operation creates or modifies a local or
   * a design document respectively.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {Document | NodeJS.ReadableStream | Buffer} params.document - HTTP request body for Document operations.
   * @param {string} [params.contentType] - The type of the input.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public postDocument(
    params: CloudantV1.PostDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'document'];
    const _validParams = ['db', 'document', 'contentType', 'batch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.Document.serialize(_params.document);
    const query = {
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postDocument');

    const parameters = {
      options: {
        url: '/{db}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Query a list of all documents in a database.
   *
   * Queries the primary index (all document IDs). The results that match the request body parameters are returned in a
   * JSON object, including a list of matching documents with basic contents, such as the ID and revision. When no
   * request body parameters are specified, results for all documents in the database are returned. Optionally, document
   * content or additional metadata can be included in the response.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {string} [params.endKey] - Schema for a document ID.
   * @param {string} [params.key] - Schema for a document ID.
   * @param {string[]} [params.keys] - Schema for a list of document IDs.
   * @param {string} [params.startKey] - Schema for a document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsResult>>}
   */
  public postAllDocs(
    params: CloudantV1.PostAllDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsResult>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'key': _params.key,
      'keys': _params.keys,
      'start_key': _params.startKey,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postAllDocs');

    const parameters = {
      options: {
        url: '/{db}/_all_docs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.AllDocsResult.deserialize,
    );
  }

  /**
   * Query a list of all documents in a database as stream.
   *
   * Queries the primary index (all document IDs). The results that match the request body parameters are returned in a
   * JSON object, including a list of matching documents with basic contents, such as the ID and revision. When no
   * request body parameters are specified, results for all documents in the database are returned. Optionally, document
   * content or additional metadata can be included in the response.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {string} [params.endKey] - Schema for a document ID.
   * @param {string} [params.key] - Schema for a document ID.
   * @param {string[]} [params.keys] - Schema for a list of document IDs.
   * @param {string} [params.startKey] - Schema for a document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postAllDocsAsStream(
    params: CloudantV1.PostAllDocsAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'key': _params.key,
      'keys': _params.keys,
      'start_key': _params.startKey,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postAllDocsAsStream');

    const parameters = {
      options: {
        url: '/{db}/_all_docs',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Multi-query the list of all documents in a database.
   *
   * Runs multiple queries using the primary index (all document IDs). Returns a JSON object that contains a list of
   * result objects, one for each query, with a structure equivalent to that of a single `_all_docs` request. This
   * enables you to request multiple queries in a single request, in place of multiple `POST /{db}/_all_docs` requests.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {AllDocsQuery[]} params.queries - An array of query objects with fields for the parameters of each
   * individual view query to be executed. The field names and their meaning are the same as the query parameters of a
   * regular `/_all_docs` request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsQueriesResult>>}
   */
  public postAllDocsQueries(
    params: CloudantV1.PostAllDocsQueriesParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsQueriesResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'queries'];
    const _validParams = ['db', 'queries', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': BaseService.convertModel(_params.queries, CloudantV1.AllDocsQuery.serialize),
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postAllDocsQueries');

    const parameters = {
      options: {
        url: '/{db}/_all_docs/queries',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.AllDocsQueriesResult.deserialize,
    );
  }

  /**
   * Multi-query the list of all documents in a database as stream.
   *
   * Runs multiple queries using the primary index (all document IDs). Returns a JSON object that contains a list of
   * result objects, one for each query, with a structure equivalent to that of a single `_all_docs` request. This
   * enables you to request multiple queries in a single request, in place of multiple `POST /{db}/_all_docs` requests.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {AllDocsQuery[]} params.queries - An array of query objects with fields for the parameters of each
   * individual view query to be executed. The field names and their meaning are the same as the query parameters of a
   * regular `/_all_docs` request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postAllDocsQueriesAsStream(
    params: CloudantV1.PostAllDocsQueriesAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'queries'];
    const _validParams = ['db', 'queries', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': BaseService.convertModel(_params.queries, CloudantV1.AllDocsQuery.serialize),
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postAllDocsQueriesAsStream');

    const parameters = {
      options: {
        url: '/{db}/_all_docs/queries',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Bulk modify multiple documents in a database.
   *
   * The bulk document API allows you to create, update, and delete multiple documents at the same time within a single
   * request. The basic operation is similar to creating, updating, or deleting a single document, except that you batch
   * the document structure and information.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {BulkDocs | NodeJS.ReadableStream | Buffer} params.bulkDocs - HTTP request body for postBulkDocs.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult[]>>}
   */
  public postBulkDocs(
    params: CloudantV1.PostBulkDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult[]>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'bulkDocs'];
    const _validParams = ['db', 'bulkDocs', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.BulkDocs.serialize(_params.bulkDocs);
    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postBulkDocs');

    const parameters = {
      options: {
        url: '/{db}/_bulk_docs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Bulk query revision information for multiple documents.
   *
   * Fetch specific revisions or revision histories for multiple documents in bulk as replicators do.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {BulkGetQueryDocument[]} params.docs - List of document items to get in bulk.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.BulkGetResult>>}
   */
  public postBulkGet(
    params: CloudantV1.PostBulkGetParams
  ): Promise<CloudantV1.Response<CloudantV1.BulkGetResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docs'];
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': BaseService.convertModel(_params.docs, CloudantV1.BulkGetQueryDocument.serialize),
    };

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'latest': _params.latest,
      'revs': _params.revs,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postBulkGet');

    const parameters = {
      options: {
        url: '/{db}/_bulk_get',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.BulkGetResult.deserialize,
    );
  }

  /**
   * Bulk query revision information for multiple documents as mixed.
   *
   * Fetch specific revisions or revision histories for multiple documents in bulk as replicators do.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {BulkGetQueryDocument[]} params.docs - List of document items to get in bulk.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postBulkGetAsMixed(
    params: CloudantV1.PostBulkGetAsMixedParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docs'];
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': BaseService.convertModel(_params.docs, CloudantV1.BulkGetQueryDocument.serialize),
    };

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'latest': _params.latest,
      'revs': _params.revs,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postBulkGetAsMixed');

    const parameters = {
      options: {
        url: '/{db}/_bulk_get',
        method: 'POST',
        body,
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'multipart/mixed',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Bulk query revision information for multiple documents as related.
   *
   * Fetch specific revisions or revision histories for multiple documents in bulk as replicators do.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {BulkGetQueryDocument[]} params.docs - List of document items to get in bulk.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postBulkGetAsRelated(
    params: CloudantV1.PostBulkGetAsRelatedParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docs'];
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': BaseService.convertModel(_params.docs, CloudantV1.BulkGetQueryDocument.serialize),
    };

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'latest': _params.latest,
      'revs': _params.revs,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postBulkGetAsRelated');

    const parameters = {
      options: {
        url: '/{db}/_bulk_get',
        method: 'POST',
        body,
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'multipart/related',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Bulk query revision information for multiple documents as stream.
   *
   * Fetch specific revisions or revision histories for multiple documents in bulk as replicators do.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {BulkGetQueryDocument[]} params.docs - List of document items to get in bulk.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postBulkGetAsStream(
    params: CloudantV1.PostBulkGetAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docs'];
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': BaseService.convertModel(_params.docs, CloudantV1.BulkGetQueryDocument.serialize),
    };

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'latest': _params.latest,
      'revs': _params.revs,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postBulkGetAsStream');

    const parameters = {
      options: {
        url: '/{db}/_bulk_get',
        method: 'POST',
        body,
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a document.
   *
   * Marks the specified document as deleted by adding a `_deleted` field with the value `true`. Documents with this
   * field are not returned within requests anymore but stay in the database. You must supply the current (latest)
   * revision, either by using the `rev` parameter or by using the `If-Match` header to specify the revision.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public deleteDocument(
    params: CloudantV1.DeleteDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifMatch', 'batch', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'batch': _params.batch,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDocument');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve a document.
   *
   * Returns document with the specified `doc_id` from the specified database. Unless you request a specific revision,
   * the latest revision of the document is always returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Document>>}
   */
  public getDocument(
    params: CloudantV1.GetDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.Document>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocument');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Document.deserialize,
    );
  }

  /**
   * Retrieve a document as mixed.
   *
   * Returns document with the specified `doc_id` from the specified database. Unless you request a specific revision,
   * the latest revision of the document is always returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public getDocumentAsMixed(
    params: CloudantV1.GetDocumentAsMixedParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocumentAsMixed');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'multipart/mixed',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a document as related.
   *
   * Returns document with the specified `doc_id` from the specified database. Unless you request a specific revision,
   * the latest revision of the document is always returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public getDocumentAsRelated(
    params: CloudantV1.GetDocumentAsRelatedParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocumentAsRelated');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'multipart/related',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a document as stream.
   *
   * Returns document with the specified `doc_id` from the specified database. Unless you request a specific revision,
   * the latest revision of the document is always returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public getDocumentAsStream(
    params: CloudantV1.GetDocumentAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocumentAsStream');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create or modify a document.
   *
   * Creates or modifies a document in the specified database.
   *
   * For creation, you must specify the document ID but you should not specify the revision.
   *
   * For modification, you must specify the document ID and a revision  identifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {Document | NodeJS.ReadableStream | Buffer} params.document - HTTP request body for Document operations.
   * @param {string} [params.contentType] - The type of the input.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   *
   * Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it is
   * very easy to accidentally end up with a large number of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putDocument(
    params: CloudantV1.PutDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'document'];
    const _validParams = ['db', 'docId', 'document', 'contentType', 'ifMatch', 'batch', 'newEdits', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.Document.serialize(_params.document);
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putDocument');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }
  /*************************
   * designDocuments
   ************************/

  /**
   * Retrieve the HTTP headers for a design document.
   *
   * This method supports the same query arguments as the `GET /{db}/_design/{ddoc}` method, but the results include
   * only the header information (including design document size, and the revision as an ETag). The ETag header shows
   * the current revision for the requested design document, and if you requested the design document in full, the
   * Content-Length specifies the length of the data. If you add any of the query arguments, then the resulting HTTP
   * headers correspond to what is returned for the equivalent GET request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headDesignDocument(
    params: CloudantV1.HeadDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc'];
    const _validParams = ['db', 'ddoc', 'ifNoneMatch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headDesignDocument');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a design document.
   *
   * Marks the specified design document as deleted by adding a `_deleted` field with the value `true`. Documents with
   * this field are not returned with requests but stay in the database. You must supply the current (latest) revision,
   * either by using the `rev` parameter or by using the `If-Match` header to specify the revision.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public deleteDesignDocument(
    params: CloudantV1.DeleteDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc'];
    const _validParams = ['db', 'ddoc', 'ifMatch', 'batch', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'batch': _params.batch,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDesignDocument');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve a design document.
   *
   * Returns design document with the specified `doc_id` from the specified database. Unless you request a specific
   * revision, the current revision of the design document is always returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DesignDocument>>}
   */
  public getDesignDocument(
    params: CloudantV1.GetDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DesignDocument>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc'];
    const _validParams = ['db', 'ddoc', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDesignDocument');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DesignDocument.deserialize,
    );
  }

  /**
   * Create or modify a design document.
   *
   * The PUT method creates a new named design document, or creates a new revision of the existing design document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {DesignDocument} params.designDocument - HTTP request body for DesignDocument operations.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   *
   * Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it is
   * very easy to accidentally end up with a large number of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putDesignDocument(
    params: CloudantV1.PutDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'designDocument'];
    const _validParams = ['db', 'ddoc', 'designDocument', 'ifMatch', 'batch', 'newEdits', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.DesignDocument.serialize(_params.designDocument);
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putDesignDocument');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve information about a design document.
   *
   * Retrieves information about the specified design document, including the index, index size, and current status of
   * the design document and associated index information.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DesignDocumentInformation>>}
   */
  public getDesignDocumentInformation(
    params: CloudantV1.GetDesignDocumentInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.DesignDocumentInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc'];
    const _validParams = ['db', 'ddoc', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDesignDocumentInformation');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_info',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DesignDocumentInformation.deserialize,
    );
  }

  /**
   * Query a list of all design documents in a database.
   *
   * Queries the index of all design document IDs. The results matching the request body parameters are returned in a
   * JSON object, including a list of matching design documents with basic contents, such as the ID and revision. When
   * no request body parameters are specified, results for all design documents in the database are returned.
   * Optionally, the design document content or additional metadata can be included in the response.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {string} [params.endKey] - Schema for a document ID.
   * @param {string} [params.key] - Schema for a document ID.
   * @param {string[]} [params.keys] - Schema for a list of document IDs.
   * @param {string} [params.startKey] - Schema for a document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsResult>>}
   */
  public postDesignDocs(
    params: CloudantV1.PostDesignDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsResult>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'key': _params.key,
      'keys': _params.keys,
      'start_key': _params.startKey,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postDesignDocs');

    const parameters = {
      options: {
        url: '/{db}/_design_docs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.AllDocsResult.deserialize,
    );
  }

  /**
   * Multi-query the list of all design documents.
   *
   * This operation runs multiple view queries of all design documents in the database. This operation enables you to
   * request numerous queries in a single request, in place of multiple POST `/{db}/_design_docs` requests.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {AllDocsQuery[]} params.queries - An array of query objects with fields for the parameters of each
   * individual view query to be executed. The field names and their meaning are the same as the query parameters of a
   * regular `/_all_docs` request.
   * @param {string} [params.accept] - The type of the response: application/json or application/octet-stream.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsQueriesResult>>}
   */
  public postDesignDocsQueries(
    params: CloudantV1.PostDesignDocsQueriesParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsQueriesResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'queries'];
    const _validParams = ['db', 'queries', 'accept', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': BaseService.convertModel(_params.queries, CloudantV1.AllDocsQuery.serialize),
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postDesignDocsQueries');

    const parameters = {
      options: {
        url: '/{db}/_design_docs/queries',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Content-Type': 'application/json',
            'Accept': _params.accept,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.AllDocsQueriesResult.deserialize,
    );
  }
  /*************************
   * views
   ************************/

  /**
   * Query a MapReduce view.
   *
   * This operation queries the specified MapReduce view of the specified design document. By default, the map and
   * reduce functions of the view are run to update the view before returning the response. The advantage of using the
   * HTTP `POST` method is that the query is submitted as a JSON object in the request body. This avoids the limitations
   * of passing query options as URL query parameters of a `GET` request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {any} [params.endKey] - Schema for any JSON type.
   * @param {string} [params.endKeyDocId] - Schema for a document ID.
   * @param {boolean} [params.group] - Parameter to specify whether to group reduced results by key. Valid only if a
   * reduce function defined in the view. If the view emits key in JSON array format, then it is possible to reduce
   * groups further based on the number of array elements with the `group_level` parameter.
   * @param {number} [params.groupLevel] - Parameter to specify a group level to be used. Only applicable if the view
   * uses keys that are JSON arrays. Implies group is `true`. Group level groups the reduced results by the specified
   * number of array elements. If unset, results are grouped by the entire array key, returning a reduced value for each
   * complete key.
   * @param {any} [params.key] - Schema for any JSON type.
   * @param {any[]} [params.keys] - Parameter to specify returning only documents that match any of the specified keys.
   * A JSON array of keys that match the key type emitted by the view function.
   * @param {boolean} [params.reduce] - Parameter to specify whether to use the reduce function in a map-reduce view.
   * Default is true when a reduce function is defined.
   *
   * A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
   *
   * Be aware that `include_docs=true` can only be used with `map` views.
   * @param {boolean} [params.stable] - Query parameter to specify whether use the same replica of  the index on each
   * request. The default value `false` contacts all  replicas and returns the result from the first, fastest,
   * responder. Setting it to `true` when used in conjunction with `update=false`  may improve consistency at the
   * expense of increased latency and decreased throughput if the selected replica is not the fastest of the available
   * replicas.
   *
   * **Note:** In general setting `true` is discouraged and is strictly not recommended when using `update=true`.
   * @param {any} [params.startKey] - Schema for any JSON type.
   * @param {string} [params.startKeyDocId] - Schema for a document ID.
   * @param {string} [params.update] - Parameter to specify whether or not the view in question should be updated prior
   * to responding to the user.
   *
   * * `true` - Return results after the view is updated.
   * * `false` - Return results without updating the view.
   * * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ViewResult>>}
   */
  public postView(
    params: CloudantV1.PostViewParams
  ): Promise<CloudantV1.Response<CloudantV1.ViewResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'view'];
    const _validParams = ['db', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'stable', 'startKey', 'startKeyDocId', 'update', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'end_key_doc_id': _params.endKeyDocId,
      'group': _params.group,
      'group_level': _params.groupLevel,
      'key': _params.key,
      'keys': _params.keys,
      'reduce': _params.reduce,
      'stable': _params.stable,
      'start_key': _params.startKey,
      'start_key_doc_id': _params.startKeyDocId,
      'update': _params.update,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postView');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_view/{view}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ViewResult.deserialize,
    );
  }

  /**
   * Query a MapReduce view as stream.
   *
   * This operation queries the specified MapReduce view of the specified design document. By default, the map and
   * reduce functions of the view are run to update the view before returning the response. The advantage of using the
   * HTTP `POST` method is that the query is submitted as a JSON object in the request body. This avoids the limitations
   * of passing query options as URL query parameters of a `GET` request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {any} [params.endKey] - Schema for any JSON type.
   * @param {string} [params.endKeyDocId] - Schema for a document ID.
   * @param {boolean} [params.group] - Parameter to specify whether to group reduced results by key. Valid only if a
   * reduce function defined in the view. If the view emits key in JSON array format, then it is possible to reduce
   * groups further based on the number of array elements with the `group_level` parameter.
   * @param {number} [params.groupLevel] - Parameter to specify a group level to be used. Only applicable if the view
   * uses keys that are JSON arrays. Implies group is `true`. Group level groups the reduced results by the specified
   * number of array elements. If unset, results are grouped by the entire array key, returning a reduced value for each
   * complete key.
   * @param {any} [params.key] - Schema for any JSON type.
   * @param {any[]} [params.keys] - Parameter to specify returning only documents that match any of the specified keys.
   * A JSON array of keys that match the key type emitted by the view function.
   * @param {boolean} [params.reduce] - Parameter to specify whether to use the reduce function in a map-reduce view.
   * Default is true when a reduce function is defined.
   *
   * A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
   *
   * Be aware that `include_docs=true` can only be used with `map` views.
   * @param {boolean} [params.stable] - Query parameter to specify whether use the same replica of  the index on each
   * request. The default value `false` contacts all  replicas and returns the result from the first, fastest,
   * responder. Setting it to `true` when used in conjunction with `update=false`  may improve consistency at the
   * expense of increased latency and decreased throughput if the selected replica is not the fastest of the available
   * replicas.
   *
   * **Note:** In general setting `true` is discouraged and is strictly not recommended when using `update=true`.
   * @param {any} [params.startKey] - Schema for any JSON type.
   * @param {string} [params.startKeyDocId] - Schema for a document ID.
   * @param {string} [params.update] - Parameter to specify whether or not the view in question should be updated prior
   * to responding to the user.
   *
   * * `true` - Return results after the view is updated.
   * * `false` - Return results without updating the view.
   * * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postViewAsStream(
    params: CloudantV1.PostViewAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'view'];
    const _validParams = ['db', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'stable', 'startKey', 'startKeyDocId', 'update', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'end_key_doc_id': _params.endKeyDocId,
      'group': _params.group,
      'group_level': _params.groupLevel,
      'key': _params.key,
      'keys': _params.keys,
      'reduce': _params.reduce,
      'stable': _params.stable,
      'start_key': _params.startKey,
      'start_key_doc_id': _params.startKeyDocId,
      'update': _params.update,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postViewAsStream');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_view/{view}',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Multi-query a MapReduce view.
   *
   * This operation runs multiple specified view queries against the view function from the specified design document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {ViewQuery[]} params.queries - An array of query objects with fields for the parameters of each individual
   * view query to be executed. The field names and their meaning are the same as the query parameters of a regular view
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ViewQueriesResult>>}
   */
  public postViewQueries(
    params: CloudantV1.PostViewQueriesParams
  ): Promise<CloudantV1.Response<CloudantV1.ViewQueriesResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'view', 'queries'];
    const _validParams = ['db', 'ddoc', 'view', 'queries', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': BaseService.convertModel(_params.queries, CloudantV1.ViewQuery.serialize),
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postViewQueries');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_view/{view}/queries',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ViewQueriesResult.deserialize,
    );
  }

  /**
   * Multi-query a MapReduce view as stream.
   *
   * This operation runs multiple specified view queries against the view function from the specified design document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {ViewQuery[]} params.queries - An array of query objects with fields for the parameters of each individual
   * view query to be executed. The field names and their meaning are the same as the query parameters of a regular view
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postViewQueriesAsStream(
    params: CloudantV1.PostViewQueriesAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'view', 'queries'];
    const _validParams = ['db', 'ddoc', 'view', 'queries', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': BaseService.convertModel(_params.queries, CloudantV1.ViewQuery.serialize),
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postViewQueriesAsStream');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_view/{view}/queries',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * partitionedDatabases
   ************************/

  /**
   * Retrieve information about a database partition.
   *
   * Given a partition key, return the database name, sizes, partition, doc count, and doc delete count.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.PartitionInformation>>}
   */
  public getPartitionInformation(
    params: CloudantV1.GetPartitionInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.PartitionInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey'];
    const _validParams = ['db', 'partitionKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getPartitionInformation');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.PartitionInformation.deserialize,
    );
  }

  /**
   * Query a list of all documents in a database partition.
   *
   * Queries the primary index (all document IDs). The results that match the query parameters are returned in a JSON
   * object, including a list of matching documents with basic contents, such as the ID and revision. When no query
   * parameters are specified, results for all documents in the database partition are returned. Optionally, document
   * content or additional metadata can be included in the response.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {string} [params.endKey] - Schema for a document ID.
   * @param {string} [params.key] - Schema for a document ID.
   * @param {string[]} [params.keys] - Schema for a list of document IDs.
   * @param {string} [params.startKey] - Schema for a document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsResult>>}
   */
  public postPartitionAllDocs(
    params: CloudantV1.PostPartitionAllDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey'];
    const _validParams = ['db', 'partitionKey', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'key': _params.key,
      'keys': _params.keys,
      'start_key': _params.startKey,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionAllDocs');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_all_docs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.AllDocsResult.deserialize,
    );
  }

  /**
   * Query a list of all documents in a database partition as stream.
   *
   * Queries the primary index (all document IDs). The results that match the query parameters are returned in a JSON
   * object, including a list of matching documents with basic contents, such as the ID and revision. When no query
   * parameters are specified, results for all documents in the database partition are returned. Optionally, document
   * content or additional metadata can be included in the response.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {string} [params.endKey] - Schema for a document ID.
   * @param {string} [params.key] - Schema for a document ID.
   * @param {string[]} [params.keys] - Schema for a list of document IDs.
   * @param {string} [params.startKey] - Schema for a document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postPartitionAllDocsAsStream(
    params: CloudantV1.PostPartitionAllDocsAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey'];
    const _validParams = ['db', 'partitionKey', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'key': _params.key,
      'keys': _params.keys,
      'start_key': _params.startKey,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionAllDocsAsStream');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_all_docs',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition search index.
   *
   * Partitioned Search indexes, which are defined in design documents, allow partition databases to be queried by using
   * Lucene Query Parser Syntax. Search indexes are defined by an index function, similar to a map function in MapReduce
   * views. The index function decides what data to index and store in the index.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {string} params.query - The Lucene query to execute.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {string[]} [params.highlightFields] - Specifies which fields to highlight. If specified, the result object
   * contains a highlights field with an entry for each specified field.
   * @param {number} [params.highlightNumber] - Number of fragments that are returned in highlights. If the search term
   * occurs less often than the number of fragments that are specified, longer fragments are returned.
   * @param {string} [params.highlightPostTag] - A string that is inserted after the highlighted word in the highlights
   * output.
   * @param {string} [params.highlightPreTag] - A string that is inserted before the highlighted word in the highlights
   * output.
   * @param {number} [params.highlightSize] - Number of characters in each fragment for highlights.
   * @param {boolean} [params.includeDocs] - Include the full content of the documents in the return.
   * @param {string[]} [params.includeFields] - A JSON array of field names to include in search results. Any fields
   * that are included must be indexed with the store:true option. The default is all fields.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {string[]} [params.sort] - Specifies the sort order of the results. In a grouped search (when group_field is
   * used), this parameter specifies the sort order within a group. The default sort order is relevance.  A JSON string
   * of the form "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name
   * of a string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
   * optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
   * ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed fields.
   * Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
   * @param {string} [params.stale] - Do not wait for the index to finish building to return results.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchResult>>}
   */
  public postPartitionSearch(
    params: CloudantV1.PostPartitionSearchParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'partitionKey', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'query': _params.query,
      'bookmark': _params.bookmark,
      'highlight_fields': _params.highlightFields,
      'highlight_number': _params.highlightNumber,
      'highlight_post_tag': _params.highlightPostTag,
      'highlight_pre_tag': _params.highlightPreTag,
      'highlight_size': _params.highlightSize,
      'include_docs': _params.includeDocs,
      'include_fields': _params.includeFields,
      'limit': _params.limit,
      'sort': _params.sort,
      'stale': _params.stale,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionSearch');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SearchResult.deserialize,
    );
  }

  /**
   * Query a database partition search index as stream.
   *
   * Partitioned Search indexes, which are defined in design documents, allow partition databases to be queried by using
   * Lucene Query Parser Syntax. Search indexes are defined by an index function, similar to a map function in MapReduce
   * views. The index function decides what data to index and store in the index.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {string} params.query - The Lucene query to execute.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {string[]} [params.highlightFields] - Specifies which fields to highlight. If specified, the result object
   * contains a highlights field with an entry for each specified field.
   * @param {number} [params.highlightNumber] - Number of fragments that are returned in highlights. If the search term
   * occurs less often than the number of fragments that are specified, longer fragments are returned.
   * @param {string} [params.highlightPostTag] - A string that is inserted after the highlighted word in the highlights
   * output.
   * @param {string} [params.highlightPreTag] - A string that is inserted before the highlighted word in the highlights
   * output.
   * @param {number} [params.highlightSize] - Number of characters in each fragment for highlights.
   * @param {boolean} [params.includeDocs] - Include the full content of the documents in the return.
   * @param {string[]} [params.includeFields] - A JSON array of field names to include in search results. Any fields
   * that are included must be indexed with the store:true option. The default is all fields.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {string[]} [params.sort] - Specifies the sort order of the results. In a grouped search (when group_field is
   * used), this parameter specifies the sort order within a group. The default sort order is relevance.  A JSON string
   * of the form "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name
   * of a string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
   * optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
   * ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed fields.
   * Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
   * @param {string} [params.stale] - Do not wait for the index to finish building to return results.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postPartitionSearchAsStream(
    params: CloudantV1.PostPartitionSearchAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'partitionKey', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'query': _params.query,
      'bookmark': _params.bookmark,
      'highlight_fields': _params.highlightFields,
      'highlight_number': _params.highlightNumber,
      'highlight_post_tag': _params.highlightPostTag,
      'highlight_pre_tag': _params.highlightPreTag,
      'highlight_size': _params.highlightSize,
      'include_docs': _params.includeDocs,
      'include_fields': _params.includeFields,
      'limit': _params.limit,
      'sort': _params.sort,
      'stale': _params.stale,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionSearchAsStream');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_design/{ddoc}/_search/{index}',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition MapReduce view function.
   *
   * Runs the specified view function from the specified design document. Unlike `GET /{db}/_design/{ddoc}/_view/{view}`
   * for accessing views, the POST method supports the specification of explicit keys to be retrieved from the view
   * results. The remainder of the POST view functionality is identical to the `GET /{db}/_design/{ddoc}/_view/{view}`
   * API.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {any} [params.endKey] - Schema for any JSON type.
   * @param {string} [params.endKeyDocId] - Schema for a document ID.
   * @param {boolean} [params.group] - Parameter to specify whether to group reduced results by key. Valid only if a
   * reduce function defined in the view. If the view emits key in JSON array format, then it is possible to reduce
   * groups further based on the number of array elements with the `group_level` parameter.
   * @param {number} [params.groupLevel] - Parameter to specify a group level to be used. Only applicable if the view
   * uses keys that are JSON arrays. Implies group is `true`. Group level groups the reduced results by the specified
   * number of array elements. If unset, results are grouped by the entire array key, returning a reduced value for each
   * complete key.
   * @param {any} [params.key] - Schema for any JSON type.
   * @param {any[]} [params.keys] - Parameter to specify returning only documents that match any of the specified keys.
   * A JSON array of keys that match the key type emitted by the view function.
   * @param {boolean} [params.reduce] - Parameter to specify whether to use the reduce function in a map-reduce view.
   * Default is true when a reduce function is defined.
   *
   * A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
   *
   * Be aware that `include_docs=true` can only be used with `map` views.
   * @param {any} [params.startKey] - Schema for any JSON type.
   * @param {string} [params.startKeyDocId] - Schema for a document ID.
   * @param {string} [params.update] - Parameter to specify whether or not the view in question should be updated prior
   * to responding to the user.
   *
   * * `true` - Return results after the view is updated.
   * * `false` - Return results without updating the view.
   * * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ViewResult>>}
   */
  public postPartitionView(
    params: CloudantV1.PostPartitionViewParams
  ): Promise<CloudantV1.Response<CloudantV1.ViewResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'ddoc', 'view'];
    const _validParams = ['db', 'partitionKey', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'startKey', 'startKeyDocId', 'update', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'end_key_doc_id': _params.endKeyDocId,
      'group': _params.group,
      'group_level': _params.groupLevel,
      'key': _params.key,
      'keys': _params.keys,
      'reduce': _params.reduce,
      'start_key': _params.startKey,
      'start_key_doc_id': _params.startKeyDocId,
      'update': _params.update,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionView');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ViewResult.deserialize,
    );
  }

  /**
   * Query a database partition MapReduce view function as stream.
   *
   * Runs the specified view function from the specified design document. Unlike `GET /{db}/_design/{ddoc}/_view/{view}`
   * for accessing views, the POST method supports the specification of explicit keys to be retrieved from the view
   * results. The remainder of the POST view functionality is identical to the `GET /{db}/_design/{ddoc}/_view/{view}`
   * API.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.view - Path parameter to specify the map reduce view function name.
   * @param {boolean} [params.attEncodingInfo] - Parameter to specify whether to include the encoding information in
   * attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.attachments] - Parameter to specify whether to include attachments bodies in a response.
   * @param {boolean} [params.conflicts] - Parameter to specify whether to include a list of conflicted revisions in
   * each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.descending] - Parameter to specify whether to return the documents in descending by key
   * order.
   * @param {boolean} [params.includeDocs] - Parameter to specify whether to include the full content of the documents
   * in the response.
   * @param {boolean} [params.inclusiveEnd] - Parameter to specify whether the specified end key should be included in
   * the result.
   * @param {number} [params.limit] - Parameter to specify the number of returned documents to limit the result to.
   * @param {number} [params.skip] - Parameter to specify the number of records before starting to return the results.
   * @param {boolean} [params.updateSeq] - Parameter to specify whether to include in the response an update_seq value
   * indicating the sequence id of the database the view reflects.
   * @param {any} [params.endKey] - Schema for any JSON type.
   * @param {string} [params.endKeyDocId] - Schema for a document ID.
   * @param {boolean} [params.group] - Parameter to specify whether to group reduced results by key. Valid only if a
   * reduce function defined in the view. If the view emits key in JSON array format, then it is possible to reduce
   * groups further based on the number of array elements with the `group_level` parameter.
   * @param {number} [params.groupLevel] - Parameter to specify a group level to be used. Only applicable if the view
   * uses keys that are JSON arrays. Implies group is `true`. Group level groups the reduced results by the specified
   * number of array elements. If unset, results are grouped by the entire array key, returning a reduced value for each
   * complete key.
   * @param {any} [params.key] - Schema for any JSON type.
   * @param {any[]} [params.keys] - Parameter to specify returning only documents that match any of the specified keys.
   * A JSON array of keys that match the key type emitted by the view function.
   * @param {boolean} [params.reduce] - Parameter to specify whether to use the reduce function in a map-reduce view.
   * Default is true when a reduce function is defined.
   *
   * A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
   *
   * Be aware that `include_docs=true` can only be used with `map` views.
   * @param {any} [params.startKey] - Schema for any JSON type.
   * @param {string} [params.startKeyDocId] - Schema for a document ID.
   * @param {string} [params.update] - Parameter to specify whether or not the view in question should be updated prior
   * to responding to the user.
   *
   * * `true` - Return results after the view is updated.
   * * `false` - Return results without updating the view.
   * * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postPartitionViewAsStream(
    params: CloudantV1.PostPartitionViewAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'ddoc', 'view'];
    const _validParams = ['db', 'partitionKey', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'startKey', 'startKeyDocId', 'update', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'att_encoding_info': _params.attEncodingInfo,
      'attachments': _params.attachments,
      'conflicts': _params.conflicts,
      'descending': _params.descending,
      'include_docs': _params.includeDocs,
      'inclusive_end': _params.inclusiveEnd,
      'limit': _params.limit,
      'skip': _params.skip,
      'update_seq': _params.updateSeq,
      'end_key': _params.endKey,
      'end_key_doc_id': _params.endKeyDocId,
      'group': _params.group,
      'group_level': _params.groupLevel,
      'key': _params.key,
      'keys': _params.keys,
      'reduce': _params.reduce,
      'start_key': _params.startKey,
      'start_key_doc_id': _params.startKeyDocId,
      'update': _params.update,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionViewAsStream');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_design/{ddoc}/_view/{view}',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve information about which partition index is used for a query.
   *
   * Shows which index is being used by the query. Parameters are the same as the
   * [`/{db}/_partition/{partition_key}/_find` endpoint](#postpartitionfind-queries).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ExplainResult>>}
   */
  public postPartitionExplain(
    params: CloudantV1.PostPartitionExplainParams
  ): Promise<CloudantV1.Response<CloudantV1.ExplainResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'selector'];
    const _validParams = ['db', 'partitionKey', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionExplain');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_explain',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ExplainResult.deserialize,
    );
  }

  /**
   * Query a database partition index by using selector syntax.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index by default fallback to using the built-in `_all_docs` index. This
   * isn't recommended because it has a significant performance impact causing a full scan of the partition with each
   * request. In this case the response body includes a warning field recommending the creation of an index.
   *
   * To avoid the fallback behavior set the `allow_fallback` option to `false` and the server responds with a `400`
   * status code if no suitable index exists. If you want to use only a specific index for your query set
   * `allow_fallback` to `false` and set the `use_index` option.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.FindResult>>}
   */
  public postPartitionFind(
    params: CloudantV1.PostPartitionFindParams
  ): Promise<CloudantV1.Response<CloudantV1.FindResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'selector'];
    const _validParams = ['db', 'partitionKey', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionFind');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_find',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.FindResult.deserialize,
    );
  }

  /**
   * Query a database partition index by using selector syntax as stream.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index by default fallback to using the built-in `_all_docs` index. This
   * isn't recommended because it has a significant performance impact causing a full scan of the partition with each
   * request. In this case the response body includes a warning field recommending the creation of an index.
   *
   * To avoid the fallback behavior set the `allow_fallback` option to `false` and the server responds with a `400`
   * status code if no suitable index exists. If you want to use only a specific index for your query set
   * `allow_fallback` to `false` and set the `use_index` option.
   *
   * Before using read the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partition-querying) to understand
   * the limitations and appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.partitionKey - Path parameter to specify the database partition key.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postPartitionFindAsStream(
    params: CloudantV1.PostPartitionFindAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'selector'];
    const _validParams = ['db', 'partitionKey', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
    };

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postPartitionFindAsStream');

    const parameters = {
      options: {
        url: '/{db}/_partition/{partition_key}/_find',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * queries
   ************************/

  /**
   * Retrieve information about which index is used for a query.
   *
   * Shows which index is being used by the query. Parameters are the same as the [`_find` endpoint](#postfind).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {number} [params.r] - The read quorum that is needed for the result. The value defaults to 1, in which case
   * the document that was found in the index is returned. If set to a higher value, each document is read from at least
   * that many replicas before it is returned in the results. The request will take more time than using only the
   * document that is stored locally with the index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ExplainResult>>}
   */
  public postExplain(
    params: CloudantV1.PostExplainParams
  ): Promise<CloudantV1.Response<CloudantV1.ExplainResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'selector'];
    const _validParams = ['db', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
      'r': _params.r,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postExplain');

    const parameters = {
      options: {
        url: '/{db}/_explain',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ExplainResult.deserialize,
    );
  }

  /**
   * Query an index by using selector syntax.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index by default fallback to using the built-in `_all_docs` index. This
   * isn't recommended because it has a significant performance impact causing a full scan of the database with each
   * request. In this case the response body includes a warning field recommending the creation of an index.
   *
   * To avoid the fallback behavior set the `allow_fallback` option to `false` and the server responds with a `400`
   * status code if no suitable index exists. If you want to use only a specific index for your query set
   * `allow_fallback` to `false` and set the `use_index` option.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {number} [params.r] - The read quorum that is needed for the result. The value defaults to 1, in which case
   * the document that was found in the index is returned. If set to a higher value, each document is read from at least
   * that many replicas before it is returned in the results. The request will take more time than using only the
   * document that is stored locally with the index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.FindResult>>}
   */
  public postFind(
    params: CloudantV1.PostFindParams
  ): Promise<CloudantV1.Response<CloudantV1.FindResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'selector'];
    const _validParams = ['db', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
      'r': _params.r,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postFind');

    const parameters = {
      options: {
        url: '/{db}/_find',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.FindResult.deserialize,
    );
  }

  /**
   * Query an index by using selector syntax as stream.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index by default fallback to using the built-in `_all_docs` index. This
   * isn't recommended because it has a significant performance impact causing a full scan of the database with each
   * request. In this case the response body includes a warning field recommending the creation of an index.
   *
   * To avoid the fallback behavior set the `allow_fallback` option to `false` and the server responds with a `400`
   * status code if no suitable index exists. If you want to use only a specific index for your query set
   * `allow_fallback` to `false` and set the `use_index` option.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {JsonObject} params.selector - JSON object describing criteria used to select documents. The selector
   * specifies fields in the document, and provides an expression to evaluate with the field content or other data.
   *
   * The selector object must:
   *   * Be structured as valid JSON.
   *   * Contain a valid query expression.
   *
   * Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
   * option if filtering on document attributes only.
   *
   * Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
   * those fields. You can create more complex selector expressions by combining operators.
   *
   * Operators are identified by the use of a dollar sign `$` prefix in the name field.
   *
   * There are two core types of operators in the selector syntax:
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
   * combination operator takes a single argument. The argument is either another selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   *
   * It is important for query performance to use appropriate selectors:
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   * * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query selectors
   * use these operators in conjunction with equality operators or create and use a partial index to reduce the number
   * of documents that will need to be scanned.
   *
   * See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
   * combination and conditional operators.
   *
   * For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
   * @param {boolean} [params.allowFallback] - Whether to allow fallback to other indexes.  Default is true.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted or empty, the entire document is returned.
   * @param {number} [params.limit] - Maximum number of results returned. The `type: text` indexes are limited to 200
   * results when queried.
   * @param {number} [params.skip] - Skip the first 'n' results, where 'n' is the value that is specified.
   * @param {JsonObject[]} [params.sort] - The sort field contains a list of pairs, each mapping a field name to a sort
   * direction (asc or desc). The first field name and direction pair is the topmost level of sort. The second pair, if
   * provided, is the next level of sort. The field can be any field, using dotted notation if desired for sub-document
   * fields.
   *
   * For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
   *
   * When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
   * same order and each object in the sort array has a single key or at least one of the sort fields is included in the
   * selector. All sorting fields must use the same sort direction, either all ascending or all descending.
   * @param {boolean} [params.stable] - Whether or not the view results should be returned from a "stable" set of
   * shards.
   * @param {string} [params.update] - Whether to update the index prior to returning the result.
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index to answer the query, rather than
   * letting the IBM Cloudant query planner choose an index. Specified as a two element array of design document id
   * followed by index name, for example `["my_design_doc", "my_index"]`.
   *
   * It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
   * indexes that might get added later.
   *
   * If the specified index doesn't exist or can't answer the query then the server ignores the value and answers using
   * another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and the
   * server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
   * @param {number} [params.r] - The read quorum that is needed for the result. The value defaults to 1, in which case
   * the document that was found in the index is returned. If set to a higher value, each document is read from at least
   * that many replicas before it is returned in the results. The request will take more time than using only the
   * document that is stored locally with the index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postFindAsStream(
    params: CloudantV1.PostFindAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'selector'];
    const _validParams = ['db', 'selector', 'allowFallback', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'allow_fallback': _params.allowFallback,
      'bookmark': _params.bookmark,
      'conflicts': _params.conflicts,
      'execution_stats': _params.executionStats,
      'fields': _params.fields,
      'limit': _params.limit,
      'skip': _params.skip,
      'sort': _params.sort,
      'stable': _params.stable,
      'update': _params.update,
      'use_index': _params.useIndex,
      'r': _params.r,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postFindAsStream');

    const parameters = {
      options: {
        url: '/{db}/_find',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve information about all indexes.
   *
   * When you make a GET request to `/db/_index`, you get a list of all the indexes using `"language":"query"` in the
   * database and the primary index. In addition to the information available through this API, the indexes are stored
   * in the `indexes` property of their respective design documents.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.IndexesInformation>>}
   */
  public getIndexesInformation(
    params: CloudantV1.GetIndexesInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.IndexesInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getIndexesInformation');

    const parameters = {
      options: {
        url: '/{db}/_index',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.IndexesInformation.deserialize,
    );
  }

  /**
   * Create a new index on a database.
   *
   * Create a new index on a database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {IndexDefinition} params.index - Schema for a `json` or `text` query index definition. Indexes of type
   * `text` have additional configuration properties that do not apply to `json` indexes, these are:
   * * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
   * document fields and what analyzer to use for that purpose.
   * @param {string} [params.ddoc] - Specifies the design document name in which the index will be created. The design
   * document name is the design document ID excluding the `_design/` prefix.
   * @param {string} [params.name] - name.
   * @param {boolean} [params.partitioned] - The default value is `true` for databases with `partitioned: true` and
   * `false` otherwise. For databases with `partitioned: false` if this option is specified the value must be `false`.
   * @param {string} [params.type] - Schema for the type of an index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.IndexResult>>}
   */
  public postIndex(
    params: CloudantV1.PostIndexParams
  ): Promise<CloudantV1.Response<CloudantV1.IndexResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'index'];
    const _validParams = ['db', 'index', 'ddoc', 'name', 'partitioned', 'type', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'index': CloudantV1.IndexDefinition.serialize(_params.index),
      'ddoc': _params.ddoc,
      'name': _params.name,
      'partitioned': _params.partitioned,
      'type': _params.type,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postIndex');

    const parameters = {
      options: {
        url: '/{db}/_index',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.IndexResult.deserialize,
    );
  }

  /**
   * Delete an index.
   *
   * Delete the index functions from the design document and index files on the server.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.type - Path parameter to specify the index type.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public deleteIndex(
    params: CloudantV1.DeleteIndexParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'type', 'index'];
    const _validParams = ['db', 'ddoc', 'type', 'index', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'type': _params.type,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteIndex');

    const parameters = {
      options: {
        url: '/{db}/_index/_design/{ddoc}/{type}/{index}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }
  /*************************
   * searches
   ************************/

  /**
   * Query tokenization of sample text.
   *
   * Returns the results of analyzer tokenization of the provided sample text. This endpoint can be used for testing
   * analyzer tokenization.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.analyzer - The analyzer type that is being used at the tokenization.
   * @param {string} params.text - The text to tokenize with the analyzer.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchAnalyzeResult>>}
   */
  public postSearchAnalyze(
    params: CloudantV1.PostSearchAnalyzeParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchAnalyzeResult>> {
    const _params = { ...params };
    const _requiredParams = ['analyzer', 'text'];
    const _validParams = ['analyzer', 'text', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'analyzer': _params.analyzer,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postSearchAnalyze');

    const parameters = {
      options: {
        url: '/_search_analyze',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SearchAnalyzeResult.deserialize,
    );
  }

  /**
   * Query a search index.
   *
   * Search indexes, which are defined in design documents, allow databases to be queried by using Lucene Query Parser
   * Syntax. An index function defines a search index, similar to a map function in MapReduce views. The index function
   * decides what data to index and what data to store in the index. The advantage of using the HTTP `POST` method is
   * that the query is submitted as a JSON object in the request body. This avoids the limitations of passing query
   * options as URL query parameters of a `GET` request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {string} params.query - The Lucene query to execute.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {string[]} [params.highlightFields] - Specifies which fields to highlight. If specified, the result object
   * contains a highlights field with an entry for each specified field.
   * @param {number} [params.highlightNumber] - Number of fragments that are returned in highlights. If the search term
   * occurs less often than the number of fragments that are specified, longer fragments are returned.
   * @param {string} [params.highlightPostTag] - A string that is inserted after the highlighted word in the highlights
   * output.
   * @param {string} [params.highlightPreTag] - A string that is inserted before the highlighted word in the highlights
   * output.
   * @param {number} [params.highlightSize] - Number of characters in each fragment for highlights.
   * @param {boolean} [params.includeDocs] - Include the full content of the documents in the return.
   * @param {string[]} [params.includeFields] - A JSON array of field names to include in search results. Any fields
   * that are included must be indexed with the store:true option. The default is all fields.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {string[]} [params.sort] - Specifies the sort order of the results. In a grouped search (when group_field is
   * used), this parameter specifies the sort order within a group. The default sort order is relevance.  A JSON string
   * of the form "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name
   * of a string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
   * optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
   * ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed fields.
   * Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
   * @param {string} [params.stale] - Do not wait for the index to finish building to return results.
   * @param {string[]} [params.counts] - This field defines an array of names of string fields, for which counts are
   * requested. The response contains counts for each unique value of this field name among the documents that match the
   * search query. Faceting must be enabled for this parameter to function. This option is only available when making
   * global queries.
   * @param {string[][]} [params.drilldown] - Restrict results to documents with a dimension equal to the specified
   * label(s). The search matches only documents containing the value that was provided in the named field. It differs
   * from using "fieldname:value" in the q parameter only in that the values are not analyzed. Faceting must be enabled
   * for this parameter to function.
   * @param {string} [params.groupField] - Field by which to group search matches. A string that contains the name of a
   * string field. Fields containing other data such as numbers, objects, or arrays cannot be used. This option is only
   * available when making global queries.
   * @param {number} [params.groupLimit] - Maximum group count. This field can be used only if group_field is specified.
   * This option is only available when making global queries.
   * @param {string[]} [params.groupSort] - This field defines the order of the groups in a search that uses
   * group_field. The default sort order is relevance. This field can have the same values as the sort field, so single
   * fields and arrays of fields are supported. This option is only available when making global queries.
   * @param {JsonObject} [params.ranges] - Object mapping faceted, numeric search field names to the required ranges.
   * Each key is a field name and each value is another object defining the ranges by mapping range name keys to string
   * values describing the numeric ranges, for example "[0 TO 10]". This option is only available when making global
   * queries.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchResult>>}
   */
  public postSearch(
    params: CloudantV1.PostSearchParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'counts', 'drilldown', 'groupField', 'groupLimit', 'groupSort', 'ranges', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'query': _params.query,
      'bookmark': _params.bookmark,
      'highlight_fields': _params.highlightFields,
      'highlight_number': _params.highlightNumber,
      'highlight_post_tag': _params.highlightPostTag,
      'highlight_pre_tag': _params.highlightPreTag,
      'highlight_size': _params.highlightSize,
      'include_docs': _params.includeDocs,
      'include_fields': _params.includeFields,
      'limit': _params.limit,
      'sort': _params.sort,
      'stale': _params.stale,
      'counts': _params.counts,
      'drilldown': _params.drilldown,
      'group_field': _params.groupField,
      'group_limit': _params.groupLimit,
      'group_sort': _params.groupSort,
      'ranges': _params.ranges,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postSearch');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_search/{index}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SearchResult.deserialize,
    );
  }

  /**
   * Query a search index as stream.
   *
   * Search indexes, which are defined in design documents, allow databases to be queried by using Lucene Query Parser
   * Syntax. An index function defines a search index, similar to a map function in MapReduce views. The index function
   * decides what data to index and what data to store in the index. The advantage of using the HTTP `POST` method is
   * that the query is submitted as a JSON object in the request body. This avoids the limitations of passing query
   * options as URL query parameters of a `GET` request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {string} params.query - The Lucene query to execute.
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {string[]} [params.highlightFields] - Specifies which fields to highlight. If specified, the result object
   * contains a highlights field with an entry for each specified field.
   * @param {number} [params.highlightNumber] - Number of fragments that are returned in highlights. If the search term
   * occurs less often than the number of fragments that are specified, longer fragments are returned.
   * @param {string} [params.highlightPostTag] - A string that is inserted after the highlighted word in the highlights
   * output.
   * @param {string} [params.highlightPreTag] - A string that is inserted before the highlighted word in the highlights
   * output.
   * @param {number} [params.highlightSize] - Number of characters in each fragment for highlights.
   * @param {boolean} [params.includeDocs] - Include the full content of the documents in the return.
   * @param {string[]} [params.includeFields] - A JSON array of field names to include in search results. Any fields
   * that are included must be indexed with the store:true option. The default is all fields.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {string[]} [params.sort] - Specifies the sort order of the results. In a grouped search (when group_field is
   * used), this parameter specifies the sort order within a group. The default sort order is relevance.  A JSON string
   * of the form "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name
   * of a string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
   * optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
   * ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed fields.
   * Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
   * @param {string} [params.stale] - Do not wait for the index to finish building to return results.
   * @param {string[]} [params.counts] - This field defines an array of names of string fields, for which counts are
   * requested. The response contains counts for each unique value of this field name among the documents that match the
   * search query. Faceting must be enabled for this parameter to function. This option is only available when making
   * global queries.
   * @param {string[][]} [params.drilldown] - Restrict results to documents with a dimension equal to the specified
   * label(s). The search matches only documents containing the value that was provided in the named field. It differs
   * from using "fieldname:value" in the q parameter only in that the values are not analyzed. Faceting must be enabled
   * for this parameter to function.
   * @param {string} [params.groupField] - Field by which to group search matches. A string that contains the name of a
   * string field. Fields containing other data such as numbers, objects, or arrays cannot be used. This option is only
   * available when making global queries.
   * @param {number} [params.groupLimit] - Maximum group count. This field can be used only if group_field is specified.
   * This option is only available when making global queries.
   * @param {string[]} [params.groupSort] - This field defines the order of the groups in a search that uses
   * group_field. The default sort order is relevance. This field can have the same values as the sort field, so single
   * fields and arrays of fields are supported. This option is only available when making global queries.
   * @param {JsonObject} [params.ranges] - Object mapping faceted, numeric search field names to the required ranges.
   * Each key is a field name and each value is another object defining the ranges by mapping range name keys to string
   * values describing the numeric ranges, for example "[0 TO 10]". This option is only available when making global
   * queries.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postSearchAsStream(
    params: CloudantV1.PostSearchAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'counts', 'drilldown', 'groupField', 'groupLimit', 'groupSort', 'ranges', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'query': _params.query,
      'bookmark': _params.bookmark,
      'highlight_fields': _params.highlightFields,
      'highlight_number': _params.highlightNumber,
      'highlight_post_tag': _params.highlightPostTag,
      'highlight_pre_tag': _params.highlightPreTag,
      'highlight_size': _params.highlightSize,
      'include_docs': _params.includeDocs,
      'include_fields': _params.includeFields,
      'limit': _params.limit,
      'sort': _params.sort,
      'stale': _params.stale,
      'counts': _params.counts,
      'drilldown': _params.drilldown,
      'group_field': _params.groupField,
      'group_limit': _params.groupLimit,
      'group_sort': _params.groupSort,
      'ranges': _params.ranges,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postSearchAsStream');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_search/{index}',
        method: 'POST',
        body,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve information about the search index disk size.
   *
   * Retrieve size of the search index on disk.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchDiskSizeInformation>>}
   */
  public getSearchDiskSize(
    params: CloudantV1.GetSearchDiskSizeParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchDiskSizeInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index'];
    const _validParams = ['db', 'ddoc', 'index', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSearchDiskSize');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_search_disk_size/{index}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SearchDiskSizeInformation.deserialize,
    );
  }

  /**
   * Retrieve information about a search index.
   *
   * Retrieve search index metadata information, such as the size of the index on disk.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.ddoc - Path parameter to specify the design document name. The design document name is the
   * design document ID excluding the `_design/` prefix.
   * @param {string} params.index - Path parameter to specify the index name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchInfoResult>>}
   */
  public getSearchInfo(
    params: CloudantV1.GetSearchInfoParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchInfoResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index'];
    const _validParams = ['db', 'ddoc', 'index', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSearchInfo');

    const parameters = {
      options: {
        url: '/{db}/_design/{ddoc}/_search_info/{index}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SearchInfoResult.deserialize,
    );
  }
  /*************************
   * replication
   ************************/

  /**
   * Retrieve the HTTP headers for a persistent replication.
   *
   * Retrieves the HTTP headers containing minimal amount of information about the specified replication document from
   * the `_replicator` database.  The method supports the same query arguments as the `GET /_replicator/{doc_id}`
   * method, but only headers like content length and the revision (ETag header) are returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the ID of the stored replication configuration in the
   * `_replicator` database.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headReplicationDocument(
    params: CloudantV1.HeadReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'ifNoneMatch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headReplicationDocument');

    const parameters = {
      options: {
        url: '/_replicator/{doc_id}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve HTTP headers for a replication scheduler document.
   *
   * Retrieves the HTTP headers containing minimal amount of information about the specified replication scheduler
   * document.  Since the response body is empty, using the HEAD method is a lightweight way to check if the replication
   * scheduler document exists or not.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headSchedulerDocument(
    params: CloudantV1.HeadSchedulerDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headSchedulerDocument');

    const parameters = {
      options: {
        url: '/_scheduler/docs/_replicator/{doc_id}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve the HTTP headers for a replication scheduler job.
   *
   * Returns the HTTP headers that contain a minimal amount of information about the specified replication task. Only
   * the header information is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - Path parameter to specify the replication job id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headSchedulerJob(
    params: CloudantV1.HeadSchedulerJobParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headSchedulerJob');

    const parameters = {
      options: {
        url: '/_scheduler/jobs/{job_id}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a persistent replication with a generated ID.
   *
   * Creates or modifies a document in the `_replicator` database to start a new replication or to edit an existing
   * replication.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ReplicationDocument} params.replicationDocument - HTTP request body for replication operations.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public postReplicator(
    params: CloudantV1.PostReplicatorParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['replicationDocument'];
    const _validParams = ['replicationDocument', 'batch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.ReplicationDocument.serialize(_params.replicationDocument);
    const query = {
      'batch': _params.batch,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postReplicator');

    const parameters = {
      options: {
        url: '/_replicator',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Cancel a persistent replication.
   *
   * Cancels a replication by deleting the document that describes it from the `_replicator` database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the ID of the stored replication configuration in the
   * `_replicator` database.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public deleteReplicationDocument(
    params: CloudantV1.DeleteReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'ifMatch', 'batch', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'batch': _params.batch,
      'rev': _params.rev,
    };

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteReplicationDocument');

    const parameters = {
      options: {
        url: '/_replicator/{doc_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve the configuration for a persistent replication.
   *
   * Retrieves a replication document from the `_replicator` database to view the configuration of the replication. The
   * status of the replication is no longer recorded in the document but can be checked via the replication scheduler.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the ID of the stored replication configuration in the
   * `_replicator` database.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.conflicts] - Query parameter to specify whether to include a list of conflicted revisions
   * in each returned document. Active only when `include_docs` is `true`.
   * @param {boolean} [params.deletedConflicts] - Query parameter to specify whether to include a list of deleted
   * conflicted revisions in the `_deleted_conflicts` property of the returned document.
   * @param {boolean} [params.latest] - Query parameter to specify whether to force retrieving latest leaf revision, no
   * matter what rev was requested.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {boolean} [params.meta] - Query parameter to specify whether to include document meta information. Acts the
   * same as specifying all of the conflicts, deleted_conflicts and open_revs query parameters.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {boolean} [params.revs] - Query parameter to specify whether to include a list of all known document
   * revisions.
   * @param {boolean} [params.revsInfo] - Query parameter to specify whether to includes detailed information for all
   * known document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ReplicationDocument>>}
   */
  public getReplicationDocument(
    params: CloudantV1.GetReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.ReplicationDocument>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'conflicts': _params.conflicts,
      'deleted_conflicts': _params.deletedConflicts,
      'latest': _params.latest,
      'local_seq': _params.localSeq,
      'meta': _params.meta,
      'rev': _params.rev,
      'revs': _params.revs,
      'revs_info': _params.revsInfo,
    };

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getReplicationDocument');

    const parameters = {
      options: {
        url: '/_replicator/{doc_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ReplicationDocument.deserialize,
    );
  }

  /**
   * Create or modify a persistent replication.
   *
   * Creates or modifies a document in the `_replicator` database to start a new replication or to edit an existing
   * replication.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the ID of the stored replication configuration in the
   * `_replicator` database.
   * @param {ReplicationDocument} params.replicationDocument - HTTP request body for replication operations.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   *
   * Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it is
   * very easy to accidentally end up with a large number of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putReplicationDocument(
    params: CloudantV1.PutReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['docId', 'replicationDocument'];
    const _validParams = ['docId', 'replicationDocument', 'ifMatch', 'batch', 'newEdits', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.ReplicationDocument.serialize(_params.replicationDocument);
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putReplicationDocument');

    const parameters = {
      options: {
        url: '/_replicator/{doc_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve replication scheduler documents.
   *
   * Lists replication documents, including information about all documents, even the ones in a completed or failed
   * state. For each document, the endpoint returns the document ID, database, replication ID, source and target, and
   * other information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Query parameter to specify the number of returned documents to limit the result
   * to.
   * @param {number} [params.skip] - Query parameter to specify the number of records before starting to return the
   * results.
   * @param {string[]} [params.states] - Query parameter to include only replication documents in the specified states.
   * String must be a comma-delimited string.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SchedulerDocsResult>>}
   */
  public getSchedulerDocs(
    params?: CloudantV1.GetSchedulerDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.SchedulerDocsResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['limit', 'skip', 'states', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'skip': _params.skip,
      'states': _params.states,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchedulerDocs');

    const parameters = {
      options: {
        url: '/_scheduler/docs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SchedulerDocsResult.deserialize,
    );
  }

  /**
   * Retrieve a replication scheduler document.
   *
   * Retrieves information about a replication document from the replicator database. The endpoint returns the document
   * ID, database, replication ID, source and target, and other information.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SchedulerDocument>>}
   */
  public getSchedulerDocument(
    params: CloudantV1.GetSchedulerDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.SchedulerDocument>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchedulerDocument');

    const parameters = {
      options: {
        url: '/_scheduler/docs/_replicator/{doc_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SchedulerDocument.deserialize,
    );
  }

  /**
   * Retrieve replication scheduler jobs.
   *
   * Retrieves information about replications that were created via `/_replicate` endpoint, as well as those created
   * from replication documents. It doesn't include replications that completed or failed to start because replication
   * documents were malformed. Each job description includes source and target information, replication ID, history of
   * recent events, and other information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Query parameter to specify the number of returned jobs to limit the result to.
   * @param {number} [params.skip] - Query parameter to specify the number of records before starting to return the
   * results.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SchedulerJobsResult>>}
   */
  public getSchedulerJobs(
    params?: CloudantV1.GetSchedulerJobsParams
  ): Promise<CloudantV1.Response<CloudantV1.SchedulerJobsResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['limit', 'skip', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'skip': _params.skip,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchedulerJobs');

    const parameters = {
      options: {
        url: '/_scheduler/jobs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SchedulerJobsResult.deserialize,
    );
  }

  /**
   * Retrieve a replication scheduler job.
   *
   * Retrieves the state of a single replication task based on its replication ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - Path parameter to specify the replication job id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SchedulerJob>>}
   */
  public getSchedulerJob(
    params: CloudantV1.GetSchedulerJobParams
  ): Promise<CloudantV1.Response<CloudantV1.SchedulerJob>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchedulerJob');

    const parameters = {
      options: {
        url: '/_scheduler/jobs/{job_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SchedulerJob.deserialize,
    );
  }
  /*************************
   * authentication
   ************************/

  /**
   * Retrieve current session cookie information.
   *
   * Retrieves information about the authenticated user's session.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SessionInformation>>}
   */
  public getSessionInformation(
    params?: CloudantV1.GetSessionInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.SessionInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSessionInformation');

    const parameters = {
      options: {
        url: '/_session',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.SessionInformation.deserialize,
    );
  }
  /*************************
   * authorization
   ************************/

  /**
   * Generates API keys for apps or persons to enable database access.
   *
   * Generates API keys to enable database access for a person or application, but without creating a new IBM Cloudant
   * account for that person or application. An API key is a randomly generated username and password. The key is given
   * the wanted access permissions for a database.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ApiKeysResult>>}
   */
  public postApiKeys(
    params?: CloudantV1.PostApiKeysParams
  ): Promise<CloudantV1.Response<CloudantV1.ApiKeysResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postApiKeys');

    const parameters = {
      options: {
        url: '/_api/v2/api_keys',
        method: 'POST',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ApiKeysResult.deserialize,
    );
  }

  /**
   * Modify only Cloudant related database permissions.
   *
   * Modify only Cloudant related permissions to database. Be careful: by removing an API key from the list, you remove
   * the API key from the list of users that have access to the database.
   *
   * ### Note about nobody role
   *
   * The `nobody` username applies to all unauthenticated connection attempts. For example, if an application tries to
   * read data from a database, but did not identify itself, the task can continue only if the `nobody` user has the
   * role `_reader`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {JsonObject} params.cloudant - Database permissions for Cloudant users and/or API keys.
   * @param {SecurityObject} [params.admins] - Schema for names and roles to map to a database permission.
   * @param {boolean} [params.couchdbAuthOnly] - Manage permissions using the `_users` database only.
   * @param {SecurityObject} [params.members] - Schema for names and roles to map to a database permission.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putCloudantSecurityConfiguration(
    params: CloudantV1.PutCloudantSecurityConfigurationParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'cloudant'];
    const _validParams = ['db', 'cloudant', 'admins', 'couchdbAuthOnly', 'members', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cloudant': _params.cloudant,
      'admins': CloudantV1.SecurityObject.serialize(_params.admins),
      'couchdb_auth_only': _params.couchdbAuthOnly,
      'members': CloudantV1.SecurityObject.serialize(_params.members),
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putCloudantSecurityConfiguration');

    const parameters = {
      options: {
        url: '/_api/v2/db/{db}/_security',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }

  /**
   * Retrieve database permissions information.
   *
   * See who has permission to read, write, and manage the database. The credentials you use to log in to the dashboard
   * automatically include `_admin` permissions to all databases you create. Everyone and everything else, including
   * users you share databases with and API keys you create, must be given a permission level explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Security>>}
   */
  public getSecurity(
    params: CloudantV1.GetSecurityParams
  ): Promise<CloudantV1.Response<CloudantV1.Security>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurity');

    const parameters = {
      options: {
        url: '/{db}/_security',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Security.deserialize,
    );
  }

  /**
   * Modify database permissions.
   *
   * Modify who has permission to read, write, or manage a database. This endpoint can be used to modify both Cloudant
   * and CouchDB related permissions. Be careful: by removing a Cloudant API key, a member or an admin from the list of
   * users that have access permissions, you remove it from the list of users that have access to the database.
   *
   * ### Note about nobody role
   *
   * The `nobody` username applies to all unauthenticated connection attempts. For example, if an application tries to
   * read data from a database, but did not identify itself, the task can continue only if the `nobody` user has the
   * role `_reader`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {SecurityObject} [params.admins] - Schema for names and roles to map to a database permission.
   * @param {JsonObject} [params.cloudant] - Database permissions for Cloudant users and/or API keys.
   * @param {boolean} [params.couchdbAuthOnly] - Manage permissions using the `_users` database only.
   * @param {SecurityObject} [params.members] - Schema for names and roles to map to a database permission.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putSecurity(
    params: CloudantV1.PutSecurityParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'admins', 'cloudant', 'couchdbAuthOnly', 'members', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'admins': CloudantV1.SecurityObject.serialize(_params.admins),
      'cloudant': _params.cloudant,
      'couchdb_auth_only': _params.couchdbAuthOnly,
      'members': CloudantV1.SecurityObject.serialize(_params.members),
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putSecurity');

    const parameters = {
      options: {
        url: '/{db}/_security',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }
  /*************************
   * cORS
   ************************/

  /**
   * Retrieve CORS configuration information.
   *
   * Lists all Cross-origin resource sharing (CORS) configuration. CORS defines a way in which the browser and the
   * server interact to determine whether or not to allow the request.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CorsInformation>>}
   */
  public getCorsInformation(
    params?: CloudantV1.GetCorsInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.CorsInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCorsInformation');

    const parameters = {
      options: {
        url: '/_api/v2/user/config/cors',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CorsInformation.deserialize,
    );
  }

  /**
   * Modify CORS configuration.
   *
   * Sets the CORS configuration. The configuration applies to all databases and all account level endpoints in your
   * account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.origins - An array of strings that contain allowed origin domains. You have to specify the
   * full URL including the protocol. It is recommended that only the HTTPS protocol is used. Subdomains count as
   * separate domains, so you have to specify all subdomains used.
   * @param {boolean} [params.allowCredentials] - Boolean value to allow authentication credentials. If set to true,
   * browser requests must be done by using withCredentials = true.
   * @param {boolean} [params.enableCors] - Boolean value to turn CORS on and off.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putCorsConfiguration(
    params: CloudantV1.PutCorsConfigurationParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['origins'];
    const _validParams = ['origins', 'allowCredentials', 'enableCors', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origins': _params.origins,
      'allow_credentials': _params.allowCredentials,
      'enable_cors': _params.enableCors,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putCorsConfiguration');

    const parameters = {
      options: {
        url: '/_api/v2/user/config/cors',
        method: 'PUT',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }
  /*************************
   * attachments
   ************************/

  /**
   * Retrieve the HTTP headers for an attachment.
   *
   * Returns the HTTP headers that contain a minimal amount of information about the specified attachment. This method
   * supports the same query arguments as the `GET /{db}/{doc_id}/{attachment_name}` method, but only the header
   * information (including attachment size, encoding, and the MD5 hash as an ETag), is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} params.attachmentName - Path parameter to specify the attachment name.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headAttachment(
    params: CloudantV1.HeadAttachmentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName'];
    const _validParams = ['db', 'docId', 'attachmentName', 'ifMatch', 'ifNoneMatch', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
      'attachment_name': _params.attachmentName,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headAttachment');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}/{attachment_name}',
        method: 'HEAD',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'If-Match': _params.ifMatch,
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an attachment.
   *
   * Deletes the attachment with the filename, `{attachment_name}`, from the specified doc. You must supply the `rev`
   * query parameter or `If-Match` header with the current revision to delete the attachment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} params.attachmentName - Path parameter to specify the attachment name.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public deleteAttachment(
    params: CloudantV1.DeleteAttachmentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName'];
    const _validParams = ['db', 'docId', 'attachmentName', 'ifMatch', 'rev', 'batch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'rev': _params.rev,
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
      'attachment_name': _params.attachmentName,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAttachment');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}/{attachment_name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve an attachment.
   *
   * Returns the file attachment that is associated with the document. The raw data of the associated attachment is
   * returned, just as if you were accessing a static file. The returned Content-Type header is the same as the content
   * type set when the document attachment was submitted to the database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} params.attachmentName - Path parameter to specify the attachment name.
   * @param {string} [params.accept] - The type of the response: *_/_*.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {string} [params.range] - Header parameter to specify the byte range for a request. This allows the
   * implementation of resumable downloads and skippable streams. This is available for all attachments inside CouchDB.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public getAttachment(
    params: CloudantV1.GetAttachmentParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName'];
    const _validParams = ['db', 'docId', 'attachmentName', 'accept', 'ifMatch', 'ifNoneMatch', 'range', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
      'attachment_name': _params.attachmentName,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getAttachment');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}/{attachment_name}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': _params.accept,
            'If-Match': _params.ifMatch,
            'If-None-Match': _params.ifNoneMatch,
            'Range': _params.range,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create or modify an attachment.
   *
   * Uploads the supplied content as an attachment to the specified document. The attachment name that you provide must
   * be a URL encoded string. You must supply the Content-Type header, and for an existing document, you must also
   * supply either the `rev` query argument or the `If-Match` HTTP header. If you omit the revision, a new, otherwise
   * empty, document is created with the provided attachment, or a conflict occurs. If the uploaded attachment uses an
   * existing attachment name in the remote database, it updates the corresponding stored content of the database. Since
   * you must supply the revision information to add an attachment to the document, this serves as validation to update
   * the existing attachment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} params.attachmentName - Path parameter to specify the attachment name.
   * @param {NodeJS.ReadableStream | Buffer} params.attachment - HTTP request body for attachment operations.
   * @param {string} params.contentType - Content-Type of the attachment.
   * @param {string} [params.ifMatch] - Header parameter for a conditional HTTP request matching an ETag.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putAttachment(
    params: CloudantV1.PutAttachmentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName', 'attachment', 'contentType'];
    const _validParams = ['db', 'docId', 'attachmentName', 'attachment', 'contentType', 'ifMatch', 'rev', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.attachment;
    const query = {
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
      'attachment_name': _params.attachmentName,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putAttachment');

    const parameters = {
      options: {
        url: '/{db}/{doc_id}/{attachment_name}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }
  /*************************
   * localDocuments
   ************************/

  /**
   * Retrieve HTTP headers for a local document.
   *
   * Retrieves the HTTP headers containing minimal amount of information about the specified local document. Since the
   * response body is empty, using the HEAD method is a lightweight way to check if the local document exists or not.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headLocalDocument(
    params: CloudantV1.HeadLocalDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headLocalDocument');

    const parameters = {
      options: {
        url: '/{db}/_local/{doc_id}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a local document.
   *
   * Deletes the specified local document. The semantics are identical to deleting a standard document in the specified
   * database, except that the document is not replicated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public deleteLocalDocument(
    params: CloudantV1.DeleteLocalDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'batch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLocalDocument');

    const parameters = {
      options: {
        url: '/{db}/_local/{doc_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }

  /**
   * Retrieve a local document.
   *
   * Retrieves the specified local document. The semantics are identical to accessing a standard document in the
   * specified database, except that the document is not replicated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.accept] - The type of the response: application/json, multipart/mixed, multipart/related,
   * or application/octet-stream.
   * @param {string} [params.ifNoneMatch] - Header parameter for a conditional HTTP request not matching an ETag.
   * @param {boolean} [params.attachments] - Query parameter to specify whether to include attachments bodies in a
   * response.
   * @param {boolean} [params.attEncodingInfo] - Query parameter to specify whether to include the encoding information
   * in attachment stubs if the particular attachment is compressed.
   * @param {boolean} [params.localSeq] - Query parameter to specify whether to include the last update sequence for the
   * document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Document>>}
   */
  public getLocalDocument(
    params: CloudantV1.GetLocalDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.Document>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'accept', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'localSeq', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachments': _params.attachments,
      'att_encoding_info': _params.attEncodingInfo,
      'local_seq': _params.localSeq,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getLocalDocument');

    const parameters = {
      options: {
        url: '/{db}/_local/{doc_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': _params.accept,
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Document.deserialize,
    );
  }

  /**
   * Create or modify a local document.
   *
   * Stores the specified local document. The semantics are identical to storing a standard document in the specified
   * database, except that the document is not replicated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {Document | NodeJS.ReadableStream | Buffer} params.document - HTTP request body for Document operations.
   * @param {string} [params.contentType] - The type of the input.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putLocalDocument(
    params: CloudantV1.PutLocalDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'document'];
    const _validParams = ['db', 'docId', 'document', 'contentType', 'batch', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = CloudantV1.Document.serialize(_params.document);
    const query = {
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'putLocalDocument');

    const parameters = {
      options: {
        url: '/{db}/_local/{doc_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentResult.deserialize,
    );
  }
  /*************************
   * databaseDetails
   ************************/

  /**
   * Query the document revisions and possible ancestors missing from the database.
   *
   * The replicator is the primary user of this operation. After receiving a set of new revision IDs from the source
   * database, the replicator sends this set to the destination database's `_revs_diff` to find out which of them
   * already exists there. It can then avoid fetching and sending already-known document bodies.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {JsonObject} params.documentRevisions - HTTP request body for operations with Document revisions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.JsonObject>>}
   */
  public postRevsDiff(
    params: CloudantV1.PostRevsDiffParams
  ): Promise<CloudantV1.Response<CloudantV1.JsonObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'documentRevisions'];
    const _validParams = ['db', 'documentRevisions', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.documentRevisions;
    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postRevsDiff');

    const parameters = {
      options: {
        url: '/{db}/_revs_diff',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.RevsDiff.deserialize,
      true
    );
  }

  /**
   * Retrieve shard information.
   *
   * List each shard range and the corresponding replicas for a specified database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ShardsInformation>>}
   */
  public getShardsInformation(
    params: CloudantV1.GetShardsInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.ShardsInformation>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getShardsInformation');

    const parameters = {
      options: {
        url: '/{db}/_shards',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ShardsInformation.deserialize,
    );
  }

  /**
   * Retrieve shard information for a specific document.
   *
   * Retrieves information about a specific shard where a particular document is stored, along with information about
   * the nodes where that shard has a replica.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentShardInfo>>}
   */
  public getDocumentShardsInfo(
    params: CloudantV1.GetDocumentShardsInfoParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentShardInfo>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocumentShardsInfo');

    const parameters = {
      options: {
        url: '/{db}/_shards/{doc_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.DocumentShardInfo.deserialize,
    );
  }
  /*************************
   * monitoring
   ************************/

  /**
   * Retrieve HTTP headers about whether the server is up.
   *
   * Retrieves the HTTP headers about whether the server is up.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headUpInformation(
    params?: CloudantV1.HeadUpInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'headUpInformation');

    const parameters = {
      options: {
        url: '/_up',
        method: 'HEAD',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve list of running tasks.
   *
   * Lists running tasks, including the task type, name, status, and process ID. The result includes a JSON array of the
   * currently running tasks, with each task described as a single object. Depending on the operation type, the set of
   * response object fields might be different.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ActiveTask[]>>}
   */
  public getActiveTasks(
    params?: CloudantV1.GetActiveTasksParams
  ): Promise<CloudantV1.Response<CloudantV1.ActiveTask[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getActiveTasks');

    const parameters = {
      options: {
        url: '/_active_tasks',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ActiveTask.deserialize,
    );
  }

  /**
   * Retrieve activity tracking events information.
   *
   * Check event types sent to IBM Cloud Activity Tracker Event Routing for the IBM Cloudant instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.ActivityTrackerEvents>>}
   */
  public getActivityTrackerEvents(
    params?: CloudantV1.GetActivityTrackerEventsParams
  ): Promise<CloudantV1.Response<CloudantV1.ActivityTrackerEvents>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getActivityTrackerEvents');

    const parameters = {
      options: {
        url: '/_api/v2/user/activity_tracker/events',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.ActivityTrackerEvents.deserialize,
    );
  }

  /**
   * Modify activity tracking events configuration.
   *
   * Configure event types sent to IBM Cloud Activity Tracker Event Routing for the IBM Cloudant instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.types - An array of event types sent to IBM Cloud Activity Tracker Event Routing for the
   * IBM Cloudant instance. "management" is a required element of this array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public postActivityTrackerEvents(
    params: CloudantV1.PostActivityTrackerEventsParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['types'];
    const _validParams = ['types', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'types': _params.types,
    };

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'postActivityTrackerEvents');

    const parameters = {
      options: {
        url: '/_api/v2/user/activity_tracker/events',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.Ok.deserialize,
    );
  }

  /**
   * Retrieve maximum allowed database count.
   *
   * Retrieves the maximum number of databases currently allowed in the instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CapacityDatabasesInformation>>}
   */
  public getCapacityDatabasesInformation(
    params?: CloudantV1.GetCapacityDatabasesInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.CapacityDatabasesInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCapacityDatabasesInformation');

    const parameters = {
      options: {
        url: '/_api/v2/user/capacity/databases',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CapacityDatabasesInformation.deserialize,
    );
  }

  /**
   * Retrieve current database count.
   *
   * Retrieves the current number of databases that exist in the instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CurrentDatabasesInformation>>}
   */
  public getCurrentDatabasesInformation(
    params?: CloudantV1.GetCurrentDatabasesInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.CurrentDatabasesInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCurrentDatabasesInformation');

    const parameters = {
      options: {
        url: '/_api/v2/user/current/databases',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CurrentDatabasesInformation.deserialize,
    );
  }

  /**
   * Retrieve the current provisioned throughput capacity consumption.
   *
   * View the current consumption of provisioned throughput capacity for an IBM Cloudant instance. The current
   * consumption shows the quantities of reads, writes, and global queries conducted against the instance for a given
   * second.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CurrentThroughputInformation>>}
   */
  public getCurrentThroughputInformation(
    params?: CloudantV1.GetCurrentThroughputInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.CurrentThroughputInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCurrentThroughputInformation');

    const parameters = {
      options: {
        url: '/_api/v2/user/current/throughput',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.CurrentThroughputInformation.deserialize,
    );
  }

  /**
   * Retrieve cluster membership information.
   *
   * Displays the nodes that are part of the cluster as `cluster_nodes`. The field, `all_nodes`, displays all nodes this
   * node knows about, including the ones that are part of the cluster. This endpoint is useful when you set up a
   * cluster.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.MembershipInformation>>}
   */
  public getMembershipInformation(
    params?: CloudantV1.GetMembershipInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.MembershipInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getMembershipInformation');

    const parameters = {
      options: {
        url: '/_membership',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.MembershipInformation.deserialize,
    );
  }

  /**
   * Retrieve information about whether the server is up.
   *
   * Confirms that the server is up, running, and ready to respond to requests. If `maintenance_mode` is `true` or
   * `nolb`, the endpoint returns a 404 response.
   *
   * **Tip:**  The authentication for this endpoint is only enforced when using IAM.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.UpInformation>>}
   */
  public getUpInformation(
    params?: CloudantV1.GetUpInformationParams
  ): Promise<CloudantV1.Response<CloudantV1.UpInformation>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CloudantV1.DEFAULT_SERVICE_NAME, 'v1', 'getUpInformation');

    const parameters = {
      options: {
        url: '/_up',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequestAndDeserializeResponse(
      parameters,
      CloudantV1.UpInformation.deserialize,
    );
  }
}

/*************************
 * interfaces
 ************************/

namespace CloudantV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export class JsonObject {
    [key: string]: any;

    static serialize(obj) { return obj; }

    static deserialize(obj) { return obj; }
  }

  /*************************
   * request interfaces
   ************************/

   interface DefaultParams {
     headers?: OutgoingHttpHeaders;
     signal?: AbortSignal;
   }

  /** Parameters for the `getServerInformation` operation. */
  export interface GetServerInformationParams extends DefaultParams {
  }

  /** Parameters for the `getCapacityThroughputInformation` operation. */
  export interface GetCapacityThroughputInformationParams extends DefaultParams {
  }

  /** Parameters for the `putCapacityThroughputConfiguration` operation. */
  export interface PutCapacityThroughputConfigurationParams extends DefaultParams {
    /** A number of blocks of throughput units. A block consists of 100 reads/sec, 50 writes/sec, and 5 global
     *  queries/sec of provisioned throughput capacity. Not available for some plans.
     */
    blocks: number;
  }

  /** Parameters for the `getUuids` operation. */
  export interface GetUuidsParams extends DefaultParams {
    /** Query parameter to specify the number of UUIDs to return. */
    count?: number;
  }

  /** Parameters for the `getDbUpdates` operation. */
  export interface GetDbUpdatesParams extends DefaultParams {
    /** Query parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Query parameter to specify the changes feed type. */
    feed?: GetDbUpdatesConstants.Feed | string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Off
     *  by default and only applicable for
     *  `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be
     *  `true` to use a value of `60000`.
     *
     *  **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
     *  environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
     *  Instead, consider one of the following options:
     *    * Use the `timeout` parameter with a value that is compatible with your network environment.
     *    * Switch to scheduled usage of one of the non-continuous changes feed types
     *      (`normal` or `longpoll`).
     *    * Use TCP keepalive.
     */
    heartbeat?: number;
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify the maximum period in milliseconds to wait for a change before the response is
     *  sent, even if there are no results. Only applicable for `longpoll` or `continuous` feeds. Default value is
     *  specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also the default maximum
     *  timeout to prevent undetected dead connections.
     */
    timeout?: number;
    /** Query parameter to specify to start the results from the change immediately after the given update sequence.
     *  Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
     */
    since?: string;
  }

  /** Constants for the `getDbUpdates` operation. */
  export namespace GetDbUpdatesConstants {
    /** Query parameter to specify the changes feed type. */
    export enum Feed {
      CONTINUOUS = 'continuous',
      EVENTSOURCE = 'eventsource',
      LONGPOLL = 'longpoll',
      NORMAL = 'normal',
    }
  }

  /** Parameters for the `postChanges` operation. */
  export interface PostChangesParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a list of document IDs. */
    docIds?: string[];
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector?: JsonObject;
    /** Header parameter to specify the ID of the last events received by the server on a previous connection.
     *  Overrides `since` query parameter.
     */
    lastEventId?: string;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Query parameter to specify the changes feed type. */
    feed?: PostChangesConstants.Feed | string;
    /** Query parameter to specify a filter to emit only specific events from the changes stream.
     *
     *  The built-in filter types are:
     *    * `_design` - Returns only changes to design documents.
     *    * `_doc_ids` - Returns changes for documents with an ID matching one specified in
     *        `doc_ids` request body parameter. (`POST` only)
     *    * `_selector` - Returns changes for documents that match the `selector`
     *        request body parameter. The selector syntax is the same as used for
     *        `_find`. (`POST` only)
     *    * `_view` - Returns changes for documents that match an existing map
     *        function in the view specified by the query parameter `view`.
     *
     *  Additionally, the value can be the name of a JS filter function from a design document. For example:
     *  `design_doc/filtername`.
     *
     *  **Note:** For better performance use the built-in `_selector`, `_design` or `_doc_ids` filters rather than JS
     *  based `_view` or design document filters. If you need to pass values to change the filtered content use the
     *  `_selector` filter type.
     */
    filter?: string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Off
     *  by default and only applicable for
     *  `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be
     *  `true` to use a value of `60000`.
     *
     *  **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
     *  environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
     *  Instead, consider one of the following options:
     *    * Use the `timeout` parameter with a value that is compatible with your network environment.
     *    * Switch to scheduled usage of one of the non-continuous changes feed types
     *      (`normal` or `longpoll`).
     *    * Use TCP keepalive.
     */
    heartbeat?: number;
    /** Query parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify that the update seq should only be calculated with every Nth result returned.
     *  When fetching changes in a batch, setting <code>seq_interval=&lt;batch size&gt;</code>, where &lt;batch size&gt;
     *  is the number of results requested per batch, load can be reduced on the source database as computing the seq
     *  value across many shards (especially in highly-sharded databases) is expensive.
     */
    seqInterval?: number;
    /** Query parameter to specify to start the results from the change immediately after the given update sequence.
     *  Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
     */
    since?: string;
    /** Query parameter to specify how many revisions are returned in the changes array. The default, `main_only`,
     *  will only return the current "winning" revision; all_docs will return all leaf revisions (including conflicts
     *  and deleted former conflicts).
     */
    style?: PostChangesConstants.Style | string;
    /** Query parameter to specify the maximum period in milliseconds to wait for a change before the response is
     *  sent, even if there are no results. Only applicable for `longpoll` or `continuous` feeds. Default value is
     *  specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also the default maximum
     *  timeout to prevent undetected dead connections.
     */
    timeout?: number;
    /** Query parameter to specify a view function as a filter. Documents pass the filter if the view's map function
     *  emits at least one record for them.
     */
    view?: string;
  }

  /** Constants for the `postChanges` operation. */
  export namespace PostChangesConstants {
    /** Query parameter to specify the changes feed type. */
    export enum Feed {
      CONTINUOUS = 'continuous',
      EVENTSOURCE = 'eventsource',
      LONGPOLL = 'longpoll',
      NORMAL = 'normal',
    }
    /** Query parameter to specify how many revisions are returned in the changes array. The default, `main_only`, will only return the current "winning" revision; all_docs will return all leaf revisions (including conflicts and deleted former conflicts). */
    export enum Style {
      MAIN_ONLY = 'main_only',
      ALL_DOCS = 'all_docs',
    }
  }

  /** Parameters for the `postChangesAsStream` operation. */
  export interface PostChangesAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a list of document IDs. */
    docIds?: string[];
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector?: JsonObject;
    /** Header parameter to specify the ID of the last events received by the server on a previous connection.
     *  Overrides `since` query parameter.
     */
    lastEventId?: string;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Query parameter to specify the changes feed type. */
    feed?: PostChangesAsStreamConstants.Feed | string;
    /** Query parameter to specify a filter to emit only specific events from the changes stream.
     *
     *  The built-in filter types are:
     *    * `_design` - Returns only changes to design documents.
     *    * `_doc_ids` - Returns changes for documents with an ID matching one specified in
     *        `doc_ids` request body parameter. (`POST` only)
     *    * `_selector` - Returns changes for documents that match the `selector`
     *        request body parameter. The selector syntax is the same as used for
     *        `_find`. (`POST` only)
     *    * `_view` - Returns changes for documents that match an existing map
     *        function in the view specified by the query parameter `view`.
     *
     *  Additionally, the value can be the name of a JS filter function from a design document. For example:
     *  `design_doc/filtername`.
     *
     *  **Note:** For better performance use the built-in `_selector`, `_design` or `_doc_ids` filters rather than JS
     *  based `_view` or design document filters. If you need to pass values to change the filtered content use the
     *  `_selector` filter type.
     */
    filter?: string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Off
     *  by default and only applicable for
     *  `continuous` and `eventsource` feeds. Overrides any timeout to keep the feed alive indefinitely. May also be
     *  `true` to use a value of `60000`.
     *
     *  **Note:** Delivery of heartbeats cannot be relied on at specific intervals. If your application runs in an
     *  environment where idle network connections may break, `heartbeat` is not suitable as a keepalive mechanism.
     *  Instead, consider one of the following options:
     *    * Use the `timeout` parameter with a value that is compatible with your network environment.
     *    * Switch to scheduled usage of one of the non-continuous changes feed types
     *      (`normal` or `longpoll`).
     *    * Use TCP keepalive.
     */
    heartbeat?: number;
    /** Query parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify that the update seq should only be calculated with every Nth result returned.
     *  When fetching changes in a batch, setting <code>seq_interval=&lt;batch size&gt;</code>, where &lt;batch size&gt;
     *  is the number of results requested per batch, load can be reduced on the source database as computing the seq
     *  value across many shards (especially in highly-sharded databases) is expensive.
     */
    seqInterval?: number;
    /** Query parameter to specify to start the results from the change immediately after the given update sequence.
     *  Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
     */
    since?: string;
    /** Query parameter to specify how many revisions are returned in the changes array. The default, `main_only`,
     *  will only return the current "winning" revision; all_docs will return all leaf revisions (including conflicts
     *  and deleted former conflicts).
     */
    style?: PostChangesAsStreamConstants.Style | string;
    /** Query parameter to specify the maximum period in milliseconds to wait for a change before the response is
     *  sent, even if there are no results. Only applicable for `longpoll` or `continuous` feeds. Default value is
     *  specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also the default maximum
     *  timeout to prevent undetected dead connections.
     */
    timeout?: number;
    /** Query parameter to specify a view function as a filter. Documents pass the filter if the view's map function
     *  emits at least one record for them.
     */
    view?: string;
  }

  /** Constants for the `postChangesAsStream` operation. */
  export namespace PostChangesAsStreamConstants {
    /** Query parameter to specify the changes feed type. */
    export enum Feed {
      CONTINUOUS = 'continuous',
      EVENTSOURCE = 'eventsource',
      LONGPOLL = 'longpoll',
      NORMAL = 'normal',
    }
    /** Query parameter to specify how many revisions are returned in the changes array. The default, `main_only`, will only return the current "winning" revision; all_docs will return all leaf revisions (including conflicts and deleted former conflicts). */
    export enum Style {
      MAIN_ONLY = 'main_only',
      ALL_DOCS = 'all_docs',
    }
  }

  /** Parameters for the `headDatabase` operation. */
  export interface HeadDatabaseParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `getAllDbs` operation. */
  export interface GetAllDbsParams extends DefaultParams {
    /** Query parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Query parameter to specify to stop returning records when the specified key is reached. String
     *  representation of any JSON type that matches the key type emitted by the view function.
     */
    endKey?: string;
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Query parameter to specify to start returning records from the specified key. String representation of any
     *  JSON type that matches the key type emitted by the view function.
     */
    startKey?: string;
  }

  /** Parameters for the `postDbsInfo` operation. */
  export interface PostDbsInfoParams extends DefaultParams {
    /** A list of database names. */
    keys: string[];
  }

  /** Parameters for the `deleteDatabase` operation. */
  export interface DeleteDatabaseParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `getDatabaseInformation` operation. */
  export interface GetDatabaseInformationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `putDatabase` operation. */
  export interface PutDatabaseParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Query parameter to specify whether to enable database partitions when creating a database.
     *
     *  Before using read the
     *  [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning#partitioned-databases-database-partitioning)
     *  to understand the limitations and appropriate use cases.
     */
    partitioned?: boolean;
    /** The number of shards in the database. Each shard is a partition of the hash value range. Cloudant recommends
     *  using the default value for most databases. However, if your database is expected to be larger than 250 GB or
     *  have a lot of indexes, you may need to adjust the settings. In these cases, it's best to reach out to IBM
     *  Cloudant customer support for guidance on how to meet your specific needs and requirements.
     */
    q?: number;
  }

  /** Parameters for the `headDocument` operation. */
  export interface HeadDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Parameters for the `postDocument` operation. */
  export interface PostDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** HTTP request body for Document operations. */
    document: Document | NodeJS.ReadableStream | Buffer;
    /** The type of the input. */
    contentType?: PostDocumentConstants.ContentType | string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PostDocumentConstants.Batch | string;
  }

  /** Constants for the `postDocument` operation. */
  export namespace PostDocumentConstants {
    /** The type of the input. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      MULTIPART_MIXED = 'multipart/mixed',
      MULTIPART_RELATED = 'multipart/related',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `postAllDocs` operation. */
  export interface PostAllDocsParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for a document ID. */
    endKey?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    startKey?: string;
  }

  /** Parameters for the `postAllDocsAsStream` operation. */
  export interface PostAllDocsAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for a document ID. */
    endKey?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    startKey?: string;
  }

  /** Parameters for the `postAllDocsQueries` operation. */
  export interface PostAllDocsQueriesParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
  }

  /** Parameters for the `postAllDocsQueriesAsStream` operation. */
  export interface PostAllDocsQueriesAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
  }

  /** Parameters for the `postBulkDocs` operation. */
  export interface PostBulkDocsParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** HTTP request body for postBulkDocs. */
    bulkDocs: BulkDocs | NodeJS.ReadableStream | Buffer;
  }

  /** Parameters for the `postBulkGet` operation. */
  export interface PostBulkGetParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** List of document items to get in bulk. */
    docs: BulkGetQueryDocument[];
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
  }

  /** Parameters for the `postBulkGetAsMixed` operation. */
  export interface PostBulkGetAsMixedParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** List of document items to get in bulk. */
    docs: BulkGetQueryDocument[];
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
  }

  /** Parameters for the `postBulkGetAsRelated` operation. */
  export interface PostBulkGetAsRelatedParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** List of document items to get in bulk. */
    docs: BulkGetQueryDocument[];
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
  }

  /** Parameters for the `postBulkGetAsStream` operation. */
  export interface PostBulkGetAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** List of document items to get in bulk. */
    docs: BulkGetQueryDocument[];
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
  }

  /** Parameters for the `deleteDocument` operation. */
  export interface DeleteDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `deleteDocument` operation. */
  export namespace DeleteDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDocument` operation. */
  export interface GetDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `getDocumentAsMixed` operation. */
  export interface GetDocumentAsMixedParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `getDocumentAsRelated` operation. */
  export interface GetDocumentAsRelatedParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `getDocumentAsStream` operation. */
  export interface GetDocumentAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `putDocument` operation. */
  export interface PutDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** HTTP request body for Document operations. */
    document: Document | NodeJS.ReadableStream | Buffer;
    /** The type of the input. */
    contentType?: PutDocumentConstants.ContentType | string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     *
     *  Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it
     *  is very easy to accidentally end up with a large number of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `putDocument` operation. */
  export namespace PutDocumentConstants {
    /** The type of the input. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      MULTIPART_MIXED = 'multipart/mixed',
      MULTIPART_RELATED = 'multipart/related',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `headDesignDocument` operation. */
  export interface HeadDesignDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
  }

  /** Parameters for the `deleteDesignDocument` operation. */
  export interface DeleteDesignDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteDesignDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `deleteDesignDocument` operation. */
  export namespace DeleteDesignDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDesignDocument` operation. */
  export interface GetDesignDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `putDesignDocument` operation. */
  export interface PutDesignDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** HTTP request body for DesignDocument operations. */
    designDocument: DesignDocument;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutDesignDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     *
     *  Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it
     *  is very easy to accidentally end up with a large number of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `putDesignDocument` operation. */
  export namespace PutDesignDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDesignDocumentInformation` operation. */
  export interface GetDesignDocumentInformationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
  }

  /** Parameters for the `postDesignDocs` operation. */
  export interface PostDesignDocsParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for a document ID. */
    endKey?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    startKey?: string;
  }

  /** Parameters for the `postDesignDocsQueries` operation. */
  export interface PostDesignDocsQueriesParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
    /** The type of the response: application/json or application/octet-stream. */
    accept?: PostDesignDocsQueriesConstants.Accept | string;
  }

  /** Constants for the `postDesignDocsQueries` operation. */
  export namespace PostDesignDocsQueriesConstants {
    /** The type of the response: application/json or application/octet-stream. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
  }

  /** Parameters for the `postView` operation. */
  export interface PostViewParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for any JSON type. */
    endKey?: any;
    /** Schema for a document ID. */
    endKeyDocId?: string;
    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;
    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    groupLevel?: number;
    /** Schema for any JSON type. */
    key?: any;
    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];
    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
     *
     *  A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
     *
     *  Be aware that `include_docs=true` can only be used with `map` views.
     */
    reduce?: boolean;
    /** Query parameter to specify whether use the same replica of  the index on each request. The default value
     *  `false` contacts all  replicas and returns the result from the first, fastest, responder. Setting it to `true`
     *  when used in conjunction with `update=false`  may improve consistency at the expense of increased latency and
     *  decreased throughput if the selected replica is not the fastest of the available  replicas.
     *
     *  **Note:** In general setting `true` is discouraged and is strictly not recommended when using `update=true`.
     */
    stable?: boolean;
    /** Schema for any JSON type. */
    startKey?: any;
    /** Schema for a document ID. */
    startKeyDocId?: string;
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: PostViewConstants.Update | string;
  }

  /** Constants for the `postView` operation. */
  export namespace PostViewConstants {
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user. * `true` - Return results after the view is updated. * `false` - Return results without updating the view. * `lazy` - Return the view results without waiting for an update, but update them immediately after the request. */
    export enum Update {
      TRUE = 'true',
      FALSE = 'false',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postViewAsStream` operation. */
  export interface PostViewAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for any JSON type. */
    endKey?: any;
    /** Schema for a document ID. */
    endKeyDocId?: string;
    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;
    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    groupLevel?: number;
    /** Schema for any JSON type. */
    key?: any;
    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];
    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
     *
     *  A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
     *
     *  Be aware that `include_docs=true` can only be used with `map` views.
     */
    reduce?: boolean;
    /** Query parameter to specify whether use the same replica of  the index on each request. The default value
     *  `false` contacts all  replicas and returns the result from the first, fastest, responder. Setting it to `true`
     *  when used in conjunction with `update=false`  may improve consistency at the expense of increased latency and
     *  decreased throughput if the selected replica is not the fastest of the available  replicas.
     *
     *  **Note:** In general setting `true` is discouraged and is strictly not recommended when using `update=true`.
     */
    stable?: boolean;
    /** Schema for any JSON type. */
    startKey?: any;
    /** Schema for a document ID. */
    startKeyDocId?: string;
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: PostViewAsStreamConstants.Update | string;
  }

  /** Constants for the `postViewAsStream` operation. */
  export namespace PostViewAsStreamConstants {
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user. * `true` - Return results after the view is updated. * `false` - Return results without updating the view. * `lazy` - Return the view results without waiting for an update, but update them immediately after the request. */
    export enum Update {
      TRUE = 'true',
      FALSE = 'false',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postViewQueries` operation. */
  export interface PostViewQueriesParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular view request.
     */
    queries: ViewQuery[];
  }

  /** Parameters for the `postViewQueriesAsStream` operation. */
  export interface PostViewQueriesAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular view request.
     */
    queries: ViewQuery[];
  }

  /** Parameters for the `getPartitionInformation` operation. */
  export interface GetPartitionInformationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
  }

  /** Parameters for the `postPartitionAllDocs` operation. */
  export interface PostPartitionAllDocsParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for a document ID. */
    endKey?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    startKey?: string;
  }

  /** Parameters for the `postPartitionAllDocsAsStream` operation. */
  export interface PostPartitionAllDocsAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for a document ID. */
    endKey?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    startKey?: string;
  }

  /** Parameters for the `postPartitionSearch` operation. */
  export interface PostPartitionSearchParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
    /** The Lucene query to execute. */
    query: string;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Specifies which fields to highlight. If specified, the result object contains a highlights field with an
     *  entry for each specified field.
     */
    highlightFields?: string[];
    /** Number of fragments that are returned in highlights. If the search term occurs less often than the number of
     *  fragments that are specified, longer fragments are returned.
     */
    highlightNumber?: number;
    /** A string that is inserted after the highlighted word in the highlights output. */
    highlightPostTag?: string;
    /** A string that is inserted before the highlighted word in the highlights output. */
    highlightPreTag?: string;
    /** Number of characters in each fragment for highlights. */
    highlightSize?: number;
    /** Include the full content of the documents in the return. */
    includeDocs?: boolean;
    /** A JSON array of field names to include in search results. Any fields that are included must be indexed with
     *  the store:true option. The default is all fields.
     */
    includeFields?: string[];
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** Specifies the sort order of the results. In a grouped search (when group_field is used), this parameter
     *  specifies the sort order within a group. The default sort order is relevance.  A JSON string of the form
     *  "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name of a
     *  string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
     *  optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
     *  ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed
     *  fields. Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
     */
    sort?: string[];
    /** Do not wait for the index to finish building to return results. */
    stale?: PostPartitionSearchConstants.Stale | string;
  }

  /** Constants for the `postPartitionSearch` operation. */
  export namespace PostPartitionSearchConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postPartitionSearchAsStream` operation. */
  export interface PostPartitionSearchAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
    /** The Lucene query to execute. */
    query: string;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Specifies which fields to highlight. If specified, the result object contains a highlights field with an
     *  entry for each specified field.
     */
    highlightFields?: string[];
    /** Number of fragments that are returned in highlights. If the search term occurs less often than the number of
     *  fragments that are specified, longer fragments are returned.
     */
    highlightNumber?: number;
    /** A string that is inserted after the highlighted word in the highlights output. */
    highlightPostTag?: string;
    /** A string that is inserted before the highlighted word in the highlights output. */
    highlightPreTag?: string;
    /** Number of characters in each fragment for highlights. */
    highlightSize?: number;
    /** Include the full content of the documents in the return. */
    includeDocs?: boolean;
    /** A JSON array of field names to include in search results. Any fields that are included must be indexed with
     *  the store:true option. The default is all fields.
     */
    includeFields?: string[];
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** Specifies the sort order of the results. In a grouped search (when group_field is used), this parameter
     *  specifies the sort order within a group. The default sort order is relevance.  A JSON string of the form
     *  "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name of a
     *  string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
     *  optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
     *  ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed
     *  fields. Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
     */
    sort?: string[];
    /** Do not wait for the index to finish building to return results. */
    stale?: PostPartitionSearchAsStreamConstants.Stale | string;
  }

  /** Constants for the `postPartitionSearchAsStream` operation. */
  export namespace PostPartitionSearchAsStreamConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postPartitionView` operation. */
  export interface PostPartitionViewParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for any JSON type. */
    endKey?: any;
    /** Schema for a document ID. */
    endKeyDocId?: string;
    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;
    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    groupLevel?: number;
    /** Schema for any JSON type. */
    key?: any;
    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];
    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
     *
     *  A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
     *
     *  Be aware that `include_docs=true` can only be used with `map` views.
     */
    reduce?: boolean;
    /** Schema for any JSON type. */
    startKey?: any;
    /** Schema for a document ID. */
    startKeyDocId?: string;
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: PostPartitionViewConstants.Update | string;
  }

  /** Constants for the `postPartitionView` operation. */
  export namespace PostPartitionViewConstants {
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user. * `true` - Return results after the view is updated. * `false` - Return results without updating the view. * `lazy` - Return the view results without waiting for an update, but update them immediately after the request. */
    export enum Update {
      TRUE = 'true',
      FALSE = 'false',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postPartitionViewAsStream` operation. */
  export interface PostPartitionViewAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the map reduce view function name. */
    view: string;
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;
    /** Schema for any JSON type. */
    endKey?: any;
    /** Schema for a document ID. */
    endKeyDocId?: string;
    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;
    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    groupLevel?: number;
    /** Schema for any JSON type. */
    key?: any;
    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];
    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
     *
     *  A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
     *
     *  Be aware that `include_docs=true` can only be used with `map` views.
     */
    reduce?: boolean;
    /** Schema for any JSON type. */
    startKey?: any;
    /** Schema for a document ID. */
    startKeyDocId?: string;
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: PostPartitionViewAsStreamConstants.Update | string;
  }

  /** Constants for the `postPartitionViewAsStream` operation. */
  export namespace PostPartitionViewAsStreamConstants {
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user. * `true` - Return results after the view is updated. * `false` - Return results without updating the view. * `lazy` - Return the view results without waiting for an update, but update them immediately after the request. */
    export enum Update {
      TRUE = 'true',
      FALSE = 'false',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postPartitionExplain` operation. */
  export interface PostPartitionExplainParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostPartitionExplainConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
  }

  /** Constants for the `postPartitionExplain` operation. */
  export namespace PostPartitionExplainConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postPartitionFind` operation. */
  export interface PostPartitionFindParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostPartitionFindConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
  }

  /** Constants for the `postPartitionFind` operation. */
  export namespace PostPartitionFindConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postPartitionFindAsStream` operation. */
  export interface PostPartitionFindAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostPartitionFindAsStreamConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
  }

  /** Constants for the `postPartitionFindAsStream` operation. */
  export namespace PostPartitionFindAsStreamConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postExplain` operation. */
  export interface PostExplainParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostExplainConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
  }

  /** Constants for the `postExplain` operation. */
  export namespace PostExplainConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postFind` operation. */
  export interface PostFindParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostFindConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
  }

  /** Constants for the `postFind` operation. */
  export namespace PostFindConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `postFindAsStream` operation. */
  export interface PostFindAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;
    /** Whether to allow fallback to other indexes.  Default is true. */
    allowFallback?: boolean;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** A boolean value that indicates whether or not to include information about existing conflicts in the
     *  document.
     */
    conflicts?: boolean;
    /** Use this option to find information about the query that was run. This information includes total key
     *  lookups, total document lookups (when `include_docs=true` is used), and total quorum document lookups (when each
     *  document replica is fetched).
     */
    executionStats?: boolean;
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields?: string[];
    /** Maximum number of results returned. The `type: text` indexes are limited to 200 results when queried. */
    limit?: number;
    /** Skip the first 'n' results, where 'n' is the value that is specified. */
    skip?: number;
    /** The sort field contains a list of pairs, each mapping a field name to a sort direction (asc or desc). The
     *  first field name and direction pair is the topmost level of sort. The second pair, if provided, is the next
     *  level of sort. The field can be any field, using dotted notation if desired for sub-document fields.
     *
     *  For example in JSON: `[{"fieldName1": "desc"}, {"fieldName2.subFieldName1": "desc"}]`
     *
     *  When sorting with multiple fields, ensure that there is an index already defined with all the sort fields in the
     *  same order and each object in the sort array has a single key or at least one of the sort fields is included in
     *  the selector. All sorting fields must use the same sort direction, either all ascending or all descending.
     */
    sort?: JsonObject[];
    /** Whether or not the view results should be returned from a "stable" set of shards. */
    stable?: boolean;
    /** Whether to update the index prior to returning the result. */
    update?: PostFindAsStreamConstants.Update | string;
    /** Use this option to identify a specific index to answer the query, rather than letting the IBM Cloudant query
     *  planner choose an index. Specified as a two element array of design document id followed by index name, for
     *  example `["my_design_doc", "my_index"]`.
     *
     *  It’s recommended to specify indexes explicitly in your queries to prevent existing queries being affected by new
     *  indexes that might get added later.
     *
     *  If the specified index doesn't exist or can't answer the query then the server ignores the value and answers
     *  using another index or a full scan of all documents. To change this behavior set `allow_fallback` to `false` and
     *  the server responds instead with a `400` status code if the requested index is unsuitable to answer the query.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
  }

  /** Constants for the `postFindAsStream` operation. */
  export namespace PostFindAsStreamConstants {
    /** Schema for a mapping of field name to sort direction. */
    export enum Sort {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to update the index prior to returning the result. */
    export enum Update {
      FALSE = 'false',
      TRUE = 'true',
      LAZY = 'lazy',
    }
  }

  /** Parameters for the `getIndexesInformation` operation. */
  export interface GetIndexesInformationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `postIndex` operation. */
  export interface PostIndexParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
     *  properties that do not apply to `json` indexes, these are:
     *  * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
     *  document fields and what analyzer to use for that purpose.
     */
    index: IndexDefinition;
    /** Specifies the design document name in which the index will be created. The design document name is the
     *  design document ID excluding the `_design/` prefix.
     */
    ddoc?: string;
    /** name. */
    name?: string;
    /** The default value is `true` for databases with `partitioned: true` and `false` otherwise. For databases with
     *  `partitioned: false` if this option is specified the value must be `false`.
     */
    partitioned?: boolean;
    /** Schema for the type of an index. */
    type?: PostIndexConstants.Type | string;
  }

  /** Constants for the `postIndex` operation. */
  export namespace PostIndexConstants {
    /** Schema for the type of an index. */
    export enum Type {
      JSON = 'json',
      SPECIAL = 'special',
      TEXT = 'text',
    }
  }

  /** Parameters for the `deleteIndex` operation. */
  export interface DeleteIndexParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index type. */
    type: DeleteIndexConstants.Type | string;
    /** Path parameter to specify the index name. */
    index: string;
  }

  /** Constants for the `deleteIndex` operation. */
  export namespace DeleteIndexConstants {
    /** Path parameter to specify the index type. */
    export enum Type {
      JSON = 'json',
      SPECIAL = 'special',
      TEXT = 'text',
    }
  }

  /** Parameters for the `postSearchAnalyze` operation. */
  export interface PostSearchAnalyzeParams extends DefaultParams {
    /** The analyzer type that is being used at the tokenization. */
    analyzer: PostSearchAnalyzeConstants.Analyzer | string;
    /** The text to tokenize with the analyzer. */
    text: string;
  }

  /** Constants for the `postSearchAnalyze` operation. */
  export namespace PostSearchAnalyzeConstants {
    /** The analyzer type that is being used at the tokenization. */
    export enum Analyzer {
      ARABIC = 'arabic',
      ARMENIAN = 'armenian',
      BASQUE = 'basque',
      BRAZILIAN = 'brazilian',
      BULGARIAN = 'bulgarian',
      CATALAN = 'catalan',
      CHINESE = 'chinese',
      CJK = 'cjk',
      CLASSIC = 'classic',
      CZECH = 'czech',
      DANISH = 'danish',
      DUTCH = 'dutch',
      EMAIL = 'email',
      ENGLISH = 'english',
      FINNISH = 'finnish',
      FRENCH = 'french',
      GALICIAN = 'galician',
      GERMAN = 'german',
      GREEK = 'greek',
      HINDI = 'hindi',
      HUNGARIAN = 'hungarian',
      INDONESIAN = 'indonesian',
      IRISH = 'irish',
      ITALIAN = 'italian',
      JAPANESE = 'japanese',
      KEYWORD = 'keyword',
      LATVIAN = 'latvian',
      NORWEGIAN = 'norwegian',
      PERSIAN = 'persian',
      POLISH = 'polish',
      PORTUGUESE = 'portuguese',
      ROMANIAN = 'romanian',
      RUSSIAN = 'russian',
      SIMPLE = 'simple',
      SPANISH = 'spanish',
      STANDARD = 'standard',
      SWEDISH = 'swedish',
      THAI = 'thai',
      TURKISH = 'turkish',
      WHITESPACE = 'whitespace',
    }
  }

  /** Parameters for the `postSearch` operation. */
  export interface PostSearchParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
    /** The Lucene query to execute. */
    query: string;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Specifies which fields to highlight. If specified, the result object contains a highlights field with an
     *  entry for each specified field.
     */
    highlightFields?: string[];
    /** Number of fragments that are returned in highlights. If the search term occurs less often than the number of
     *  fragments that are specified, longer fragments are returned.
     */
    highlightNumber?: number;
    /** A string that is inserted after the highlighted word in the highlights output. */
    highlightPostTag?: string;
    /** A string that is inserted before the highlighted word in the highlights output. */
    highlightPreTag?: string;
    /** Number of characters in each fragment for highlights. */
    highlightSize?: number;
    /** Include the full content of the documents in the return. */
    includeDocs?: boolean;
    /** A JSON array of field names to include in search results. Any fields that are included must be indexed with
     *  the store:true option. The default is all fields.
     */
    includeFields?: string[];
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** Specifies the sort order of the results. In a grouped search (when group_field is used), this parameter
     *  specifies the sort order within a group. The default sort order is relevance.  A JSON string of the form
     *  "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name of a
     *  string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
     *  optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
     *  ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed
     *  fields. Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
     */
    sort?: string[];
    /** Do not wait for the index to finish building to return results. */
    stale?: PostSearchConstants.Stale | string;
    /** This field defines an array of names of string fields, for which counts are requested. The response contains
     *  counts for each unique value of this field name among the documents that match the search query. Faceting must
     *  be enabled for this parameter to function. This option is only available when making global queries.
     */
    counts?: string[];
    /** Restrict results to documents with a dimension equal to the specified label(s). The search matches only
     *  documents containing the value that was provided in the named field. It differs from using "fieldname:value" in
     *  the q parameter only in that the values are not analyzed. Faceting must be enabled for this parameter to
     *  function.
     */
    drilldown?: string[][];
    /** Field by which to group search matches. A string that contains the name of a string field. Fields containing
     *  other data such as numbers, objects, or arrays cannot be used. This option is only available when making global
     *  queries.
     */
    groupField?: string;
    /** Maximum group count. This field can be used only if group_field is specified. This option is only available
     *  when making global queries.
     */
    groupLimit?: number;
    /** This field defines the order of the groups in a search that uses group_field. The default sort order is
     *  relevance. This field can have the same values as the sort field, so single fields and arrays of fields are
     *  supported. This option is only available when making global queries.
     */
    groupSort?: string[];
    /** Object mapping faceted, numeric search field names to the required ranges. Each key is a field name and each
     *  value is another object defining the ranges by mapping range name keys to string values describing the numeric
     *  ranges, for example "[0 TO 10]". This option is only available when making global queries.
     */
    ranges?: JsonObject;
  }

  /** Constants for the `postSearch` operation. */
  export namespace PostSearchConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postSearchAsStream` operation. */
  export interface PostSearchAsStreamParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
    /** The Lucene query to execute. */
    query: string;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Specifies which fields to highlight. If specified, the result object contains a highlights field with an
     *  entry for each specified field.
     */
    highlightFields?: string[];
    /** Number of fragments that are returned in highlights. If the search term occurs less often than the number of
     *  fragments that are specified, longer fragments are returned.
     */
    highlightNumber?: number;
    /** A string that is inserted after the highlighted word in the highlights output. */
    highlightPostTag?: string;
    /** A string that is inserted before the highlighted word in the highlights output. */
    highlightPreTag?: string;
    /** Number of characters in each fragment for highlights. */
    highlightSize?: number;
    /** Include the full content of the documents in the return. */
    includeDocs?: boolean;
    /** A JSON array of field names to include in search results. Any fields that are included must be indexed with
     *  the store:true option. The default is all fields.
     */
    includeFields?: string[];
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** Specifies the sort order of the results. In a grouped search (when group_field is used), this parameter
     *  specifies the sort order within a group. The default sort order is relevance.  A JSON string of the form
     *  "fieldname&lt;type&gt;" or "-fieldname&lt;type&gt;" for descending order, where fieldname is the name of a
     *  string or number field, and type is either a number, a string, or a JSON array of strings. The type part is
     *  optional, and defaults to number. Some examples are "foo", "-foo", "bar&lt;string&gt;", "-foo&lt;number&gt;" and
     *  ["-foo&lt;number&gt;", "bar&lt;string&gt;"]. String fields that are used for sorting must not be analyzed
     *  fields. Fields that are used for sorting must be indexed by the same indexer that is used for the search query.
     */
    sort?: string[];
    /** Do not wait for the index to finish building to return results. */
    stale?: PostSearchAsStreamConstants.Stale | string;
    /** This field defines an array of names of string fields, for which counts are requested. The response contains
     *  counts for each unique value of this field name among the documents that match the search query. Faceting must
     *  be enabled for this parameter to function. This option is only available when making global queries.
     */
    counts?: string[];
    /** Restrict results to documents with a dimension equal to the specified label(s). The search matches only
     *  documents containing the value that was provided in the named field. It differs from using "fieldname:value" in
     *  the q parameter only in that the values are not analyzed. Faceting must be enabled for this parameter to
     *  function.
     */
    drilldown?: string[][];
    /** Field by which to group search matches. A string that contains the name of a string field. Fields containing
     *  other data such as numbers, objects, or arrays cannot be used. This option is only available when making global
     *  queries.
     */
    groupField?: string;
    /** Maximum group count. This field can be used only if group_field is specified. This option is only available
     *  when making global queries.
     */
    groupLimit?: number;
    /** This field defines the order of the groups in a search that uses group_field. The default sort order is
     *  relevance. This field can have the same values as the sort field, so single fields and arrays of fields are
     *  supported. This option is only available when making global queries.
     */
    groupSort?: string[];
    /** Object mapping faceted, numeric search field names to the required ranges. Each key is a field name and each
     *  value is another object defining the ranges by mapping range name keys to string values describing the numeric
     *  ranges, for example "[0 TO 10]". This option is only available when making global queries.
     */
    ranges?: JsonObject;
  }

  /** Constants for the `postSearchAsStream` operation. */
  export namespace PostSearchAsStreamConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `getSearchDiskSize` operation. */
  export interface GetSearchDiskSizeParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
  }

  /** Parameters for the `getSearchInfo` operation. */
  export interface GetSearchInfoParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
  }

  /** Parameters for the `headReplicationDocument` operation. */
  export interface HeadReplicationDocumentParams extends DefaultParams {
    /** Path parameter to specify the ID of the stored replication configuration in the `_replicator` database. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
  }

  /** Parameters for the `headSchedulerDocument` operation. */
  export interface HeadSchedulerDocumentParams extends DefaultParams {
    /** Path parameter to specify the document ID. */
    docId: string;
  }

  /** Parameters for the `headSchedulerJob` operation. */
  export interface HeadSchedulerJobParams extends DefaultParams {
    /** Path parameter to specify the replication job id. */
    jobId: string;
  }

  /** Parameters for the `postReplicator` operation. */
  export interface PostReplicatorParams extends DefaultParams {
    /** HTTP request body for replication operations. */
    replicationDocument: ReplicationDocument;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PostReplicatorConstants.Batch | string;
  }

  /** Constants for the `postReplicator` operation. */
  export namespace PostReplicatorConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `deleteReplicationDocument` operation. */
  export interface DeleteReplicationDocumentParams extends DefaultParams {
    /** Path parameter to specify the ID of the stored replication configuration in the `_replicator` database. */
    docId: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteReplicationDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `deleteReplicationDocument` operation. */
  export namespace DeleteReplicationDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getReplicationDocument` operation. */
  export interface GetReplicationDocumentParams extends DefaultParams {
    /** Path parameter to specify the ID of the stored replication configuration in the `_replicator` database. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include a list of conflicted revisions in each returned document.
     *  Active only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Query parameter to specify whether to include a list of deleted conflicted revisions in the
     *  `_deleted_conflicts` property of the returned document.
     */
    deletedConflicts?: boolean;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    /** Query parameter to specify whether to include document meta information. Acts the same as specifying all of
     *  the conflicts, deleted_conflicts and open_revs query parameters.
     */
    meta?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to include a list of all known document revisions. */
    revs?: boolean;
    /** Query parameter to specify whether to includes detailed information for all known document revisions. */
    revsInfo?: boolean;
  }

  /** Parameters for the `putReplicationDocument` operation. */
  export interface PutReplicationDocumentParams extends DefaultParams {
    /** Path parameter to specify the ID of the stored replication configuration in the `_replicator` database. */
    docId: string;
    /** HTTP request body for replication operations. */
    replicationDocument: ReplicationDocument;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutReplicationDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     *
     *  Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it
     *  is very easy to accidentally end up with a large number of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Constants for the `putReplicationDocument` operation. */
  export namespace PutReplicationDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getSchedulerDocs` operation. */
  export interface GetSchedulerDocsParams extends DefaultParams {
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Query parameter to include only replication documents in the specified states. String must be a
     *  comma-delimited string.
     */
    states?: GetSchedulerDocsConstants.States[] | string[];
  }

  /** Constants for the `getSchedulerDocs` operation. */
  export namespace GetSchedulerDocsConstants {
    /** Query parameter to include only replication documents in the specified states. String must be a comma-delimited string. */
    export enum States {
      INITIALIZING = 'initializing',
      ERROR = 'error',
      PENDING = 'pending',
      RUNNING = 'running',
      CRASHING = 'crashing',
      COMPLETED = 'completed',
      FAILED = 'failed',
    }
  }

  /** Parameters for the `getSchedulerDocument` operation. */
  export interface GetSchedulerDocumentParams extends DefaultParams {
    /** Path parameter to specify the document ID. */
    docId: string;
  }

  /** Parameters for the `getSchedulerJobs` operation. */
  export interface GetSchedulerJobsParams extends DefaultParams {
    /** Query parameter to specify the number of returned jobs to limit the result to. */
    limit?: number;
    /** Query parameter to specify the number of records before starting to return the results. */
    skip?: number;
  }

  /** Parameters for the `getSchedulerJob` operation. */
  export interface GetSchedulerJobParams extends DefaultParams {
    /** Path parameter to specify the replication job id. */
    jobId: string;
  }

  /** Parameters for the `getSessionInformation` operation. */
  export interface GetSessionInformationParams extends DefaultParams {
  }

  /** Parameters for the `postApiKeys` operation. */
  export interface PostApiKeysParams extends DefaultParams {
  }

  /** Parameters for the `putCloudantSecurityConfiguration` operation. */
  export interface PutCloudantSecurityConfigurationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Database permissions for Cloudant users and/or API keys. */
    cloudant: JsonObject;
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;
    /** Manage permissions using the `_users` database only. */
    couchdbAuthOnly?: boolean;
    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;
  }

  /** Constants for the `putCloudantSecurityConfiguration` operation. */
  export namespace PutCloudantSecurityConfigurationConstants {
    /** Database permissions for Cloudant users and/or API keys. */
    export enum Cloudant {
      READER = '_reader',
      WRITER = '_writer',
      ADMIN = '_admin',
      REPLICATOR = '_replicator',
      DB_UPDATES = '_db_updates',
      DESIGN = '_design',
      SHARDS = '_shards',
      SECURITY = '_security',
    }
  }

  /** Parameters for the `getSecurity` operation. */
  export interface GetSecurityParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `putSecurity` operation. */
  export interface PutSecurityParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;
    /** Database permissions for Cloudant users and/or API keys. */
    cloudant?: JsonObject;
    /** Manage permissions using the `_users` database only. */
    couchdbAuthOnly?: boolean;
    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;
  }

  /** Constants for the `putSecurity` operation. */
  export namespace PutSecurityConstants {
    /** Database permissions for Cloudant users and/or API keys. */
    export enum Cloudant {
      READER = '_reader',
      WRITER = '_writer',
      ADMIN = '_admin',
      REPLICATOR = '_replicator',
      DB_UPDATES = '_db_updates',
      DESIGN = '_design',
      SHARDS = '_shards',
      SECURITY = '_security',
    }
  }

  /** Parameters for the `getCorsInformation` operation. */
  export interface GetCorsInformationParams extends DefaultParams {
  }

  /** Parameters for the `putCorsConfiguration` operation. */
  export interface PutCorsConfigurationParams extends DefaultParams {
    /** An array of strings that contain allowed origin domains. You have to specify the full URL including the
     *  protocol. It is recommended that only the HTTPS protocol is used. Subdomains count as separate domains, so you
     *  have to specify all subdomains used.
     */
    origins: string[];
    /** Boolean value to allow authentication credentials. If set to true, browser requests must be done by using
     *  withCredentials = true.
     */
    allowCredentials?: boolean;
    /** Boolean value to turn CORS on and off. */
    enableCors?: boolean;
  }

  /** Parameters for the `headAttachment` operation. */
  export interface HeadAttachmentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Parameters for the `deleteAttachment` operation. */
  export interface DeleteAttachmentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteAttachmentConstants.Batch | string;
  }

  /** Constants for the `deleteAttachment` operation. */
  export namespace DeleteAttachmentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getAttachment` operation. */
  export interface GetAttachmentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** The type of the response: *_/_*. */
    accept?: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Header parameter to specify the byte range for a request. This allows the implementation of resumable
     *  downloads and skippable streams. This is available for all attachments inside CouchDB.
     */
    range?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Parameters for the `putAttachment` operation. */
  export interface PutAttachmentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** HTTP request body for attachment operations. */
    attachment: NodeJS.ReadableStream | Buffer;
    /** Content-Type of the attachment. */
    contentType: string;
    /** Header parameter for a conditional HTTP request matching an ETag. */
    ifMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
  }

  /** Parameters for the `headLocalDocument` operation. */
  export interface HeadLocalDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
  }

  /** Parameters for the `deleteLocalDocument` operation. */
  export interface DeleteLocalDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteLocalDocumentConstants.Batch | string;
  }

  /** Constants for the `deleteLocalDocument` operation. */
  export namespace DeleteLocalDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getLocalDocument` operation. */
  export interface GetLocalDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** The type of the response: application/json, multipart/mixed, multipart/related, or application/octet-stream. */
    accept?: GetLocalDocumentConstants.Accept | string;
    /** Header parameter for a conditional HTTP request not matching an ETag. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
  }

  /** Constants for the `getLocalDocument` operation. */
  export namespace GetLocalDocumentConstants {
    /** The type of the response: application/json, multipart/mixed, multipart/related, or application/octet-stream. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      MULTIPART_MIXED = 'multipart/mixed',
      MULTIPART_RELATED = 'multipart/related',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
  }

  /** Parameters for the `putLocalDocument` operation. */
  export interface PutLocalDocumentParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** HTTP request body for Document operations. */
    document: Document | NodeJS.ReadableStream | Buffer;
    /** The type of the input. */
    contentType?: PutLocalDocumentConstants.ContentType | string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutLocalDocumentConstants.Batch | string;
  }

  /** Constants for the `putLocalDocument` operation. */
  export namespace PutLocalDocumentConstants {
    /** The type of the input. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      MULTIPART_MIXED = 'multipart/mixed',
      MULTIPART_RELATED = 'multipart/related',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `postRevsDiff` operation. */
  export interface PostRevsDiffParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** HTTP request body for operations with Document revisions. */
    documentRevisions: JsonObject;
  }

  /** Parameters for the `getShardsInformation` operation. */
  export interface GetShardsInformationParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
  }

  /** Parameters for the `getDocumentShardsInfo` operation. */
  export interface GetDocumentShardsInfoParams extends DefaultParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
  }

  /** Parameters for the `headUpInformation` operation. */
  export interface HeadUpInformationParams extends DefaultParams {
  }

  /** Parameters for the `getActiveTasks` operation. */
  export interface GetActiveTasksParams extends DefaultParams {
  }

  /** Parameters for the `getActivityTrackerEvents` operation. */
  export interface GetActivityTrackerEventsParams extends DefaultParams {
  }

  /** Parameters for the `postActivityTrackerEvents` operation. */
  export interface PostActivityTrackerEventsParams extends DefaultParams {
    /** An array of event types sent to IBM Cloud Activity Tracker Event Routing for the IBM Cloudant instance.
     *  "management" is a required element of this array.
     */
    types: PostActivityTrackerEventsConstants.Types[] | string[];
  }

  /** Constants for the `postActivityTrackerEvents` operation. */
  export namespace PostActivityTrackerEventsConstants {
    /** Types */
    export enum Types {
      MANAGEMENT = 'management',
      DATA = 'data',
    }
  }

  /** Parameters for the `getCapacityDatabasesInformation` operation. */
  export interface GetCapacityDatabasesInformationParams extends DefaultParams {
  }

  /** Parameters for the `getCurrentDatabasesInformation` operation. */
  export interface GetCurrentDatabasesInformationParams extends DefaultParams {
  }

  /** Parameters for the `getCurrentThroughputInformation` operation. */
  export interface GetCurrentThroughputInformationParams extends DefaultParams {
  }

  /** Parameters for the `getMembershipInformation` operation. */
  export interface GetMembershipInformationParams extends DefaultParams {
  }

  /** Parameters for the `getUpInformation` operation. */
  export interface GetUpInformationParams extends DefaultParams {
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Schema for information about a running task.
   */
  export class ActiveTask {
    /** The total count of attempted doc revisions fetched with `_bulk_get`. Available for `replication` type tasks. */
    bulkGetAttempts?: number;

    /** The total count of successful docs fetched with `_bulk_get`. Available for `replication` type tasks. */
    bulkGetDocs?: number;

    /** Processed changes. Available for `database_compaction`, `indexer`, `search_indexer`, `view_compaction` type
     *  tasks.
     */
    changesDone?: number;

    /** The count of changes not yet replicated. Available for `replication` type tasks. */
    changesPending?: number;

    /** Specifies the checkpoint interval in ms. Available for `replication` type tasks. */
    checkpointInterval?: number;

    /** The source sequence id which was last successfully replicated. Available for `replication` type tasks. */
    checkpointedSourceSeq?: string;

    /** The replication configured to be continuous. Available for `replication` type tasks. */
    continuous?: boolean;

    /** Source database. */
    database: string;

    /** The design document that belongs to this task. Available for `indexer`, `search_indexer`, `view_compaction`
     *  type tasks.
     */
    designDocument?: string;

    /** Replication document ID. Available for `replication` type tasks. */
    docId?: string;

    /** Number of document write failures. Available for `replication` type tasks. */
    docWriteFailures?: number;

    /** Number of documents read. Available for `replication` type tasks. */
    docsRead?: number;

    /** Number of documents written to target. Available for `replication` type tasks. */
    docsWritten?: number;

    /** The search index that belongs to this task. Available for `search_indexer` type tasks. */
    index?: string;

    /** Indexer process ID. Available for `indexer` type tasks. */
    indexerPid?: string;

    /** The count of docs which have been read from the source. Available for `replication` type tasks. */
    missingRevisionsFound?: number;

    /** Cluster node where the task is running. */
    node: string;

    /** The phase the active task is in. `docid_sort`, `docid_copy`, `document_copy` phases are available for
     *  `database_compaction`, while `ids` and `view` phases are available for `view_compaction` type tasks.
     */
    phase?: ActiveTask.Constants.Phase | string;

    /** Process ID. */
    pid: string;

    /** Process status. */
    processStatus?: ActiveTask.Constants.ProcessStatus | string;

    /** Current percentage progress. Available for `database_compaction`, `indexer`, `search_indexer`,
     *  `view_compaction` type tasks.
     */
    progress?: number;

    /** Replication ID. Available for `replication` type tasks. */
    replicationId?: string;

    /** Indicates whether a compaction retry is currently running on the database. Available for
     *  `database_compaction` type tasks.
     */
    retry?: boolean;

    /** The count of revisions which have been checked since this replication began. Available for `replication`
     *  type tasks.
     */
    revisionsChecked?: number;

    /** Replication source. Available for `replication` type tasks. */
    source?: string;

    /** The last sequence number obtained from the source database changes feed. Available for `replication` type
     *  tasks.
     */
    sourceSeq?: string;

    /** Schema for a Unix epoch timestamp. */
    startedOn: number;

    /** Replication target. Available for `replication` type tasks. */
    target?: string;

    /** The last sequence number processed by the replicator. Available for `replication` type tasks. */
    throughSeq?: string;

    /** Total changes to process. Available for `database_compaction`, `indexer`, `search_indexer`,
     *  `view_compaction` type tasks.
     */
    totalChanges?: number;

    /** Operation type. */
    type: ActiveTask.Constants.Type | string;

    /** Schema for a Unix epoch timestamp. */
    updatedOn: number;

    /** Name of user running the process. */
    user?: string | null;

    /** Number of view indexes. Available for `view_compaction` type tasks. */
    view?: number;

    static serialize(obj): ActiveTask.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ActiveTask.Transport = <ActiveTask.Transport>{};
      if (obj.bulkGetAttempts !== undefined) {
        copy.bulk_get_attempts = obj.bulkGetAttempts;
      }
      if (obj.bulkGetDocs !== undefined) {
        copy.bulk_get_docs = obj.bulkGetDocs;
      }
      if (obj.changesDone !== undefined) {
        copy.changes_done = obj.changesDone;
      }
      if (obj.changesPending !== undefined) {
        copy.changes_pending = obj.changesPending;
      }
      if (obj.checkpointInterval !== undefined) {
        copy.checkpoint_interval = obj.checkpointInterval;
      }
      if (obj.checkpointedSourceSeq !== undefined) {
        copy.checkpointed_source_seq = obj.checkpointedSourceSeq;
      }
      if (obj.continuous !== undefined) {
        copy.continuous = obj.continuous;
      }
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.designDocument !== undefined) {
        copy.design_document = obj.designDocument;
      }
      if (obj.docId !== undefined) {
        copy.doc_id = obj.docId;
      }
      if (obj.docWriteFailures !== undefined) {
        copy.doc_write_failures = obj.docWriteFailures;
      }
      if (obj.docsRead !== undefined) {
        copy.docs_read = obj.docsRead;
      }
      if (obj.docsWritten !== undefined) {
        copy.docs_written = obj.docsWritten;
      }
      if (obj.index !== undefined) {
        copy.index = obj.index;
      }
      if (obj.indexerPid !== undefined) {
        copy.indexer_pid = obj.indexerPid;
      }
      if (obj.missingRevisionsFound !== undefined) {
        copy.missing_revisions_found = obj.missingRevisionsFound;
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.phase !== undefined) {
        copy.phase = obj.phase;
      }
      if (obj.pid !== undefined) {
        copy.pid = obj.pid;
      }
      if (obj.processStatus !== undefined) {
        copy.process_status = obj.processStatus;
      }
      if (obj.progress !== undefined) {
        copy.progress = obj.progress;
      }
      if (obj.replicationId !== undefined) {
        copy.replication_id = obj.replicationId;
      }
      if (obj.retry !== undefined) {
        copy.retry = obj.retry;
      }
      if (obj.revisionsChecked !== undefined) {
        copy.revisions_checked = obj.revisionsChecked;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.sourceSeq !== undefined) {
        copy.source_seq = obj.sourceSeq;
      }
      if (obj.startedOn !== undefined) {
        copy.started_on = obj.startedOn;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.throughSeq !== undefined) {
        copy.through_seq = obj.throughSeq;
      }
      if (obj.totalChanges !== undefined) {
        copy.total_changes = obj.totalChanges;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      if (obj.updatedOn !== undefined) {
        copy.updated_on = obj.updatedOn;
      }
      if (obj.user !== undefined) {
        copy.user = obj.user;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as ActiveTask.Transport;
    }

    static deserialize(obj): ActiveTask {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ActiveTask = <ActiveTask>{};
      if (obj.bulk_get_attempts !== undefined) {
        copy.bulkGetAttempts = obj.bulk_get_attempts;
      }
      if (obj.bulk_get_docs !== undefined) {
        copy.bulkGetDocs = obj.bulk_get_docs;
      }
      if (obj.changes_done !== undefined) {
        copy.changesDone = obj.changes_done;
      }
      if (obj.changes_pending !== undefined) {
        copy.changesPending = obj.changes_pending;
      }
      if (obj.checkpoint_interval !== undefined) {
        copy.checkpointInterval = obj.checkpoint_interval;
      }
      if (obj.checkpointed_source_seq !== undefined) {
        copy.checkpointedSourceSeq = obj.checkpointed_source_seq;
      }
      if (obj.continuous !== undefined) {
        copy.continuous = obj.continuous;
      }
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.design_document !== undefined) {
        copy.designDocument = obj.design_document;
      }
      if (obj.doc_id !== undefined) {
        copy.docId = obj.doc_id;
      }
      if (obj.doc_write_failures !== undefined) {
        copy.docWriteFailures = obj.doc_write_failures;
      }
      if (obj.docs_read !== undefined) {
        copy.docsRead = obj.docs_read;
      }
      if (obj.docs_written !== undefined) {
        copy.docsWritten = obj.docs_written;
      }
      if (obj.index !== undefined) {
        copy.index = obj.index;
      }
      if (obj.indexer_pid !== undefined) {
        copy.indexerPid = obj.indexer_pid;
      }
      if (obj.missing_revisions_found !== undefined) {
        copy.missingRevisionsFound = obj.missing_revisions_found;
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.phase !== undefined) {
        copy.phase = obj.phase;
      }
      if (obj.pid !== undefined) {
        copy.pid = obj.pid;
      }
      if (obj.process_status !== undefined) {
        copy.processStatus = obj.process_status;
      }
      if (obj.progress !== undefined) {
        copy.progress = obj.progress;
      }
      if (obj.replication_id !== undefined) {
        copy.replicationId = obj.replication_id;
      }
      if (obj.retry !== undefined) {
        copy.retry = obj.retry;
      }
      if (obj.revisions_checked !== undefined) {
        copy.revisionsChecked = obj.revisions_checked;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.source_seq !== undefined) {
        copy.sourceSeq = obj.source_seq;
      }
      if (obj.started_on !== undefined) {
        copy.startedOn = obj.started_on;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.through_seq !== undefined) {
        copy.throughSeq = obj.through_seq;
      }
      if (obj.total_changes !== undefined) {
        copy.totalChanges = obj.total_changes;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      if (obj.updated_on !== undefined) {
        copy.updatedOn = obj.updated_on;
      }
      if (obj.user !== undefined) {
        copy.user = obj.user;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as ActiveTask;
    }
  }
  export namespace ActiveTask {
    export namespace Constants {
      /** The phase the active task is in. `docid_sort`, `docid_copy`, `document_copy` phases are available for `database_compaction`, while `ids` and `view` phases are available for `view_compaction` type tasks. */
      export enum Phase {
        DOCID_SORT = 'docid_sort',
        DOCID_COPY = 'docid_copy',
        DOCUMENT_COPY = 'document_copy',
        IDS = 'ids',
        VIEW = 'view',
      }
      /** Process status. */
      export enum ProcessStatus {
        EXITING = 'exiting',
        GARBAGE_COLLECTING = 'garbage_collecting',
        RUNNABLE = 'runnable',
        RUNNING = 'running',
        SUSPENDED = 'suspended',
        WAITING = 'waiting',
      }
      /** Operation type. */
      export enum Type {
        DATABASE_COMPACTION = 'database_compaction',
        INDEXER = 'indexer',
        REPLICATION = 'replication',
        SEARCH_INDEXER = 'search_indexer',
        VIEW_COMPACTION = 'view_compaction',
      }
    }
      export interface Transport {
        bulk_get_attempts?: number;
        bulk_get_docs?: number;
        changes_done?: number;
        changes_pending?: number;
        checkpoint_interval?: number;
        checkpointed_source_seq?: string;
        continuous?: boolean;
        database: string;
        design_document?: string;
        doc_id?: string;
        doc_write_failures?: number;
        docs_read?: number;
        docs_written?: number;
        index?: string;
        indexer_pid?: string;
        missing_revisions_found?: number;
        node: string;
        phase?: string;
        pid: string;
        process_status?: string;
        progress?: number;
        replication_id?: string;
        retry?: boolean;
        revisions_checked?: number;
        source?: string;
        source_seq?: string;
        started_on: number;
        target?: string;
        through_seq?: string;
        total_changes?: number;
        type: string;
        updated_on: number;
        user?: string;
        view?: number;
      }
  }

  /**
   * Schema for activity tracking events.
   */
  export class ActivityTrackerEvents {
    /** An array of event types sent to IBM Cloud Activity Tracker Event Routing for the IBM Cloudant instance.
     *  "management" is a required element of this array.
     */
    types: ActivityTrackerEvents.Constants.Types[] | string[];

    static serialize(obj): ActivityTrackerEvents.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ActivityTrackerEvents.Transport = <ActivityTrackerEvents.Transport>{};
      if (obj.types !== undefined) {
        copy.types = obj.types;
      }
      return copy as unknown as ActivityTrackerEvents.Transport;
    }

    static deserialize(obj): ActivityTrackerEvents {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ActivityTrackerEvents = <ActivityTrackerEvents>{};
      if (obj.types !== undefined) {
        copy.types = obj.types;
      }
      return copy as unknown as ActivityTrackerEvents;
    }
  }
  export namespace ActivityTrackerEvents {
    export namespace Constants {
      /** An array of event types sent to IBM Cloud Activity Tracker Event Routing for the IBM Cloudant instance. "management" is a required element of this array. */
      export enum Types {
        MANAGEMENT = 'management',
        DATA = 'data',
      }
    }
      export interface Transport {
        types: string[];
      }
  }

  /**
   * Schema for the result of an all documents queries operation.
   */
  export class AllDocsQueriesResult {
    /** An array of result objects - one for each query. Each result object contains the same fields as the response
     *  to a regular `/_all_docs` request.
     */
    results: AllDocsResult[];

    static serialize(obj): AllDocsQueriesResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsQueriesResult.Transport = <AllDocsQueriesResult.Transport>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, AllDocsResult.serialize);
      }
      return copy as unknown as AllDocsQueriesResult.Transport;
    }

    static deserialize(obj): AllDocsQueriesResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsQueriesResult = <AllDocsQueriesResult>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, AllDocsResult.deserialize);
      }
      return copy as unknown as AllDocsQueriesResult;
    }
  }
  export namespace AllDocsQueriesResult {
      export interface Transport {
        results: AllDocsResult[];
      }
  }

  /**
   * Schema for an all documents query operation.
   */
  export class AllDocsQuery {
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;

    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;

    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;

    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;

    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;

    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;

    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;

    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;

    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;

    /** Schema for a document ID. */
    endKey?: string;

    /** Schema for a document ID. */
    key?: string;

    /** Schema for a list of document IDs. */
    keys?: string[];

    /** Schema for a document ID. */
    startKey?: string;

    static serialize(obj): AllDocsQuery.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsQuery.Transport = <AllDocsQuery.Transport>{};
      if (obj.attEncodingInfo !== undefined) {
        copy.att_encoding_info = obj.attEncodingInfo;
      }
      if (obj.attachments !== undefined) {
        copy.attachments = obj.attachments;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.descending !== undefined) {
        copy.descending = obj.descending;
      }
      if (obj.includeDocs !== undefined) {
        copy.include_docs = obj.includeDocs;
      }
      if (obj.inclusiveEnd !== undefined) {
        copy.inclusive_end = obj.inclusiveEnd;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.updateSeq !== undefined) {
        copy.update_seq = obj.updateSeq;
      }
      if (obj.endKey !== undefined) {
        copy.end_key = obj.endKey;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.keys !== undefined) {
        copy.keys = obj.keys;
      }
      if (obj.startKey !== undefined) {
        copy.start_key = obj.startKey;
      }
      return copy as unknown as AllDocsQuery.Transport;
    }

    static deserialize(obj): AllDocsQuery {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsQuery = <AllDocsQuery>{};
      if (obj.att_encoding_info !== undefined) {
        copy.attEncodingInfo = obj.att_encoding_info;
      }
      if (obj.attachments !== undefined) {
        copy.attachments = obj.attachments;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.descending !== undefined) {
        copy.descending = obj.descending;
      }
      if (obj.include_docs !== undefined) {
        copy.includeDocs = obj.include_docs;
      }
      if (obj.inclusive_end !== undefined) {
        copy.inclusiveEnd = obj.inclusive_end;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.update_seq !== undefined) {
        copy.updateSeq = obj.update_seq;
      }
      if (obj.end_key !== undefined) {
        copy.endKey = obj.end_key;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.keys !== undefined) {
        copy.keys = obj.keys;
      }
      if (obj.start_key !== undefined) {
        copy.startKey = obj.start_key;
      }
      return copy as unknown as AllDocsQuery;
    }
  }
  export namespace AllDocsQuery {
      export interface Transport {
        att_encoding_info?: boolean;
        attachments?: boolean;
        conflicts?: boolean;
        descending?: boolean;
        include_docs?: boolean;
        inclusive_end?: boolean;
        limit?: number;
        skip?: number;
        update_seq?: boolean;
        end_key?: string;
        key?: string;
        keys?: string[];
        start_key?: string;
      }
  }

  /**
   * Schema for the result of an all documents operation.
   */
  export class AllDocsResult {
    /** Total number of document results. */
    totalRows: number;

    /** List of doc results. */
    rows: DocsResultRow[];

    /** Current update sequence for the database. */
    updateSeq?: string;

    static serialize(obj): AllDocsResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsResult.Transport = <AllDocsResult.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, DocsResultRow.serialize);
      }
      if (obj.updateSeq !== undefined) {
        copy.update_seq = obj.updateSeq;
      }
      return copy as unknown as AllDocsResult.Transport;
    }

    static deserialize(obj): AllDocsResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AllDocsResult = <AllDocsResult>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, DocsResultRow.deserialize);
      }
      if (obj.update_seq !== undefined) {
        copy.updateSeq = obj.update_seq;
      }
      return copy as unknown as AllDocsResult;
    }
  }
  export namespace AllDocsResult {
      export interface Transport {
        total_rows: number;
        rows: DocsResultRow[];
        update_seq?: string;
      }
  }

  /**
   * Schema for a full text search analyzer.
   */
  export class Analyzer {
    /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies
     *  depending on the analyzer usage:
     *  * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query
     *  text index default_field the default is `standard`.
     */
    name: Analyzer.Constants.Name | string;

    /** Custom stopwords to use with the named analyzer. */
    stopwords?: string[];

    static serialize(obj): Analyzer.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Analyzer.Transport = <Analyzer.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.stopwords !== undefined) {
        copy.stopwords = obj.stopwords;
      }
      return copy as unknown as Analyzer.Transport;
    }

    static deserialize(obj): Analyzer {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Analyzer = <Analyzer>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.stopwords !== undefined) {
        copy.stopwords = obj.stopwords;
      }
      return copy as unknown as Analyzer;
    }
  }
  export namespace Analyzer {
    export namespace Constants {
      /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies depending on the analyzer usage: * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query text index default_field the default is `standard`. */
      export enum Name {
        CLASSIC = 'classic',
        EMAIL = 'email',
        KEYWORD = 'keyword',
        PERFIELD = 'perfield',
        SIMPLE = 'simple',
        SIMPLE_ASCIIFOLDING = 'simple_asciifolding',
        STANDARD = 'standard',
        WHITESPACE = 'whitespace',
        ARABIC = 'arabic',
        ARMENIAN = 'armenian',
        BASQUE = 'basque',
        BRAZILIAN = 'brazilian',
        BULGARIAN = 'bulgarian',
        CATALAN = 'catalan',
        CHINESE = 'chinese',
        CJK = 'cjk',
        CZECH = 'czech',
        DANISH = 'danish',
        DUTCH = 'dutch',
        ENGLISH = 'english',
        FINNISH = 'finnish',
        FRENCH = 'french',
        GALICIAN = 'galician',
        GERMAN = 'german',
        GREEK = 'greek',
        HINDI = 'hindi',
        HUNGARIAN = 'hungarian',
        INDONESIAN = 'indonesian',
        IRISH = 'irish',
        ITALIAN = 'italian',
        JAPANESE = 'japanese',
        LATVIAN = 'latvian',
        NORWEGIAN = 'norwegian',
        PERSIAN = 'persian',
        POLISH = 'polish',
        PORTUGUESE = 'portuguese',
        ROMANIAN = 'romanian',
        RUSSIAN = 'russian',
        SPANISH = 'spanish',
        SWEDISH = 'swedish',
        THAI = 'thai',
        TURKISH = 'turkish',
      }
    }
      export interface Transport {
        name: string;
        stopwords?: string[];
      }
  }

  /**
   * Schema for a search analyzer configuration.
   */
  export class AnalyzerConfiguration {
    /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies
     *  depending on the analyzer usage:
     *  * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query
     *  text index default_field the default is `standard`.
     */
    name: AnalyzerConfiguration.Constants.Name | string;

    /** Custom stopwords to use with the named analyzer. */
    stopwords?: string[];

    /** Schema for mapping a field name to a per field analyzer. */
    fields?: {[key: string]: Analyzer};

    static serialize(obj): AnalyzerConfiguration.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AnalyzerConfiguration.Transport = <AnalyzerConfiguration.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.stopwords !== undefined) {
        copy.stopwords = obj.stopwords;
      }
      if (obj.fields !== undefined) {
        copy.fields = BaseService.convertModel(obj.fields, Analyzer.serialize, true);
      }
      return copy as unknown as AnalyzerConfiguration.Transport;
    }

    static deserialize(obj): AnalyzerConfiguration {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: AnalyzerConfiguration = <AnalyzerConfiguration>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.stopwords !== undefined) {
        copy.stopwords = obj.stopwords;
      }
      if (obj.fields !== undefined) {
        copy.fields = BaseService.convertModel(obj.fields, Analyzer.deserialize, true);
      }
      return copy as unknown as AnalyzerConfiguration;
    }
  }
  export namespace AnalyzerConfiguration {
    export namespace Constants {
      /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies depending on the analyzer usage: * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query text index default_field the default is `standard`. */
      export enum Name {
        CLASSIC = 'classic',
        EMAIL = 'email',
        KEYWORD = 'keyword',
        PERFIELD = 'perfield',
        SIMPLE = 'simple',
        SIMPLE_ASCIIFOLDING = 'simple_asciifolding',
        STANDARD = 'standard',
        WHITESPACE = 'whitespace',
        ARABIC = 'arabic',
        ARMENIAN = 'armenian',
        BASQUE = 'basque',
        BRAZILIAN = 'brazilian',
        BULGARIAN = 'bulgarian',
        CATALAN = 'catalan',
        CHINESE = 'chinese',
        CJK = 'cjk',
        CZECH = 'czech',
        DANISH = 'danish',
        DUTCH = 'dutch',
        ENGLISH = 'english',
        FINNISH = 'finnish',
        FRENCH = 'french',
        GALICIAN = 'galician',
        GERMAN = 'german',
        GREEK = 'greek',
        HINDI = 'hindi',
        HUNGARIAN = 'hungarian',
        INDONESIAN = 'indonesian',
        IRISH = 'irish',
        ITALIAN = 'italian',
        JAPANESE = 'japanese',
        LATVIAN = 'latvian',
        NORWEGIAN = 'norwegian',
        PERSIAN = 'persian',
        POLISH = 'polish',
        PORTUGUESE = 'portuguese',
        ROMANIAN = 'romanian',
        RUSSIAN = 'russian',
        SPANISH = 'spanish',
        SWEDISH = 'swedish',
        THAI = 'thai',
        TURKISH = 'turkish',
      }
    }
      export interface Transport {
        name: string;
        stopwords?: string[];
        fields?: {[key: string]: Analyzer.Transport};
      }
  }

  /**
   * Schema for api keys.
   */
  export class ApiKeysResult {
    /** ok. */
    ok: boolean;

    /** The generated api key. */
    key: string;

    /** The password associated with the api key. */
    password: string;

    static serialize(obj): ApiKeysResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ApiKeysResult.Transport = <ApiKeysResult.Transport>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.password !== undefined) {
        copy.password = obj.password;
      }
      return copy as unknown as ApiKeysResult.Transport;
    }

    static deserialize(obj): ApiKeysResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ApiKeysResult = <ApiKeysResult>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.password !== undefined) {
        copy.password = obj.password;
      }
      return copy as unknown as ApiKeysResult;
    }
  }
  export namespace ApiKeysResult {
      export interface Transport {
        ok: boolean;
        key: string;
        password: string;
      }
  }

  /**
   * Schema for an attachment.
   */
  export class Attachment {
    /** Attachment MIME type. */
    contentType?: string;

    /** Base64-encoded content. Available if attachment content is requested by using the query parameters
     *  `attachments=true` or `atts_since`. Note that when used with a view or changes feed `include_docs` must also be
     *  `true`.
     */
    data?: Buffer;

    /** Content hash digest. It starts with prefix which announce hash type (e.g. `md5-`) and continues with
     *  Base64-encoded hash digest.
     */
    digest?: string;

    /** Compressed attachment size in bytes. Available if content_type was in list of compressible types when the
     *  attachment was added and the query parameter `att_encoding_info` is `true`. Note that when used with a view or
     *  changes feed `include_docs` must also be `true`.
     */
    encodedLength?: number;

    /** Compression codec. Available if content_type was in list of compressible types when the attachment was added
     *  and the and the query parameter `att_encoding_info` is `true`. Note that when used with a view or changes feed
     *  `include_docs` must also be `true`.
     */
    encoding?: string;

    /** True if the attachment follows in a multipart request or response. */
    follows?: boolean;

    /** Real attachment size in bytes. Not available if inline attachment content requested. */
    length?: number;

    /** Revision number when attachment was added. */
    revpos?: number;

    /** Has `true` value if object contains stub info and no content. Otherwise omitted in response. */
    stub?: boolean;

    static serialize(obj): Attachment.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Attachment.Transport = <Attachment.Transport>{};
      if (obj.contentType !== undefined) {
        copy.content_type = obj.contentType;
      }
      if (obj.data !== undefined) {
        copy.data = obj.data !== null ? obj.data.toString('base64') : null;
      }
      if (obj.digest !== undefined) {
        copy.digest = obj.digest;
      }
      if (obj.encodedLength !== undefined) {
        copy.encoded_length = obj.encodedLength;
      }
      if (obj.encoding !== undefined) {
        copy.encoding = obj.encoding;
      }
      if (obj.follows !== undefined) {
        copy.follows = obj.follows;
      }
      if (obj.length !== undefined) {
        copy.length = obj.length;
      }
      if (obj.revpos !== undefined) {
        copy.revpos = obj.revpos;
      }
      if (obj.stub !== undefined) {
        copy.stub = obj.stub;
      }
      return copy as unknown as Attachment.Transport;
    }

    static deserialize(obj): Attachment {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Attachment = <Attachment>{};
      if (obj.content_type !== undefined) {
        copy.contentType = obj.content_type;
      }
      if (obj.data !== undefined) {
        copy.data = obj.data !== null ? Buffer.from(obj.data, 'base64') : null;
      }
      if (obj.digest !== undefined) {
        copy.digest = obj.digest;
      }
      if (obj.encoded_length !== undefined) {
        copy.encodedLength = obj.encoded_length;
      }
      if (obj.encoding !== undefined) {
        copy.encoding = obj.encoding;
      }
      if (obj.follows !== undefined) {
        copy.follows = obj.follows;
      }
      if (obj.length !== undefined) {
        copy.length = obj.length;
      }
      if (obj.revpos !== undefined) {
        copy.revpos = obj.revpos;
      }
      if (obj.stub !== undefined) {
        copy.stub = obj.stub;
      }
      return copy as unknown as Attachment;
    }
  }
  export namespace Attachment {
      export interface Transport {
        content_type?: string;
        data?: string;
        digest?: string;
        encoded_length?: number;
        encoding?: string;
        follows?: boolean;
        length?: number;
        revpos?: number;
        stub?: boolean;
      }
  }

  /**
   * Schema for submitting documents for bulk modifications.
   */
  export class BulkDocs {
    /** Array of documents. */
    docs: Document[];

    /** If `false`, prevents the database from assigning them new revision IDs. Default is `true`.
     *
     *  Avoid using this parameter, since this option applies document revisions without checking for conflicts, so it
     *  is very easy to accidentally end up with a large number of conflicts.
     */
    newEdits?: boolean;

    static serialize(obj): BulkDocs.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkDocs.Transport = <BulkDocs.Transport>{};
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, Document.serialize);
      }
      if (obj.newEdits !== undefined) {
        copy.new_edits = obj.newEdits;
      }
      return copy as unknown as BulkDocs.Transport;
    }

    static deserialize(obj): BulkDocs {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkDocs = <BulkDocs>{};
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, Document.deserialize);
      }
      if (obj.new_edits !== undefined) {
        copy.newEdits = obj.new_edits;
      }
      return copy as unknown as BulkDocs;
    }
  }
  export namespace BulkDocs {
      export interface Transport {
        docs: Document[];
        new_edits?: boolean;
      }
  }

  /**
   * Schema for a document item in a bulk get query.
   */
  export class BulkGetQueryDocument {
    /** Includes attachments only since specified revisions. */
    attsSince?: string[];

    /** Schema for a document ID. */
    id: string;

    /** Schema for a document revision identifier. */
    rev?: string;

    static serialize(obj): BulkGetQueryDocument.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetQueryDocument.Transport = <BulkGetQueryDocument.Transport>{};
      if (obj.attsSince !== undefined) {
        copy.atts_since = obj.attsSince;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as BulkGetQueryDocument.Transport;
    }

    static deserialize(obj): BulkGetQueryDocument {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetQueryDocument = <BulkGetQueryDocument>{};
      if (obj.atts_since !== undefined) {
        copy.attsSince = obj.atts_since;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as BulkGetQueryDocument;
    }
  }
  export namespace BulkGetQueryDocument {
      export interface Transport {
        atts_since?: string[];
        id: string;
        rev?: string;
      }
  }

  /**
   * Schema for the results object of a bulk get operation.
   */
  export class BulkGetResult {
    /** Results. */
    results: BulkGetResultItem[];

    static serialize(obj): BulkGetResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResult.Transport = <BulkGetResult.Transport>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, BulkGetResultItem.serialize);
      }
      return copy as unknown as BulkGetResult.Transport;
    }

    static deserialize(obj): BulkGetResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResult = <BulkGetResult>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, BulkGetResultItem.deserialize);
      }
      return copy as unknown as BulkGetResult;
    }
  }
  export namespace BulkGetResult {
      export interface Transport {
        results: BulkGetResultItem[];
      }
  }

  /**
   * Schema for BulkGetResult object containing a successfully retrieved document or error information.
   */
  export class BulkGetResultDocument {
    /** Schema for the result of a document modification. */
    error?: DocumentResult;

    /** Schema for a document. */
    ok?: Document;

    static serialize(obj): BulkGetResultDocument.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResultDocument.Transport = <BulkGetResultDocument.Transport>{};
      if (obj.error !== undefined) {
        copy.error = DocumentResult.serialize(obj.error);
      }
      if (obj.ok !== undefined) {
        copy.ok = Document.serialize(obj.ok);
      }
      return copy as unknown as BulkGetResultDocument.Transport;
    }

    static deserialize(obj): BulkGetResultDocument {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResultDocument = <BulkGetResultDocument>{};
      if (obj.error !== undefined) {
        copy.error = DocumentResult.deserialize(obj.error);
      }
      if (obj.ok !== undefined) {
        copy.ok = Document.deserialize(obj.ok);
      }
      return copy as unknown as BulkGetResultDocument;
    }
  }
  export namespace BulkGetResultDocument {
      export interface Transport {
        error?: DocumentResult.Transport;
        ok?: Document.Transport;
      }
  }

  /**
   * Schema for the document revisions information from a bulk get operation.
   */
  export class BulkGetResultItem {
    /** Array of document revisions or error information. */
    docs: BulkGetResultDocument[];

    /** Schema for a document ID. */
    id: string;

    static serialize(obj): BulkGetResultItem.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResultItem.Transport = <BulkGetResultItem.Transport>{};
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, BulkGetResultDocument.serialize);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      return copy as unknown as BulkGetResultItem.Transport;
    }

    static deserialize(obj): BulkGetResultItem {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: BulkGetResultItem = <BulkGetResultItem>{};
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, BulkGetResultDocument.deserialize);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      return copy as unknown as BulkGetResultItem;
    }
  }
  export namespace BulkGetResultItem {
      export interface Transport {
        docs: BulkGetResultDocument[];
        id: string;
      }
  }

  /**
   * Schema for information about maximum total database count.
   */
  export class CapacityDatabasesInformation {
    /** Schema for information about the current database capacity. */
    current?: CapacityDatabasesInformationCurrent;

    static serialize(obj): CapacityDatabasesInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityDatabasesInformation.Transport = <CapacityDatabasesInformation.Transport>{};
      if (obj.current !== undefined) {
        copy.current = CapacityDatabasesInformationCurrent.serialize(obj.current);
      }
      return copy as unknown as CapacityDatabasesInformation.Transport;
    }

    static deserialize(obj): CapacityDatabasesInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityDatabasesInformation = <CapacityDatabasesInformation>{};
      if (obj.current !== undefined) {
        copy.current = CapacityDatabasesInformationCurrent.deserialize(obj.current);
      }
      return copy as unknown as CapacityDatabasesInformation;
    }
  }
  export namespace CapacityDatabasesInformation {
      export interface Transport {
        current?: CapacityDatabasesInformationCurrent.Transport;
      }
  }

  /**
   * Schema for information about the current database capacity.
   */
  export class CapacityDatabasesInformationCurrent {
    /** Schema for databases count. */
    databases?: DatabasesCountInformation;

    static serialize(obj): CapacityDatabasesInformationCurrent.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityDatabasesInformationCurrent.Transport = <CapacityDatabasesInformationCurrent.Transport>{};
      if (obj.databases !== undefined) {
        copy.databases = DatabasesCountInformation.serialize(obj.databases);
      }
      return copy as unknown as CapacityDatabasesInformationCurrent.Transport;
    }

    static deserialize(obj): CapacityDatabasesInformationCurrent {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityDatabasesInformationCurrent = <CapacityDatabasesInformationCurrent>{};
      if (obj.databases !== undefined) {
        copy.databases = DatabasesCountInformation.deserialize(obj.databases);
      }
      return copy as unknown as CapacityDatabasesInformationCurrent;
    }
  }
  export namespace CapacityDatabasesInformationCurrent {
      export interface Transport {
        databases?: DatabasesCountInformation.Transport;
      }
  }

  /**
   * Schema for information about the currently provisioned and target throughput capacity.
   */
  export class CapacityThroughputInformation {
    /** Detailed information about provisioned throughput capacity. */
    current: CapacityThroughputInformationCurrent;

    /** Detailed information about target throughput capacity. */
    target?: CapacityThroughputInformationTarget;

    static serialize(obj): CapacityThroughputInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformation.Transport = <CapacityThroughputInformation.Transport>{};
      if (obj.current !== undefined) {
        copy.current = CapacityThroughputInformationCurrent.serialize(obj.current);
      }
      if (obj.target !== undefined) {
        copy.target = CapacityThroughputInformationTarget.serialize(obj.target);
      }
      return copy as unknown as CapacityThroughputInformation.Transport;
    }

    static deserialize(obj): CapacityThroughputInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformation = <CapacityThroughputInformation>{};
      if (obj.current !== undefined) {
        copy.current = CapacityThroughputInformationCurrent.deserialize(obj.current);
      }
      if (obj.target !== undefined) {
        copy.target = CapacityThroughputInformationTarget.deserialize(obj.target);
      }
      return copy as unknown as CapacityThroughputInformation;
    }
  }
  export namespace CapacityThroughputInformation {
      export interface Transport {
        current: CapacityThroughputInformationCurrent.Transport;
        target?: CapacityThroughputInformationTarget.Transport;
      }
  }

  /**
   * Detailed information about provisioned throughput capacity.
   */
  export class CapacityThroughputInformationCurrent {
    /** Schema for detailed information about throughput capacity with breakdown by specific throughput requests
     *  classes.
     */
    throughput: ThroughputInformation;

    static serialize(obj): CapacityThroughputInformationCurrent.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformationCurrent.Transport = <CapacityThroughputInformationCurrent.Transport>{};
      if (obj.throughput !== undefined) {
        copy.throughput = ThroughputInformation.serialize(obj.throughput);
      }
      return copy as unknown as CapacityThroughputInformationCurrent.Transport;
    }

    static deserialize(obj): CapacityThroughputInformationCurrent {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformationCurrent = <CapacityThroughputInformationCurrent>{};
      if (obj.throughput !== undefined) {
        copy.throughput = ThroughputInformation.deserialize(obj.throughput);
      }
      return copy as unknown as CapacityThroughputInformationCurrent;
    }
  }
  export namespace CapacityThroughputInformationCurrent {
      export interface Transport {
        throughput: ThroughputInformation.Transport;
      }
  }

  /**
   * Detailed information about target throughput capacity.
   */
  export class CapacityThroughputInformationTarget {
    /** Schema for detailed information about throughput capacity with breakdown by specific throughput requests
     *  classes.
     */
    throughput: ThroughputInformation;

    static serialize(obj): CapacityThroughputInformationTarget.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformationTarget.Transport = <CapacityThroughputInformationTarget.Transport>{};
      if (obj.throughput !== undefined) {
        copy.throughput = ThroughputInformation.serialize(obj.throughput);
      }
      return copy as unknown as CapacityThroughputInformationTarget.Transport;
    }

    static deserialize(obj): CapacityThroughputInformationTarget {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CapacityThroughputInformationTarget = <CapacityThroughputInformationTarget>{};
      if (obj.throughput !== undefined) {
        copy.throughput = ThroughputInformation.deserialize(obj.throughput);
      }
      return copy as unknown as CapacityThroughputInformationTarget;
    }
  }
  export namespace CapacityThroughputInformationTarget {
      export interface Transport {
        throughput: ThroughputInformation.Transport;
      }
  }

  /**
   * Schema for a document leaf with single field rev.
   */
  export class Change {
    /** Schema for a document revision identifier. */
    rev: string;

    static serialize(obj): Change.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Change.Transport = <Change.Transport>{};
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as Change.Transport;
    }

    static deserialize(obj): Change {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Change = <Change>{};
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as Change;
    }
  }
  export namespace Change {
      export interface Transport {
        rev: string;
      }
  }

  /**
   * Schema for normal changes feed result.
   */
  export class ChangesResult {
    /** last_seq. */
    lastSeq: string;

    /** pending. */
    pending: number;

    /** results. */
    results: ChangesResultItem[];

    static serialize(obj): ChangesResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ChangesResult.Transport = <ChangesResult.Transport>{};
      if (obj.lastSeq !== undefined) {
        copy.last_seq = obj.lastSeq;
      }
      if (obj.pending !== undefined) {
        copy.pending = obj.pending;
      }
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, ChangesResultItem.serialize);
      }
      return copy as unknown as ChangesResult.Transport;
    }

    static deserialize(obj): ChangesResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ChangesResult = <ChangesResult>{};
      if (obj.last_seq !== undefined) {
        copy.lastSeq = obj.last_seq;
      }
      if (obj.pending !== undefined) {
        copy.pending = obj.pending;
      }
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, ChangesResultItem.deserialize);
      }
      return copy as unknown as ChangesResult;
    }
  }
  export namespace ChangesResult {
      export interface Transport {
        last_seq: string;
        pending: number;
        results: ChangesResultItem[];
      }
  }

  /**
   * Schema for an item in the changes results array.
   */
  export class ChangesResultItem {
    /** List of document's leaves with single field rev. */
    changes: Change[];

    /** if `true` then the document is deleted. */
    deleted?: boolean;

    /** Schema for a document. */
    doc?: Document;

    /** Schema for a document ID. */
    id: string;

    /** Update sequence. */
    seq: string;

    static serialize(obj): ChangesResultItem.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ChangesResultItem.Transport = <ChangesResultItem.Transport>{};
      if (obj.changes !== undefined) {
        copy.changes = BaseService.convertModel(obj.changes, Change.serialize);
      }
      if (obj.deleted !== undefined) {
        copy.deleted = obj.deleted;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.serialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.seq !== undefined) {
        copy.seq = obj.seq;
      }
      return copy as unknown as ChangesResultItem.Transport;
    }

    static deserialize(obj): ChangesResultItem {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ChangesResultItem = <ChangesResultItem>{};
      if (obj.changes !== undefined) {
        copy.changes = BaseService.convertModel(obj.changes, Change.deserialize);
      }
      if (obj.deleted !== undefined) {
        copy.deleted = obj.deleted;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.deserialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.seq !== undefined) {
        copy.seq = obj.seq;
      }
      return copy as unknown as ChangesResultItem;
    }
  }
  export namespace ChangesResultItem {
      export interface Transport {
        changes: Change[];
        deleted?: boolean;
        doc?: Document.Transport;
        id: string;
        seq: string;
      }
  }

  /**
   * Schema for size information of content.
   */
  export class ContentInformationSizes {
    /** The active size of the content, in bytes. */
    active: number;

    /** The total uncompressed size of the content, in bytes. */
    external: number;

    /** The total size of the content as stored on disk, in bytes. */
    file: number;

    static serialize(obj): ContentInformationSizes.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ContentInformationSizes.Transport = <ContentInformationSizes.Transport>{};
      if (obj.active !== undefined) {
        copy.active = obj.active;
      }
      if (obj.external !== undefined) {
        copy.external = obj.external;
      }
      if (obj.file !== undefined) {
        copy.file = obj.file;
      }
      return copy as unknown as ContentInformationSizes.Transport;
    }

    static deserialize(obj): ContentInformationSizes {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ContentInformationSizes = <ContentInformationSizes>{};
      if (obj.active !== undefined) {
        copy.active = obj.active;
      }
      if (obj.external !== undefined) {
        copy.external = obj.external;
      }
      if (obj.file !== undefined) {
        copy.file = obj.file;
      }
      return copy as unknown as ContentInformationSizes;
    }
  }
  export namespace ContentInformationSizes {
      export interface Transport {
        active: number;
        external: number;
        file: number;
      }
  }

  /**
   * Schema for information about the CORS configuration.
   */
  export class CorsInformation {
    /** Boolean value to allow authentication credentials. If set to true, browser requests must be done by using
     *  withCredentials = true.
     */
    allowCredentials: boolean;

    /** Boolean value to turn CORS on and off. */
    enableCors: boolean;

    /** An array of strings that contain allowed origin domains. You have to specify the full URL including the
     *  protocol. It is recommended that only the HTTPS protocol is used. Subdomains count as separate domains, so you
     *  have to specify all subdomains used.
     */
    origins: string[];

    static serialize(obj): CorsInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CorsInformation.Transport = <CorsInformation.Transport>{};
      if (obj.allowCredentials !== undefined) {
        copy.allow_credentials = obj.allowCredentials;
      }
      if (obj.enableCors !== undefined) {
        copy.enable_cors = obj.enableCors;
      }
      if (obj.origins !== undefined) {
        copy.origins = obj.origins;
      }
      return copy as unknown as CorsInformation.Transport;
    }

    static deserialize(obj): CorsInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CorsInformation = <CorsInformation>{};
      if (obj.allow_credentials !== undefined) {
        copy.allowCredentials = obj.allow_credentials;
      }
      if (obj.enable_cors !== undefined) {
        copy.enableCors = obj.enable_cors;
      }
      if (obj.origins !== undefined) {
        copy.origins = obj.origins;
      }
      return copy as unknown as CorsInformation;
    }
  }
  export namespace CorsInformation {
      export interface Transport {
        allow_credentials: boolean;
        enable_cors: boolean;
        origins: string[];
      }
  }

  /**
   * Schema for information about the current database counts.
   */
  export class CurrentDatabasesInformation {
    /** Schema for databases count. */
    databases?: DatabasesCountInformation;

    static serialize(obj): CurrentDatabasesInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentDatabasesInformation.Transport = <CurrentDatabasesInformation.Transport>{};
      if (obj.databases !== undefined) {
        copy.databases = DatabasesCountInformation.serialize(obj.databases);
      }
      return copy as unknown as CurrentDatabasesInformation.Transport;
    }

    static deserialize(obj): CurrentDatabasesInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentDatabasesInformation = <CurrentDatabasesInformation>{};
      if (obj.databases !== undefined) {
        copy.databases = DatabasesCountInformation.deserialize(obj.databases);
      }
      return copy as unknown as CurrentDatabasesInformation;
    }
  }
  export namespace CurrentDatabasesInformation {
      export interface Transport {
        databases?: DatabasesCountInformation.Transport;
      }
  }

  /**
   * Schema for information about current consumption of a provisioned throughput capacity.
   */
  export class CurrentThroughputInformation {
    /** Detailed information about current consumption. */
    throughput: CurrentThroughputInformationThroughput;

    static serialize(obj): CurrentThroughputInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentThroughputInformation.Transport = <CurrentThroughputInformation.Transport>{};
      if (obj.throughput !== undefined) {
        copy.throughput = CurrentThroughputInformationThroughput.serialize(obj.throughput);
      }
      return copy as unknown as CurrentThroughputInformation.Transport;
    }

    static deserialize(obj): CurrentThroughputInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentThroughputInformation = <CurrentThroughputInformation>{};
      if (obj.throughput !== undefined) {
        copy.throughput = CurrentThroughputInformationThroughput.deserialize(obj.throughput);
      }
      return copy as unknown as CurrentThroughputInformation;
    }
  }
  export namespace CurrentThroughputInformation {
      export interface Transport {
        throughput: CurrentThroughputInformationThroughput.Transport;
      }
  }

  /**
   * Detailed information about current consumption.
   */
  export class CurrentThroughputInformationThroughput {
    /** Number of global queries conducted against the instance for a given second. */
    query: number;

    /** Number of reads conducted against the instance for a given second. */
    read: number;

    /** Number of writes conducted against the instance for a given second. */
    write: number;

    static serialize(obj): CurrentThroughputInformationThroughput.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentThroughputInformationThroughput.Transport = <CurrentThroughputInformationThroughput.Transport>{};
      if (obj.query !== undefined) {
        copy.query = obj.query;
      }
      if (obj.read !== undefined) {
        copy.read = obj.read;
      }
      if (obj.write !== undefined) {
        copy.write = obj.write;
      }
      return copy as unknown as CurrentThroughputInformationThroughput.Transport;
    }

    static deserialize(obj): CurrentThroughputInformationThroughput {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: CurrentThroughputInformationThroughput = <CurrentThroughputInformationThroughput>{};
      if (obj.query !== undefined) {
        copy.query = obj.query;
      }
      if (obj.read !== undefined) {
        copy.read = obj.read;
      }
      if (obj.write !== undefined) {
        copy.write = obj.write;
      }
      return copy as unknown as CurrentThroughputInformationThroughput;
    }
  }
  export namespace CurrentThroughputInformationThroughput {
      export interface Transport {
        query: number;
        read: number;
        write: number;
      }
  }

  /**
   * Schema for information about a database.
   */
  export class DatabaseInformation {
    /** Schema for database cluster information. */
    cluster: DatabaseInformationCluster;

    /** An opaque string that describes the committed state of the database. */
    committedUpdateSeq?: string;

    /** True if the database compaction routine is operating on this database. */
    compactRunning: boolean;

    /** An opaque string that describes the compaction state of the database. */
    compactedSeq?: string;

    /** Schema for a database name. */
    dbName: string;

    /** The version of the physical format used for the data when it is stored on disk. */
    diskFormatVersion: number;

    /** A count of the documents in the specified database. */
    docCount: number;

    /** Number of deleted documents. */
    docDelCount: number;

    /** The engine used for the database. */
    engine?: string;

    /** An opaque string to detect whether a database has been recreated. The field name is for compatibility with
     *  old replicator versions. Do not use the value to infer timing infromation. Typically only used by replicators.
     */
    instanceStartTime: string;

    /** Information about database's partitioned indexes. */
    partitionedIndexes?: PartitionedIndexesInformation;

    /** Schema for database properties. */
    props: DatabaseInformationProps;

    /** Schema for size information of content. */
    sizes: ContentInformationSizes;

    /** An opaque string that describes the state of the database. Do not rely on this string for counting the
     *  number of updates.
     */
    updateSeq: string;

    /** The UUID of the database. */
    uuid?: string;

    static serialize(obj): DatabaseInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformation.Transport = <DatabaseInformation.Transport>{};
      if (obj.cluster !== undefined) {
        copy.cluster = DatabaseInformationCluster.serialize(obj.cluster);
      }
      if (obj.committedUpdateSeq !== undefined) {
        copy.committed_update_seq = obj.committedUpdateSeq;
      }
      if (obj.compactRunning !== undefined) {
        copy.compact_running = obj.compactRunning;
      }
      if (obj.compactedSeq !== undefined) {
        copy.compacted_seq = obj.compactedSeq;
      }
      if (obj.dbName !== undefined) {
        copy.db_name = obj.dbName;
      }
      if (obj.diskFormatVersion !== undefined) {
        copy.disk_format_version = obj.diskFormatVersion;
      }
      if (obj.docCount !== undefined) {
        copy.doc_count = obj.docCount;
      }
      if (obj.docDelCount !== undefined) {
        copy.doc_del_count = obj.docDelCount;
      }
      if (obj.engine !== undefined) {
        copy.engine = obj.engine;
      }
      if (obj.instanceStartTime !== undefined) {
        copy.instance_start_time = obj.instanceStartTime;
      }
      if (obj.partitionedIndexes !== undefined) {
        copy.partitioned_indexes = PartitionedIndexesInformation.serialize(obj.partitionedIndexes);
      }
      if (obj.props !== undefined) {
        copy.props = DatabaseInformationProps.serialize(obj.props);
      }
      if (obj.sizes !== undefined) {
        copy.sizes = ContentInformationSizes.serialize(obj.sizes);
      }
      if (obj.updateSeq !== undefined) {
        copy.update_seq = obj.updateSeq;
      }
      if (obj.uuid !== undefined) {
        copy.uuid = obj.uuid;
      }
      return copy as unknown as DatabaseInformation.Transport;
    }

    static deserialize(obj): DatabaseInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformation = <DatabaseInformation>{};
      if (obj.cluster !== undefined) {
        copy.cluster = DatabaseInformationCluster.deserialize(obj.cluster);
      }
      if (obj.committed_update_seq !== undefined) {
        copy.committedUpdateSeq = obj.committed_update_seq;
      }
      if (obj.compact_running !== undefined) {
        copy.compactRunning = obj.compact_running;
      }
      if (obj.compacted_seq !== undefined) {
        copy.compactedSeq = obj.compacted_seq;
      }
      if (obj.db_name !== undefined) {
        copy.dbName = obj.db_name;
      }
      if (obj.disk_format_version !== undefined) {
        copy.diskFormatVersion = obj.disk_format_version;
      }
      if (obj.doc_count !== undefined) {
        copy.docCount = obj.doc_count;
      }
      if (obj.doc_del_count !== undefined) {
        copy.docDelCount = obj.doc_del_count;
      }
      if (obj.engine !== undefined) {
        copy.engine = obj.engine;
      }
      if (obj.instance_start_time !== undefined) {
        copy.instanceStartTime = obj.instance_start_time;
      }
      if (obj.partitioned_indexes !== undefined) {
        copy.partitionedIndexes = PartitionedIndexesInformation.deserialize(obj.partitioned_indexes);
      }
      if (obj.props !== undefined) {
        copy.props = DatabaseInformationProps.deserialize(obj.props);
      }
      if (obj.sizes !== undefined) {
        copy.sizes = ContentInformationSizes.deserialize(obj.sizes);
      }
      if (obj.update_seq !== undefined) {
        copy.updateSeq = obj.update_seq;
      }
      if (obj.uuid !== undefined) {
        copy.uuid = obj.uuid;
      }
      return copy as unknown as DatabaseInformation;
    }
  }
  export namespace DatabaseInformation {
      export interface Transport {
        cluster: DatabaseInformationCluster.Transport;
        committed_update_seq?: string;
        compact_running: boolean;
        compacted_seq?: string;
        db_name: string;
        disk_format_version: number;
        doc_count: number;
        doc_del_count: number;
        engine?: string;
        instance_start_time: string;
        partitioned_indexes?: PartitionedIndexesInformation.Transport;
        props: DatabaseInformationProps.Transport;
        sizes: ContentInformationSizes.Transport;
        update_seq: string;
        uuid?: string;
      }
  }

  /**
   * Schema for database cluster information.
   */
  export class DatabaseInformationCluster {
    /** Schema for the number of replicas of a database in a cluster. The cluster is using the default value and it
     *  cannot be changed by the user.
     */
    n: number;

    /** Schema for the number of shards in a database. Each shard is a partition of the hash value range. */
    q: number;

    /** Read quorum. The number of consistent copies of a document that need to be read before a successful reply. */
    r: number;

    /** Write quorum. The number of copies of a document that need to be written before a successful reply. */
    w: number;

    static serialize(obj): DatabaseInformationCluster.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformationCluster.Transport = <DatabaseInformationCluster.Transport>{};
      if (obj.n !== undefined) {
        copy.n = obj.n;
      }
      if (obj.q !== undefined) {
        copy.q = obj.q;
      }
      if (obj.r !== undefined) {
        copy.r = obj.r;
      }
      if (obj.w !== undefined) {
        copy.w = obj.w;
      }
      return copy as unknown as DatabaseInformationCluster.Transport;
    }

    static deserialize(obj): DatabaseInformationCluster {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformationCluster = <DatabaseInformationCluster>{};
      if (obj.n !== undefined) {
        copy.n = obj.n;
      }
      if (obj.q !== undefined) {
        copy.q = obj.q;
      }
      if (obj.r !== undefined) {
        copy.r = obj.r;
      }
      if (obj.w !== undefined) {
        copy.w = obj.w;
      }
      return copy as unknown as DatabaseInformationCluster;
    }
  }
  export namespace DatabaseInformationCluster {
      export interface Transport {
        n: number;
        q: number;
        r: number;
        w: number;
      }
  }

  /**
   * Schema for database properties.
   */
  export class DatabaseInformationProps {
    /** The value is `true` for a partitioned database. */
    partitioned?: boolean;

    static serialize(obj): DatabaseInformationProps.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformationProps.Transport = <DatabaseInformationProps.Transport>{};
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      return copy as unknown as DatabaseInformationProps.Transport;
    }

    static deserialize(obj): DatabaseInformationProps {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabaseInformationProps = <DatabaseInformationProps>{};
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      return copy as unknown as DatabaseInformationProps;
    }
  }
  export namespace DatabaseInformationProps {
      export interface Transport {
        partitioned?: boolean;
      }
  }

  /**
   * Schema for databases count.
   */
  export class DatabasesCountInformation {
    /** The total number of databases. */
    total?: number;

    static serialize(obj): DatabasesCountInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabasesCountInformation.Transport = <DatabasesCountInformation.Transport>{};
      if (obj.total !== undefined) {
        copy.total = obj.total;
      }
      return copy as unknown as DatabasesCountInformation.Transport;
    }

    static deserialize(obj): DatabasesCountInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DatabasesCountInformation = <DatabasesCountInformation>{};
      if (obj.total !== undefined) {
        copy.total = obj.total;
      }
      return copy as unknown as DatabasesCountInformation;
    }
  }
  export namespace DatabasesCountInformation {
      export interface Transport {
        total?: number;
      }
  }

  /**
   * Schema for a database change event.
   */
  export class DbEvent {
    /** Schema for a database name. */
    dbName: string;

    /** Sequence number. */
    seq: string;

    /** A database event. */
    type: DbEvent.Constants.Type | string;

    static serialize(obj): DbEvent.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbEvent.Transport = <DbEvent.Transport>{};
      if (obj.dbName !== undefined) {
        copy.db_name = obj.dbName;
      }
      if (obj.seq !== undefined) {
        copy.seq = obj.seq;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as DbEvent.Transport;
    }

    static deserialize(obj): DbEvent {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbEvent = <DbEvent>{};
      if (obj.db_name !== undefined) {
        copy.dbName = obj.db_name;
      }
      if (obj.seq !== undefined) {
        copy.seq = obj.seq;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as DbEvent;
    }
  }
  export namespace DbEvent {
    export namespace Constants {
      /** A database event. */
      export enum Type {
        CREATED = 'created',
        DELETED = 'deleted',
        UPDATED = 'updated',
      }
    }
      export interface Transport {
        db_name: string;
        seq: string;
        type: string;
      }
  }

  /**
   * Schema for database updates.
   */
  export class DbUpdates {
    /** Last sequence number. */
    lastSeq: string;

    /** results. */
    results: DbEvent[];

    static serialize(obj): DbUpdates.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbUpdates.Transport = <DbUpdates.Transport>{};
      if (obj.lastSeq !== undefined) {
        copy.last_seq = obj.lastSeq;
      }
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, DbEvent.serialize);
      }
      return copy as unknown as DbUpdates.Transport;
    }

    static deserialize(obj): DbUpdates {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbUpdates = <DbUpdates>{};
      if (obj.last_seq !== undefined) {
        copy.lastSeq = obj.last_seq;
      }
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, DbEvent.deserialize);
      }
      return copy as unknown as DbUpdates;
    }
  }
  export namespace DbUpdates {
      export interface Transport {
        last_seq: string;
        results: DbEvent[];
      }
  }

  /**
   * Schema for database information keyed by database name.
   */
  export class DbsInfoResult {
    /** The name of the error. */
    error?: string;

    /** Schema for information about a database. */
    info?: DatabaseInformation;

    /** Schema for a database name. */
    key: string;

    static serialize(obj): DbsInfoResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbsInfoResult.Transport = <DbsInfoResult.Transport>{};
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.info !== undefined) {
        copy.info = DatabaseInformation.serialize(obj.info);
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      return copy as unknown as DbsInfoResult.Transport;
    }

    static deserialize(obj): DbsInfoResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DbsInfoResult = <DbsInfoResult>{};
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.info !== undefined) {
        copy.info = DatabaseInformation.deserialize(obj.info);
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      return copy as unknown as DbsInfoResult;
    }
  }
  export namespace DbsInfoResult {
      export interface Transport {
        error?: string;
        info?: DatabaseInformation.Transport;
        key: string;
      }
  }

  /**
   * Schema for a design document.
   *
   * This type supports additional properties of type any.
   */
  export class DesignDocument {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: {[key: string]: Attachment};

    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];

    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;

    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];

    /** Schema for a design document ID including a `_design/` prefix. */
    _id?: string;

    /** Document's update sequence in current database. Available if requested with local_seq=true query parameter. */
    _local_seq?: string;

    /** Schema for a document revision identifier. */
    _rev?: string;

    /** Schema for list of revision information. */
    _revisions?: Revisions;

    /** Schema for a list of objects with information about local revisions and their status. */
    _revs_info?: DocumentRevisionStatus[];

    /** Indicates whether to automatically build indexes defined in this design document. */
    autoupdate?: boolean;

    /** Schema for filter functions definition. This schema is a map where keys are the names of the filter
     *  functions and values are the function definition in string format.
     *
     *  Filter function formats, or filters the changes feed that pass filter rules. The function takes 2 parameters:
     *
     *    * `doc`: The document that is being processed.
     *    * `req`: A Request JavaScript object with these properties:
     *
     *      * `body` - string, Request body data as string.
     *        If the request method is GET this field contains the value
     *        `"undefined"`.
     *        If the method is DELETE or HEAD the value is `""` (empty string).
     *      * `cookie` - Cookies object.
     *      * `form` - Form Data object, contains the decoded body as key-value
     *        pairs if the Content-Type header was
     *        application/x-www-form-urlencoded.
     *      * `headers` - Request Headers object.
     *      * `id` - string, requested document id if it was specified
     *        or null otherwise.
     *      * `info` - Database Information object,
     *        see `DatabaseInformation`.
     *      * `method` - string or an array of chars, request method.
     *        String value is a method as one of: HEAD, GET, POST, PUT,
     *        DELETE, OPTIONS, TRACE, COPY. For not supported methods
     *        it will be represented as an array of char codes e.g. for VIEW
     *        it will be 86,73,69,87.
     *      * `path` - array of strings, requested path sections.
     *      * `peer` - string, request source IP address.
     *      * `query` - string, URL query parameters object. Note that multiple
     *        keys are not supported and the last key value suppresses others.
     *      * `requested_path` - array of strings,
     *        actual requested path section.
     *      * `raw_path` - string, raw requested path.
     *      * `userCtx`: User Context Object, containing information about the
     *        user writing the document (if present), see the `UserContext`.
     *      * `secObj`: Security Object, with lists of database security roles,
     *        see the `SecurityObject`.
     *      * `uuid` - string, generated UUID by a specified algorithm in the
     *        config file.
     *
     *  Filter functions must return true if a document passed all the rules.
     */
    filters?: JsonObject;

    /** Search (text) index function definitions. */
    indexes?: {[key: string]: SearchIndexDefinition};

    /** Defines Query Server key to process design document functions. */
    language?: string;

    /** Schema for design document options. */
    options?: DesignDocumentOptions;

    /** Validate document update function can be used to prevent invalid or unauthorized document update requests
     *  from being stored. Validation functions typically examine the structure of the new document to ensure that
     *  required fields are present and to verify that the requesting user should be allowed to make changes to the
     *  document properties. When a write request is received for a given database, the validation function in each
     *  design document in that database is called in an unspecified order. If any of the validation functions throw an
     *  error, the write will not succeed.
     *
     *  The validation function can abort the pending document write by throwing one of two error objects:
     *
     *  ```
     *  // user is not authorized to make the change but may re-authenticate throw({ unauthorized: 'Error message here.'
     *  });
     *
     *  // change is not allowed throw({ forbidden: 'Error message here.' });
     *  ```
     *
     *  The function takes 4 parameters:
     *
     *    * `newDoc` - New version of document that will be stored
     *      from the update request.
     *    * `oldDoc` - Previous version of document that is already stored.
     *    * `userCtx` - User Context Object, containing information about the
     *      user writing the document (if present), see the `UserContext`.
     *    * `secObj` - Security Object, with lists of database security roles,
     *      see the `SecurityObject`.
     */
    validateDocUpdate?: string;

    /** Schema for design document views. */
    views?: {[key: string]: DesignDocumentViewsMapReduce};


    /**
     * DesignDocument accepts additional properties of type any.
     */
    [propName: string]: any;

    static serialize(obj): DesignDocument.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocument.Transport = <DesignDocument.Transport>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.serialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.serialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.serialize);
      }
      if (obj.autoupdate !== undefined) {
        copy.autoupdate = obj.autoupdate;
      }
      if (obj.filters !== undefined) {
        copy.filters = obj.filters;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = BaseService.convertModel(obj.indexes, SearchIndexDefinition.serialize, true);
      }
      if (obj.language !== undefined) {
        copy.language = obj.language;
      }
      if (obj.options !== undefined) {
        copy.options = DesignDocumentOptions.serialize(obj.options);
      }
      if (obj.validateDocUpdate !== undefined) {
        copy.validate_doc_update = obj.validateDocUpdate;
      }
      if (obj.views !== undefined) {
        copy.views = BaseService.convertModel(obj.views, DesignDocumentViewsMapReduce.serialize, true);
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
        'autoupdate',
        'filters',
        'indexes',
        'language',
        'options',
        'validateDocUpdate',
        'views',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as DesignDocument.Transport;
    }

    static deserialize(obj): DesignDocument {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocument = <DesignDocument>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.deserialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.deserialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.deserialize);
      }
      if (obj.autoupdate !== undefined) {
        copy.autoupdate = obj.autoupdate;
      }
      if (obj.filters !== undefined) {
        copy.filters = obj.filters;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = BaseService.convertModel(obj.indexes, SearchIndexDefinition.deserialize, true);
      }
      if (obj.language !== undefined) {
        copy.language = obj.language;
      }
      if (obj.options !== undefined) {
        copy.options = DesignDocumentOptions.deserialize(obj.options);
      }
      if (obj.validate_doc_update !== undefined) {
        copy.validateDocUpdate = obj.validate_doc_update;
      }
      if (obj.views !== undefined) {
        copy.views = BaseService.convertModel(obj.views, DesignDocumentViewsMapReduce.deserialize, true);
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
        'autoupdate',
        'filters',
        'indexes',
        'language',
        'options',
        'validate_doc_update',
        'views',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as DesignDocument;
    }
  }
  export namespace DesignDocument {
      export interface Transport {
        _attachments?: {[key: string]: Attachment.Transport};
        _conflicts?: string[];
        _deleted?: boolean;
        _deleted_conflicts?: string[];
        _id?: string;
        _local_seq?: string;
        _rev?: string;
        _revisions?: Revisions.Transport;
        _revs_info?: DocumentRevisionStatus[];
        autoupdate?: boolean;
        filters?: JsonObject;
        indexes?: {[key: string]: SearchIndexDefinition.Transport};
        language?: string;
        options?: DesignDocumentOptions.Transport;
        validate_doc_update?: string;
        views?: {[key: string]: DesignDocumentViewsMapReduce.Transport};
        /** DesignDocument.DesignDocument.Transport accepts additional properties of type any. */
        [propName: string]: any;
      }
  }

  /**
   * Schema for information about a design document.
   */
  export class DesignDocumentInformation {
    /** name. */
    name: string;

    /** View index information. */
    viewIndex: DesignDocumentViewIndex;

    static serialize(obj): DesignDocumentInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentInformation.Transport = <DesignDocumentInformation.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.viewIndex !== undefined) {
        copy.view_index = DesignDocumentViewIndex.serialize(obj.viewIndex);
      }
      return copy as unknown as DesignDocumentInformation.Transport;
    }

    static deserialize(obj): DesignDocumentInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentInformation = <DesignDocumentInformation>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.view_index !== undefined) {
        copy.viewIndex = DesignDocumentViewIndex.deserialize(obj.view_index);
      }
      return copy as unknown as DesignDocumentInformation;
    }
  }
  export namespace DesignDocumentInformation {
      export interface Transport {
        name: string;
        view_index: DesignDocumentViewIndex.Transport;
      }
  }

  /**
   * Schema for design document options.
   */
  export class DesignDocumentOptions {
    /** Whether this design document describes partitioned or global indexes. */
    partitioned?: boolean;

    static serialize(obj): DesignDocumentOptions.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentOptions.Transport = <DesignDocumentOptions.Transport>{};
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      return copy as unknown as DesignDocumentOptions.Transport;
    }

    static deserialize(obj): DesignDocumentOptions {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentOptions = <DesignDocumentOptions>{};
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      return copy as unknown as DesignDocumentOptions;
    }
  }
  export namespace DesignDocumentOptions {
      export interface Transport {
        partitioned?: boolean;
      }
  }

  /**
   * View index information.
   */
  export class DesignDocumentViewIndex {
    /** List of collator versions. If there are multiple entries this implies a libicu upgrade has occurred but
     *  compaction has not run yet.
     */
    collatorVersions: string[];

    /** Indicates whether a compaction routine is currently running on the view. */
    compactRunning: boolean;

    /** Language for the defined views. */
    language: string;

    /** MD5 signature of the views for the design document. */
    signature: string;

    /** Schema for size information of content. */
    sizes: ContentInformationSizes;

    /** Indicates if the view is currently being updated. */
    updaterRunning: boolean;

    /** Schema for an ability to tell if view is up-to-date without querying it. */
    updatesPending: UpdatesPending;

    /** Number of clients waiting on views from this design document. */
    waitingClients: number;

    /** Indicates if there are outstanding commits to the underlying database that need to processed. */
    waitingCommit: boolean;

    static serialize(obj): DesignDocumentViewIndex.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentViewIndex.Transport = <DesignDocumentViewIndex.Transport>{};
      if (obj.collatorVersions !== undefined) {
        copy.collator_versions = obj.collatorVersions;
      }
      if (obj.compactRunning !== undefined) {
        copy.compact_running = obj.compactRunning;
      }
      if (obj.language !== undefined) {
        copy.language = obj.language;
      }
      if (obj.signature !== undefined) {
        copy.signature = obj.signature;
      }
      if (obj.sizes !== undefined) {
        copy.sizes = ContentInformationSizes.serialize(obj.sizes);
      }
      if (obj.updaterRunning !== undefined) {
        copy.updater_running = obj.updaterRunning;
      }
      if (obj.updatesPending !== undefined) {
        copy.updates_pending = UpdatesPending.serialize(obj.updatesPending);
      }
      if (obj.waitingClients !== undefined) {
        copy.waiting_clients = obj.waitingClients;
      }
      if (obj.waitingCommit !== undefined) {
        copy.waiting_commit = obj.waitingCommit;
      }
      return copy as unknown as DesignDocumentViewIndex.Transport;
    }

    static deserialize(obj): DesignDocumentViewIndex {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentViewIndex = <DesignDocumentViewIndex>{};
      if (obj.collator_versions !== undefined) {
        copy.collatorVersions = obj.collator_versions;
      }
      if (obj.compact_running !== undefined) {
        copy.compactRunning = obj.compact_running;
      }
      if (obj.language !== undefined) {
        copy.language = obj.language;
      }
      if (obj.signature !== undefined) {
        copy.signature = obj.signature;
      }
      if (obj.sizes !== undefined) {
        copy.sizes = ContentInformationSizes.deserialize(obj.sizes);
      }
      if (obj.updater_running !== undefined) {
        copy.updaterRunning = obj.updater_running;
      }
      if (obj.updates_pending !== undefined) {
        copy.updatesPending = UpdatesPending.deserialize(obj.updates_pending);
      }
      if (obj.waiting_clients !== undefined) {
        copy.waitingClients = obj.waiting_clients;
      }
      if (obj.waiting_commit !== undefined) {
        copy.waitingCommit = obj.waiting_commit;
      }
      return copy as unknown as DesignDocumentViewIndex;
    }
  }
  export namespace DesignDocumentViewIndex {
      export interface Transport {
        collator_versions: string[];
        compact_running: boolean;
        language: string;
        signature: string;
        sizes: ContentInformationSizes.Transport;
        updater_running: boolean;
        updates_pending: UpdatesPending.Transport;
        waiting_clients: number;
        waiting_commit: boolean;
      }
  }

  /**
   * Schema for view functions definition.
   */
  export class DesignDocumentViewsMapReduce {
    /** JavaScript map function as a string. */
    map: string;

    /** JavaScript reduce function as a string. */
    reduce?: string;

    static serialize(obj): DesignDocumentViewsMapReduce.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentViewsMapReduce.Transport = <DesignDocumentViewsMapReduce.Transport>{};
      if (obj.map !== undefined) {
        copy.map = obj.map;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      return copy as unknown as DesignDocumentViewsMapReduce.Transport;
    }

    static deserialize(obj): DesignDocumentViewsMapReduce {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DesignDocumentViewsMapReduce = <DesignDocumentViewsMapReduce>{};
      if (obj.map !== undefined) {
        copy.map = obj.map;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      return copy as unknown as DesignDocumentViewsMapReduce;
    }
  }
  export namespace DesignDocumentViewsMapReduce {
      export interface Transport {
        map: string;
        reduce?: string;
      }
  }

  /**
   * Schema for a row of document information in a DocsResult.
   */
  export class DocsResultRow {
    /** The cause of the error (if available). */
    causedBy?: string;

    /** The name of the error. */
    error?: string;

    /** The reason the error occurred (if available). */
    reason?: string;

    /** An internal error reference (if available). */
    ref?: number;

    /** Schema for a document. */
    doc?: Document;

    /** Schema for a document ID. */
    id?: string;

    /** Schema for a document ID. */
    key: string;

    /** Value of built-in `/_all_docs` style view. */
    value?: DocsResultRowValue;

    static serialize(obj): DocsResultRow.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocsResultRow.Transport = <DocsResultRow.Transport>{};
      if (obj.causedBy !== undefined) {
        copy.caused_by = obj.causedBy;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.serialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.value !== undefined) {
        copy.value = DocsResultRowValue.serialize(obj.value);
      }
      return copy as unknown as DocsResultRow.Transport;
    }

    static deserialize(obj): DocsResultRow {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocsResultRow = <DocsResultRow>{};
      if (obj.caused_by !== undefined) {
        copy.causedBy = obj.caused_by;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.deserialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.value !== undefined) {
        copy.value = DocsResultRowValue.deserialize(obj.value);
      }
      return copy as unknown as DocsResultRow;
    }
  }
  export namespace DocsResultRow {
      export interface Transport {
        caused_by?: string;
        error?: string;
        reason?: string;
        ref?: number;
        doc?: Document.Transport;
        id?: string;
        key: string;
        value?: DocsResultRowValue.Transport;
      }
  }

  /**
   * Value of built-in `/_all_docs` style view.
   */
  export class DocsResultRowValue {
    /** If `true` then the document is deleted. Not present for undeleted documents. */
    deleted?: boolean;

    /** Schema for a document revision identifier. */
    rev: string;

    static serialize(obj): DocsResultRowValue.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocsResultRowValue.Transport = <DocsResultRowValue.Transport>{};
      if (obj.deleted !== undefined) {
        copy.deleted = obj.deleted;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as DocsResultRowValue.Transport;
    }

    static deserialize(obj): DocsResultRowValue {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocsResultRowValue = <DocsResultRowValue>{};
      if (obj.deleted !== undefined) {
        copy.deleted = obj.deleted;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      return copy as unknown as DocsResultRowValue;
    }
  }
  export namespace DocsResultRowValue {
      export interface Transport {
        deleted?: boolean;
        rev: string;
      }
  }

  /**
   * Schema for a document.
   *
   * This type supports additional properties of type any.
   */
  export class Document {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: {[key: string]: Attachment};

    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];

    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;

    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];

    /** Schema for a document ID. */
    _id?: string;

    /** Document's update sequence in current database. Available if requested with local_seq=true query parameter. */
    _local_seq?: string;

    /** Schema for a document revision identifier. */
    _rev?: string;

    /** Schema for list of revision information. */
    _revisions?: Revisions;

    /** Schema for a list of objects with information about local revisions and their status. */
    _revs_info?: DocumentRevisionStatus[];


    /**
     * Document accepts additional properties of type any.
     */
    [propName: string]: any;

    static serialize(obj): Document.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Document.Transport = <Document.Transport>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.serialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.serialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.serialize);
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as Document.Transport;
    }

    static deserialize(obj): Document {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Document = <Document>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.deserialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.deserialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.deserialize);
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as Document;
    }
  }
  export namespace Document {
      export interface Transport {
        _attachments?: {[key: string]: Attachment.Transport};
        _conflicts?: string[];
        _deleted?: boolean;
        _deleted_conflicts?: string[];
        _id?: string;
        _local_seq?: string;
        _rev?: string;
        _revisions?: Revisions.Transport;
        _revs_info?: DocumentRevisionStatus[];
        /** Document.Document.Transport accepts additional properties of type any. */
        [propName: string]: any;
      }
  }

  /**
   * Schema for the result of a document modification.
   */
  export class DocumentResult {
    /** Schema for a document ID. */
    id: string;

    /** Schema for a document revision identifier. */
    rev?: string;

    /** ok. */
    ok?: boolean;

    /** The cause of the error (if available). */
    causedBy?: string;

    /** The name of the error. */
    error?: string;

    /** The reason the error occurred (if available). */
    reason?: string;

    /** An internal error reference (if available). */
    ref?: number;

    static serialize(obj): DocumentResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentResult.Transport = <DocumentResult.Transport>{};
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.causedBy !== undefined) {
        copy.caused_by = obj.causedBy;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      return copy as unknown as DocumentResult.Transport;
    }

    static deserialize(obj): DocumentResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentResult = <DocumentResult>{};
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.caused_by !== undefined) {
        copy.causedBy = obj.caused_by;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      return copy as unknown as DocumentResult;
    }
  }
  export namespace DocumentResult {
      export interface Transport {
        id: string;
        rev?: string;
        ok?: boolean;
        caused_by?: string;
        error?: string;
        reason?: string;
        ref?: number;
      }
  }

  /**
   * Schema for information about revisions and their status.
   */
  export class DocumentRevisionStatus {
    /** Schema for a document revision identifier. */
    rev: string;

    /** Status of the revision. May be one of: - `available`: Revision is available for retrieving with rev query
     *  parameter - `missing`: Revision is not available - `deleted`: Revision belongs to deleted document.
     */
    status: DocumentRevisionStatus.Constants.Status | string;

    static serialize(obj): DocumentRevisionStatus.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentRevisionStatus.Transport = <DocumentRevisionStatus.Transport>{};
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      if (obj.status !== undefined) {
        copy.status = obj.status;
      }
      return copy as unknown as DocumentRevisionStatus.Transport;
    }

    static deserialize(obj): DocumentRevisionStatus {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentRevisionStatus = <DocumentRevisionStatus>{};
      if (obj.rev !== undefined) {
        copy.rev = obj.rev;
      }
      if (obj.status !== undefined) {
        copy.status = obj.status;
      }
      return copy as unknown as DocumentRevisionStatus;
    }
  }
  export namespace DocumentRevisionStatus {
    export namespace Constants {
      /** Status of the revision. May be one of: - `available`: Revision is available for retrieving with rev query parameter - `missing`: Revision is not available - `deleted`: Revision belongs to deleted document. */
      export enum Status {
        AVAILABLE = 'available',
        MISSING = 'missing',
        DELETED = 'deleted',
      }
    }
      export interface Transport {
        rev: string;
        status: string;
      }
  }

  /**
   * Schema for document shard information.
   */
  export class DocumentShardInfo {
    /** List of nodes serving a replica of the shard. */
    nodes: string[];

    /** The shard range in which the document is stored. */
    range: string;

    static serialize(obj): DocumentShardInfo.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentShardInfo.Transport = <DocumentShardInfo.Transport>{};
      if (obj.nodes !== undefined) {
        copy.nodes = obj.nodes;
      }
      if (obj.range !== undefined) {
        copy.range = obj.range;
      }
      return copy as unknown as DocumentShardInfo.Transport;
    }

    static deserialize(obj): DocumentShardInfo {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: DocumentShardInfo = <DocumentShardInfo>{};
      if (obj.nodes !== undefined) {
        copy.nodes = obj.nodes;
      }
      if (obj.range !== undefined) {
        copy.range = obj.range;
      }
      return copy as unknown as DocumentShardInfo;
    }
  }
  export namespace DocumentShardInfo {
      export interface Transport {
        nodes: string[];
        range: string;
      }
  }

  /**
   * Schema for find query execution statistics.
   */
  export class ExecutionStats {
    /** Time to execute the query. */
    executionTimeMs: number;

    /** Number of results returned. */
    resultsReturned: number;

    /** Number of documents fetched from the index. */
    totalDocsExamined: number;

    /** Number of rows scanned in the index. */
    totalKeysExamined: number;

    /** Number of documents fetched from the primary index with the specified read quorum. */
    totalQuorumDocsExamined: number;

    static serialize(obj): ExecutionStats.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExecutionStats.Transport = <ExecutionStats.Transport>{};
      if (obj.executionTimeMs !== undefined) {
        copy.execution_time_ms = obj.executionTimeMs;
      }
      if (obj.resultsReturned !== undefined) {
        copy.results_returned = obj.resultsReturned;
      }
      if (obj.totalDocsExamined !== undefined) {
        copy.total_docs_examined = obj.totalDocsExamined;
      }
      if (obj.totalKeysExamined !== undefined) {
        copy.total_keys_examined = obj.totalKeysExamined;
      }
      if (obj.totalQuorumDocsExamined !== undefined) {
        copy.total_quorum_docs_examined = obj.totalQuorumDocsExamined;
      }
      return copy as unknown as ExecutionStats.Transport;
    }

    static deserialize(obj): ExecutionStats {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExecutionStats = <ExecutionStats>{};
      if (obj.execution_time_ms !== undefined) {
        copy.executionTimeMs = obj.execution_time_ms;
      }
      if (obj.results_returned !== undefined) {
        copy.resultsReturned = obj.results_returned;
      }
      if (obj.total_docs_examined !== undefined) {
        copy.totalDocsExamined = obj.total_docs_examined;
      }
      if (obj.total_keys_examined !== undefined) {
        copy.totalKeysExamined = obj.total_keys_examined;
      }
      if (obj.total_quorum_docs_examined !== undefined) {
        copy.totalQuorumDocsExamined = obj.total_quorum_docs_examined;
      }
      return copy as unknown as ExecutionStats;
    }
  }
  export namespace ExecutionStats {
      export interface Transport {
        execution_time_ms: number;
        results_returned: number;
        total_docs_examined: number;
        total_keys_examined: number;
        total_quorum_docs_examined: number;
      }
  }

  /**
   * Schema for information about the index used for a find query.
   */
  export class ExplainResult {
    /** When `true`, the query is answered using the index only and no documents are fetched. */
    covering: boolean;

    /** Schema for a database name. */
    dbname: string;

    /** Fields that were requested to be projected from the document. If no fields were requested to be projected
     *  this will be empty and all fields will be returned.
     */
    fields: string[];

    /** Schema for information about an index. */
    index: IndexInformation;

    /** Schema for the list of all the other indexes that were not chosen for serving the query. */
    indexCandidates: IndexCandidate[];

    /** The used maximum number of results returned. */
    limit: number;

    /** Arguments passed to the underlying view. */
    mrargs?: ExplainResultMrArgs;

    /** Options used for the request. */
    opts: ExplainResultOpts;

    /** Schema for any JSON type. */
    partitioned?: any;

    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector: JsonObject;

    /** Schema for a list of objects with extra information on the selector to provide insights about its usability. */
    selectorHints: SelectorHint[];

    /** Skip parameter used. */
    skip: number;

    static serialize(obj): ExplainResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResult.Transport = <ExplainResult.Transport>{};
      if (obj.covering !== undefined) {
        copy.covering = obj.covering;
      }
      if (obj.dbname !== undefined) {
        copy.dbname = obj.dbname;
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.index !== undefined) {
        copy.index = IndexInformation.serialize(obj.index);
      }
      if (obj.indexCandidates !== undefined) {
        copy.index_candidates = BaseService.convertModel(obj.indexCandidates, IndexCandidate.serialize);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.mrargs !== undefined) {
        copy.mrargs = ExplainResultMrArgs.serialize(obj.mrargs);
      }
      if (obj.opts !== undefined) {
        copy.opts = ExplainResultOpts.serialize(obj.opts);
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.selector !== undefined) {
        copy.selector = obj.selector;
      }
      if (obj.selectorHints !== undefined) {
        copy.selector_hints = BaseService.convertModel(obj.selectorHints, SelectorHint.serialize);
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      return copy as unknown as ExplainResult.Transport;
    }

    static deserialize(obj): ExplainResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResult = <ExplainResult>{};
      if (obj.covering !== undefined) {
        copy.covering = obj.covering;
      }
      if (obj.dbname !== undefined) {
        copy.dbname = obj.dbname;
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.index !== undefined) {
        copy.index = IndexInformation.deserialize(obj.index);
      }
      if (obj.index_candidates !== undefined) {
        copy.indexCandidates = BaseService.convertModel(obj.index_candidates, IndexCandidate.deserialize);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.mrargs !== undefined) {
        copy.mrargs = ExplainResultMrArgs.deserialize(obj.mrargs);
      }
      if (obj.opts !== undefined) {
        copy.opts = ExplainResultOpts.deserialize(obj.opts);
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.selector !== undefined) {
        copy.selector = obj.selector;
      }
      if (obj.selector_hints !== undefined) {
        copy.selectorHints = BaseService.convertModel(obj.selector_hints, SelectorHint.deserialize);
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      return copy as unknown as ExplainResult;
    }
  }
  export namespace ExplainResult {
      export interface Transport {
        covering: boolean;
        dbname: string;
        fields: string[];
        index: IndexInformation.Transport;
        index_candidates: IndexCandidate[];
        limit: number;
        mrargs?: ExplainResultMrArgs.Transport;
        opts: ExplainResultOpts.Transport;
        partitioned?: any;
        selector: JsonObject;
        selector_hints: SelectorHint[];
        skip: number;
      }
  }

  /**
   * Arguments passed to the underlying view.
   */
  export class ExplainResultMrArgs {
    /** Schema for any JSON type. */
    conflicts: any;

    /** Direction parameter passed to the underlying view. */
    direction: ExplainResultMrArgs.Constants.Direction | string;

    /** Schema for any JSON type. */
    endKey: any;

    /** A parameter that specifies whether to include the full content of the documents in the response in the
     *  underlying view.
     */
    includeDocs: boolean;

    /** Partition parameter passed to the underlying view. */
    partition: string | null;

    /** A parameter that specifies returning only documents that match any of the specified keys in the underlying
     *  view.
     */
    reduce: boolean;

    /** A parameter that specifies whether the view results should be returned form a "stable" set of shards passed
     *  to the underlying view.
     */
    stable: boolean;

    /** Schema for any JSON type. */
    startKey?: any;

    /** Schema for any JSON type. */
    update: any;

    /** The type of the underlying view. */
    viewType: ExplainResultMrArgs.Constants.ViewType | string;

    static serialize(obj): ExplainResultMrArgs.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResultMrArgs.Transport = <ExplainResultMrArgs.Transport>{};
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.direction !== undefined) {
        copy.direction = obj.direction;
      }
      if (obj.endKey !== undefined) {
        copy.end_key = obj.endKey;
      }
      if (obj.includeDocs !== undefined) {
        copy.include_docs = obj.includeDocs;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.startKey !== undefined) {
        copy.start_key = obj.startKey;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      if (obj.viewType !== undefined) {
        copy.view_type = obj.viewType;
      }
      return copy as unknown as ExplainResultMrArgs.Transport;
    }

    static deserialize(obj): ExplainResultMrArgs {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResultMrArgs = <ExplainResultMrArgs>{};
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.direction !== undefined) {
        copy.direction = obj.direction;
      }
      if (obj.end_key !== undefined) {
        copy.endKey = obj.end_key;
      }
      if (obj.include_docs !== undefined) {
        copy.includeDocs = obj.include_docs;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.start_key !== undefined) {
        copy.startKey = obj.start_key;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      if (obj.view_type !== undefined) {
        copy.viewType = obj.view_type;
      }
      return copy as unknown as ExplainResultMrArgs;
    }
  }
  export namespace ExplainResultMrArgs {
    export namespace Constants {
      /** Direction parameter passed to the underlying view. */
      export enum Direction {
        FWD = 'fwd',
        REV = 'rev',
      }
      /** The type of the underlying view. */
      export enum ViewType {
        MAP = 'map',
        REDUCE = 'reduce',
      }
    }
      export interface Transport {
        conflicts: any;
        direction: string;
        end_key: any;
        include_docs: boolean;
        partition: string;
        reduce: boolean;
        stable: boolean;
        start_key?: any;
        update: any;
        view_type: string;
      }
  }

  /**
   * Options used for the request.
   */
  export class ExplainResultOpts {
    /** Opaque bookmark token used when paginating results. */
    bookmark: string;

    /** Conflicts used in the request query. */
    conflicts: boolean;

    /** Execution statistics used in the request query. */
    executionStats: boolean;

    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted or empty, the entire document is returned.
     */
    fields: string[];

    /** Limit used in the request query. */
    limit: number;

    /** On which database partition the request was used. If it was not used on a database partition, it returns
     *  with `""`.
     */
    partition: string;

    /** The read quorum that is needed for the result. */
    r: number;

    /** Skip used in the request query. */
    skip: number;

    /** Schema for any JSON type. */
    sort: any;

    /** Stable used in the request query. */
    stable: boolean;

    /** Deprecated: Stale used in the request query. */
    stale: boolean;

    /** Update used in the request query. */
    update: boolean;

    /** Use index used in the request query. */
    useIndex: string[];

    static serialize(obj): ExplainResultOpts.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResultOpts.Transport = <ExplainResultOpts.Transport>{};
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.executionStats !== undefined) {
        copy.execution_stats = obj.executionStats;
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.r !== undefined) {
        copy.r = obj.r;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.sort !== undefined) {
        copy.sort = obj.sort;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.stale !== undefined) {
        copy.stale = obj.stale;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      if (obj.useIndex !== undefined) {
        copy.use_index = obj.useIndex;
      }
      return copy as unknown as ExplainResultOpts.Transport;
    }

    static deserialize(obj): ExplainResultOpts {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ExplainResultOpts = <ExplainResultOpts>{};
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.execution_stats !== undefined) {
        copy.executionStats = obj.execution_stats;
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.r !== undefined) {
        copy.r = obj.r;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.sort !== undefined) {
        copy.sort = obj.sort;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.stale !== undefined) {
        copy.stale = obj.stale;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      if (obj.use_index !== undefined) {
        copy.useIndex = obj.use_index;
      }
      return copy as unknown as ExplainResultOpts;
    }
  }
  export namespace ExplainResultOpts {
      export interface Transport {
        bookmark: string;
        conflicts: boolean;
        execution_stats: boolean;
        fields: string[];
        limit: number;
        partition: string;
        r: number;
        skip: number;
        sort: any;
        stable: boolean;
        stale: boolean;
        update: boolean;
        use_index: string[];
      }
  }

  /**
   * Schema for the result of a query find operation.
   */
  export class FindResult {
    /** Opaque bookmark token used when paginating results. */
    bookmark: string;

    /** Documents matching the selector. */
    docs: Document[];

    /** Schema for find query execution statistics. */
    executionStats?: ExecutionStats;

    /** warning. */
    warning?: string;

    static serialize(obj): FindResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: FindResult.Transport = <FindResult.Transport>{};
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, Document.serialize);
      }
      if (obj.executionStats !== undefined) {
        copy.execution_stats = ExecutionStats.serialize(obj.executionStats);
      }
      if (obj.warning !== undefined) {
        copy.warning = obj.warning;
      }
      return copy as unknown as FindResult.Transport;
    }

    static deserialize(obj): FindResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: FindResult = <FindResult>{};
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, Document.deserialize);
      }
      if (obj.execution_stats !== undefined) {
        copy.executionStats = ExecutionStats.deserialize(obj.execution_stats);
      }
      if (obj.warning !== undefined) {
        copy.warning = obj.warning;
      }
      return copy as unknown as FindResult;
    }
  }
  export namespace FindResult {
      export interface Transport {
        bookmark: string;
        docs: Document[];
        execution_stats?: ExecutionStats.Transport;
        warning?: string;
      }
  }

  /**
   * Schema for detailed explanation of why the specific index was excluded by the query planner.
   */
  export class IndexAnalysis {
    /** When `true`, the query is answered using the index only and no documents are fetched. */
    covering: boolean | null;

    /** A position of the unused index based on its potential relevance to the query. */
    ranking: number;

    /** A list of reasons explaining why index was not chosen for the query. */
    reasons: IndexAnalysisExclusionReason[];

    /** Indicates whether an index can still be used for the query. */
    usable: boolean;

    static serialize(obj): IndexAnalysis.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexAnalysis.Transport = <IndexAnalysis.Transport>{};
      if (obj.covering !== undefined) {
        copy.covering = obj.covering;
      }
      if (obj.ranking !== undefined) {
        copy.ranking = obj.ranking;
      }
      if (obj.reasons !== undefined) {
        copy.reasons = BaseService.convertModel(obj.reasons, IndexAnalysisExclusionReason.serialize);
      }
      if (obj.usable !== undefined) {
        copy.usable = obj.usable;
      }
      return copy as unknown as IndexAnalysis.Transport;
    }

    static deserialize(obj): IndexAnalysis {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexAnalysis = <IndexAnalysis>{};
      if (obj.covering !== undefined) {
        copy.covering = obj.covering;
      }
      if (obj.ranking !== undefined) {
        copy.ranking = obj.ranking;
      }
      if (obj.reasons !== undefined) {
        copy.reasons = BaseService.convertModel(obj.reasons, IndexAnalysisExclusionReason.deserialize);
      }
      if (obj.usable !== undefined) {
        copy.usable = obj.usable;
      }
      return copy as unknown as IndexAnalysis;
    }
  }
  export namespace IndexAnalysis {
      export interface Transport {
        covering: boolean;
        ranking: number;
        reasons: IndexAnalysisExclusionReason[];
        usable: boolean;
      }
  }

  /**
   * A reason for index's exclusion.
   */
  export class IndexAnalysisExclusionReason {
    /** A reason code for index's exclusion.
     *
     *  The full list of possible reason codes is following:
     *
     *  * alphabetically_comes_after: json
     *    There is another suitable index whose name comes before that of this index.
     *  * empty_selector: text
     *  "text" indexes do not support queries with empty selectors.
     *  * excluded_by_user: any use_index was used to manually specify the index.
     *  * field_mismatch: any Fields in "selector" of the query do match with the fields available in the index.
     *  * is_partial: json, text Partial indexes can be selected only manually.
     *  * less_overlap: json There is a better match of fields available within the indexes for the query.
     *  * needs_text_search: json The use of the $text operator requires a "text" index.
     *  * scope_mismatch: json The scope of the query and the index is not the same.
     *  * sort_order_mismatch: json, special Fields in "sort" of the query do not match with the fields available in the
     *  index.
     *  * too_many_fields: json The index has more fields than the chosen one.
     *  * unfavored_type: any The type of the index is not preferred.
     */
    name: IndexAnalysisExclusionReason.Constants.Name | string;

    static serialize(obj): IndexAnalysisExclusionReason.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexAnalysisExclusionReason.Transport = <IndexAnalysisExclusionReason.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      return copy as unknown as IndexAnalysisExclusionReason.Transport;
    }

    static deserialize(obj): IndexAnalysisExclusionReason {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexAnalysisExclusionReason = <IndexAnalysisExclusionReason>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      return copy as unknown as IndexAnalysisExclusionReason;
    }
  }
  export namespace IndexAnalysisExclusionReason {
    export namespace Constants {
      /** A reason code for index's exclusion. The full list of possible reason codes is following: * alphabetically_comes_after: json There is another suitable index whose name comes before that of this index. * empty_selector: text "text" indexes do not support queries with empty selectors. * excluded_by_user: any use_index was used to manually specify the index. * field_mismatch: any Fields in "selector" of the query do match with the fields available in the index. * is_partial: json, text Partial indexes can be selected only manually. * less_overlap: json There is a better match of fields available within the indexes for the query. * needs_text_search: json The use of the $text operator requires a "text" index. * scope_mismatch: json The scope of the query and the index is not the same. * sort_order_mismatch: json, special Fields in "sort" of the query do not match with the fields available in the index. * too_many_fields: json The index has more fields than the chosen one. * unfavored_type: any The type of the index is not preferred. */
      export enum Name {
        ALPHABETICALLY_COMES_AFTER = 'alphabetically_comes_after',
        EMPTY_SELECTOR = 'empty_selector',
        EXCLUDED_BY_USER = 'excluded_by_user',
        FIELD_MISMATCH = 'field_mismatch',
        IS_PARTIAL = 'is_partial',
        LESS_OVERLAP = 'less_overlap',
        NEEDS_TEXT_SEARCH = 'needs_text_search',
        SCOPE_MISMATCH = 'scope_mismatch',
        SORT_ORDER_MISMATCH = 'sort_order_mismatch',
        TOO_MANY_FIELDS = 'too_many_fields',
        UNFAVORED_TYPE = 'unfavored_type',
      }
    }
      export interface Transport {
        name: string;
      }
  }

  /**
   * Schema for an index that was not chosen for serving the query with the reason for the exclusion.
   */
  export class IndexCandidate {
    /** Schema for detailed explanation of why the specific index was excluded by the query planner. */
    analysis: IndexAnalysis;

    /** Schema for information about an index. */
    index: IndexInformation;

    static serialize(obj): IndexCandidate.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexCandidate.Transport = <IndexCandidate.Transport>{};
      if (obj.analysis !== undefined) {
        copy.analysis = IndexAnalysis.serialize(obj.analysis);
      }
      if (obj.index !== undefined) {
        copy.index = IndexInformation.serialize(obj.index);
      }
      return copy as unknown as IndexCandidate.Transport;
    }

    static deserialize(obj): IndexCandidate {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexCandidate = <IndexCandidate>{};
      if (obj.analysis !== undefined) {
        copy.analysis = IndexAnalysis.deserialize(obj.analysis);
      }
      if (obj.index !== undefined) {
        copy.index = IndexInformation.deserialize(obj.index);
      }
      return copy as unknown as IndexCandidate;
    }
  }
  export namespace IndexCandidate {
      export interface Transport {
        analysis: IndexAnalysis.Transport;
        index: IndexInformation.Transport;
      }
  }

  /**
   * Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
   * properties that do not apply to `json` indexes, these are:
   * * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
   * document fields and what analyzer to use for that purpose.
   */
  export class IndexDefinition {
    /** Schema for a full text search analyzer. */
    defaultAnalyzer?: Analyzer;

    /** Schema for the text index default field configuration. The default field is used to index the text of all
     *  fields within a document for use with the `$text` operator.
     */
    defaultField?: IndexTextOperatorDefaultField;

    /** List of field objects to index.  Nested fields are also allowed, e.g. `person.name`.
     *
     *  For "json" type indexes each object is a mapping of field name to sort direction (asc or desc).
     *
     *  For "text" type indexes each object has a `name` property of the field name and a `type` property of the field
     *  type (string, number, or boolean).
     */
    fields: IndexField[];

    /** Whether to scan every document for arrays and store the length for each array found. Set the
     *  index_array_lengths field to false if:
     *  * You do not need to know the length of an array. * You do not use the `$size` operator. * The documents in your
     *  database are complex, or not completely under your control. As a result, it is difficult to estimate the impact
     *  of the extra processing that is needed to determine and store the arrays lengths.
     */
    indexArrayLengths?: boolean;

    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    partialFilterSelector?: JsonObject;

    static serialize(obj): IndexDefinition.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexDefinition.Transport = <IndexDefinition.Transport>{};
      if (obj.defaultAnalyzer !== undefined) {
        copy.default_analyzer = Analyzer.serialize(obj.defaultAnalyzer);
      }
      if (obj.defaultField !== undefined) {
        copy.default_field = IndexTextOperatorDefaultField.serialize(obj.defaultField);
      }
      if (obj.fields !== undefined) {
        copy.fields = BaseService.convertModel(obj.fields, IndexField.serialize);
      }
      if (obj.indexArrayLengths !== undefined) {
        copy.index_array_lengths = obj.indexArrayLengths;
      }
      if (obj.partialFilterSelector !== undefined) {
        copy.partial_filter_selector = obj.partialFilterSelector;
      }
      return copy as unknown as IndexDefinition.Transport;
    }

    static deserialize(obj): IndexDefinition {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexDefinition = <IndexDefinition>{};
      if (obj.default_analyzer !== undefined) {
        copy.defaultAnalyzer = Analyzer.deserialize(obj.default_analyzer);
      }
      if (obj.default_field !== undefined) {
        copy.defaultField = IndexTextOperatorDefaultField.deserialize(obj.default_field);
      }
      if (obj.fields !== undefined) {
        copy.fields = BaseService.convertModel(obj.fields, IndexField.deserialize);
      }
      if (obj.index_array_lengths !== undefined) {
        copy.indexArrayLengths = obj.index_array_lengths;
      }
      if (obj.partial_filter_selector !== undefined) {
        copy.partialFilterSelector = obj.partial_filter_selector;
      }
      return copy as unknown as IndexDefinition;
    }
  }
  export namespace IndexDefinition {
      export interface Transport {
        default_analyzer?: Analyzer.Transport;
        default_field?: IndexTextOperatorDefaultField.Transport;
        fields: IndexField[];
        index_array_lengths?: boolean;
        partial_filter_selector?: JsonObject;
      }
  }

  /**
   * Schema for indexed fields for use with declarative JSON query.
   *
   * This type supports additional properties of type string. Schema for sort direction.
   */
  export class IndexField {
    /** Name of the field. */
    name?: string;

    /** The type of the named field. */
    type?: IndexField.Constants.Type | string;


    /**
     * IndexField accepts additional properties of type string. Schema for sort direction.
     */
    [propName: string]: any;

    static serialize(obj): IndexField.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexField.Transport = <IndexField.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      let defaultProperties = [
        'name',
        'type',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as IndexField.Transport;
    }

    static deserialize(obj): IndexField {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexField = <IndexField>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      let defaultProperties = [
        'name',
        'type',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as IndexField;
    }
  }
  export namespace IndexField {
    export namespace Constants {
      /** The type of the named field. */
      export enum Type {
        BOOLEAN = 'boolean',
        NUMBER = 'number',
        STRING = 'string',
      }
    }
      export interface Transport {
        name?: string;
        type?: string;
        /** IndexField.IndexField.Transport accepts additional properties of type string. */
        [propName: string]: any;
      }
  }

  /**
   * Schema for information about an index.
   */
  export class IndexInformation {
    /** Schema for a nullable design document ID including a `_design/` prefix. */
    ddoc: string | null;

    /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
     *  properties that do not apply to `json` indexes, these are:
     *  * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
     *  document fields and what analyzer to use for that purpose.
     */
    def: IndexDefinition;

    /** Index name. */
    name: string;

    /** Indicates if index is partitioned. */
    partitioned?: boolean;

    /** Schema for the type of an index. */
    type: IndexInformation.Constants.Type | string;

    static serialize(obj): IndexInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexInformation.Transport = <IndexInformation.Transport>{};
      if (obj.ddoc !== undefined) {
        copy.ddoc = obj.ddoc;
      }
      if (obj.def !== undefined) {
        copy.def = IndexDefinition.serialize(obj.def);
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as IndexInformation.Transport;
    }

    static deserialize(obj): IndexInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexInformation = <IndexInformation>{};
      if (obj.ddoc !== undefined) {
        copy.ddoc = obj.ddoc;
      }
      if (obj.def !== undefined) {
        copy.def = IndexDefinition.deserialize(obj.def);
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as IndexInformation;
    }
  }
  export namespace IndexInformation {
    export namespace Constants {
      /** Schema for the type of an index. */
      export enum Type {
        JSON = 'json',
        SPECIAL = 'special',
        TEXT = 'text',
      }
    }
      export interface Transport {
        ddoc: string;
        def: IndexDefinition.Transport;
        name: string;
        partitioned?: boolean;
        type: string;
      }
  }

  /**
   * Schema for the result of creating an index.
   */
  export class IndexResult {
    /** Id of the design document the index was created in. */
    id: string;

    /** Name of the index created. */
    name: string;

    /** Flag to show whether the index was created or one already exists. */
    result: IndexResult.Constants.Result | string;

    static serialize(obj): IndexResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexResult.Transport = <IndexResult.Transport>{};
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.result !== undefined) {
        copy.result = obj.result;
      }
      return copy as unknown as IndexResult.Transport;
    }

    static deserialize(obj): IndexResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexResult = <IndexResult>{};
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.result !== undefined) {
        copy.result = obj.result;
      }
      return copy as unknown as IndexResult;
    }
  }
  export namespace IndexResult {
    export namespace Constants {
      /** Flag to show whether the index was created or one already exists. */
      export enum Result {
        CREATED = 'created',
        EXISTS = 'exists',
      }
    }
      export interface Transport {
        id: string;
        name: string;
        result: string;
      }
  }

  /**
   * Schema for the text index default field configuration. The default field is used to index the text of all fields
   * within a document for use with the `$text` operator.
   */
  export class IndexTextOperatorDefaultField {
    /** Schema for a full text search analyzer. */
    analyzer?: Analyzer;

    /** Whether or not the default_field is enabled. */
    enabled?: boolean;

    static serialize(obj): IndexTextOperatorDefaultField.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexTextOperatorDefaultField.Transport = <IndexTextOperatorDefaultField.Transport>{};
      if (obj.analyzer !== undefined) {
        copy.analyzer = Analyzer.serialize(obj.analyzer);
      }
      if (obj.enabled !== undefined) {
        copy.enabled = obj.enabled;
      }
      return copy as unknown as IndexTextOperatorDefaultField.Transport;
    }

    static deserialize(obj): IndexTextOperatorDefaultField {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexTextOperatorDefaultField = <IndexTextOperatorDefaultField>{};
      if (obj.analyzer !== undefined) {
        copy.analyzer = Analyzer.deserialize(obj.analyzer);
      }
      if (obj.enabled !== undefined) {
        copy.enabled = obj.enabled;
      }
      return copy as unknown as IndexTextOperatorDefaultField;
    }
  }
  export namespace IndexTextOperatorDefaultField {
      export interface Transport {
        analyzer?: Analyzer.Transport;
        enabled?: boolean;
      }
  }

  /**
   * Schema for information about the indexes in a database.
   */
  export class IndexesInformation {
    /** Total number of query indexes in the database. */
    totalRows: number;

    /** Indexes. */
    indexes: IndexInformation[];

    static serialize(obj): IndexesInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexesInformation.Transport = <IndexesInformation.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = BaseService.convertModel(obj.indexes, IndexInformation.serialize);
      }
      return copy as unknown as IndexesInformation.Transport;
    }

    static deserialize(obj): IndexesInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: IndexesInformation = <IndexesInformation>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = BaseService.convertModel(obj.indexes, IndexInformation.deserialize);
      }
      return copy as unknown as IndexesInformation;
    }
  }
  export namespace IndexesInformation {
      export interface Transport {
        total_rows: number;
        indexes: IndexInformation[];
      }
  }

  /**
   * Schema for information about known nodes and cluster membership.
   */
  export class MembershipInformation {
    /** List of nodes this node knows about, including the ones that are part of the cluster. */
    allNodes: string[];

    /** All cluster nodes. */
    clusterNodes: string[];

    static serialize(obj): MembershipInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: MembershipInformation.Transport = <MembershipInformation.Transport>{};
      if (obj.allNodes !== undefined) {
        copy.all_nodes = obj.allNodes;
      }
      if (obj.clusterNodes !== undefined) {
        copy.cluster_nodes = obj.clusterNodes;
      }
      return copy as unknown as MembershipInformation.Transport;
    }

    static deserialize(obj): MembershipInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: MembershipInformation = <MembershipInformation>{};
      if (obj.all_nodes !== undefined) {
        copy.allNodes = obj.all_nodes;
      }
      if (obj.cluster_nodes !== undefined) {
        copy.clusterNodes = obj.cluster_nodes;
      }
      return copy as unknown as MembershipInformation;
    }
  }
  export namespace MembershipInformation {
      export interface Transport {
        all_nodes: string[];
        cluster_nodes: string[];
      }
  }

  /**
   * Schema for an OK result.
   */
  export class Ok {
    /** ok. */
    ok?: boolean;

    static serialize(obj): Ok.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Ok.Transport = <Ok.Transport>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      return copy as unknown as Ok.Transport;
    }

    static deserialize(obj): Ok {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Ok = <Ok>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      return copy as unknown as Ok;
    }
  }
  export namespace Ok {
      export interface Transport {
        ok?: boolean;
      }
  }

  /**
   * Schema for information about a database partition.
   */
  export class PartitionInformation {
    /** Schema for a database name. */
    dbName: string;

    /** A count of the documents in the specified database partition. */
    docCount: number;

    /** Number of deleted documents. */
    docDelCount: number;

    /** Schema for a partition key. */
    partition: string;

    /** Schema for information about the partition index count and limit in a database. */
    partitionedIndexes?: PartitionInformationIndexes;

    /** The size of active and external data, in bytes. */
    sizes: PartitionInformationSizes;

    static serialize(obj): PartitionInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformation.Transport = <PartitionInformation.Transport>{};
      if (obj.dbName !== undefined) {
        copy.db_name = obj.dbName;
      }
      if (obj.docCount !== undefined) {
        copy.doc_count = obj.docCount;
      }
      if (obj.docDelCount !== undefined) {
        copy.doc_del_count = obj.docDelCount;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.partitionedIndexes !== undefined) {
        copy.partitioned_indexes = PartitionInformationIndexes.serialize(obj.partitionedIndexes);
      }
      if (obj.sizes !== undefined) {
        copy.sizes = PartitionInformationSizes.serialize(obj.sizes);
      }
      return copy as unknown as PartitionInformation.Transport;
    }

    static deserialize(obj): PartitionInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformation = <PartitionInformation>{};
      if (obj.db_name !== undefined) {
        copy.dbName = obj.db_name;
      }
      if (obj.doc_count !== undefined) {
        copy.docCount = obj.doc_count;
      }
      if (obj.doc_del_count !== undefined) {
        copy.docDelCount = obj.doc_del_count;
      }
      if (obj.partition !== undefined) {
        copy.partition = obj.partition;
      }
      if (obj.partitioned_indexes !== undefined) {
        copy.partitionedIndexes = PartitionInformationIndexes.deserialize(obj.partitioned_indexes);
      }
      if (obj.sizes !== undefined) {
        copy.sizes = PartitionInformationSizes.deserialize(obj.sizes);
      }
      return copy as unknown as PartitionInformation;
    }
  }
  export namespace PartitionInformation {
      export interface Transport {
        db_name: string;
        doc_count: number;
        doc_del_count: number;
        partition: string;
        partitioned_indexes?: PartitionInformationIndexes.Transport;
        sizes: PartitionInformationSizes.Transport;
      }
  }

  /**
   * Schema for information about the partition index count and limit in a database.
   */
  export class PartitionInformationIndexes {
    /** Total count of the partitioned indexes. */
    count?: number;

    /** The count breakdown of partitioned indexes. */
    indexes?: PartitionInformationIndexesIndexes;

    /** The partitioned index limit. */
    limit?: number;

    static serialize(obj): PartitionInformationIndexes.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationIndexes.Transport = <PartitionInformationIndexes.Transport>{};
      if (obj.count !== undefined) {
        copy.count = obj.count;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = PartitionInformationIndexesIndexes.serialize(obj.indexes);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      return copy as unknown as PartitionInformationIndexes.Transport;
    }

    static deserialize(obj): PartitionInformationIndexes {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationIndexes = <PartitionInformationIndexes>{};
      if (obj.count !== undefined) {
        copy.count = obj.count;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = PartitionInformationIndexesIndexes.deserialize(obj.indexes);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      return copy as unknown as PartitionInformationIndexes;
    }
  }
  export namespace PartitionInformationIndexes {
      export interface Transport {
        count?: number;
        indexes?: PartitionInformationIndexesIndexes.Transport;
        limit?: number;
      }
  }

  /**
   * The count breakdown of partitioned indexes.
   */
  export class PartitionInformationIndexesIndexes {
    /** Number of partitioned search indexes. */
    search?: number;

    /** Number of partitioned view indexes. */
    view?: number;

    static serialize(obj): PartitionInformationIndexesIndexes.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationIndexesIndexes.Transport = <PartitionInformationIndexesIndexes.Transport>{};
      if (obj.search !== undefined) {
        copy.search = obj.search;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as PartitionInformationIndexesIndexes.Transport;
    }

    static deserialize(obj): PartitionInformationIndexesIndexes {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationIndexesIndexes = <PartitionInformationIndexesIndexes>{};
      if (obj.search !== undefined) {
        copy.search = obj.search;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as PartitionInformationIndexesIndexes;
    }
  }
  export namespace PartitionInformationIndexesIndexes {
      export interface Transport {
        search?: number;
        view?: number;
      }
  }

  /**
   * The size of active and external data, in bytes.
   */
  export class PartitionInformationSizes {
    /** The size of live data inside the database, in bytes. */
    active?: number;

    /** The uncompressed size of database contents in bytes. */
    external?: number;

    static serialize(obj): PartitionInformationSizes.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationSizes.Transport = <PartitionInformationSizes.Transport>{};
      if (obj.active !== undefined) {
        copy.active = obj.active;
      }
      if (obj.external !== undefined) {
        copy.external = obj.external;
      }
      return copy as unknown as PartitionInformationSizes.Transport;
    }

    static deserialize(obj): PartitionInformationSizes {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionInformationSizes = <PartitionInformationSizes>{};
      if (obj.active !== undefined) {
        copy.active = obj.active;
      }
      if (obj.external !== undefined) {
        copy.external = obj.external;
      }
      return copy as unknown as PartitionInformationSizes;
    }
  }
  export namespace PartitionInformationSizes {
      export interface Transport {
        active?: number;
        external?: number;
      }
  }

  /**
   * Number of partitioned indexes by type.
   */
  export class PartitionedIndexesDetailedInformation {
    /** Number of partitioned indexes of search type. */
    search?: number;

    /** Number of partitioned indexes of view type. */
    view?: number;

    static serialize(obj): PartitionedIndexesDetailedInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionedIndexesDetailedInformation.Transport = <PartitionedIndexesDetailedInformation.Transport>{};
      if (obj.search !== undefined) {
        copy.search = obj.search;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as PartitionedIndexesDetailedInformation.Transport;
    }

    static deserialize(obj): PartitionedIndexesDetailedInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionedIndexesDetailedInformation = <PartitionedIndexesDetailedInformation>{};
      if (obj.search !== undefined) {
        copy.search = obj.search;
      }
      if (obj.view !== undefined) {
        copy.view = obj.view;
      }
      return copy as unknown as PartitionedIndexesDetailedInformation;
    }
  }
  export namespace PartitionedIndexesDetailedInformation {
      export interface Transport {
        search?: number;
        view?: number;
      }
  }

  /**
   * Information about database's partitioned indexes.
   */
  export class PartitionedIndexesInformation {
    /** Total number of partitioned indexes in the database. */
    count?: number;

    /** Number of partitioned indexes by type. */
    indexes?: PartitionedIndexesDetailedInformation;

    /** Maximum allowed number of partitioned indexes in the database. */
    limit?: number;

    static serialize(obj): PartitionedIndexesInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionedIndexesInformation.Transport = <PartitionedIndexesInformation.Transport>{};
      if (obj.count !== undefined) {
        copy.count = obj.count;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = PartitionedIndexesDetailedInformation.serialize(obj.indexes);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      return copy as unknown as PartitionedIndexesInformation.Transport;
    }

    static deserialize(obj): PartitionedIndexesInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: PartitionedIndexesInformation = <PartitionedIndexesInformation>{};
      if (obj.count !== undefined) {
        copy.count = obj.count;
      }
      if (obj.indexes !== undefined) {
        copy.indexes = PartitionedIndexesDetailedInformation.deserialize(obj.indexes);
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      return copy as unknown as PartitionedIndexesInformation;
    }
  }
  export namespace PartitionedIndexesInformation {
      export interface Transport {
        count?: number;
        indexes?: PartitionedIndexesDetailedInformation.Transport;
        limit?: number;
      }
  }

  /**
   * Request parameters to use during target database creation.
   */
  export class ReplicationCreateTargetParameters {
    /** Schema for the number of replicas of a database in a cluster. The cluster is using the default value and it
     *  cannot be changed by the user.
     */
    n?: number;

    /** Parameter to specify whether to enable database partitions when creating the target database. */
    partitioned?: boolean;

    /** Schema for the number of shards in a database. Each shard is a partition of the hash value range. */
    q?: number;

    static serialize(obj): ReplicationCreateTargetParameters.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationCreateTargetParameters.Transport = <ReplicationCreateTargetParameters.Transport>{};
      if (obj.n !== undefined) {
        copy.n = obj.n;
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.q !== undefined) {
        copy.q = obj.q;
      }
      return copy as unknown as ReplicationCreateTargetParameters.Transport;
    }

    static deserialize(obj): ReplicationCreateTargetParameters {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationCreateTargetParameters = <ReplicationCreateTargetParameters>{};
      if (obj.n !== undefined) {
        copy.n = obj.n;
      }
      if (obj.partitioned !== undefined) {
        copy.partitioned = obj.partitioned;
      }
      if (obj.q !== undefined) {
        copy.q = obj.q;
      }
      return copy as unknown as ReplicationCreateTargetParameters;
    }
  }
  export namespace ReplicationCreateTargetParameters {
      export interface Transport {
        n?: number;
        partitioned?: boolean;
        q?: number;
      }
  }

  /**
   * Schema for a replication source or target database.
   */
  export class ReplicationDatabase {
    /** Schema for replication source or target database authentication. */
    auth?: ReplicationDatabaseAuth;

    /** Replication request headers. */
    headers?: JsonObject;

    /** Replication database URL. */
    url: string;

    static serialize(obj): ReplicationDatabase.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabase.Transport = <ReplicationDatabase.Transport>{};
      if (obj.auth !== undefined) {
        copy.auth = ReplicationDatabaseAuth.serialize(obj.auth);
      }
      if (obj.headers !== undefined) {
        copy.headers = obj.headers;
      }
      if (obj.url !== undefined) {
        copy.url = obj.url;
      }
      return copy as unknown as ReplicationDatabase.Transport;
    }

    static deserialize(obj): ReplicationDatabase {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabase = <ReplicationDatabase>{};
      if (obj.auth !== undefined) {
        copy.auth = ReplicationDatabaseAuth.deserialize(obj.auth);
      }
      if (obj.headers !== undefined) {
        copy.headers = obj.headers;
      }
      if (obj.url !== undefined) {
        copy.url = obj.url;
      }
      return copy as unknown as ReplicationDatabase;
    }
  }
  export namespace ReplicationDatabase {
      export interface Transport {
        auth?: ReplicationDatabaseAuth.Transport;
        headers?: JsonObject;
        url: string;
      }
  }

  /**
   * Schema for replication source or target database authentication.
   */
  export class ReplicationDatabaseAuth {
    /** Schema for basic authentication of replication source or target database. */
    basic?: ReplicationDatabaseAuthBasic;

    /** Schema for an IAM API key for replication database authentication. */
    iam?: ReplicationDatabaseAuthIam;

    static serialize(obj): ReplicationDatabaseAuth.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuth.Transport = <ReplicationDatabaseAuth.Transport>{};
      if (obj.basic !== undefined) {
        copy.basic = ReplicationDatabaseAuthBasic.serialize(obj.basic);
      }
      if (obj.iam !== undefined) {
        copy.iam = ReplicationDatabaseAuthIam.serialize(obj.iam);
      }
      return copy as unknown as ReplicationDatabaseAuth.Transport;
    }

    static deserialize(obj): ReplicationDatabaseAuth {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuth = <ReplicationDatabaseAuth>{};
      if (obj.basic !== undefined) {
        copy.basic = ReplicationDatabaseAuthBasic.deserialize(obj.basic);
      }
      if (obj.iam !== undefined) {
        copy.iam = ReplicationDatabaseAuthIam.deserialize(obj.iam);
      }
      return copy as unknown as ReplicationDatabaseAuth;
    }
  }
  export namespace ReplicationDatabaseAuth {
      export interface Transport {
        basic?: ReplicationDatabaseAuthBasic.Transport;
        iam?: ReplicationDatabaseAuthIam.Transport;
      }
  }

  /**
   * Schema for basic authentication of replication source or target database.
   */
  export class ReplicationDatabaseAuthBasic {
    /** The password associated with the username. */
    password: string;

    /** Schema for a username. */
    username: string;

    static serialize(obj): ReplicationDatabaseAuthBasic.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuthBasic.Transport = <ReplicationDatabaseAuthBasic.Transport>{};
      if (obj.password !== undefined) {
        copy.password = obj.password;
      }
      if (obj.username !== undefined) {
        copy.username = obj.username;
      }
      return copy as unknown as ReplicationDatabaseAuthBasic.Transport;
    }

    static deserialize(obj): ReplicationDatabaseAuthBasic {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuthBasic = <ReplicationDatabaseAuthBasic>{};
      if (obj.password !== undefined) {
        copy.password = obj.password;
      }
      if (obj.username !== undefined) {
        copy.username = obj.username;
      }
      return copy as unknown as ReplicationDatabaseAuthBasic;
    }
  }
  export namespace ReplicationDatabaseAuthBasic {
      export interface Transport {
        password: string;
        username: string;
      }
  }

  /**
   * Schema for an IAM API key for replication database authentication.
   */
  export class ReplicationDatabaseAuthIam {
    /** IAM API key. */
    apiKey: string;

    static serialize(obj): ReplicationDatabaseAuthIam.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuthIam.Transport = <ReplicationDatabaseAuthIam.Transport>{};
      if (obj.apiKey !== undefined) {
        copy.api_key = obj.apiKey;
      }
      return copy as unknown as ReplicationDatabaseAuthIam.Transport;
    }

    static deserialize(obj): ReplicationDatabaseAuthIam {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDatabaseAuthIam = <ReplicationDatabaseAuthIam>{};
      if (obj.api_key !== undefined) {
        copy.apiKey = obj.api_key;
      }
      return copy as unknown as ReplicationDatabaseAuthIam;
    }
  }
  export namespace ReplicationDatabaseAuthIam {
      export interface Transport {
        api_key: string;
      }
  }

  /**
   * Schema for a replication document. Note that `selector`, `doc_ids`, and `filter` are incompatible with each other.
   *
   * This type supports additional properties of type any.
   */
  export class ReplicationDocument {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: {[key: string]: Attachment};

    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];

    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;

    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];

    /** Schema for a document ID. */
    _id?: string;

    /** Document's update sequence in current database. Available if requested with local_seq=true query parameter. */
    _local_seq?: string;

    /** Schema for a document revision identifier. */
    _rev?: string;

    /** Schema for list of revision information. */
    _revisions?: Revisions;

    /** Schema for a list of objects with information about local revisions and their status. */
    _revs_info?: DocumentRevisionStatus[];

    /** Cancels the replication. */
    cancel?: boolean;

    /** Defines replication checkpoint interval in milliseconds. */
    checkpointInterval?: number;

    /** HTTP connection timeout per replication. Even for very fast/reliable networks it might need to be increased
     *  if a remote database is too busy.
     */
    connectionTimeout?: number;

    /** Configure the replication to be continuous. */
    continuous?: boolean;

    /** Creates the target database. Requires administrator privileges on target server. */
    createTarget?: boolean;

    /** Request parameters to use during target database creation. */
    createTargetParams?: ReplicationCreateTargetParameters;

    /** Schema for a list of document IDs. */
    docIds?: string[];

    /** The name of a filter function which is defined in a design document in the source database in
     *  {ddoc_id}/{filter} format. It determines which documents get replicated. Using the selector option provides
     *  performance benefits when compared with using the filter option. Use the selector option when possible.
     */
    filter?: string;

    /** Maximum number of HTTP connections per replication. */
    httpConnections?: number;

    /** The replication document owner. The server sets an appropriate value if the field is unset when writing a
     *  replication document. Only administrators can modify the value to an owner other than themselves.
     */
    owner?: string;

    /** Schema for a map of string key value pairs, such as query parameters. */
    queryParams?: JsonObject;

    /** Number of times a replication request is retried. The requests are retried with a doubling exponential
     *  backoff starting at 0.25 seconds, with a cap at 5 minutes.
     */
    retriesPerRequest?: number;

    /** JSON object describing criteria used to select documents. The selector specifies fields in the document, and
     *  provides an expression to evaluate with the field content or other data.
     *
     *  The selector object must:
     *    * Be structured as valid JSON.
     *    * Contain a valid query expression.
     *
     *  Using a selector is significantly more efficient than using a JavaScript filter function, and is the recommended
     *  option if filtering on document attributes only.
     *
     *  Elementary selector syntax requires you to specify one or more fields, and the corresponding values required for
     *  those fields. You can create more complex selector expressions by combining operators.
     *
     *  Operators are identified by the use of a dollar sign `$` prefix in the name field.
     *
     *  There are two core types of operators in the selector syntax:
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. A
     *  combination operator takes a single argument. The argument is either another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *
     *  It is important for query performance to use appropriate selectors:
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *  * Some operators such as `$not`, `$or`, `$in`, and `$regex` cannot be answered from an index. For query
     *  selectors use these operators in conjunction with equality operators or create and use a partial index to reduce
     *  the number of documents that will need to be scanned.
     *
     *  See [the Cloudant Docs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-operators)for a list of all available
     *  combination and conditional operators.
     *
     *  For further reference see [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-selector-syntax).
     */
    selector?: JsonObject;

    /** Start the replication at a specific sequence value. */
    sinceSeq?: string;

    /** Replication socket options. */
    socketOptions?: string;

    /** Schema for a replication source or target database. */
    source: ReplicationDatabase;

    /** Deprecated: This setting is forbidden in IBM Cloudant replication documents. This setting may be used with
     *  alternative replication mediators.
     *
     *  Address of a (http or socks5 protocol) proxy server through which replication with the source database should
     *  occur.
     */
    sourceProxy?: string | null;

    /** Schema for a replication source or target database. */
    target: ReplicationDatabase;

    /** Deprecated: This setting is forbidden in IBM Cloudant replication documents. This setting may be used with
     *  alternative replication mediators.
     *
     *  Address of a (http or socks5 protocol) proxy server through which replication with the target database should
     *  occur.
     */
    targetProxy?: string | null;

    /** Specify whether to use _bulk_get for fetching documents from the source. If unset, the server configured
     *  default will be used.
     */
    useBulkGet?: boolean;

    /** Specify if checkpoints should be saved during replication. Using checkpoints means a replication can be
     *  efficiently resumed.
     */
    useCheckpoints?: boolean;

    /** Schema for the user context of a session. */
    userCtx?: UserContext;

    /** Replicate only the winning revisions. Replication with this mode discards conflicting revisions. Replication
     *  IDs and checkpoints generated by this mode are different to those generated by default, so it is possible to
     *  first replicate the winning revisions then later backfill remaining revisions with a regular replication job.
     */
    winningRevsOnly?: boolean;

    /** Controls how many documents are processed. After each batch a checkpoint is written so this controls how
     *  frequently checkpointing occurs.
     */
    workerBatchSize?: number;

    /** Controls how many separate processes will read from the changes manager and write to the target. A higher
     *  number can improve throughput.
     */
    workerProcesses?: number;


    /**
     * ReplicationDocument accepts additional properties of type any.
     */
    [propName: string]: any;

    static serialize(obj): ReplicationDocument.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDocument.Transport = <ReplicationDocument.Transport>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.serialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.serialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.serialize);
      }
      if (obj.cancel !== undefined) {
        copy.cancel = obj.cancel;
      }
      if (obj.checkpointInterval !== undefined) {
        copy.checkpoint_interval = obj.checkpointInterval;
      }
      if (obj.connectionTimeout !== undefined) {
        copy.connection_timeout = obj.connectionTimeout;
      }
      if (obj.continuous !== undefined) {
        copy.continuous = obj.continuous;
      }
      if (obj.createTarget !== undefined) {
        copy.create_target = obj.createTarget;
      }
      if (obj.createTargetParams !== undefined) {
        copy.create_target_params = ReplicationCreateTargetParameters.serialize(obj.createTargetParams);
      }
      if (obj.docIds !== undefined) {
        copy.doc_ids = obj.docIds;
      }
      if (obj.filter !== undefined) {
        copy.filter = obj.filter;
      }
      if (obj.httpConnections !== undefined) {
        copy.http_connections = obj.httpConnections;
      }
      if (obj.owner !== undefined) {
        copy.owner = obj.owner;
      }
      if (obj.queryParams !== undefined) {
        copy.query_params = obj.queryParams;
      }
      if (obj.retriesPerRequest !== undefined) {
        copy.retries_per_request = obj.retriesPerRequest;
      }
      if (obj.selector !== undefined) {
        copy.selector = obj.selector;
      }
      if (obj.sinceSeq !== undefined) {
        copy.since_seq = obj.sinceSeq;
      }
      if (obj.socketOptions !== undefined) {
        copy.socket_options = obj.socketOptions;
      }
      if (obj.source !== undefined) {
        copy.source = ReplicationDatabase.serialize(obj.source);
      }
      if (obj.sourceProxy !== undefined) {
        copy.source_proxy = obj.sourceProxy;
      }
      if (obj.target !== undefined) {
        copy.target = ReplicationDatabase.serialize(obj.target);
      }
      if (obj.targetProxy !== undefined) {
        copy.target_proxy = obj.targetProxy;
      }
      if (obj.useBulkGet !== undefined) {
        copy.use_bulk_get = obj.useBulkGet;
      }
      if (obj.useCheckpoints !== undefined) {
        copy.use_checkpoints = obj.useCheckpoints;
      }
      if (obj.userCtx !== undefined) {
        copy.user_ctx = UserContext.serialize(obj.userCtx);
      }
      if (obj.winningRevsOnly !== undefined) {
        copy.winning_revs_only = obj.winningRevsOnly;
      }
      if (obj.workerBatchSize !== undefined) {
        copy.worker_batch_size = obj.workerBatchSize;
      }
      if (obj.workerProcesses !== undefined) {
        copy.worker_processes = obj.workerProcesses;
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
        'cancel',
        'checkpointInterval',
        'connectionTimeout',
        'continuous',
        'createTarget',
        'createTargetParams',
        'docIds',
        'filter',
        'httpConnections',
        'owner',
        'queryParams',
        'retriesPerRequest',
        'selector',
        'sinceSeq',
        'socketOptions',
        'source',
        'sourceProxy',
        'target',
        'targetProxy',
        'useBulkGet',
        'useCheckpoints',
        'userCtx',
        'winningRevsOnly',
        'workerBatchSize',
        'workerProcesses',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as ReplicationDocument.Transport;
    }

    static deserialize(obj): ReplicationDocument {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ReplicationDocument = <ReplicationDocument>{};
      if (obj._attachments !== undefined) {
        copy._attachments = BaseService.convertModel(obj._attachments, Attachment.deserialize, true);
      }
      if (obj._conflicts !== undefined) {
        copy._conflicts = obj._conflicts;
      }
      if (obj._deleted !== undefined) {
        copy._deleted = obj._deleted;
      }
      if (obj._deleted_conflicts !== undefined) {
        copy._deleted_conflicts = obj._deleted_conflicts;
      }
      if (obj._id !== undefined) {
        copy._id = obj._id;
      }
      if (obj._local_seq !== undefined) {
        copy._local_seq = obj._local_seq;
      }
      if (obj._rev !== undefined) {
        copy._rev = obj._rev;
      }
      if (obj._revisions !== undefined) {
        copy._revisions = Revisions.deserialize(obj._revisions);
      }
      if (obj._revs_info !== undefined) {
        copy._revs_info = BaseService.convertModel(obj._revs_info, DocumentRevisionStatus.deserialize);
      }
      if (obj.cancel !== undefined) {
        copy.cancel = obj.cancel;
      }
      if (obj.checkpoint_interval !== undefined) {
        copy.checkpointInterval = obj.checkpoint_interval;
      }
      if (obj.connection_timeout !== undefined) {
        copy.connectionTimeout = obj.connection_timeout;
      }
      if (obj.continuous !== undefined) {
        copy.continuous = obj.continuous;
      }
      if (obj.create_target !== undefined) {
        copy.createTarget = obj.create_target;
      }
      if (obj.create_target_params !== undefined) {
        copy.createTargetParams = ReplicationCreateTargetParameters.deserialize(obj.create_target_params);
      }
      if (obj.doc_ids !== undefined) {
        copy.docIds = obj.doc_ids;
      }
      if (obj.filter !== undefined) {
        copy.filter = obj.filter;
      }
      if (obj.http_connections !== undefined) {
        copy.httpConnections = obj.http_connections;
      }
      if (obj.owner !== undefined) {
        copy.owner = obj.owner;
      }
      if (obj.query_params !== undefined) {
        copy.queryParams = obj.query_params;
      }
      if (obj.retries_per_request !== undefined) {
        copy.retriesPerRequest = obj.retries_per_request;
      }
      if (obj.selector !== undefined) {
        copy.selector = obj.selector;
      }
      if (obj.since_seq !== undefined) {
        copy.sinceSeq = obj.since_seq;
      }
      if (obj.socket_options !== undefined) {
        copy.socketOptions = obj.socket_options;
      }
      if (obj.source !== undefined) {
        copy.source = ReplicationDatabase.deserialize(obj.source);
      }
      if (obj.source_proxy !== undefined) {
        copy.sourceProxy = obj.source_proxy;
      }
      if (obj.target !== undefined) {
        copy.target = ReplicationDatabase.deserialize(obj.target);
      }
      if (obj.target_proxy !== undefined) {
        copy.targetProxy = obj.target_proxy;
      }
      if (obj.use_bulk_get !== undefined) {
        copy.useBulkGet = obj.use_bulk_get;
      }
      if (obj.use_checkpoints !== undefined) {
        copy.useCheckpoints = obj.use_checkpoints;
      }
      if (obj.user_ctx !== undefined) {
        copy.userCtx = UserContext.deserialize(obj.user_ctx);
      }
      if (obj.winning_revs_only !== undefined) {
        copy.winningRevsOnly = obj.winning_revs_only;
      }
      if (obj.worker_batch_size !== undefined) {
        copy.workerBatchSize = obj.worker_batch_size;
      }
      if (obj.worker_processes !== undefined) {
        copy.workerProcesses = obj.worker_processes;
      }
      let defaultProperties = [
        '_attachments',
        '_conflicts',
        '_deleted',
        '_deleted_conflicts',
        '_id',
        '_local_seq',
        '_rev',
        '_revisions',
        '_revs_info',
        'cancel',
        'checkpoint_interval',
        'connection_timeout',
        'continuous',
        'create_target',
        'create_target_params',
        'doc_ids',
        'filter',
        'http_connections',
        'owner',
        'query_params',
        'retries_per_request',
        'selector',
        'since_seq',
        'socket_options',
        'source',
        'source_proxy',
        'target',
        'target_proxy',
        'use_bulk_get',
        'use_checkpoints',
        'user_ctx',
        'winning_revs_only',
        'worker_batch_size',
        'worker_processes',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as ReplicationDocument;
    }
  }
  export namespace ReplicationDocument {
      export interface Transport {
        _attachments?: {[key: string]: Attachment.Transport};
        _conflicts?: string[];
        _deleted?: boolean;
        _deleted_conflicts?: string[];
        _id?: string;
        _local_seq?: string;
        _rev?: string;
        _revisions?: Revisions.Transport;
        _revs_info?: DocumentRevisionStatus[];
        cancel?: boolean;
        checkpoint_interval?: number;
        connection_timeout?: number;
        continuous?: boolean;
        create_target?: boolean;
        create_target_params?: ReplicationCreateTargetParameters.Transport;
        doc_ids?: string[];
        filter?: string;
        http_connections?: number;
        owner?: string;
        query_params?: JsonObject;
        retries_per_request?: number;
        selector?: JsonObject;
        since_seq?: string;
        socket_options?: string;
        source: ReplicationDatabase.Transport;
        source_proxy?: string;
        target: ReplicationDatabase.Transport;
        target_proxy?: string;
        use_bulk_get?: boolean;
        use_checkpoints?: boolean;
        user_ctx?: UserContext.Transport;
        winning_revs_only?: boolean;
        worker_batch_size?: number;
        worker_processes?: number;
        /** ReplicationDocument.ReplicationDocument.Transport accepts additional properties of type any. */
        [propName: string]: any;
      }
  }

  /**
   * Schema for list of revision information.
   */
  export class Revisions {
    /** Array of valid revision IDs, in reverse order (latest first). */
    ids: string[];

    /** Prefix number for the latest revision. */
    start: number;

    static serialize(obj): Revisions.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Revisions.Transport = <Revisions.Transport>{};
      if (obj.ids !== undefined) {
        copy.ids = obj.ids;
      }
      if (obj.start !== undefined) {
        copy.start = obj.start;
      }
      return copy as unknown as Revisions.Transport;
    }

    static deserialize(obj): Revisions {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Revisions = <Revisions>{};
      if (obj.ids !== undefined) {
        copy.ids = obj.ids;
      }
      if (obj.start !== undefined) {
        copy.start = obj.start;
      }
      return copy as unknown as Revisions;
    }
  }
  export namespace Revisions {
      export interface Transport {
        ids: string[];
        start: number;
      }
  }

  /**
   * Schema for information about missing revs and possible ancestors.
   */
  export class RevsDiff {
    /** List of missing revisions. */
    missing?: string[];

    /** List of possible ancestor revisions. */
    possibleAncestors?: string[];

    static serialize(obj): RevsDiff.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: RevsDiff.Transport = <RevsDiff.Transport>{};
      if (obj.missing !== undefined) {
        copy.missing = obj.missing;
      }
      if (obj.possibleAncestors !== undefined) {
        copy.possible_ancestors = obj.possibleAncestors;
      }
      return copy as unknown as RevsDiff.Transport;
    }

    static deserialize(obj): RevsDiff {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: RevsDiff = <RevsDiff>{};
      if (obj.missing !== undefined) {
        copy.missing = obj.missing;
      }
      if (obj.possible_ancestors !== undefined) {
        copy.possibleAncestors = obj.possible_ancestors;
      }
      return copy as unknown as RevsDiff;
    }
  }
  export namespace RevsDiff {
      export interface Transport {
        missing?: string[];
        possible_ancestors?: string[];
      }
  }

  /**
   * Schema for a listing of replication scheduler documents.
   */
  export class SchedulerDocsResult {
    /** Total number of replication scheduler documents. */
    totalRows: number;

    /** Array of replication scheduler doc objects. */
    docs: SchedulerDocument[];

    static serialize(obj): SchedulerDocsResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerDocsResult.Transport = <SchedulerDocsResult.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, SchedulerDocument.serialize);
      }
      return copy as unknown as SchedulerDocsResult.Transport;
    }

    static deserialize(obj): SchedulerDocsResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerDocsResult = <SchedulerDocsResult>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.docs !== undefined) {
        copy.docs = BaseService.convertModel(obj.docs, SchedulerDocument.deserialize);
      }
      return copy as unknown as SchedulerDocsResult;
    }
  }
  export namespace SchedulerDocsResult {
      export interface Transport {
        total_rows: number;
        docs: SchedulerDocument[];
      }
  }

  /**
   * Schema for a replication scheduler document.
   */
  export class SchedulerDocument {
    /** Database where replication document came from. */
    database: string;

    /** Replication document ID. */
    docId: string;

    /** Consecutive errors count. Indicates how many times in a row this replication has crashed. Replication will
     *  be retried with an exponential backoff based on this number. As soon as the replication succeeds this count is
     *  reset to 0. To can be used to get an idea why a particular replication is not making progress.
     */
    errorCount: number;

    /** Replication ID, or null if state is completed or failed. */
    id: string | null;

    /** Schema for scheduler document information. A JSON object that may contain additional information about the
     *  state. For error states this will contain an error field and string value.
     */
    info: SchedulerInfo | null;

    /** Timestamp of last state update. */
    lastUpdated: string;

    /** Cluster node where the job is running. */
    node?: string;

    /** Replication source. */
    source?: string;

    /** Deprecated: Forbidden in IBM Cloudant mediated replications.
     *
     *  Address of the (http or socks5 protocol) proxy server through which replication with the source database occurs.
     */
    sourceProxy?: string | null;

    /** Timestamp of when the replication was started. */
    startTime: string;

    /** Schema for replication state. */
    state: SchedulerDocument.Constants.State | string;

    /** Replication target. */
    target?: string;

    /** Deprecated: Forbidden in IBM Cloudant mediated replications.
     *
     *  Address of the (http or socks5 protocol) proxy server through which replication with the target database occurs.
     */
    targetProxy?: string | null;

    static serialize(obj): SchedulerDocument.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerDocument.Transport = <SchedulerDocument.Transport>{};
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.docId !== undefined) {
        copy.doc_id = obj.docId;
      }
      if (obj.errorCount !== undefined) {
        copy.error_count = obj.errorCount;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.info !== undefined) {
        copy.info = SchedulerInfo.serialize(obj.info);
      }
      if (obj.lastUpdated !== undefined) {
        copy.last_updated = obj.lastUpdated;
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.sourceProxy !== undefined) {
        copy.source_proxy = obj.sourceProxy;
      }
      if (obj.startTime !== undefined) {
        copy.start_time = obj.startTime;
      }
      if (obj.state !== undefined) {
        copy.state = obj.state;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.targetProxy !== undefined) {
        copy.target_proxy = obj.targetProxy;
      }
      return copy as unknown as SchedulerDocument.Transport;
    }

    static deserialize(obj): SchedulerDocument {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerDocument = <SchedulerDocument>{};
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.doc_id !== undefined) {
        copy.docId = obj.doc_id;
      }
      if (obj.error_count !== undefined) {
        copy.errorCount = obj.error_count;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.info !== undefined) {
        copy.info = SchedulerInfo.deserialize(obj.info);
      }
      if (obj.last_updated !== undefined) {
        copy.lastUpdated = obj.last_updated;
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.source_proxy !== undefined) {
        copy.sourceProxy = obj.source_proxy;
      }
      if (obj.start_time !== undefined) {
        copy.startTime = obj.start_time;
      }
      if (obj.state !== undefined) {
        copy.state = obj.state;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.target_proxy !== undefined) {
        copy.targetProxy = obj.target_proxy;
      }
      return copy as unknown as SchedulerDocument;
    }
  }
  export namespace SchedulerDocument {
    export namespace Constants {
      /** Schema for replication state. */
      export enum State {
        INITIALIZING = 'initializing',
        ERROR = 'error',
        PENDING = 'pending',
        RUNNING = 'running',
        CRASHING = 'crashing',
        COMPLETED = 'completed',
        FAILED = 'failed',
      }
    }
      export interface Transport {
        database: string;
        doc_id: string;
        error_count: number;
        id: string;
        info: SchedulerInfo.Transport;
        last_updated: string;
        node?: string;
        source?: string;
        source_proxy?: string;
        start_time: string;
        state: string;
        target?: string;
        target_proxy?: string;
      }
  }

  /**
   * Schema for scheduler document information. A JSON object that may contain additional information about the state.
   * For error states this will contain an error field and string value.
   */
  export class SchedulerInfo {
    /** The count of changes not yet replicated. */
    changesPending?: number | null;

    /** The source sequence id which was last successfully replicated. */
    checkpointedSourceSeq?: string;

    /** The count of docs which failed to be written to the target. */
    docWriteFailures?: number;

    /** The count of docs which have been read from the source. */
    docsRead?: number;

    /** The count of docs which have been written to the target. */
    docsWritten?: number;

    /** Replication error message. */
    error?: string;

    /** The count of revisions which were found on the source, but missing from the target. */
    missingRevisionsFound?: number;

    /** The count of revisions which have been checked since this replication began. */
    revisionsChecked?: number;

    /** The last sequence number obtained from the source database changes feed. */
    sourceSeq?: string;

    /** The last sequence number processed by the replicator. */
    throughSeq?: string;

    static serialize(obj): SchedulerInfo.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerInfo.Transport = <SchedulerInfo.Transport>{};
      if (obj.changesPending !== undefined) {
        copy.changes_pending = obj.changesPending;
      }
      if (obj.checkpointedSourceSeq !== undefined) {
        copy.checkpointed_source_seq = obj.checkpointedSourceSeq;
      }
      if (obj.docWriteFailures !== undefined) {
        copy.doc_write_failures = obj.docWriteFailures;
      }
      if (obj.docsRead !== undefined) {
        copy.docs_read = obj.docsRead;
      }
      if (obj.docsWritten !== undefined) {
        copy.docs_written = obj.docsWritten;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.missingRevisionsFound !== undefined) {
        copy.missing_revisions_found = obj.missingRevisionsFound;
      }
      if (obj.revisionsChecked !== undefined) {
        copy.revisions_checked = obj.revisionsChecked;
      }
      if (obj.sourceSeq !== undefined) {
        copy.source_seq = obj.sourceSeq;
      }
      if (obj.throughSeq !== undefined) {
        copy.through_seq = obj.throughSeq;
      }
      return copy as unknown as SchedulerInfo.Transport;
    }

    static deserialize(obj): SchedulerInfo {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerInfo = <SchedulerInfo>{};
      if (obj.changes_pending !== undefined) {
        copy.changesPending = obj.changes_pending;
      }
      if (obj.checkpointed_source_seq !== undefined) {
        copy.checkpointedSourceSeq = obj.checkpointed_source_seq;
      }
      if (obj.doc_write_failures !== undefined) {
        copy.docWriteFailures = obj.doc_write_failures;
      }
      if (obj.docs_read !== undefined) {
        copy.docsRead = obj.docs_read;
      }
      if (obj.docs_written !== undefined) {
        copy.docsWritten = obj.docs_written;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.missing_revisions_found !== undefined) {
        copy.missingRevisionsFound = obj.missing_revisions_found;
      }
      if (obj.revisions_checked !== undefined) {
        copy.revisionsChecked = obj.revisions_checked;
      }
      if (obj.source_seq !== undefined) {
        copy.sourceSeq = obj.source_seq;
      }
      if (obj.through_seq !== undefined) {
        copy.throughSeq = obj.through_seq;
      }
      return copy as unknown as SchedulerInfo;
    }
  }
  export namespace SchedulerInfo {
      export interface Transport {
        changes_pending?: number;
        checkpointed_source_seq?: string;
        doc_write_failures?: number;
        docs_read?: number;
        docs_written?: number;
        error?: string;
        missing_revisions_found?: number;
        revisions_checked?: number;
        source_seq?: string;
        through_seq?: string;
      }
  }

  /**
   * Schema for a replication scheduler job.
   */
  export class SchedulerJob {
    /** Replication document database. */
    database: string;

    /** Replication document ID. */
    docId: string;

    /** Timestamped history of events as a list of objects. */
    history: SchedulerJobEvent[];

    /** Schema for a replication job id. */
    id: string;

    /** Schema for scheduler document information. A JSON object that may contain additional information about the
     *  state. For error states this will contain an error field and string value.
     */
    info: SchedulerInfo | null;

    /** Cluster node where the job is running. */
    node: string;

    /** Replication process ID. */
    pid: string | null;

    /** Replication source. */
    source: string;

    /** Timestamp of when the replication was started. */
    startTime: string;

    /** Replication target. */
    target: string;

    /** Name of user running the process. */
    user: string | null;

    static serialize(obj): SchedulerJob.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJob.Transport = <SchedulerJob.Transport>{};
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.docId !== undefined) {
        copy.doc_id = obj.docId;
      }
      if (obj.history !== undefined) {
        copy.history = BaseService.convertModel(obj.history, SchedulerJobEvent.serialize);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.info !== undefined) {
        copy.info = SchedulerInfo.serialize(obj.info);
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.pid !== undefined) {
        copy.pid = obj.pid;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.startTime !== undefined) {
        copy.start_time = obj.startTime;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.user !== undefined) {
        copy.user = obj.user;
      }
      return copy as unknown as SchedulerJob.Transport;
    }

    static deserialize(obj): SchedulerJob {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJob = <SchedulerJob>{};
      if (obj.database !== undefined) {
        copy.database = obj.database;
      }
      if (obj.doc_id !== undefined) {
        copy.docId = obj.doc_id;
      }
      if (obj.history !== undefined) {
        copy.history = BaseService.convertModel(obj.history, SchedulerJobEvent.deserialize);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.info !== undefined) {
        copy.info = SchedulerInfo.deserialize(obj.info);
      }
      if (obj.node !== undefined) {
        copy.node = obj.node;
      }
      if (obj.pid !== undefined) {
        copy.pid = obj.pid;
      }
      if (obj.source !== undefined) {
        copy.source = obj.source;
      }
      if (obj.start_time !== undefined) {
        copy.startTime = obj.start_time;
      }
      if (obj.target !== undefined) {
        copy.target = obj.target;
      }
      if (obj.user !== undefined) {
        copy.user = obj.user;
      }
      return copy as unknown as SchedulerJob;
    }
  }
  export namespace SchedulerJob {
      export interface Transport {
        database: string;
        doc_id: string;
        history: SchedulerJobEvent[];
        id: string;
        info: SchedulerInfo.Transport;
        node: string;
        pid: string;
        source: string;
        start_time: string;
        target: string;
        user: string;
      }
  }

  /**
   * Schema for a replication scheduler job event.
   */
  export class SchedulerJobEvent {
    /** Reason for current state of event. */
    reason?: string;

    /** Timestamp of the event. */
    timestamp: string;

    /** Type of the event. */
    type: string;

    static serialize(obj): SchedulerJobEvent.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJobEvent.Transport = <SchedulerJobEvent.Transport>{};
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.timestamp !== undefined) {
        copy.timestamp = obj.timestamp;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as SchedulerJobEvent.Transport;
    }

    static deserialize(obj): SchedulerJobEvent {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJobEvent = <SchedulerJobEvent>{};
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.timestamp !== undefined) {
        copy.timestamp = obj.timestamp;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      return copy as unknown as SchedulerJobEvent;
    }
  }
  export namespace SchedulerJobEvent {
      export interface Transport {
        reason?: string;
        timestamp: string;
        type: string;
      }
  }

  /**
   * Schema for a listing of replication scheduler jobs.
   */
  export class SchedulerJobsResult {
    /** Total number of replication jobs. */
    totalRows: number;

    /** Array of replication job objects. */
    jobs: SchedulerJob[];

    static serialize(obj): SchedulerJobsResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJobsResult.Transport = <SchedulerJobsResult.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.jobs !== undefined) {
        copy.jobs = BaseService.convertModel(obj.jobs, SchedulerJob.serialize);
      }
      return copy as unknown as SchedulerJobsResult.Transport;
    }

    static deserialize(obj): SchedulerJobsResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SchedulerJobsResult = <SchedulerJobsResult>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.jobs !== undefined) {
        copy.jobs = BaseService.convertModel(obj.jobs, SchedulerJob.deserialize);
      }
      return copy as unknown as SchedulerJobsResult;
    }
  }
  export namespace SchedulerJobsResult {
      export interface Transport {
        total_rows: number;
        jobs: SchedulerJob[];
      }
  }

  /**
   * Schema for the output of testing search analyzer tokenization.
   */
  export class SearchAnalyzeResult {
    /** tokens. */
    tokens: string[];

    static serialize(obj): SearchAnalyzeResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchAnalyzeResult.Transport = <SearchAnalyzeResult.Transport>{};
      if (obj.tokens !== undefined) {
        copy.tokens = obj.tokens;
      }
      return copy as unknown as SearchAnalyzeResult.Transport;
    }

    static deserialize(obj): SearchAnalyzeResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchAnalyzeResult = <SearchAnalyzeResult>{};
      if (obj.tokens !== undefined) {
        copy.tokens = obj.tokens;
      }
      return copy as unknown as SearchAnalyzeResult;
    }
  }
  export namespace SearchAnalyzeResult {
      export interface Transport {
        tokens: string[];
      }
  }

  /**
   * Schema for search index disk size.
   */
  export class SearchDiskSizeInformation {
    /** The name of the search index prefixed by the design document ID where the index is stored. */
    name: string;

    /** Schema for search index disk size. */
    searchIndex: SearchIndexDiskSize;

    static serialize(obj): SearchDiskSizeInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchDiskSizeInformation.Transport = <SearchDiskSizeInformation.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.searchIndex !== undefined) {
        copy.search_index = SearchIndexDiskSize.serialize(obj.searchIndex);
      }
      return copy as unknown as SearchDiskSizeInformation.Transport;
    }

    static deserialize(obj): SearchDiskSizeInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchDiskSizeInformation = <SearchDiskSizeInformation>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.search_index !== undefined) {
        copy.searchIndex = SearchIndexDiskSize.deserialize(obj.search_index);
      }
      return copy as unknown as SearchDiskSizeInformation;
    }
  }
  export namespace SearchDiskSizeInformation {
      export interface Transport {
        name: string;
        search_index: SearchIndexDiskSize.Transport;
      }
  }

  /**
   * Schema for a search index definition.
   */
  export class SearchIndexDefinition {
    /** Schema for a search analyzer configuration. */
    analyzer?: AnalyzerConfiguration;

    /** String form of a JavaScript function that is called for each document in the database. The function takes
     *  the document as a parameter, extracts some data from it, and then calls the `index` function to index that data.
     *  The index function takes 2, or optionally 3, parameters.
     *
     *  * The first parameter is the name of the field you intend to use when
     *    querying the index. If the special value `"default"` is used when you
     *    define the name, you do not have to specify a field name at query time.
     *  * The second parameter is the data to be indexed. This data must be only a
     *    string, number, or boolean. Other types will cause an error to be thrown
     *    by the index function call.
     *  * The optional third parameter is a JavaScript object with these
     *    properties:
     *
     *      * `facet` - boolean, default `false` - Creates a faceted index.
     *      * `index` - boolean, default `true` - If set to `false`, the data
     *        cannot be used for searches, but can still be retrieved from the
     *        index if `store` is set to `true`.
     *      * `store` - boolean, default `true` - If true, the value is returned
     *        in the search result; otherwise, the value is not returned.
     */
    index: string;

    static serialize(obj): SearchIndexDefinition.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexDefinition.Transport = <SearchIndexDefinition.Transport>{};
      if (obj.analyzer !== undefined) {
        copy.analyzer = AnalyzerConfiguration.serialize(obj.analyzer);
      }
      if (obj.index !== undefined) {
        copy.index = obj.index;
      }
      return copy as unknown as SearchIndexDefinition.Transport;
    }

    static deserialize(obj): SearchIndexDefinition {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexDefinition = <SearchIndexDefinition>{};
      if (obj.analyzer !== undefined) {
        copy.analyzer = AnalyzerConfiguration.deserialize(obj.analyzer);
      }
      if (obj.index !== undefined) {
        copy.index = obj.index;
      }
      return copy as unknown as SearchIndexDefinition;
    }
  }
  export namespace SearchIndexDefinition {
      export interface Transport {
        analyzer?: AnalyzerConfiguration.Transport;
        index: string;
      }
  }

  /**
   * Schema for search index disk size.
   */
  export class SearchIndexDiskSize {
    /** The size of the search index on disk. */
    diskSize?: number;

    static serialize(obj): SearchIndexDiskSize.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexDiskSize.Transport = <SearchIndexDiskSize.Transport>{};
      if (obj.diskSize !== undefined) {
        copy.disk_size = obj.diskSize;
      }
      return copy as unknown as SearchIndexDiskSize.Transport;
    }

    static deserialize(obj): SearchIndexDiskSize {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexDiskSize = <SearchIndexDiskSize>{};
      if (obj.disk_size !== undefined) {
        copy.diskSize = obj.disk_size;
      }
      return copy as unknown as SearchIndexDiskSize;
    }
  }
  export namespace SearchIndexDiskSize {
      export interface Transport {
        disk_size?: number;
      }
  }

  /**
   * Schema for metadata information about a search index.
   */
  export class SearchIndexInfo {
    /** The committed sequence identifier. */
    committedSeq: number;

    /** The size of the search index on disk. */
    diskSize: number;

    /** The count of the number of indexed documents. */
    docCount: number;

    /** The number of deleted documents. */
    docDelCount: number;

    /** The pending sequence identifier. */
    pendingSeq: number;

    /** Unique signature of the search index. */
    signature: string;

    static serialize(obj): SearchIndexInfo.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexInfo.Transport = <SearchIndexInfo.Transport>{};
      if (obj.committedSeq !== undefined) {
        copy.committed_seq = obj.committedSeq;
      }
      if (obj.diskSize !== undefined) {
        copy.disk_size = obj.diskSize;
      }
      if (obj.docCount !== undefined) {
        copy.doc_count = obj.docCount;
      }
      if (obj.docDelCount !== undefined) {
        copy.doc_del_count = obj.docDelCount;
      }
      if (obj.pendingSeq !== undefined) {
        copy.pending_seq = obj.pendingSeq;
      }
      if (obj.signature !== undefined) {
        copy.signature = obj.signature;
      }
      return copy as unknown as SearchIndexInfo.Transport;
    }

    static deserialize(obj): SearchIndexInfo {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchIndexInfo = <SearchIndexInfo>{};
      if (obj.committed_seq !== undefined) {
        copy.committedSeq = obj.committed_seq;
      }
      if (obj.disk_size !== undefined) {
        copy.diskSize = obj.disk_size;
      }
      if (obj.doc_count !== undefined) {
        copy.docCount = obj.doc_count;
      }
      if (obj.doc_del_count !== undefined) {
        copy.docDelCount = obj.doc_del_count;
      }
      if (obj.pending_seq !== undefined) {
        copy.pendingSeq = obj.pending_seq;
      }
      if (obj.signature !== undefined) {
        copy.signature = obj.signature;
      }
      return copy as unknown as SearchIndexInfo;
    }
  }
  export namespace SearchIndexInfo {
      export interface Transport {
        committed_seq: number;
        disk_size: number;
        doc_count: number;
        doc_del_count: number;
        pending_seq: number;
        signature: string;
      }
  }

  /**
   * Schema for search index information.
   */
  export class SearchInfoResult {
    /** The name of the search index prefixed by the design document ID where the index is stored. */
    name: string;

    /** Schema for metadata information about a search index. */
    searchIndex: SearchIndexInfo;

    static serialize(obj): SearchInfoResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchInfoResult.Transport = <SearchInfoResult.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.searchIndex !== undefined) {
        copy.search_index = SearchIndexInfo.serialize(obj.searchIndex);
      }
      return copy as unknown as SearchInfoResult.Transport;
    }

    static deserialize(obj): SearchInfoResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchInfoResult = <SearchInfoResult>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.search_index !== undefined) {
        copy.searchIndex = SearchIndexInfo.deserialize(obj.search_index);
      }
      return copy as unknown as SearchInfoResult;
    }
  }
  export namespace SearchInfoResult {
      export interface Transport {
        name: string;
        search_index: SearchIndexInfo.Transport;
      }
  }

  /**
   * Schema for the result of a query search operation.
   */
  export class SearchResult {
    /** Total number of rows in the index matching the search query. The limit may truncate the number of matches
     *  returned.
     */
    totalRows: number;

    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;

    /** Grouped search matches. */
    by?: string;

    /** The counts facet syntax returns the number of query results for each unique value of each named field. */
    counts?: {[key: string]: JsonObject};

    /** The range facet syntax reuses the standard Lucene syntax for ranges to return counts of results that fit
     *  into each specified category.
     */
    ranges?: {[key: string]: JsonObject};

    /** Array of row objects. */
    rows: SearchResultRow[];

    /** Array of grouped search matches. */
    groups?: SearchResultProperties[];

    static serialize(obj): SearchResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResult.Transport = <SearchResult.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.by !== undefined) {
        copy.by = obj.by;
      }
      if (obj.counts !== undefined) {
        copy.counts = obj.counts;
      }
      if (obj.ranges !== undefined) {
        copy.ranges = obj.ranges;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, SearchResultRow.serialize);
      }
      if (obj.groups !== undefined) {
        copy.groups = BaseService.convertModel(obj.groups, SearchResultProperties.serialize);
      }
      return copy as unknown as SearchResult.Transport;
    }

    static deserialize(obj): SearchResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResult = <SearchResult>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.by !== undefined) {
        copy.by = obj.by;
      }
      if (obj.counts !== undefined) {
        copy.counts = obj.counts;
      }
      if (obj.ranges !== undefined) {
        copy.ranges = obj.ranges;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, SearchResultRow.deserialize);
      }
      if (obj.groups !== undefined) {
        copy.groups = BaseService.convertModel(obj.groups, SearchResultProperties.deserialize);
      }
      return copy as unknown as SearchResult;
    }
  }
  export namespace SearchResult {
      export interface Transport {
        total_rows: number;
        bookmark?: string;
        by?: string;
        counts?: {[key: string]: JsonObject};
        ranges?: {[key: string]: JsonObject};
        rows: SearchResultRow[];
        groups?: SearchResultProperties[];
      }
  }

  /**
   * Schema for the result of a query search operation.
   */
  export class SearchResultProperties {
    /** Total number of rows in the index matching the search query. The limit may truncate the number of matches
     *  returned.
     */
    totalRows: number;

    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;

    /** Grouped search matches. */
    by?: string;

    /** The counts facet syntax returns the number of query results for each unique value of each named field. */
    counts?: {[key: string]: JsonObject};

    /** The range facet syntax reuses the standard Lucene syntax for ranges to return counts of results that fit
     *  into each specified category.
     */
    ranges?: {[key: string]: JsonObject};

    /** Array of row objects. */
    rows: SearchResultRow[];

    static serialize(obj): SearchResultProperties.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResultProperties.Transport = <SearchResultProperties.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.by !== undefined) {
        copy.by = obj.by;
      }
      if (obj.counts !== undefined) {
        copy.counts = obj.counts;
      }
      if (obj.ranges !== undefined) {
        copy.ranges = obj.ranges;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, SearchResultRow.serialize);
      }
      return copy as unknown as SearchResultProperties.Transport;
    }

    static deserialize(obj): SearchResultProperties {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResultProperties = <SearchResultProperties>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.bookmark !== undefined) {
        copy.bookmark = obj.bookmark;
      }
      if (obj.by !== undefined) {
        copy.by = obj.by;
      }
      if (obj.counts !== undefined) {
        copy.counts = obj.counts;
      }
      if (obj.ranges !== undefined) {
        copy.ranges = obj.ranges;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, SearchResultRow.deserialize);
      }
      return copy as unknown as SearchResultProperties;
    }
  }
  export namespace SearchResultProperties {
      export interface Transport {
        total_rows: number;
        bookmark?: string;
        by?: string;
        counts?: {[key: string]: JsonObject};
        ranges?: {[key: string]: JsonObject};
        rows: SearchResultRow[];
      }
  }

  /**
   * Schema for a row of the result of a query search operation.
   */
  export class SearchResultRow {
    /** Schema for a document. */
    doc?: Document;

    /** Schema for the fields returned by a query search operation, a map of field name to value. */
    fields: JsonObject;

    /** Returns the context in which a search term was mentioned so that you can display more emphasized results to
     *  a user.
     */
    highlights?: JsonObject;

    /** Schema for a document ID. */
    id: string;

    static serialize(obj): SearchResultRow.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResultRow.Transport = <SearchResultRow.Transport>{};
      if (obj.doc !== undefined) {
        copy.doc = Document.serialize(obj.doc);
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.highlights !== undefined) {
        copy.highlights = obj.highlights;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      return copy as unknown as SearchResultRow.Transport;
    }

    static deserialize(obj): SearchResultRow {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SearchResultRow = <SearchResultRow>{};
      if (obj.doc !== undefined) {
        copy.doc = Document.deserialize(obj.doc);
      }
      if (obj.fields !== undefined) {
        copy.fields = obj.fields;
      }
      if (obj.highlights !== undefined) {
        copy.highlights = obj.highlights;
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      return copy as unknown as SearchResultRow;
    }
  }
  export namespace SearchResultRow {
      export interface Transport {
        doc?: Document.Transport;
        fields: JsonObject;
        highlights?: JsonObject;
        id: string;
      }
  }

  /**
   * Schema for a security document.
   */
  export class Security {
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;

    /** Database permissions for Cloudant users and/or API keys. */
    cloudant?: JsonObject;

    /** Manage permissions using the `_users` database only. */
    couchdbAuthOnly?: boolean;

    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;

    static serialize(obj): Security.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Security.Transport = <Security.Transport>{};
      if (obj.admins !== undefined) {
        copy.admins = SecurityObject.serialize(obj.admins);
      }
      if (obj.cloudant !== undefined) {
        copy.cloudant = obj.cloudant;
      }
      if (obj.couchdbAuthOnly !== undefined) {
        copy.couchdb_auth_only = obj.couchdbAuthOnly;
      }
      if (obj.members !== undefined) {
        copy.members = SecurityObject.serialize(obj.members);
      }
      return copy as unknown as Security.Transport;
    }

    static deserialize(obj): Security {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: Security = <Security>{};
      if (obj.admins !== undefined) {
        copy.admins = SecurityObject.deserialize(obj.admins);
      }
      if (obj.cloudant !== undefined) {
        copy.cloudant = obj.cloudant;
      }
      if (obj.couchdb_auth_only !== undefined) {
        copy.couchdbAuthOnly = obj.couchdb_auth_only;
      }
      if (obj.members !== undefined) {
        copy.members = SecurityObject.deserialize(obj.members);
      }
      return copy as unknown as Security;
    }
  }
  export namespace Security {
      export interface Transport {
        admins?: SecurityObject.Transport;
        cloudant?: JsonObject;
        couchdb_auth_only?: boolean;
        members?: SecurityObject.Transport;
      }
  }

  /**
   * Schema for names and roles to map to a database permission.
   */
  export class SecurityObject {
    /** List of usernames. */
    names?: string[];

    /** List of roles. */
    roles?: string[];

    static serialize(obj): SecurityObject.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SecurityObject.Transport = <SecurityObject.Transport>{};
      if (obj.names !== undefined) {
        copy.names = obj.names;
      }
      if (obj.roles !== undefined) {
        copy.roles = obj.roles;
      }
      return copy as unknown as SecurityObject.Transport;
    }

    static deserialize(obj): SecurityObject {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SecurityObject = <SecurityObject>{};
      if (obj.names !== undefined) {
        copy.names = obj.names;
      }
      if (obj.roles !== undefined) {
        copy.roles = obj.roles;
      }
      return copy as unknown as SecurityObject;
    }
  }
  export namespace SecurityObject {
      export interface Transport {
        names?: string[];
        roles?: string[];
      }
  }

  /**
   * Schema for extra information on the selector.
   */
  export class SelectorHint {
    /** A list of fields in the given selector that can be used to restrict the query. */
    indexableFields: string[];

    /** A type of the index. */
    type: SelectorHint.Constants.Type | string;

    /** A list of fields in the given selector that can't be used to restrict the query. */
    unindexableFields: string[];

    static serialize(obj): SelectorHint.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SelectorHint.Transport = <SelectorHint.Transport>{};
      if (obj.indexableFields !== undefined) {
        copy.indexable_fields = obj.indexableFields;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      if (obj.unindexableFields !== undefined) {
        copy.unindexable_fields = obj.unindexableFields;
      }
      return copy as unknown as SelectorHint.Transport;
    }

    static deserialize(obj): SelectorHint {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SelectorHint = <SelectorHint>{};
      if (obj.indexable_fields !== undefined) {
        copy.indexableFields = obj.indexable_fields;
      }
      if (obj.type !== undefined) {
        copy.type = obj.type;
      }
      if (obj.unindexable_fields !== undefined) {
        copy.unindexableFields = obj.unindexable_fields;
      }
      return copy as unknown as SelectorHint;
    }
  }
  export namespace SelectorHint {
    export namespace Constants {
      /** A type of the index. */
      export enum Type {
        JSON = 'json',
        TEXT = 'text',
      }
    }
      export interface Transport {
        indexable_fields: string[];
        type: string;
        unindexable_fields: string[];
      }
  }

  /**
   * Schema for information about the server instance.
   */
  export class ServerInformation {
    /** Welcome message. */
    couchdb: string;

    /** List of enabled optional features. */
    features: string[];

    /** List of feature flags. */
    featuresFlags: string[];

    /** Schema for server vendor information. */
    vendor: ServerVendor;

    /** Apache CouchDB version. */
    version: string;

    static serialize(obj): ServerInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ServerInformation.Transport = <ServerInformation.Transport>{};
      if (obj.couchdb !== undefined) {
        copy.couchdb = obj.couchdb;
      }
      if (obj.features !== undefined) {
        copy.features = obj.features;
      }
      if (obj.featuresFlags !== undefined) {
        copy.features_flags = obj.featuresFlags;
      }
      if (obj.vendor !== undefined) {
        copy.vendor = ServerVendor.serialize(obj.vendor);
      }
      if (obj.version !== undefined) {
        copy.version = obj.version;
      }
      return copy as unknown as ServerInformation.Transport;
    }

    static deserialize(obj): ServerInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ServerInformation = <ServerInformation>{};
      if (obj.couchdb !== undefined) {
        copy.couchdb = obj.couchdb;
      }
      if (obj.features !== undefined) {
        copy.features = obj.features;
      }
      if (obj.features_flags !== undefined) {
        copy.featuresFlags = obj.features_flags;
      }
      if (obj.vendor !== undefined) {
        copy.vendor = ServerVendor.deserialize(obj.vendor);
      }
      if (obj.version !== undefined) {
        copy.version = obj.version;
      }
      return copy as unknown as ServerInformation;
    }
  }
  export namespace ServerInformation {
      export interface Transport {
        couchdb: string;
        features: string[];
        features_flags: string[];
        vendor: ServerVendor.Transport;
        version: string;
      }
  }

  /**
   * Schema for server vendor information.
   *
   * This type supports additional properties of type string.
   */
  export class ServerVendor {
    /** Vendor name. */
    name: string;

    /** Vendor variant. */
    variant: ServerVendor.Constants.Variant | string;

    /** Vendor version. */
    version: string;


    /**
     * ServerVendor accepts additional properties of type string.
     */
    [propName: string]: any;

    static serialize(obj): ServerVendor.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ServerVendor.Transport = <ServerVendor.Transport>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.variant !== undefined) {
        copy.variant = obj.variant;
      }
      if (obj.version !== undefined) {
        copy.version = obj.version;
      }
      let defaultProperties = [
        'name',
        'variant',
        'version',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as ServerVendor.Transport;
    }

    static deserialize(obj): ServerVendor {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ServerVendor = <ServerVendor>{};
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.variant !== undefined) {
        copy.variant = obj.variant;
      }
      if (obj.version !== undefined) {
        copy.version = obj.version;
      }
      let defaultProperties = [
        'name',
        'variant',
        'version',
      ];
      Object.keys(obj).forEach(key => {
        if (!defaultProperties.includes(key)) {
          copy[key] = obj[key];
        }
      });
      return copy as unknown as ServerVendor;
    }
  }
  export namespace ServerVendor {
    export namespace Constants {
      /** Vendor variant. */
      export enum Variant {
        PAAS = 'paas',
      }
    }
      export interface Transport {
        name: string;
        variant: string;
        version: string;
        /** ServerVendor.ServerVendor.Transport accepts additional properties of type string. */
        [propName: string]: any;
      }
  }

  /**
   * Schema for session authentication information.
   */
  export class SessionAuthentication {
    /** authenticated. */
    authenticated?: string;

    /** authentication_db. */
    authenticationDb?: string;

    /** authentication_handlers. */
    authenticationHandlers: string[];

    static serialize(obj): SessionAuthentication.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SessionAuthentication.Transport = <SessionAuthentication.Transport>{};
      if (obj.authenticated !== undefined) {
        copy.authenticated = obj.authenticated;
      }
      if (obj.authenticationDb !== undefined) {
        copy.authentication_db = obj.authenticationDb;
      }
      if (obj.authenticationHandlers !== undefined) {
        copy.authentication_handlers = obj.authenticationHandlers;
      }
      return copy as unknown as SessionAuthentication.Transport;
    }

    static deserialize(obj): SessionAuthentication {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SessionAuthentication = <SessionAuthentication>{};
      if (obj.authenticated !== undefined) {
        copy.authenticated = obj.authenticated;
      }
      if (obj.authentication_db !== undefined) {
        copy.authenticationDb = obj.authentication_db;
      }
      if (obj.authentication_handlers !== undefined) {
        copy.authenticationHandlers = obj.authentication_handlers;
      }
      return copy as unknown as SessionAuthentication;
    }
  }
  export namespace SessionAuthentication {
      export interface Transport {
        authenticated?: string;
        authentication_db?: string;
        authentication_handlers: string[];
      }
  }

  /**
   * Schema for information about a session.
   */
  export class SessionInformation {
    /** ok. */
    ok: boolean;

    /** Schema for session authentication information. */
    info: SessionAuthentication;

    /** Schema for the user context of a session. */
    userCtx: UserContext;

    static serialize(obj): SessionInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SessionInformation.Transport = <SessionInformation.Transport>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.info !== undefined) {
        copy.info = SessionAuthentication.serialize(obj.info);
      }
      if (obj.userCtx !== undefined) {
        copy.userCtx = UserContext.serialize(obj.userCtx);
      }
      return copy as unknown as SessionInformation.Transport;
    }

    static deserialize(obj): SessionInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: SessionInformation = <SessionInformation>{};
      if (obj.ok !== undefined) {
        copy.ok = obj.ok;
      }
      if (obj.info !== undefined) {
        copy.info = SessionAuthentication.deserialize(obj.info);
      }
      if (obj.userCtx !== undefined) {
        copy.userCtx = UserContext.deserialize(obj.userCtx);
      }
      return copy as unknown as SessionInformation;
    }
  }
  export namespace SessionInformation {
      export interface Transport {
        ok: boolean;
        info: SessionAuthentication.Transport;
        userCtx: UserContext.Transport;
      }
  }

  /**
   * Schema for a shards object that maps the hash value range for each shard to the array of nodes that contain a copy
   * of that shard.
   */
  export class ShardsInformation {
    /** Mapping of shard hash value range to a list of nodes. */
    shards: JsonObject;

    static serialize(obj): ShardsInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ShardsInformation.Transport = <ShardsInformation.Transport>{};
      if (obj.shards !== undefined) {
        copy.shards = obj.shards;
      }
      return copy as unknown as ShardsInformation.Transport;
    }

    static deserialize(obj): ShardsInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ShardsInformation = <ShardsInformation>{};
      if (obj.shards !== undefined) {
        copy.shards = obj.shards;
      }
      return copy as unknown as ShardsInformation;
    }
  }
  export namespace ShardsInformation {
      export interface Transport {
        shards: JsonObject;
      }
  }

  /**
   * Schema for detailed information about throughput capacity with breakdown by specific throughput requests classes.
   */
  export class ThroughputInformation {
    /** A number of blocks of throughput units. A block consists of 100 reads/sec, 50 writes/sec, and 5 global
     *  queries/sec of provisioned throughput capacity. Not available for some plans.
     */
    blocks?: number;

    /** Provisioned global queries capacity in operations per second. */
    query: number;

    /** Provisioned reads capacity in operations per second. */
    read: number;

    /** Provisioned writes capacity in operations per second. */
    write: number;

    static serialize(obj): ThroughputInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ThroughputInformation.Transport = <ThroughputInformation.Transport>{};
      if (obj.blocks !== undefined) {
        copy.blocks = obj.blocks;
      }
      if (obj.query !== undefined) {
        copy.query = obj.query;
      }
      if (obj.read !== undefined) {
        copy.read = obj.read;
      }
      if (obj.write !== undefined) {
        copy.write = obj.write;
      }
      return copy as unknown as ThroughputInformation.Transport;
    }

    static deserialize(obj): ThroughputInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ThroughputInformation = <ThroughputInformation>{};
      if (obj.blocks !== undefined) {
        copy.blocks = obj.blocks;
      }
      if (obj.query !== undefined) {
        copy.query = obj.query;
      }
      if (obj.read !== undefined) {
        copy.read = obj.read;
      }
      if (obj.write !== undefined) {
        copy.write = obj.write;
      }
      return copy as unknown as ThroughputInformation;
    }
  }
  export namespace ThroughputInformation {
      export interface Transport {
        blocks?: number;
        query: number;
        read: number;
        write: number;
      }
  }

  /**
   * Schema for information about the up state of the server.
   */
  export class UpInformation {
    /** seeds. */
    seeds?: JsonObject;

    /** status. */
    status: UpInformation.Constants.Status | string;

    static serialize(obj): UpInformation.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UpInformation.Transport = <UpInformation.Transport>{};
      if (obj.seeds !== undefined) {
        copy.seeds = obj.seeds;
      }
      if (obj.status !== undefined) {
        copy.status = obj.status;
      }
      return copy as unknown as UpInformation.Transport;
    }

    static deserialize(obj): UpInformation {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UpInformation = <UpInformation>{};
      if (obj.seeds !== undefined) {
        copy.seeds = obj.seeds;
      }
      if (obj.status !== undefined) {
        copy.status = obj.status;
      }
      return copy as unknown as UpInformation;
    }
  }
  export namespace UpInformation {
    export namespace Constants {
      /** status. */
      export enum Status {
        MAINTENANCE_MODE = 'maintenance_mode',
        NOLB = 'nolb',
        OK = 'ok',
      }
    }
      export interface Transport {
        seeds?: JsonObject;
        status: string;
      }
  }

  /**
   * Schema for an ability to tell if view is up-to-date without querying it.
   */
  export class UpdatesPending {
    /** Sum of shard copies with the least amount of work to do. */
    minimum: number;

    /** Sum of unique shards. This value is zero when at least one copy of every shard range is up-to-date and the
     *  view is able to answer a query without index building delays.
     */
    preferred: number;

    /** Sum of all shard copies. */
    total: number;

    static serialize(obj): UpdatesPending.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UpdatesPending.Transport = <UpdatesPending.Transport>{};
      if (obj.minimum !== undefined) {
        copy.minimum = obj.minimum;
      }
      if (obj.preferred !== undefined) {
        copy.preferred = obj.preferred;
      }
      if (obj.total !== undefined) {
        copy.total = obj.total;
      }
      return copy as unknown as UpdatesPending.Transport;
    }

    static deserialize(obj): UpdatesPending {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UpdatesPending = <UpdatesPending>{};
      if (obj.minimum !== undefined) {
        copy.minimum = obj.minimum;
      }
      if (obj.preferred !== undefined) {
        copy.preferred = obj.preferred;
      }
      if (obj.total !== undefined) {
        copy.total = obj.total;
      }
      return copy as unknown as UpdatesPending;
    }
  }
  export namespace UpdatesPending {
      export interface Transport {
        minimum: number;
        preferred: number;
        total: number;
      }
  }

  /**
   * Schema for the user context of a session.
   */
  export class UserContext {
    /** Database name in the context of the provided operation. */
    db?: string;

    /** Name of user running the process. */
    name: string | null;

    /** List of user roles. */
    roles: UserContext.Constants.Roles[] | string[];

    static serialize(obj): UserContext.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UserContext.Transport = <UserContext.Transport>{};
      if (obj.db !== undefined) {
        copy.db = obj.db;
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.roles !== undefined) {
        copy.roles = obj.roles;
      }
      return copy as unknown as UserContext.Transport;
    }

    static deserialize(obj): UserContext {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UserContext = <UserContext>{};
      if (obj.db !== undefined) {
        copy.db = obj.db;
      }
      if (obj.name !== undefined) {
        copy.name = obj.name;
      }
      if (obj.roles !== undefined) {
        copy.roles = obj.roles;
      }
      return copy as unknown as UserContext;
    }
  }
  export namespace UserContext {
    export namespace Constants {
      /** List of user roles. */
      export enum Roles {
        READER = '_reader',
        WRITER = '_writer',
        ADMIN = '_admin',
        REPLICATOR = '_replicator',
        DB_UPDATES = '_db_updates',
        DESIGN = '_design',
        SHARDS = '_shards',
        SECURITY = '_security',
      }
    }
      export interface Transport {
        db?: string;
        name: string;
        roles: string[];
      }
  }

  /**
   * Schema for a set of uuids generated by the server.
   */
  export class UuidsResult {
    /** uuids. */
    uuids: string[];

    static serialize(obj): UuidsResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UuidsResult.Transport = <UuidsResult.Transport>{};
      if (obj.uuids !== undefined) {
        copy.uuids = obj.uuids;
      }
      return copy as unknown as UuidsResult.Transport;
    }

    static deserialize(obj): UuidsResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: UuidsResult = <UuidsResult>{};
      if (obj.uuids !== undefined) {
        copy.uuids = obj.uuids;
      }
      return copy as unknown as UuidsResult;
    }
  }
  export namespace UuidsResult {
      export interface Transport {
        uuids: string[];
      }
  }

  /**
   * Schema for the results of a queries view operation.
   */
  export class ViewQueriesResult {
    /** An array of result objects - one for each query. Each result object contains the same fields as the response
     *  to a regular view request.
     */
    results: ViewResult[];

    static serialize(obj): ViewQueriesResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewQueriesResult.Transport = <ViewQueriesResult.Transport>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, ViewResult.serialize);
      }
      return copy as unknown as ViewQueriesResult.Transport;
    }

    static deserialize(obj): ViewQueriesResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewQueriesResult = <ViewQueriesResult>{};
      if (obj.results !== undefined) {
        copy.results = BaseService.convertModel(obj.results, ViewResult.deserialize);
      }
      return copy as unknown as ViewQueriesResult;
    }
  }
  export namespace ViewQueriesResult {
      export interface Transport {
        results: ViewResult[];
      }
  }

  /**
   * Schema for a query view operation.
   */
  export class ViewQuery {
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;

    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;

    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;

    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;

    /** Parameter to specify whether to include the full content of the documents in the response. */
    includeDocs?: boolean;

    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusiveEnd?: boolean;

    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;

    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;

    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    updateSeq?: boolean;

    /** Schema for any JSON type. */
    endKey?: any;

    /** Schema for a document ID. */
    endKeyDocId?: string;

    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;

    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    groupLevel?: number;

    /** Schema for any JSON type. */
    key?: any;

    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];

    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
     *
     *  A default `reduce` view type can be disabled to behave like a `map` by setting `reduce=false` explicitly.
     *
     *  Be aware that `include_docs=true` can only be used with `map` views.
     */
    reduce?: boolean;

    /** Query parameter to specify whether use the same replica of  the index on each request. The default value
     *  `false` contacts all  replicas and returns the result from the first, fastest, responder. Setting it to `true`
     *  when used in conjunction with `update=false`  may improve consistency at the expense of increased latency and
     *  decreased throughput if the selected replica is not the fastest of the available  replicas.
     *
     *  **Note:** In general setting `true` is discouraged and is strictly not recommended when using `update=true`.
     */
    stable?: boolean;

    /** Schema for any JSON type. */
    startKey?: any;

    /** Schema for a document ID. */
    startKeyDocId?: string;

    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: ViewQuery.Constants.Update | string;

    static serialize(obj): ViewQuery.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewQuery.Transport = <ViewQuery.Transport>{};
      if (obj.attEncodingInfo !== undefined) {
        copy.att_encoding_info = obj.attEncodingInfo;
      }
      if (obj.attachments !== undefined) {
        copy.attachments = obj.attachments;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.descending !== undefined) {
        copy.descending = obj.descending;
      }
      if (obj.includeDocs !== undefined) {
        copy.include_docs = obj.includeDocs;
      }
      if (obj.inclusiveEnd !== undefined) {
        copy.inclusive_end = obj.inclusiveEnd;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.updateSeq !== undefined) {
        copy.update_seq = obj.updateSeq;
      }
      if (obj.endKey !== undefined) {
        copy.end_key = obj.endKey;
      }
      if (obj.endKeyDocId !== undefined) {
        copy.end_key_doc_id = obj.endKeyDocId;
      }
      if (obj.group !== undefined) {
        copy.group = obj.group;
      }
      if (obj.groupLevel !== undefined) {
        copy.group_level = obj.groupLevel;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.keys !== undefined) {
        copy.keys = obj.keys;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.startKey !== undefined) {
        copy.start_key = obj.startKey;
      }
      if (obj.startKeyDocId !== undefined) {
        copy.start_key_doc_id = obj.startKeyDocId;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      return copy as unknown as ViewQuery.Transport;
    }

    static deserialize(obj): ViewQuery {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewQuery = <ViewQuery>{};
      if (obj.att_encoding_info !== undefined) {
        copy.attEncodingInfo = obj.att_encoding_info;
      }
      if (obj.attachments !== undefined) {
        copy.attachments = obj.attachments;
      }
      if (obj.conflicts !== undefined) {
        copy.conflicts = obj.conflicts;
      }
      if (obj.descending !== undefined) {
        copy.descending = obj.descending;
      }
      if (obj.include_docs !== undefined) {
        copy.includeDocs = obj.include_docs;
      }
      if (obj.inclusive_end !== undefined) {
        copy.inclusiveEnd = obj.inclusive_end;
      }
      if (obj.limit !== undefined) {
        copy.limit = obj.limit;
      }
      if (obj.skip !== undefined) {
        copy.skip = obj.skip;
      }
      if (obj.update_seq !== undefined) {
        copy.updateSeq = obj.update_seq;
      }
      if (obj.end_key !== undefined) {
        copy.endKey = obj.end_key;
      }
      if (obj.end_key_doc_id !== undefined) {
        copy.endKeyDocId = obj.end_key_doc_id;
      }
      if (obj.group !== undefined) {
        copy.group = obj.group;
      }
      if (obj.group_level !== undefined) {
        copy.groupLevel = obj.group_level;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.keys !== undefined) {
        copy.keys = obj.keys;
      }
      if (obj.reduce !== undefined) {
        copy.reduce = obj.reduce;
      }
      if (obj.stable !== undefined) {
        copy.stable = obj.stable;
      }
      if (obj.start_key !== undefined) {
        copy.startKey = obj.start_key;
      }
      if (obj.start_key_doc_id !== undefined) {
        copy.startKeyDocId = obj.start_key_doc_id;
      }
      if (obj.update !== undefined) {
        copy.update = obj.update;
      }
      return copy as unknown as ViewQuery;
    }
  }
  export namespace ViewQuery {
    export namespace Constants {
      /** Parameter to specify whether or not the view in question should be updated prior to responding to the user. * `true` - Return results after the view is updated. * `false` - Return results without updating the view. * `lazy` - Return the view results without waiting for an update, but update them immediately after the request. */
      export enum Update {
        TRUE = 'true',
        FALSE = 'false',
        LAZY = 'lazy',
      }
    }
      export interface Transport {
        att_encoding_info?: boolean;
        attachments?: boolean;
        conflicts?: boolean;
        descending?: boolean;
        include_docs?: boolean;
        inclusive_end?: boolean;
        limit?: number;
        skip?: number;
        update_seq?: boolean;
        end_key?: any;
        end_key_doc_id?: string;
        group?: boolean;
        group_level?: number;
        key?: any;
        keys?: any[];
        reduce?: boolean;
        stable?: boolean;
        start_key?: any;
        start_key_doc_id?: string;
        update?: string;
      }
  }

  /**
   * Schema for the result of a query view operation.
   */
  export class ViewResult {
    /** Total number of rows in the view index. Note that if the request query narrows the view this is not the
     *  number of matching rows. The number of matching rows, up to the specified `limit`, is the size of the `rows`
     *  array.
     */
    totalRows?: number;

    /** Current update sequence for the database. */
    updateSeq?: string;

    /** rows. */
    rows: ViewResultRow[];

    static serialize(obj): ViewResult.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewResult.Transport = <ViewResult.Transport>{};
      if (obj.totalRows !== undefined) {
        copy.total_rows = obj.totalRows;
      }
      if (obj.updateSeq !== undefined) {
        copy.update_seq = obj.updateSeq;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, ViewResultRow.serialize);
      }
      return copy as unknown as ViewResult.Transport;
    }

    static deserialize(obj): ViewResult {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewResult = <ViewResult>{};
      if (obj.total_rows !== undefined) {
        copy.totalRows = obj.total_rows;
      }
      if (obj.update_seq !== undefined) {
        copy.updateSeq = obj.update_seq;
      }
      if (obj.rows !== undefined) {
        copy.rows = BaseService.convertModel(obj.rows, ViewResultRow.deserialize);
      }
      return copy as unknown as ViewResult;
    }
  }
  export namespace ViewResult {
      export interface Transport {
        total_rows?: number;
        update_seq?: string;
        rows: ViewResultRow[];
      }
  }

  /**
   * Schema for a row of a view result.
   */
  export class ViewResultRow {
    /** The cause of the error (if available). */
    causedBy?: string;

    /** The name of the error. */
    error?: string;

    /** The reason the error occurred (if available). */
    reason?: string;

    /** An internal error reference (if available). */
    ref?: number;

    /** Schema for a document. */
    doc?: Document;

    /** Schema for a document ID. */
    id?: string;

    /** Schema for any JSON type. */
    key: any;

    /** Schema for any JSON type. */
    value: any;

    static serialize(obj): ViewResultRow.Transport {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewResultRow.Transport = <ViewResultRow.Transport>{};
      if (obj.causedBy !== undefined) {
        copy.caused_by = obj.causedBy;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.serialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.value !== undefined) {
        copy.value = obj.value;
      }
      return copy as unknown as ViewResultRow.Transport;
    }

    static deserialize(obj): ViewResultRow {
      if (obj === undefined || obj === null || typeof obj === 'string') {
        return obj;
      }
      let copy: ViewResultRow = <ViewResultRow>{};
      if (obj.caused_by !== undefined) {
        copy.causedBy = obj.caused_by;
      }
      if (obj.error !== undefined) {
        copy.error = obj.error;
      }
      if (obj.reason !== undefined) {
        copy.reason = obj.reason;
      }
      if (obj.ref !== undefined) {
        copy.ref = obj.ref;
      }
      if (obj.doc !== undefined) {
        copy.doc = Document.deserialize(obj.doc);
      }
      if (obj.id !== undefined) {
        copy.id = obj.id;
      }
      if (obj.key !== undefined) {
        copy.key = obj.key;
      }
      if (obj.value !== undefined) {
        copy.value = obj.value;
      }
      return copy as unknown as ViewResultRow;
    }
  }
  export namespace ViewResultRow {
      export interface Transport {
        caused_by?: string;
        error?: string;
        reason?: string;
        ref?: number;
        doc?: Document.Transport;
        id?: string;
        key: any;
        value: any;
      }
  }
}

export = CloudantV1;
