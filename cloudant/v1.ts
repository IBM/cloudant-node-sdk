/**
 * (C) Copyright IBM Corp. 2023.
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

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';
import CloudantBaseService from '../lib/cloudantBaseService';
import getAuthenticatorFromEnvCloudantExtension from '../lib/getAuthenticatorFromEnvCloudantExtension';

/**
 * NoSQL database based on Apache CouchDB
 *
 * See: https://cloud.ibm.com/docs/services/Cloudant/
 */

class CloudantV1 extends CloudantBaseService {
  static DEFAULT_SERVICE_URL: string = 'http://localhost:5984';

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
   * @param {string} [options.serviceUrl] - The URL for the service
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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getServerInformation'
    );

    const parameters = {
      options: {
        url: '/',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getMembershipInformation'
    );

    const parameters = {
      options: {
        url: '/_membership',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['count', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'count': _params.count,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getUuids'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCapacityThroughputInformation'
    );

    const parameters = {
      options: {
        url: '/_api/v2/user/capacity/throughput',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the target provisioned throughput capacity.
   *
   * Sets the target provisioned throughput capacity for an IBM Cloudant instance. When target capacity is changed, the
   * current capacity asynchronously changes to meet the target capacity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.blocks - A number of blocks of throughput units. A block consists of 100 reads/sec, 50
   * writes/sec, and 5 global queries/sec of provisioned throughput capacity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>>}
   */
  public putCapacityThroughputConfiguration(
    params: CloudantV1.PutCapacityThroughputConfigurationParams
  ): Promise<CloudantV1.Response<CloudantV1.CapacityThroughputInformation>> {
    const _params = { ...params };
    const _requiredParams = ['blocks'];
    const _validParams = ['blocks', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'blocks': _params.blocks,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putCapacityThroughputConfiguration'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * changes
   ************************/

  /**
   * Retrieve change events for all databases.
   *
   * Lists changes to databases, like a global changes feed. Types of changes include updating the database and creating
   * or deleting a database. Like the changes feed, the feed is not guaranteed to return changes in the correct order
   * and might repeat changes. Polling modes for this method work like polling modes for the changes feed.
   * **Note: This endpoint requires _admin or _db_updates role and is only available on dedicated clusters.**.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.feed] - Query parameter to specify the changes feed type.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Only applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout
   * to keep the feed alive indefinitely. May also be `true` to use default value of 60000.
   * @param {number} [params.timeout] - Query parameter to specify the maximum period in milliseconds to wait for a
   * change before the response is sent, even if there are no results. Only applicable for `longpoll` or `continuous`
   * feeds. Default value is specified by `httpd/changes_timeout` configuration option. Note that `60000` value is also
   * the default maximum timeout to prevent undetected dead connections.
   * @param {string} [params.since] - Query parameter to specify to start the results from the change immediately after
   * the given update sequence. Can be a valid update sequence or `now` value. Default is `0` i.e. all changes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DbUpdates>>}
   */
  public getDbUpdates(
    params?: CloudantV1.GetDbUpdatesParams
  ): Promise<CloudantV1.Response<CloudantV1.DbUpdates>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['feed', 'heartbeat', 'timeout', 'since', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'feed': _params.feed,
      'heartbeat': _params.heartbeat,
      'timeout': _params.timeout,
      'since': _params.since,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDbUpdates'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query the database document changes feed.
   *
   * Requests the database changes feed in the same way as `GET /{db}/_changes` does. It is widely used with the
   * `filter` query parameter because it allows one to pass more information to the filter.
   *
   * ### Note
   *
   * Before using the changes feed we recommend reading the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-faq-using-changes-feed) to understand the limitations and
   * appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string[]} [params.docIds] - Schema for a list of document IDs.
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
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
   * @param {string} [params.filter] - Query parameter to specify a filter function from a design document that will
   * filter the changes stream emitting only filtered events. For example: `design_doc/filtername`.
   *
   * Additionally, some keywords are reserved for built-in filters:
   *
   *   * `_design` - Returns only changes to design documents.
   *   * `_doc_ids` - Returns changes for documents with an ID matching one specified in
   *       `doc_ids` request body parameter.
   *   * `_selector` - Returns changes for documents that match the `selector`
   *       request body parameter. The selector syntax is the same as used for
   *       `_find`.
   *   * `_view` - Returns changes for documents that match an existing map
   *       function in the view specified by the query parameter `view`.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Only applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout
   * to keep the feed alive indefinitely. May also be `true` to use default value of 60000.
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
    const _validParams = ['db', 'docIds', 'fields', 'selector', 'lastEventId', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'feed', 'filter', 'heartbeat', 'includeDocs', 'limit', 'seqInterval', 'since', 'style', 'timeout', 'view', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postChanges'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Last-Event-ID': _params.lastEventId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query the database document changes feed as stream.
   *
   * Requests the database changes feed in the same way as `GET /{db}/_changes` does. It is widely used with the
   * `filter` query parameter because it allows one to pass more information to the filter.
   *
   * ### Note
   *
   * Before using the changes feed we recommend reading the
   * [FAQs](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-faq-using-changes-feed) to understand the limitations and
   * appropriate use cases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {string[]} [params.docIds] - Schema for a list of document IDs.
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
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
   * @param {string} [params.filter] - Query parameter to specify a filter function from a design document that will
   * filter the changes stream emitting only filtered events. For example: `design_doc/filtername`.
   *
   * Additionally, some keywords are reserved for built-in filters:
   *
   *   * `_design` - Returns only changes to design documents.
   *   * `_doc_ids` - Returns changes for documents with an ID matching one specified in
   *       `doc_ids` request body parameter.
   *   * `_selector` - Returns changes for documents that match the `selector`
   *       request body parameter. The selector syntax is the same as used for
   *       `_find`.
   *   * `_view` - Returns changes for documents that match an existing map
   *       function in the view specified by the query parameter `view`.
   * @param {number} [params.heartbeat] - Query parameter to specify the period in milliseconds after which an empty
   * line is sent in the results. Only applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout
   * to keep the feed alive indefinitely. May also be `true` to use default value of 60000.
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
    const _validParams = ['db', 'docIds', 'fields', 'selector', 'lastEventId', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'feed', 'filter', 'heartbeat', 'includeDocs', 'limit', 'seqInterval', 'since', 'style', 'timeout', 'view', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postChangesAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Last-Event-ID': _params.lastEventId,
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headDatabase'
    );

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
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a list of all database names in the instance.
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
    const _validParams = ['descending', 'endKey', 'limit', 'skip', 'startKey', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAllDbs'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['keys', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'keys': _params.keys,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postDbsInfo'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDatabase'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve information about a database.
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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDatabaseInformation'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.db - Path parameter to specify the database name.
   * @param {boolean} [params.partitioned] - Query parameter to specify whether to enable database partitions when
   * creating a database.
   * @param {number} [params.q] - The number of shards in the database. Each shard is a partition of the hash value
   * range. Its value is set by the service. For more information about modifying database configuration, contact IBM
   * Cloudant support.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putDatabase(
    params: CloudantV1.PutDatabaseParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'partitioned', 'q', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putDatabase'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'latest', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headDocument'
    );

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
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'document', 'contentType', 'batch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.document;
    const query = {
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postDocument'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postAllDocs'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postAllDocsAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'queries', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': _params.queries,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postAllDocsQueries'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'queries', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': _params.queries,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postAllDocsQueriesAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'bulkDocs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.bulkDocs;
    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postBulkDocs'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': _params.docs,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postBulkGet'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': _params.docs,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postBulkGetAsMixed'
    );

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
          {
            'Accept': 'multipart/mixed',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': _params.docs,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postBulkGetAsRelated'
    );

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
          {
            'Accept': 'multipart/related',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'docs', 'attachments', 'attEncodingInfo', 'latest', 'revs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'docs': _params.docs,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postBulkGetAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
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
    const _validParams = ['db', 'docId', 'ifMatch', 'batch', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDocumentAsMixed'
    );

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
          {
            'Accept': 'multipart/mixed',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDocumentAsRelated'
    );

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
          {
            'Accept': 'multipart/related',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDocumentAsStream'
    );

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
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putDocument(
    params: CloudantV1.PutDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'document'];
    const _validParams = ['db', 'docId', 'document', 'contentType', 'ifMatch', 'batch', 'newEdits', 'rev', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.document;
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putDocument'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headDesignDocument(
    params: CloudantV1.HeadDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc'];
    const _validParams = ['db', 'ddoc', 'ifNoneMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headDesignDocument'
    );

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
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
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
    const _validParams = ['db', 'ddoc', 'ifMatch', 'batch', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDesignDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'ddoc', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDesignDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putDesignDocument(
    params: CloudantV1.PutDesignDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'designDocument'];
    const _validParams = ['db', 'ddoc', 'designDocument', 'ifMatch', 'batch', 'newEdits', 'rev', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.designDocument;
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putDesignDocument'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'ddoc', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDesignDocumentInformation'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.accept] - The type of the response: application/json or application/octet-stream.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.AllDocsResult>>}
   */
  public postDesignDocs(
    params: CloudantV1.PostDesignDocsParams
  ): Promise<CloudantV1.Response<CloudantV1.AllDocsResult>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'accept', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postDesignDocs'
    );

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
          {
            'Content-Type': 'application/json',
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'queries', 'accept', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': _params.queries,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postDesignDocsQueries'
    );

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
          {
            'Content-Type': 'application/json',
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'stable', 'startKey', 'startKeyDocId', 'update', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postView'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'stable', 'startKey', 'startKeyDocId', 'update', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postViewAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'ddoc', 'view', 'queries', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': _params.queries,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postViewQueries'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'ddoc', 'view', 'queries', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'queries': _params.queries,
    };

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'view': _params.view,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postViewQueriesAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'partitionKey', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'partition_key': _params.partitionKey,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPartitionInformation'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'partitionKey', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionAllDocs'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'partitionKey', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'key', 'keys', 'startKey', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionAllDocsAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'partitionKey', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionSearch'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition search index as stream.
   *
   * Partitioned Search indexes, which are defined in design documents, allow partition databases to be queried by using
   * Lucene Query Parser Syntax. Search indexes are defined by an index function, similar to a map function in MapReduce
   * views. The index function decides what data to index and store in the index.
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
    const _validParams = ['db', 'partitionKey', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionSearchAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'partitionKey', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'startKey', 'startKeyDocId', 'update', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionView'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition MapReduce view function as stream.
   *
   * Runs the specified view function from the specified design document. Unlike `GET /{db}/_design/{ddoc}/_view/{view}`
   * for accessing views, the POST method supports the specification of explicit keys to be retrieved from the view
   * results. The remainder of the POST view functionality is identical to the `GET /{db}/_design/{ddoc}/_view/{view}`
   * API.
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
    const _validParams = ['db', 'partitionKey', 'ddoc', 'view', 'attEncodingInfo', 'attachments', 'conflicts', 'descending', 'includeDocs', 'inclusiveEnd', 'limit', 'skip', 'updateSeq', 'endKey', 'endKeyDocId', 'group', 'groupLevel', 'key', 'keys', 'reduce', 'startKey', 'startKeyDocId', 'update', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionViewAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition index by using selector syntax.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index will fallback to using the built-in `_all_docs` index. This is not
   * recommended because it has a noticeable performance impact causing a full scan of the partition with each request.
   * In this case the response body will include a warning field recommending that an index is created.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index for query to run against, rather
   * than by using the IBM Cloudant Query algorithm to find the best index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.FindResult>>}
   */
  public postPartitionFind(
    params: CloudantV1.PostPartitionFindParams
  ): Promise<CloudantV1.Response<CloudantV1.FindResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'selector'];
    const _validParams = ['db', 'partitionKey', 'selector', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionFind'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query a database partition index by using selector syntax as stream.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index will fallback to using the built-in `_all_docs` index. This is not
   * recommended because it has a noticeable performance impact causing a full scan of the partition with each request.
   * In this case the response body will include a warning field recommending that an index is created.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index for query to run against, rather
   * than by using the IBM Cloudant Query algorithm to find the best index.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postPartitionFindAsStream(
    params: CloudantV1.PostPartitionFindAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'partitionKey', 'selector'];
    const _validParams = ['db', 'partitionKey', 'selector', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postPartitionFindAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
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
   * Shows which index is being used by the query. Parameters are the same as the [`_find`
   * endpoint](#query-an-index-by-using-selector-syntax).
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index for query to run against, rather
   * than by using the IBM Cloudant Query algorithm to find the best index.
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
    const _validParams = ['db', 'selector', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postExplain'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query an index by using selector syntax.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index will fallback to using the built-in `_all_docs` index. This is not
   * recommended because it has a significant performance impact causing a full scan of the database with each request.
   * In this case the response body will include a warning field recommending that an index is created.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index for query to run against, rather
   * than by using the IBM Cloudant Query algorithm to find the best index.
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
    const _validParams = ['db', 'selector', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postFind'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query an index by using selector syntax as stream.
   *
   * Query documents by using a declarative JSON querying syntax. It's best practice to create an appropriate index for
   * all fields in selector by using the `_index` endpoint.
   *
   * Queries without an appropriate backing index will fallback to using the built-in `_all_docs` index. This is not
   * recommended because it has a significant performance impact causing a full scan of the database with each request.
   * In this case the response body will include a warning field recommending that an index is created.
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
   * * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In addition
   * to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators: `$all`,
   * `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either another
   * selector, or an array of selectors.
   * * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
   * instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the supplied
   * argument.
   * * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the basis
   * of a query. You should include at least one of these in a selector.
   *
   * For further reference see
   * [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
   * @param {string} [params.bookmark] - Opaque bookmark token used when paginating results.
   * @param {boolean} [params.conflicts] - A boolean value that indicates whether or not to include information about
   * existing conflicts in the document.
   * @param {boolean} [params.executionStats] - Use this option to find information about the query that was run. This
   * information includes total key lookups, total document lookups (when `include_docs=true` is used), and total quorum
   * document lookups (when each document replica is fetched).
   * @param {string[]} [params.fields] - JSON array that uses the field syntax. Use this parameter to specify which
   * fields of a document must be returned. If it is omitted, the entire document is returned.
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
   * @param {string[]} [params.useIndex] - Use this option to identify a specific index for query to run against, rather
   * than by using the IBM Cloudant Query algorithm to find the best index.
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
    const _validParams = ['db', 'selector', 'bookmark', 'conflicts', 'executionStats', 'fields', 'limit', 'skip', 'sort', 'stable', 'update', 'useIndex', 'r', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postFindAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve information about all indexes.
   *
   * When you make a GET request to `/db/_index`, you get a list of all indexes used by Cloudant Query in the database,
   * including the primary index. In addition to the information available through this API, indexes are also stored in
   * the `indexes` property of design documents.
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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getIndexesInformation'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ddoc] - Name of the design document in which the index will be created.
   * @param {IndexDefinition} [params.def] - Schema for a `json` or `text` query index definition. Indexes of type
   * `text` have additional configuration properties that do not apply to `json` indexes, these are:
   * * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
   * document fields and what analyzer to use for that purpose.
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
    const _validParams = ['db', 'index', 'ddoc', 'def', 'name', 'partitioned', 'type', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'index': _params.index,
      'ddoc': _params.ddoc,
      'def': _params.def,
      'name': _params.name,
      'partitioned': _params.partitioned,
      'type': _params.type,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postIndex'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an index.
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
    const _validParams = ['db', 'ddoc', 'type', 'index', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteIndex'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['analyzer', 'text', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'analyzer': _params.analyzer,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postSearchAnalyze'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {JsonObject} [params.ranges] - This field defines ranges for faceted, numeric search fields. The value is a
   * JSON object where the fields names are faceted numeric search fields, and the values of the fields are JSON
   * objects. The field names of the JSON objects are names for ranges. The values are strings that describe the range,
   * for example "[0 TO 10]". This option is only available when making global queries.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.SearchResult>>}
   */
  public postSearch(
    params: CloudantV1.PostSearchParams
  ): Promise<CloudantV1.Response<CloudantV1.SearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'counts', 'drilldown', 'groupField', 'groupLimit', 'groupSort', 'ranges', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postSearch'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {JsonObject} [params.ranges] - This field defines ranges for faceted, numeric search fields. The value is a
   * JSON object where the fields names are faceted numeric search fields, and the values of the fields are JSON
   * objects. The field names of the JSON objects are names for ranges. The values are strings that describe the range,
   * for example "[0 TO 10]". This option is only available when making global queries.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<NodeJS.ReadableStream>>}
   */
  public postSearchAsStream(
    params: CloudantV1.PostSearchAsStreamParams
  ): Promise<CloudantV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'ddoc', 'index', 'query'];
    const _validParams = ['db', 'ddoc', 'index', 'query', 'bookmark', 'highlightFields', 'highlightNumber', 'highlightPostTag', 'highlightPreTag', 'highlightSize', 'includeDocs', 'includeFields', 'limit', 'sort', 'stale', 'counts', 'drilldown', 'groupField', 'groupLimit', 'groupSort', 'ranges', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postSearchAsStream'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'ddoc', 'index', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'ddoc': _params.ddoc,
      'index': _params.index,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSearchInfo'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * replication
   ************************/

  /**
   * Retrieve the HTTP headers for a replication document.
   *
   * Retrieves the HTTP headers containing minimal amount of information about the specified replication document from
   * the `_replicator` database.  The method supports the same query arguments as the `GET /_replicator/{doc_id}`
   * method, but only headers like content length and the revision (ETag header) are returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headReplicationDocument(
    params: CloudantV1.HeadReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['docId'];
    const _validParams = ['docId', 'ifNoneMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headReplicationDocument'
    );

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
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
    const _validParams = ['docId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headSchedulerDocument'
    );

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
          {
          },
          _params.headers
        ),
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
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headSchedulerJob'
    );

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
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Cancel a replication.
   *
   * Cancels a replication by deleting the document that describes it from the `_replicator` database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
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
    const _validParams = ['docId', 'ifMatch', 'batch', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteReplicationDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a replication document.
   *
   * Retrieves a replication document from the `_replicator` database to view the configuration of the replication. The
   * status of the replication is no longer recorded in the document but can be checked via the replication scheduler.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['docId', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'conflicts', 'deletedConflicts', 'latest', 'localSeq', 'meta', 'rev', 'revs', 'revsInfo', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getReplicationDocument'
    );

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
          {
            'Accept': 'application/json',
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create or modify a replication using a replication document.
   *
   * Creates or modifies a document in the `_replicator` database to start a new replication or to edit an existing
   * replication.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.docId - Path parameter to specify the document ID.
   * @param {ReplicationDocument} params.replicationDocument - HTTP request body for replication operations.
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.batch] - Query parameter to specify whether to store in batch mode. The server will respond
   * with a HTTP 202 Accepted response code immediately.
   * @param {boolean} [params.newEdits] - Query parameter to specify whether to prevent insertion of conflicting
   * document revisions. If false, a well-formed _rev must be included in the document. False is used by the replicator
   * to insert documents into the target database even if that leads to the creation of conflicts.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putReplicationDocument(
    params: CloudantV1.PutReplicationDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['docId', 'replicationDocument'];
    const _validParams = ['docId', 'replicationDocument', 'ifMatch', 'batch', 'newEdits', 'rev', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.replicationDocument;
    const query = {
      'batch': _params.batch,
      'new_edits': _params.newEdits,
      'rev': _params.rev,
    };

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putReplicationDocument'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['limit', 'skip', 'states', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'skip': _params.skip,
      'states': _params.states,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSchedulerDocs'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['docId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSchedulerDocument'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['limit', 'skip', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'skip': _params.skip,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSchedulerJobs'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSchedulerJob'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSessionInformation'
    );

    const parameters = {
      options: {
        url: '/_session',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * authorization
   ************************/

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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecurity'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {SecurityObject} [params.members] - Schema for names and roles to map to a database permission.
   * @param {JsonObject} [params.cloudant] - Database permissions for Cloudant users and/or API keys.
   * @param {boolean} [params.couchdbAuthOnly] - Manage permissions using the `_users` database only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putSecurity(
    params: CloudantV1.PutSecurityParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db'];
    const _validParams = ['db', 'admins', 'members', 'cloudant', 'couchdbAuthOnly', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'admins': _params.admins,
      'members': _params.members,
      'cloudant': _params.cloudant,
      'couchdb_auth_only': _params.couchdbAuthOnly,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putSecurity'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postApiKeys'
    );

    const parameters = {
      options: {
        url: '/_api/v2/api_keys',
        method: 'POST',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {SecurityObject} [params.members] - Schema for names and roles to map to a database permission.
   * @param {boolean} [params.couchdbAuthOnly] - Manage permissions using the `_users` database only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public putCloudantSecurityConfiguration(
    params: CloudantV1.PutCloudantSecurityConfigurationParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'cloudant'];
    const _validParams = ['db', 'cloudant', 'admins', 'members', 'couchdbAuthOnly', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cloudant': _params.cloudant,
      'admins': _params.admins,
      'members': _params.members,
      'couchdb_auth_only': _params.couchdbAuthOnly,
    };

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putCloudantSecurityConfiguration'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCorsInformation'
    );

    const parameters = {
      options: {
        url: '/_api/v2/user/config/cors',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['origins', 'allowCredentials', 'enableCors', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origins': _params.origins,
      'allow_credentials': _params.allowCredentials,
      'enable_cors': _params.enableCors,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putCorsConfiguration'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headAttachment(
    params: CloudantV1.HeadAttachmentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName'];
    const _validParams = ['db', 'docId', 'attachmentName', 'ifMatch', 'ifNoneMatch', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headAttachment'
    );

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
          {
            'If-Match': _params.ifMatch,
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
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
    const _validParams = ['db', 'docId', 'attachmentName', 'ifMatch', 'rev', 'batch', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAttachment'
    );

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
          {
            'Accept': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.accept] - The type of the response:  or *_/_*.
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'attachmentName', 'accept', 'ifMatch', 'ifNoneMatch', 'range', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAttachment'
    );

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
          {
            'Accept': _params.accept,
            'If-Match': _params.ifMatch,
            'If-None-Match': _params.ifNoneMatch,
            'Range': _params.range,
          },
          _params.headers
        ),
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
   * @param {string} [params.ifMatch] - Header parameter to specify the document revision. Alternative to rev query
   * parameter.
   * @param {string} [params.rev] - Query parameter to specify a document revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.DocumentResult>>}
   */
  public putAttachment(
    params: CloudantV1.PutAttachmentParams
  ): Promise<CloudantV1.Response<CloudantV1.DocumentResult>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId', 'attachmentName', 'attachment', 'contentType'];
    const _validParams = ['db', 'docId', 'attachmentName', 'attachment', 'contentType', 'ifMatch', 'rev', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putAttachment'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.EmptyObject>>}
   */
  public headLocalDocument(
    params: CloudantV1.HeadLocalDocumentParams
  ): Promise<CloudantV1.Response<CloudantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['db', 'docId'];
    const _validParams = ['db', 'docId', 'ifNoneMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headLocalDocument'
    );

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
          {
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
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
    const _validParams = ['db', 'docId', 'batch', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLocalDocument'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
   * @param {string} [params.ifNoneMatch] - Header parameter to specify a double quoted document revision token for
   * cache control.
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
    const _validParams = ['db', 'docId', 'accept', 'ifNoneMatch', 'attachments', 'attEncodingInfo', 'localSeq', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLocalDocument'
    );

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
          {
            'Accept': _params.accept,
            'If-None-Match': _params.ifNoneMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'docId', 'document', 'contentType', 'batch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.document;
    const query = {
      'batch': _params.batch,
    };

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putLocalDocument'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'documentRevisions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.documentRevisions;
    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postRevsDiff'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getShardsInformation'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['db', 'docId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'db': _params.db,
      'doc_id': _params.docId,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDocumentShardsInfo'
    );

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
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'headUpInformation'
    );

    const parameters = {
      options: {
        url: '/_up',
        method: 'HEAD',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getActiveTasks'
    );

    const parameters = {
      options: {
        url: '/_active_tasks',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getUpInformation'
    );

    const parameters = {
      options: {
        url: '/_up',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve Activity Tracker events information.
   *
   * Check event types that are being sent to IBM Cloud Activity Tracker for the IBM Cloudant instance.
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getActivityTrackerEvents'
    );

    const parameters = {
      options: {
        url: '/_api/v2/user/activity_tracker/events',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Modify Activity Tracker events configuration.
   *
   * Configure event types that are being sent to IBM Cloud Activity Tracker for the IBM Cloudant instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.types - An array of event types that are being sent to IBM Cloud Activity Tracker for the
   * IBM Cloudant instance. "management" is a required element of this array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CloudantV1.Response<CloudantV1.Ok>>}
   */
  public postActivityTrackerEvents(
    params: CloudantV1.PostActivityTrackerEventsParams
  ): Promise<CloudantV1.Response<CloudantV1.Ok>> {
    const _params = { ...params };
    const _requiredParams = ['types'];
    const _validParams = ['types', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'types': _params.types,
    };

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postActivityTrackerEvents'
    );

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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CloudantV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCurrentThroughputInformation'
    );

    const parameters = {
      options: {
        url: '/_api/v2/user/current/throughput',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getServerInformation` operation. */
  export interface GetServerInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMembershipInformation` operation. */
  export interface GetMembershipInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUuids` operation. */
  export interface GetUuidsParams {
    /** Query parameter to specify the number of UUIDs to return. */
    count?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCapacityThroughputInformation` operation. */
  export interface GetCapacityThroughputInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putCapacityThroughputConfiguration` operation. */
  export interface PutCapacityThroughputConfigurationParams {
    /** A number of blocks of throughput units. A block consists of 100 reads/sec, 50 writes/sec, and 5 global
     *  queries/sec of provisioned throughput capacity.
     */
    blocks: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDbUpdates` operation. */
  export interface GetDbUpdatesParams {
    /** Query parameter to specify the changes feed type. */
    feed?: GetDbUpdatesConstants.Feed | string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Only
     *  applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout to keep the feed alive
     *  indefinitely. May also be `true` to use default value of 60000.
     */
    heartbeat?: number;
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostChangesParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a list of document IDs. */
    docIds?: string[];
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted, the entire document is returned.
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
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
    /** Query parameter to specify a filter function from a design document that will filter the changes stream
     *  emitting only filtered events. For example: `design_doc/filtername`.
     *
     *  Additionally, some keywords are reserved for built-in filters:
     *
     *    * `_design` - Returns only changes to design documents.
     *    * `_doc_ids` - Returns changes for documents with an ID matching one specified in
     *        `doc_ids` request body parameter.
     *    * `_selector` - Returns changes for documents that match the `selector`
     *        request body parameter. The selector syntax is the same as used for
     *        `_find`.
     *    * `_view` - Returns changes for documents that match an existing map
     *        function in the view specified by the query parameter `view`.
     */
    filter?: string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Only
     *  applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout to keep the feed alive
     *  indefinitely. May also be `true` to use default value of 60000.
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
    style?: string;
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
    headers?: OutgoingHttpHeaders;
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
  }

  /** Parameters for the `postChangesAsStream` operation. */
  export interface PostChangesAsStreamParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a list of document IDs. */
    docIds?: string[];
    /** JSON array that uses the field syntax. Use this parameter to specify which fields of a document must be
     *  returned. If it is omitted, the entire document is returned.
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
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
    /** Query parameter to specify a filter function from a design document that will filter the changes stream
     *  emitting only filtered events. For example: `design_doc/filtername`.
     *
     *  Additionally, some keywords are reserved for built-in filters:
     *
     *    * `_design` - Returns only changes to design documents.
     *    * `_doc_ids` - Returns changes for documents with an ID matching one specified in
     *        `doc_ids` request body parameter.
     *    * `_selector` - Returns changes for documents that match the `selector`
     *        request body parameter. The selector syntax is the same as used for
     *        `_find`.
     *    * `_view` - Returns changes for documents that match an existing map
     *        function in the view specified by the query parameter `view`.
     */
    filter?: string;
    /** Query parameter to specify the period in milliseconds after which an empty line is sent in the results. Only
     *  applicable for longpoll, continuous, and eventsource feeds. Overrides any timeout to keep the feed alive
     *  indefinitely. May also be `true` to use default value of 60000.
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
    style?: string;
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
    headers?: OutgoingHttpHeaders;
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
  }

  /** Parameters for the `headDatabase` operation. */
  export interface HeadDatabaseParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAllDbs` operation. */
  export interface GetAllDbsParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postDbsInfo` operation. */
  export interface PostDbsInfoParams {
    /** A list of database names. */
    keys: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDatabase` operation. */
  export interface DeleteDatabaseParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDatabaseInformation` operation. */
  export interface GetDatabaseInformationParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putDatabase` operation. */
  export interface PutDatabaseParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Query parameter to specify whether to enable database partitions when creating a database. */
    partitioned?: boolean;
    /** The number of shards in the database. Each shard is a partition of the hash value range. Its value is set by
     *  the service. For more information about modifying database configuration, contact IBM Cloudant support.
     */
    q?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headDocument` operation. */
  export interface HeadDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to force retrieving latest leaf revision, no matter what rev was
     *  requested.
     */
    latest?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postDocument` operation. */
  export interface PostDocumentParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostAllDocsParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postAllDocsAsStream` operation. */
  export interface PostAllDocsAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postAllDocsQueries` operation. */
  export interface PostAllDocsQueriesParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postAllDocsQueriesAsStream` operation. */
  export interface PostAllDocsQueriesAsStreamParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postBulkDocs` operation. */
  export interface PostBulkDocsParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** HTTP request body for postBulkDocs. */
    bulkDocs: BulkDocs | NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postBulkGet` operation. */
  export interface PostBulkGetParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postBulkGetAsMixed` operation. */
  export interface PostBulkGetAsMixedParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postBulkGetAsRelated` operation. */
  export interface PostBulkGetAsRelatedParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postBulkGetAsStream` operation. */
  export interface PostBulkGetAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDocument` operation. */
  export interface DeleteDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteDocument` operation. */
  export namespace DeleteDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDocument` operation. */
  export interface GetDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentAsMixed` operation. */
  export interface GetDocumentAsMixedParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentAsRelated` operation. */
  export interface GetDocumentAsRelatedParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentAsStream` operation. */
  export interface GetDocumentAsStreamParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putDocument` operation. */
  export interface PutDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** HTTP request body for Document operations. */
    document: Document | NodeJS.ReadableStream | Buffer;
    /** The type of the input. */
    contentType?: PutDocumentConstants.ContentType | string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
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
  export interface HeadDesignDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDesignDocument` operation. */
  export interface DeleteDesignDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteDesignDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteDesignDocument` operation. */
  export namespace DeleteDesignDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDesignDocument` operation. */
  export interface GetDesignDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putDesignDocument` operation. */
  export interface PutDesignDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** HTTP request body for DesignDocument operations. */
    designDocument: DesignDocument;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutDesignDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `putDesignDocument` operation. */
  export namespace PutDesignDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getDesignDocumentInformation` operation. */
  export interface GetDesignDocumentInformationParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postDesignDocs` operation. */
  export interface PostDesignDocsParams {
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
    /** The type of the response: application/json or application/octet-stream. */
    accept?: PostDesignDocsConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postDesignDocs` operation. */
  export namespace PostDesignDocsConstants {
    /** The type of the response: application/json or application/octet-stream. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
    }
  }

  /** Parameters for the `postDesignDocsQueries` operation. */
  export interface PostDesignDocsQueriesParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** An array of query objects with fields for the parameters of each individual view query to be executed. The
     *  field names and their meaning are the same as the query parameters of a regular `/_all_docs` request.
     */
    queries: AllDocsQuery[];
    /** The type of the response: application/json or application/octet-stream. */
    accept?: PostDesignDocsQueriesConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
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
  export interface PostViewParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostViewAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostViewQueriesParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postViewQueriesAsStream` operation. */
  export interface PostViewQueriesAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPartitionInformation` operation. */
  export interface GetPartitionInformationParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the database partition key. */
    partitionKey: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postPartitionAllDocs` operation. */
  export interface PostPartitionAllDocsParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postPartitionAllDocsAsStream` operation. */
  export interface PostPartitionAllDocsAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postPartitionSearch` operation. */
  export interface PostPartitionSearchParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postPartitionSearch` operation. */
  export namespace PostPartitionSearchConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postPartitionSearchAsStream` operation. */
  export interface PostPartitionSearchAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postPartitionSearchAsStream` operation. */
  export namespace PostPartitionSearchAsStreamConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postPartitionView` operation. */
  export interface PostPartitionViewParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostPartitionViewAsStreamParams {
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
    headers?: OutgoingHttpHeaders;
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

  /** Parameters for the `postPartitionFind` operation. */
  export interface PostPartitionFindParams {
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
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
     *  returned. If it is omitted, the entire document is returned.
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
    /** Use this option to identify a specific index for query to run against, rather than by using the IBM Cloudant
     *  Query algorithm to find the best index.
     */
    useIndex?: string[];
    headers?: OutgoingHttpHeaders;
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
  export interface PostPartitionFindAsStreamParams {
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
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
     *  returned. If it is omitted, the entire document is returned.
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
    /** Use this option to identify a specific index for query to run against, rather than by using the IBM Cloudant
     *  Query algorithm to find the best index.
     */
    useIndex?: string[];
    headers?: OutgoingHttpHeaders;
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
  export interface PostExplainParams {
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
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
     *  returned. If it is omitted, the entire document is returned.
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
    /** Use this option to identify a specific index for query to run against, rather than by using the IBM Cloudant
     *  Query algorithm to find the best index.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
    headers?: OutgoingHttpHeaders;
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
  export interface PostFindParams {
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
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
     *  returned. If it is omitted, the entire document is returned.
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
    /** Use this option to identify a specific index for query to run against, rather than by using the IBM Cloudant
     *  Query algorithm to find the best index.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
    headers?: OutgoingHttpHeaders;
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
  export interface PostFindAsStreamParams {
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
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
     *  returned. If it is omitted, the entire document is returned.
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
    /** Use this option to identify a specific index for query to run against, rather than by using the IBM Cloudant
     *  Query algorithm to find the best index.
     */
    useIndex?: string[];
    /** The read quorum that is needed for the result. The value defaults to 1, in which case the document that was
     *  found in the index is returned. If set to a higher value, each document is read from at least that many replicas
     *  before it is returned in the results. The request will take more time than using only the document that is
     *  stored locally with the index.
     */
    r?: number;
    headers?: OutgoingHttpHeaders;
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
  export interface GetIndexesInformationParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postIndex` operation. */
  export interface PostIndexParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
     *  properties that do not apply to `json` indexes, these are:
     *  * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
     *  document fields and what analyzer to use for that purpose.
     */
    index: IndexDefinition;
    /** Name of the design document in which the index will be created. */
    ddoc?: string;
    /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
     *  properties that do not apply to `json` indexes, these are:
     *  * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
     *  document fields and what analyzer to use for that purpose.
     */
    def?: IndexDefinition;
    /** name. */
    name?: string;
    /** The default value is `true` for databases with `partitioned: true` and `false` otherwise. For databases with
     *  `partitioned: false` if this option is specified the value must be `false`.
     */
    partitioned?: boolean;
    /** Schema for the type of an index. */
    type?: PostIndexConstants.Type | string;
    headers?: OutgoingHttpHeaders;
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
  export interface DeleteIndexParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostSearchAnalyzeParams {
    /** The analyzer type that is being used at the tokenization. */
    analyzer: PostSearchAnalyzeConstants.Analyzer | string;
    /** The text to tokenize with the analyzer. */
    text: string;
    headers?: OutgoingHttpHeaders;
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
  export interface PostSearchParams {
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
    /** This field defines ranges for faceted, numeric search fields. The value is a JSON object where the fields
     *  names are faceted numeric search fields, and the values of the fields are JSON objects. The field names of the
     *  JSON objects are names for ranges. The values are strings that describe the range, for example "[0 TO 10]". This
     *  option is only available when making global queries.
     */
    ranges?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postSearch` operation. */
  export namespace PostSearchConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `postSearchAsStream` operation. */
  export interface PostSearchAsStreamParams {
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
    /** This field defines ranges for faceted, numeric search fields. The value is a JSON object where the fields
     *  names are faceted numeric search fields, and the values of the fields are JSON objects. The field names of the
     *  JSON objects are names for ranges. The values are strings that describe the range, for example "[0 TO 10]". This
     *  option is only available when making global queries.
     */
    ranges?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postSearchAsStream` operation. */
  export namespace PostSearchAsStreamConstants {
    /** Do not wait for the index to finish building to return results. */
    export enum Stale {
      OK = 'ok',
    }
  }

  /** Parameters for the `getSearchInfo` operation. */
  export interface GetSearchInfoParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the design document name. The design document name is the design document ID
     *  excluding the `_design/` prefix.
     */
    ddoc: string;
    /** Path parameter to specify the index name. */
    index: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headReplicationDocument` operation. */
  export interface HeadReplicationDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headSchedulerDocument` operation. */
  export interface HeadSchedulerDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headSchedulerJob` operation. */
  export interface HeadSchedulerJobParams {
    /** Path parameter to specify the replication job id. */
    jobId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteReplicationDocument` operation. */
  export interface DeleteReplicationDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteReplicationDocumentConstants.Batch | string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteReplicationDocument` operation. */
  export namespace DeleteReplicationDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getReplicationDocument` operation. */
  export interface GetReplicationDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putReplicationDocument` operation. */
  export interface PutReplicationDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    /** HTTP request body for replication operations. */
    replicationDocument: ReplicationDocument;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: PutReplicationDocumentConstants.Batch | string;
    /** Query parameter to specify whether to prevent insertion of conflicting document revisions. If false, a
     *  well-formed _rev must be included in the document. False is used by the replicator to insert documents into the
     *  target database even if that leads to the creation of conflicts.
     */
    newEdits?: boolean;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `putReplicationDocument` operation. */
  export namespace PutReplicationDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getSchedulerDocs` operation. */
  export interface GetSchedulerDocsParams {
    /** Query parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Query parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Query parameter to include only replication documents in the specified states. String must be a
     *  comma-delimited string.
     */
    states?: GetSchedulerDocsConstants.States[] | string[];
    headers?: OutgoingHttpHeaders;
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
  export interface GetSchedulerDocumentParams {
    /** Path parameter to specify the document ID. */
    docId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSchedulerJobs` operation. */
  export interface GetSchedulerJobsParams {
    /** Query parameter to specify the number of returned jobs to limit the result to. */
    limit?: number;
    /** Query parameter to specify the number of records before starting to return the results. */
    skip?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSchedulerJob` operation. */
  export interface GetSchedulerJobParams {
    /** Path parameter to specify the replication job id. */
    jobId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSessionInformation` operation. */
  export interface GetSessionInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecurity` operation. */
  export interface GetSecurityParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putSecurity` operation. */
  export interface PutSecurityParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;
    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;
    /** Database permissions for Cloudant users and/or API keys. */
    cloudant?: JsonObject;
    /** Manage permissions using the `_users` database only. */
    couchdbAuthOnly?: boolean;
    headers?: OutgoingHttpHeaders;
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

  /** Parameters for the `postApiKeys` operation. */
  export interface PostApiKeysParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putCloudantSecurityConfiguration` operation. */
  export interface PutCloudantSecurityConfigurationParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Database permissions for Cloudant users and/or API keys. */
    cloudant: JsonObject;
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;
    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;
    /** Manage permissions using the `_users` database only. */
    couchdbAuthOnly?: boolean;
    headers?: OutgoingHttpHeaders;
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

  /** Parameters for the `getCorsInformation` operation. */
  export interface GetCorsInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putCorsConfiguration` operation. */
  export interface PutCorsConfigurationParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headAttachment` operation. */
  export interface HeadAttachmentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAttachment` operation. */
  export interface DeleteAttachmentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteAttachmentConstants.Batch | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteAttachment` operation. */
  export namespace DeleteAttachmentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getAttachment` operation. */
  export interface GetAttachmentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Path parameter to specify the attachment name. */
    attachmentName: string;
    /** The type of the response:  or *_/_*. */
    accept?: string;
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    /** Header parameter to specify the byte range for a request. This allows the implementation of resumable
     *  downloads and skippable streams. This is available for all attachments inside CouchDB.
     */
    range?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putAttachment` operation. */
  export interface PutAttachmentParams {
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
    /** Header parameter to specify the document revision. Alternative to rev query parameter. */
    ifMatch?: string;
    /** Query parameter to specify a document revision. */
    rev?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headLocalDocument` operation. */
  export interface HeadLocalDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLocalDocument` operation. */
  export interface DeleteLocalDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted
     *  response code immediately.
     */
    batch?: DeleteLocalDocumentConstants.Batch | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteLocalDocument` operation. */
  export namespace DeleteLocalDocumentConstants {
    /** Query parameter to specify whether to store in batch mode. The server will respond with a HTTP 202 Accepted response code immediately. */
    export enum Batch {
      OK = 'ok',
    }
  }

  /** Parameters for the `getLocalDocument` operation. */
  export interface GetLocalDocumentParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    /** The type of the response: application/json, multipart/mixed, multipart/related, or application/octet-stream. */
    accept?: GetLocalDocumentConstants.Accept | string;
    /** Header parameter to specify a double quoted document revision token for cache control. */
    ifNoneMatch?: string;
    /** Query parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Query parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    attEncodingInfo?: boolean;
    /** Query parameter to specify whether to include the last update sequence for the document. */
    localSeq?: boolean;
    headers?: OutgoingHttpHeaders;
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
  export interface PutLocalDocumentParams {
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
    headers?: OutgoingHttpHeaders;
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
  export interface PostRevsDiffParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** HTTP request body for operations with Document revisions. */
    documentRevisions: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getShardsInformation` operation. */
  export interface GetShardsInformationParams {
    /** Path parameter to specify the database name. */
    db: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentShardsInfo` operation. */
  export interface GetDocumentShardsInfoParams {
    /** Path parameter to specify the database name. */
    db: string;
    /** Path parameter to specify the document ID. */
    docId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `headUpInformation` operation. */
  export interface HeadUpInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getActiveTasks` operation. */
  export interface GetActiveTasksParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUpInformation` operation. */
  export interface GetUpInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getActivityTrackerEvents` operation. */
  export interface GetActivityTrackerEventsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postActivityTrackerEvents` operation. */
  export interface PostActivityTrackerEventsParams {
    /** An array of event types that are being sent to IBM Cloud Activity Tracker for the IBM Cloudant instance.
     *  "management" is a required element of this array.
     */
    types: PostActivityTrackerEventsConstants.Types | string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postActivityTrackerEvents` operation. */
  export namespace PostActivityTrackerEventsConstants {
    /** Types */
    export enum Types {
      MANAGEMENT = 'management',
      DATA = 'data',
    }
  }

  /** Parameters for the `getCurrentThroughputInformation` operation. */
  export interface GetCurrentThroughputInformationParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Schema for information about a running task. */
  export interface ActiveTask {
    /** The total count of attempted doc revisions fetched with `_bulk_get`. Available for `replication` type tasks. */
    bulk_get_attempts?: number;
    /** The total count of successful docs fetched with `_bulk_get`. Available for `replication` type tasks. */
    bulk_get_docs?: number;
    /** Processed changes. Available for `database_compaction`, `indexer`, `search_indexer`, `view_compaction` type
     *  tasks.
     */
    changes_done?: number;
    /** The count of changes not yet replicated. Available for `replication` type tasks. */
    changes_pending?: number;
    /** Specifies the checkpoint interval in ms. Available for `replication` type tasks. */
    checkpoint_interval?: number;
    /** The source sequence id which was last successfully replicated. Available for `replication` type tasks. */
    checkpointed_source_seq?: string;
    /** The replication configured to be continuous. Available for `replication` type tasks. */
    continuous?: boolean;
    /** Source database. */
    database: string;
    /** The design document that belongs to this task. Available for `indexer`, `search_indexer`, `view_compaction`
     *  type tasks.
     */
    design_document?: string;
    /** Replication document ID. Available for `replication` type tasks. */
    doc_id?: string;
    /** Number of document write failures. Available for `replication` type tasks. */
    doc_write_failures?: number;
    /** Number of documents read. Available for `replication` type tasks. */
    docs_read?: number;
    /** Number of documents written to target. Available for `replication` type tasks. */
    docs_written?: number;
    /** The search index that belongs to this task. Available for `search_indexer` type tasks. */
    index?: string;
    /** Indexer process ID. Available for `indexer` type tasks. */
    indexer_pid?: string;
    /** The count of docs which have been read from the source. Available for `replication` type tasks. */
    missing_revisions_found?: number;
    /** Cluster node where the task is running. */
    node: string;
    /** The phase the active task is in. `docid_sort`, `docid_copy`, `document_copy` phases are available for
     *  `database_compaction`, while `ids` and `view` phases are available for `view_compaction` type tasks.
     */
    phase?: string;
    /** Process ID. */
    pid: string;
    /** Process status. */
    process_status?: string;
    /** Current percentage progress. Available for `database_compaction`, `indexer`, `search_indexer`,
     *  `view_compaction` type tasks.
     */
    progress?: number;
    /** Replication ID. Available for `replication` type tasks. */
    replication_id?: string;
    /** Indicates whether a compaction retry is currently running on the database. Available for
     *  `database_compaction` type tasks.
     */
    retry?: boolean;
    /** The count of revisions which have been checked since this replication began. Available for `replication`
     *  type tasks.
     */
    revisions_checked?: number;
    /** Replication source. Available for `replication` type tasks. */
    source?: string;
    /** The last sequence number obtained from the source database changes feed. Available for `replication` type
     *  tasks.
     */
    source_seq?: string;
    /** Schema for a Unix epoch timestamp. */
    started_on: number;
    /** Replication target. Available for `replication` type tasks. */
    target?: string;
    /** The last sequence number processed by the replicator. Available for `replication` type tasks. */
    through_seq?: string;
    /** Total changes to process. Available for `database_compaction`, `indexer`, `search_indexer`,
     *  `view_compaction` type tasks.
     */
    total_changes?: number;
    /** Operation type. */
    type: string;
    /** Schema for a Unix epoch timestamp. */
    updated_on: number;
    /** Name of user running replication or owning the indexer. Available for `indexer`, `replication` type tasks. */
    user?: string;
    /** Number of view indexes. Available for `view_compaction` type tasks. */
    view?: number;
  }

  /** Schema for Activity Tracker events. */
  export interface ActivityTrackerEvents {
    /** An array of event types that are being sent to IBM Cloud Activity Tracker for the IBM Cloudant instance.
     *  "management" is a required element of this array.
     */
    types: string[];
  }

  /** Schema for the result of an all documents queries operation. */
  export interface AllDocsQueriesResult {
    /** An array of result objects - one for each query. Each result object contains the same fields as the response
     *  to a regular `/_all_docs` request.
     */
    results: AllDocsResult[];
  }

  /** Schema for an all documents query operation. */
  export interface AllDocsQuery {
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    att_encoding_info?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    include_docs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusive_end?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    update_seq?: boolean;
    /** Schema for a document ID. */
    end_key?: string;
    /** Schema for a document ID. */
    key?: string;
    /** Schema for a list of document IDs. */
    keys?: string[];
    /** Schema for a document ID. */
    start_key?: string;
  }

  /** Schema for the result of an all documents operation. */
  export interface AllDocsResult {
    /** Number of total rows. */
    total_rows: number;
    /** List of doc results. */
    rows: DocsResultRow[];
    /** Current update sequence for the database. */
    update_seq?: string;
  }

  /** Schema for a full text search analyzer. */
  export interface Analyzer {
    /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies
     *  depending on the analyzer usage:
     *  * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query
     *  text index default_field the default is `standard`.
     */
    name?: string;
    /** Custom stopwords to use with the named analyzer. */
    stopwords?: string[];
  }

  /** Schema for a search analyzer configuration. */
  export interface AnalyzerConfiguration {
    /** Schema for the name of the Apache Lucene analyzer to use for text indexing. The default value varies
     *  depending on the analyzer usage:
     *  * For search indexes the default is `standard` * For query text indexes the default is `keyword` * For a query
     *  text index default_field the default is `standard`.
     */
    name?: string;
    /** Custom stopwords to use with the named analyzer. */
    stopwords?: string[];
    /** Schema for mapping a field name to a per field analyzer. */
    fields?: JsonObject;
  }

  /** Schema for api keys. */
  export interface ApiKeysResult {
    /** ok. */
    ok: boolean;
    /** The generated api key. */
    key: string;
    /** The password associated with the api key. */
    password: string;
  }

  /** Schema for an attachment. */
  export interface Attachment {
    /** Attachment MIME type. */
    content_type?: string;
    /** Base64-encoded content. Available if attachment content is requested by using the query parameters
     *  `attachments=true` or `atts_since`. Note that when used with a view or changes feed `include_docs` must also be
     *  `true`.
     */
    data?: string;
    /** Content hash digest. It starts with prefix which announce hash type (e.g. `md5-`) and continues with
     *  Base64-encoded hash digest.
     */
    digest?: string;
    /** Compressed attachment size in bytes. Available if content_type was in list of compressible types when the
     *  attachment was added and the query parameter `att_encoding_info` is `true`. Note that when used with a view or
     *  changes feed `include_docs` must also be `true`.
     */
    encoded_length?: number;
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
  }

  /** Schema for submitting documents for bulk modifications. */
  export interface BulkDocs {
    /** Array of documents. */
    docs: Document[];
    /** If `false`, prevents the database from assigning them new revision IDs. Default is `true`. */
    new_edits?: boolean;
  }

  /** Schema for a document item in a bulk get query. */
  export interface BulkGetQueryDocument {
    /** Includes attachments only since specified revisions. */
    atts_since?: string[];
    /** Schema for a document ID. */
    id: string;
    /** Schema for a document revision identifier. */
    rev?: string;
  }

  /** Schema for the results object of a bulk get operation. */
  export interface BulkGetResult {
    /** Results. */
    results: BulkGetResultItem[];
  }

  /** Schema for BulkGetResult object containing a successfully retrieved document or error information. */
  export interface BulkGetResultDocument {
    /** Schema for the result of a document modification. */
    error?: DocumentResult;
    /** Schema for a document. */
    ok?: Document;
  }

  /** Schema for the document revisions information from a bulk get operation. */
  export interface BulkGetResultItem {
    /** Array of document revisions or error information. */
    docs: BulkGetResultDocument[];
    /** Schema for a document ID. */
    id: string;
  }

  /** Schema for information about the currently provisioned and target throughput capacity. */
  export interface CapacityThroughputInformation {
    /** Detailed information about provisioned throughput capacity. */
    current: CapacityThroughputInformationCurrent;
    /** Detailed information about target throughput capacity. */
    target?: CapacityThroughputInformationTarget;
  }

  /** Detailed information about provisioned throughput capacity. */
  export interface CapacityThroughputInformationCurrent {
    /** Schema for detailed information about throughput capacity with breakdown by specific throughput requests
     *  classes.
     */
    throughput: ThroughputInformation;
  }

  /** Detailed information about target throughput capacity. */
  export interface CapacityThroughputInformationTarget {
    /** Schema for detailed information about throughput capacity with breakdown by specific throughput requests
     *  classes.
     */
    throughput: ThroughputInformation;
  }

  /** Schema for a document leaf with single field rev. */
  export interface Change {
    /** Schema for a document revision identifier. */
    rev: string;
  }

  /** Schema for normal changes feed result. */
  export interface ChangesResult {
    /** last_seq. */
    last_seq: string;
    /** pending. */
    pending: number;
    /** results. */
    results: ChangesResultItem[];
  }

  /** Schema for an item in the changes results array. */
  export interface ChangesResultItem {
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
  }

  /** Schema for size information of content. */
  export interface ContentInformationSizes {
    /** The active size of the content, in bytes. */
    active: number;
    /** The total uncompressed size of the content, in bytes. */
    external: number;
    /** The total size of the content as stored on disk, in bytes. */
    file: number;
  }

  /** Schema for information about the CORS configuration. */
  export interface CorsInformation {
    /** Boolean value to allow authentication credentials. If set to true, browser requests must be done by using
     *  withCredentials = true.
     */
    allow_credentials: boolean;
    /** Boolean value to turn CORS on and off. */
    enable_cors: boolean;
    /** An array of strings that contain allowed origin domains. You have to specify the full URL including the
     *  protocol. It is recommended that only the HTTPS protocol is used. Subdomains count as separate domains, so you
     *  have to specify all subdomains used.
     */
    origins: string[];
  }

  /** Schema for information about current consumption of a provisioned throughput capacity. */
  export interface CurrentThroughputInformation {
    /** Detailed information about current consumption. */
    throughput: CurrentThroughputInformationThroughput;
  }

  /** Detailed information about current consumption. */
  export interface CurrentThroughputInformationThroughput {
    /** Number of global queries conducted against the instance for a given second. */
    query: number;
    /** Number of reads conducted against the instance for a given second. */
    read: number;
    /** Number of writes conducted against the instance for a given second. */
    write: number;
  }

  /** Schema for information about a database. */
  export interface DatabaseInformation {
    /** Schema for database cluster information. */
    cluster: DatabaseInformationCluster;
    /** An opaque string that describes the committed state of the database. */
    committed_update_seq?: string;
    /** True if the database compaction routine is operating on this database. */
    compact_running: boolean;
    /** An opaque string that describes the compaction state of the database. */
    compacted_seq?: string;
    /** The name of the database. */
    db_name: string;
    /** The version of the physical format used for the data when it is stored on disk. */
    disk_format_version: number;
    /** A count of the documents in the specified database. */
    doc_count: number;
    /** Number of deleted documents. */
    doc_del_count: number;
    /** The engine used for the database. */
    engine?: string;
    /** Schema for database properties. */
    props: DatabaseInformationProps;
    /** Schema for size information of content. */
    sizes: ContentInformationSizes;
    /** An opaque string that describes the state of the database. Do not rely on this string for counting the
     *  number of updates.
     */
    update_seq: string;
    /** The UUID of the database. */
    uuid?: string;
  }

  /** Schema for database cluster information. */
  export interface DatabaseInformationCluster {
    /** Schema for the number of replicas of a database in a cluster. */
    n: number;
    /** Schema for the number of shards in a database. Each shard is a partition of the hash value range. */
    q: number;
    /** Read quorum. The number of consistent copies of a document that need to be read before a successful reply. */
    r: number;
    /** Write quorum. The number of copies of a document that need to be written before a successful reply. */
    w: number;
  }

  /** Schema for database properties. */
  export interface DatabaseInformationProps {
    /** The value is `true` for a partitioned database. */
    partitioned?: boolean;
  }

  /** Schema for a database change event. */
  export interface DbEvent {
    /** Database name. */
    db_name: string;
    /** Sequence number. */
    seq: string;
    /** A database event. */
    type: string;
  }

  /** Schema for database updates. */
  export interface DbUpdates {
    /** Last sequence number. */
    last_seq: string;
    /** results. */
    results: DbEvent[];
  }

  /** Schema for database information keyed by database name. */
  export interface DbsInfoResult {
    /** The name of the error. */
    error?: string;
    /** Schema for information about a database. */
    info?: DatabaseInformation;
    /** Database name. */
    key: string;
  }

  /** Schema for a design document. */
  export interface DesignDocument {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: JsonObject;
    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];
    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;
    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];
    /** Document ID. */
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
    indexes?: JsonObject;
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
    validate_doc_update?: string;
    /** Schema for design document views. */
    views?: JsonObject;
    /** DesignDocument accepts additional properties. */
    [propName: string]: any;
  }

  /** Schema for information about a design document. */
  export interface DesignDocumentInformation {
    /** name. */
    name: string;
    /** View index information. */
    view_index: DesignDocumentViewIndex;
  }

  /** Schema for design document options. */
  export interface DesignDocumentOptions {
    /** Whether this design document describes partitioned or global indexes. */
    partitioned?: boolean;
  }

  /** View index information. */
  export interface DesignDocumentViewIndex {
    /** List of collator versions. If there are multiple entries this implies a libicu upgrade has occurred but
     *  compaction has not run yet.
     */
    collator_versions: string[];
    /** Indicates whether a compaction routine is currently running on the view. */
    compact_running: boolean;
    /** Language for the defined views. */
    language: string;
    /** MD5 signature of the views for the design document. */
    signature: string;
    /** Schema for size information of content. */
    sizes: ContentInformationSizes;
    /** Indicates if the view is currently being updated. */
    updater_running: boolean;
    /** Number of clients waiting on views from this design document. */
    waiting_clients: number;
    /** Indicates if there are outstanding commits to the underlying database that need to processed. */
    waiting_commit: boolean;
  }

  /** Schema for view functions definition. */
  export interface DesignDocumentViewsMapReduce {
    /** JavaScript map function as a string. */
    map: string;
    /** JavaScript reduce function as a string. */
    reduce?: string;
  }

  /** Schema for a row of document information in a DocsResult. */
  export interface DocsResultRow {
    /** The cause of the error (if available). */
    caused_by?: string;
    /** The name of the error. */
    error?: string;
    /** The reason the error occurred (if available). */
    reason?: string;
    /** Schema for a document. */
    doc?: Document;
    /** id. */
    id?: string;
    /** Document ID. */
    key: string;
    /** Value of built-in `/_all_docs` style view. */
    value?: DocsResultRowValue;
  }

  /** Value of built-in `/_all_docs` style view. */
  export interface DocsResultRowValue {
    /** If `true` then the document is deleted. Not present for undeleted documents. */
    deleted?: boolean;
    /** Schema for a document revision identifier. */
    rev: string;
  }

  /** Schema for a document. */
  export interface Document {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: JsonObject;
    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];
    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;
    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];
    /** Document ID. */
    _id?: string;
    /** Document's update sequence in current database. Available if requested with local_seq=true query parameter. */
    _local_seq?: string;
    /** Schema for a document revision identifier. */
    _rev?: string;
    /** Schema for list of revision information. */
    _revisions?: Revisions;
    /** Schema for a list of objects with information about local revisions and their status. */
    _revs_info?: DocumentRevisionStatus[];
    /** Document accepts additional properties. */
    [propName: string]: any;
  }

  /** Schema for the result of a document modification. */
  export interface DocumentResult {
    /** Schema for a document ID. */
    id: string;
    /** Schema for a document revision identifier. */
    rev?: string;
    /** ok. */
    ok?: boolean;
    /** The cause of the error (if available). */
    caused_by?: string;
    /** The name of the error. */
    error?: string;
    /** The reason the error occurred (if available). */
    reason?: string;
  }

  /** Schema for information about revisions and their status. */
  export interface DocumentRevisionStatus {
    /** Schema for a document revision identifier. */
    rev: string;
    /** Status of the revision. May be one of: - `available`: Revision is available for retrieving with rev query
     *  parameter - `missing`: Revision is not available - `deleted`: Revision belongs to deleted document.
     */
    status: string;
  }

  /** Schema for document shard information. */
  export interface DocumentShardInfo {
    /** List of nodes serving a replica of the shard. */
    nodes: string[];
    /** The shard range in which the document is stored. */
    range: string;
  }

  /** Schema for find query execution statistics. */
  export interface ExecutionStats {
    /** Time to execute the query. */
    execution_time_ms: number;
    /** Number of results returned. */
    results_returned: number;
    /** Number of documents fetched from the index. */
    total_docs_examined: number;
    /** Number of rows scanned in the index. */
    total_keys_examined: number;
    /** Number of documents fetched from the primary index with the specified read quorum. */
    total_quorum_docs_examined: number;
  }

  /** Schema for information about the index used for a find query. */
  export interface ExplainResult {
    /** dbname. */
    dbname: string;
    /** fields. */
    fields: string[];
    /** Schema for information about an index. */
    index: IndexInformation;
    /** limit. */
    limit: number;
    /** opts. */
    opts: JsonObject;
    /** range. */
    range?: ExplainResultRange;
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector: JsonObject;
    /** skip. */
    skip: number;
  }

  /** range. */
  export interface ExplainResultRange {
    /** end_key. */
    end_key?: any[];
    /** start_key. */
    start_key?: any[];
  }

  /** Schema for the result of a query find operation. */
  export interface FindResult {
    /** Opaque bookmark token used when paginating results. */
    bookmark: string;
    /** Documents matching the selector. */
    docs: Document[];
    /** Schema for find query execution statistics. */
    execution_stats?: ExecutionStats;
    /** warning. */
    warning?: string;
  }

  /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration properties that do not apply to `json` indexes, these are: * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all document fields and what analyzer to use for that purpose. */
  export interface IndexDefinition {
    /** Schema for a full text search analyzer. */
    default_analyzer?: Analyzer;
    /** Schema for the text index default field configuration. The default field is used to index the text of all
     *  fields within a document for use with the `$text` operator.
     */
    default_field?: IndexTextOperatorDefaultField;
    /** List of field objects to index.  Nested fields are also allowed, e.g. `person.name`.
     *
     *  For "json" type indexes each object is a mapping of field name to sort direction (asc or desc).
     *
     *  For "text" type indexes each object has a `name` property of the field name and a `type` property of the field
     *  type (string, number, or boolean).
     */
    fields?: IndexField[];
    /** Whether to scan every document for arrays and store the length for each array found. Set the
     *  index_array_lengths field to false if:
     *  * You do not need to know the length of an array. * You do not use the `$size` operator. * The documents in your
     *  database are complex, or not completely under your control. As a result, it is difficult to estimate the impact
     *  of the extra processing that is needed to determine and store the arrays lengths.
     */
    index_array_lengths?: boolean;
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    partial_filter_selector?: JsonObject;
  }

  /** Schema for indexed fields for use with declarative JSON query. */
  export interface IndexField {
    /** Name of the field. */
    name?: string;
    /** The type of the named field. */
    type?: string;
    /** IndexField accepts additional properties. */
    [propName: string]: any;
  }

  /** Schema for information about an index. */
  export interface IndexInformation {
    /** Design document ID. */
    ddoc: string;
    /** Schema for a `json` or `text` query index definition. Indexes of type `text` have additional configuration
     *  properties that do not apply to `json` indexes, these are:
     *  * `default_analyzer` - the default text analyzer to use * `default_field` - whether to index the text in all
     *  document fields and what analyzer to use for that purpose.
     */
    def: IndexDefinition;
    /** Index name. */
    name: string;
    /** Schema for the type of an index. */
    type: string;
  }

  /** Schema for the result of creating an index. */
  export interface IndexResult {
    /** Id of the design document the index was created in. */
    id: string;
    /** Name of the index created. */
    name: string;
    /** Flag to show whether the index was created or one already exists. */
    result: string;
  }

  /** Schema for the text index default field configuration. The default field is used to index the text of all fields within a document for use with the `$text` operator. */
  export interface IndexTextOperatorDefaultField {
    /** Schema for a full text search analyzer. */
    analyzer?: Analyzer;
    /** Whether or not the default_field is enabled. */
    enabled?: boolean;
  }

  /** Schema for information about the indexes in a database. */
  export interface IndexesInformation {
    /** Number of total rows. */
    total_rows: number;
    /** Indexes. */
    indexes: IndexInformation[];
  }

  /** Schema for information about known nodes and cluster membership. */
  export interface MembershipInformation {
    /** List of nodes this node knows about, including the ones that are part of the cluster. */
    all_nodes: string[];
    /** All cluster nodes. */
    cluster_nodes: string[];
  }

  /** Schema for an OK result. */
  export interface Ok {
    /** ok. */
    ok?: boolean;
  }

  /** Schema for information about a database partition. */
  export interface PartitionInformation {
    /** The name of the database. */
    db_name: string;
    /** A count of the documents in the specified database partition. */
    doc_count: number;
    /** Number of deleted documents. */
    doc_del_count: number;
    /** The name of the partition in the database. */
    partition: string;
    /** Schema for information about the partition index count and limit in a database. */
    partitioned_indexes?: PartitionInformationIndexes;
    /** The size of active and external data, in bytes. */
    sizes: PartitionInformationSizes;
  }

  /** Schema for information about the partition index count and limit in a database. */
  export interface PartitionInformationIndexes {
    /** Total count of the partitioned indexes. */
    count?: number;
    /** The count breakdown of partitioned indexes. */
    indexes?: PartitionInformationIndexesIndexes;
    /** The partitioned index limit. */
    limit?: number;
  }

  /** The count breakdown of partitioned indexes. */
  export interface PartitionInformationIndexesIndexes {
    /** Number of partitioned search indexes. */
    search?: number;
    /** Number of partitioned view indexes. */
    view?: number;
  }

  /** The size of active and external data, in bytes. */
  export interface PartitionInformationSizes {
    /** The size of live data inside the database, in bytes. */
    active?: number;
    /** The uncompressed size of database contents in bytes. */
    external?: number;
  }

  /** Request parameters to use during target database creation. */
  export interface ReplicationCreateTargetParameters {
    /** Schema for the number of replicas of a database in a cluster. */
    n?: number;
    /** Parameter to specify whether to enable database partitions when creating the target database. */
    partitioned?: boolean;
    /** Schema for the number of shards in a database. Each shard is a partition of the hash value range. */
    q?: number;
  }

  /** Schema for a replication source or target database. */
  export interface ReplicationDatabase {
    /** Schema for replication source or target database authentication. */
    auth?: ReplicationDatabaseAuth;
    /** Replication request headers. */
    headers?: JsonObject;
    /** Replication database URL. */
    url: string;
  }

  /** Schema for replication source or target database authentication. */
  export interface ReplicationDatabaseAuth {
    /** Schema for basic authentication of replication source or target database. */
    basic?: ReplicationDatabaseAuthBasic;
    /** Schema for an IAM API key for replication database authentication. */
    iam?: ReplicationDatabaseAuthIam;
  }

  /** Schema for basic authentication of replication source or target database. */
  export interface ReplicationDatabaseAuthBasic {
    /** The password associated with the username. */
    password: string;
    /** The username. */
    username: string;
  }

  /** Schema for an IAM API key for replication database authentication. */
  export interface ReplicationDatabaseAuthIam {
    /** IAM API key. */
    api_key: string;
  }

  /** Schema for a replication document. Note that `selector`, `doc_ids`, and `filter` are incompatible with each other. */
  export interface ReplicationDocument {
    /** Schema for a map of attachment name to attachment metadata. */
    _attachments?: JsonObject;
    /** Schema for a list of document revision identifiers. */
    _conflicts?: string[];
    /** Deletion flag. Available if document was removed. */
    _deleted?: boolean;
    /** Schema for a list of document revision identifiers. */
    _deleted_conflicts?: string[];
    /** Document ID. */
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
    checkpoint_interval?: number;
    /** HTTP connection timeout per replication. Even for very fast/reliable networks it might need to be increased
     *  if a remote database is too busy.
     */
    connection_timeout?: number;
    /** Configure the replication to be continuous. */
    continuous?: boolean;
    /** Creates the target database. Requires administrator privileges on target server. */
    create_target?: boolean;
    /** Request parameters to use during target database creation. */
    create_target_params?: ReplicationCreateTargetParameters;
    /** Schema for a list of document IDs. */
    doc_ids?: string[];
    /** The name of a filter function which is defined in a design document in the source database in
     *  {ddoc_id}/{filter} format. It determines which documents get replicated. Using the selector option provides
     *  performance benefits when compared with using the filter option. Use the selector option when possible.
     */
    filter?: string;
    /** Maximum number of HTTP connections per replication. */
    http_connections?: number;
    /** Schema for a map of string key value pairs, such as query parameters. */
    query_params?: JsonObject;
    /** Number of times a replication request is retried. The requests are retried with a doubling exponential
     *  backoff starting at 0.25 seconds, with a cap at 5 minutes.
     */
    retries_per_request?: number;
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
     *  * Combination operators: applied at the topmost level of selection. They are used to combine selectors. In
     *  addition to the common boolean operators (`$and`, `$or`, `$not`, `$nor`) there are three combination operators:
     *  `$all`, `$elemMatch`, and `$allMatch`. A combination operator takes a single argument. The argument is either
     *  another selector, or an array of selectors.
     *  * Condition operators: are specific to a field, and are used to evaluate the value stored in that field. For
     *  instance, the basic `$eq` operator matches when the specified field contains a value that is equal to the
     *  supplied argument.
     *  * Only equality operators such as `$eq`, `$gt`, `$gte`, `$lt`, and `$lte` (but not `$ne`) can be used as the
     *  basis of a query. You should include at least one of these in a selector.
     *
     *  For further reference see
     *  [selector syntax](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-query#selector-syntax).
     */
    selector?: JsonObject;
    /** Start the replication at a specific sequence value. */
    since_seq?: string;
    /** Replication socket options. */
    socket_options?: string;
    /** Schema for a replication source or target database. */
    source: ReplicationDatabase;
    /** Address of a (http or socks5 protocol) proxy server through which replication with the source database
     *  should occur.
     */
    source_proxy?: string;
    /** Schema for a replication source or target database. */
    target: ReplicationDatabase;
    /** Address of a (http or socks5 protocol) proxy server through which replication with the target database
     *  should occur.
     */
    target_proxy?: string;
    /** Specify whether to use _bulk_get for fetching documents from the source. If unset, the server configured
     *  default will be used.
     */
    use_bulk_get?: boolean;
    /** Specify if checkpoints should be saved during replication. Using checkpoints means a replication can be
     *  efficiently resumed.
     */
    use_checkpoints?: boolean;
    /** Schema for the user context of a session. */
    user_ctx?: UserContext;
    /** Replicate only the winning revisions. Replication with this mode discards conflicting revisions. Replication
     *  IDs and checkpoints generated by this mode are different to those generated by default, so it is possible to
     *  first replicate the winning revisions then later backfill remaining revisions with a regular replication job.
     */
    winning_revs_only?: boolean;
    /** Controls how many documents are processed. After each batch a checkpoint is written so this controls how
     *  frequently checkpointing occurs.
     */
    worker_batch_size?: number;
    /** Controls how many separate processes will read from the changes manager and write to the target. A higher
     *  number can improve throughput.
     */
    worker_processes?: number;
    /** ReplicationDocument accepts additional properties. */
    [propName: string]: any;
  }

  /** Schema for list of revision information. */
  export interface Revisions {
    /** Array of valid revision IDs, in reverse order (latest first). */
    ids: string[];
    /** Prefix number for the latest revision. */
    start: number;
  }

  /** Schema for information about missing revs and possible ancestors. */
  export interface RevsDiff {
    /** List of missing revisions. */
    missing?: string[];
    /** List of possible ancestor revisions. */
    possible_ancestors?: string[];
  }

  /** Schema for a listing of replication scheduler documents. */
  export interface SchedulerDocsResult {
    /** Number of total rows. */
    total_rows: number;
    /** Array of replication scheduler doc objects. */
    docs: SchedulerDocument[];
  }

  /** Schema for a replication scheduler document. */
  export interface SchedulerDocument {
    /** Database where replication document came from. */
    database: string;
    /** Replication document ID. */
    doc_id: string;
    /** Consecutive errors count. Indicates how many times in a row this replication has crashed. Replication will
     *  be retried with an exponential backoff based on this number. As soon as the replication succeeds this count is
     *  reset to 0. To can be used to get an idea why a particular replication is not making progress.
     */
    error_count: number;
    /** Replication ID, or null if state is completed or failed. */
    id: string;
    /** Schema for scheduler document information. A JSON object that may contain additional information about the
     *  state. For error states this will contain an error field and string value.
     */
    info: SchedulerInfo;
    /** Timestamp of last state update. */
    last_updated: string;
    /** Cluster node where the job is running. */
    node?: string;
    /** Replication source. */
    source?: string;
    /** Address of the (http or socks5 protocol) proxy server through which replication with the source database
     *  occurs.
     */
    source_proxy?: string;
    /** Timestamp of when the replication was started. */
    start_time: string;
    /** Schema for replication state. */
    state: string;
    /** Replication target. */
    target?: string;
    /** Address of the (http or socks5 protocol) proxy server through which replication with the target database
     *  occurs.
     */
    target_proxy?: string;
  }

  /** Schema for scheduler document information. A JSON object that may contain additional information about the state. For error states this will contain an error field and string value. */
  export interface SchedulerInfo {
    /** The count of changes not yet replicated. */
    changes_pending?: number;
    /** The source sequence id which was last successfully replicated. */
    checkpointed_source_seq?: string;
    /** The count of docs which failed to be written to the target. */
    doc_write_failures?: number;
    /** The count of docs which have been read from the source. */
    docs_read?: number;
    /** The count of docs which have been written to the target. */
    docs_written?: number;
    /** Replication error message. */
    error?: string;
    /** The count of revisions which were found on the source, but missing from the target. */
    missing_revisions_found?: number;
    /** The count of revisions which have been checked since this replication began. */
    revisions_checked?: number;
    /** The last sequence number obtained from the source database changes feed. */
    source_seq?: string;
    /** The last sequence number processed by the replicator. */
    through_seq?: string;
  }

  /** Schema for a replication scheduler job. */
  export interface SchedulerJob {
    /** Replication document database. */
    database: string;
    /** Replication document ID. */
    doc_id: string;
    /** Timestamped history of events as a list of objects. */
    history: SchedulerJobEvent[];
    /** Schema for a replication job id. */
    id: string;
    /** Schema for scheduler document information. A JSON object that may contain additional information about the
     *  state. For error states this will contain an error field and string value.
     */
    info: SchedulerInfo;
    /** Cluster node where the job is running. */
    node: string;
    /** Replication process ID. */
    pid: string;
    /** Replication source. */
    source: string;
    /** Timestamp of when the replication was started. */
    start_time: string;
    /** Replication target. */
    target: string;
    /** Name of user running replication. */
    user: string;
  }

  /** Schema for a replication scheduler job event. */
  export interface SchedulerJobEvent {
    /** Reason for current state of event. */
    reason?: string;
    /** Timestamp of the event. */
    timestamp: string;
    /** Type of the event. */
    type: string;
  }

  /** Schema for a listing of replication scheduler jobs. */
  export interface SchedulerJobsResult {
    /** Number of total rows. */
    total_rows: number;
    /** Array of replication job objects. */
    jobs: SchedulerJob[];
  }

  /** Schema for the output of testing search analyzer tokenization. */
  export interface SearchAnalyzeResult {
    /** tokens. */
    tokens: string[];
  }

  /** Schema for a search index definition. */
  export interface SearchIndexDefinition {
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
  }

  /** Schema for metadata information about a search index. */
  export interface SearchIndexInfo {
    /** The committed sequence identifier. */
    committed_seq: number;
    /** The size of the search index on disk. */
    disk_size: number;
    /** The count of the number of indexed documents. */
    doc_count: number;
    /** The number of deleted documents. */
    doc_del_count: number;
    /** The pending sequence identifier. */
    pending_seq: number;
    /** Unique signature of the search index. */
    signature: string;
  }

  /** Schema for search index information. */
  export interface SearchInfoResult {
    /** The name of the search index prefixed by the design document ID where the index is stored. */
    name: string;
    /** Schema for metadata information about a search index. */
    search_index: SearchIndexInfo;
  }

  /** Schema for the result of a query search operation. */
  export interface SearchResult {
    /** Number of total rows. */
    total_rows: number;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Grouped search matches. */
    by?: string;
    /** The counts facet syntax returns the number of query results for each unique value of each named field. */
    counts?: JsonObject;
    /** The range facet syntax reuses the standard Lucene syntax for ranges to return counts of results that fit
     *  into each specified category.
     */
    ranges?: JsonObject;
    /** Array of row objects. */
    rows?: SearchResultRow[];
    /** Array of grouped search matches. */
    groups?: SearchResultProperties[];
  }

  /** Schema for the result of a query search operation. */
  export interface SearchResultProperties {
    /** Number of total rows. */
    total_rows: number;
    /** Opaque bookmark token used when paginating results. */
    bookmark?: string;
    /** Grouped search matches. */
    by?: string;
    /** The counts facet syntax returns the number of query results for each unique value of each named field. */
    counts?: JsonObject;
    /** The range facet syntax reuses the standard Lucene syntax for ranges to return counts of results that fit
     *  into each specified category.
     */
    ranges?: JsonObject;
    /** Array of row objects. */
    rows?: SearchResultRow[];
  }

  /** Schema for a row of the result of a query search operation. */
  export interface SearchResultRow {
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
  }

  /** Schema for a security document. */
  export interface Security {
    /** Schema for names and roles to map to a database permission. */
    admins?: SecurityObject;
    /** Schema for names and roles to map to a database permission. */
    members?: SecurityObject;
    /** Database permissions for Cloudant users and/or API keys. */
    cloudant?: JsonObject;
    /** Manage permissions using the `_users` database only. */
    couchdb_auth_only?: boolean;
  }

  /** Schema for names and roles to map to a database permission. */
  export interface SecurityObject {
    /** List of usernames. */
    names?: string[];
    /** List of roles. */
    roles?: string[];
  }

  /** Schema for information about the server instance. */
  export interface ServerInformation {
    /** Welcome message. */
    couchdb: string;
    /** List of enabled optional features. */
    features: string[];
    /** Schema for server vendor information. */
    vendor: ServerVendor;
    /** Apache CouchDB version. */
    version: string;
    /** List of feature flags. */
    features_flags: string[];
  }

  /** Schema for server vendor information. */
  export interface ServerVendor {
    /** Vendor name. */
    name: string;
    /** Vendor variant. */
    variant?: string;
    /** Vendor version. */
    version?: string;
  }

  /** Schema for session authentication information. */
  export interface SessionAuthentication {
    /** authenticated. */
    authenticated?: string;
    /** authentication_db. */
    authentication_db?: string;
    /** authentication_handlers. */
    authentication_handlers: string[];
  }

  /** Schema for information about a session. */
  export interface SessionInformation {
    /** ok. */
    ok: boolean;
    /** Schema for session authentication information. */
    info: SessionAuthentication;
    /** Schema for the user context of a session. */
    userCtx: UserContext;
  }

  /** Schema for a shards object that maps the hash value range for each shard to the array of nodes that contain a copy of that shard. */
  export interface ShardsInformation {
    /** Mapping of shard hash value range to a list of nodes. */
    shards: JsonObject;
  }

  /** Schema for detailed information about throughput capacity with breakdown by specific throughput requests classes. */
  export interface ThroughputInformation {
    /** A number of blocks of throughput units. A block consists of 100 reads/sec, 50 writes/sec, and 5 global
     *  queries/sec of provisioned throughput capacity.
     */
    blocks: number;
    /** Provisioned global queries capacity in operations per second. */
    query: number;
    /** Provisioned reads capacity in operations per second. */
    read: number;
    /** Provisioned writes capacity in operations per second. */
    write: number;
  }

  /** Schema for information about the up state of the server. */
  export interface UpInformation {
    /** seeds. */
    seeds: JsonObject;
    /** status. */
    status: string;
  }

  /** Schema for the user context of a session. */
  export interface UserContext {
    /** Database name in the context of the provided operation. */
    db?: string;
    /** User name. */
    name: string;
    /** List of user roles. */
    roles: string[];
  }

  /** Schema for a set of uuids generated by the server. */
  export interface UuidsResult {
    /** uuids. */
    uuids: string[];
  }

  /** Schema for the results of a queries view operation. */
  export interface ViewQueriesResult {
    /** An array of result objects - one for each query. Each result object contains the same fields as the response
     *  to a regular view request.
     */
    results: ViewResult[];
  }

  /** Schema for a query view operation. */
  export interface ViewQuery {
    /** Parameter to specify whether to include the encoding information in attachment stubs if the particular
     *  attachment is compressed.
     */
    att_encoding_info?: boolean;
    /** Parameter to specify whether to include attachments bodies in a response. */
    attachments?: boolean;
    /** Parameter to specify whether to include a list of conflicted revisions in each returned document. Active
     *  only when `include_docs` is `true`.
     */
    conflicts?: boolean;
    /** Parameter to specify whether to return the documents in descending by key order. */
    descending?: boolean;
    /** Parameter to specify whether to include the full content of the documents in the response. */
    include_docs?: boolean;
    /** Parameter to specify whether the specified end key should be included in the result. */
    inclusive_end?: boolean;
    /** Parameter to specify the number of returned documents to limit the result to. */
    limit?: number;
    /** Parameter to specify the number of records before starting to return the results. */
    skip?: number;
    /** Parameter to specify whether to include in the response an update_seq value indicating the sequence id of
     *  the database the view reflects.
     */
    update_seq?: boolean;
    /** Schema for any JSON type. */
    end_key?: any;
    /** Schema for a document ID. */
    end_key_doc_id?: string;
    /** Parameter to specify whether to group reduced results by key. Valid only if a reduce function defined in the
     *  view. If the view emits key in JSON array format, then it is possible to reduce groups further based on the
     *  number of array elements with the `group_level` parameter.
     */
    group?: boolean;
    /** Parameter to specify a group level to be used. Only applicable if the view uses keys that are JSON arrays.
     *  Implies group is `true`. Group level groups the reduced results by the specified number of array elements. If
     *  unset, results are grouped by the entire array key, returning a reduced value for each complete key.
     */
    group_level?: number;
    /** Schema for any JSON type. */
    key?: any;
    /** Parameter to specify returning only documents that match any of the specified keys. A JSON array of keys
     *  that match the key type emitted by the view function.
     */
    keys?: any[];
    /** Parameter to specify whether to use the reduce function in a map-reduce view. Default is true when a reduce
     *  function is defined.
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
    start_key?: any;
    /** Schema for a document ID. */
    start_key_doc_id?: string;
    /** Parameter to specify whether or not the view in question should be updated prior to responding to the user.
     *
     *  * `true` - Return results after the view is updated.
     *  * `false` - Return results without updating the view.
     *  * `lazy` - Return the view results without waiting for an update, but update them immediately after the request.
     */
    update?: string;
  }

  /** Schema for the result of a query view operation. */
  export interface ViewResult {
    /** Number of total rows. */
    total_rows?: number;
    /** Current update sequence for the database. */
    update_seq?: string;
    /** rows. */
    rows: ViewResultRow[];
  }

  /** Schema for a row of a view result. */
  export interface ViewResultRow {
    /** The cause of the error (if available). */
    caused_by?: string;
    /** The name of the error. */
    error?: string;
    /** The reason the error occurred (if available). */
    reason?: string;
    /** Schema for a document. */
    doc?: Document;
    /** Schema for a document ID. */
    id?: string;
    /** Schema for any JSON type. */
    key: any;
    /** Schema for any JSON type. */
    value: any;
  }
}

export = CloudantV1;
