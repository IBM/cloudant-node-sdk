/**
 * © Copyright IBM Corporation 2025. All Rights Reserved.
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
  default as CloudantV1,
  Response,
  ViewResult,
  ViewResultRow,
} from '../../v1';
import { KeyPageIterator } from './keyPageIterator';

export abstract class ViewBasePageIterator<
  P extends CloudantV1.PostViewParams | CloudantV1.PostPartitionViewParams,
> extends KeyPageIterator<any, P, ViewResult, ViewResultRow> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: CloudantV1, params: P) {
    super(client, params);
  }

  protected getItems(result: ViewResult): Array<ViewResultRow> {
    return result.rows;
  }
  protected abstract nextRequestFunction(): (
    params: P
  ) => Promise<Response<ViewResult>>;

  protected setNextKeyId(params: P, startKeyDocId: string) {
    params.startKeyDocId = startKeyDocId;
  }

  protected checkBoundary(
    penultimateItem: ViewResultRow,
    lastItem: ViewResultRow
  ) {
    const penultimateId: String = penultimateItem.id;
    const lastId: String = lastItem.id;
    if (penultimateId === lastId) {
      // ID's are the same, check the keys
      const penultimateKey: any = penultimateItem.key;
      const lastKey: any = lastItem.key;
      // Check reference equality first (e.g. null)
      // Then check values
      if (
        penultimateKey === lastKey ||
        (penultimateKey !== null && penultimateKey == lastKey)
      ) {
        // Identical keys, set an error message
        return `Cannot paginate on a boundary containing identical keys '${lastKey}' and document IDs '${lastId}'`;
      }
    }
    return null;
  }
  protected getValidateParamsAbsentErrorMessage(paramName) {
    let errorMsg = super.getValidateParamsAbsentErrorMessage(paramName);
    if (paramName === 'key') {
      errorMsg = `${errorMsg} Use 'start_key' and 'end_key' instead.`;
    }
    return errorMsg;
  }
}
