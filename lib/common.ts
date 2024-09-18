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

import { platform, release, arch } from 'node:os';
import { version } from '../package.json';

export type SdkHeaders = {
  'User-Agent': string;
  'X-IBMCloud-SDK-Analytics': string;
};

/**
 * Get the request headers to be sent in requests by the SDK.
 */
export function getSdkHeaders(
  serviceName: string,
  serviceVersion: string,
  operationId: string
): SdkHeaders | {} {
  const sdkName = 'cloudant-node-sdk';
  const sdkVersion = version;
  const osName = platform();
  const osVersion = release();
  const osArch = arch();
  const nodeVersion = process.version;

  const headers = {
    'User-Agent': `${sdkName}/${sdkVersion} (node.version=${nodeVersion}; os.name=${osName}; os.version=${osVersion}; os.arch=${osArch}; lang=Node.js;)`,
    'X-IBMCloud-SDK-Analytics': `service_name=${serviceName};service_version=${serviceVersion};operation_id=${operationId}`,
  };

  return headers;
}
