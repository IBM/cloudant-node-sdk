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

import CloudantV1, { AllDocsResult, DocsResultRow, Response } from '../../v1';
import { KeyPageIterator } from './keyPageIterator';

export abstract class AllDocsBasePageIterator<
  P extends
    | CloudantV1.PostAllDocsParams
    | CloudantV1.PostPartitionAllDocsParams
    | CloudantV1.PostDesignDocsParams,
> extends KeyPageIterator<string, P, AllDocsResult, DocsResultRow> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: CloudantV1, params: P) {
    super(client, params);
  }

  /**
   * Setting start key doc ID is a no-op for all_docs based paging where
   * key is the same as id.
   */
  protected override setNextKeyId(params: P, startKeyDocId: string) {
    return;
  }

  protected override getItems(result: AllDocsResult): Array<DocsResultRow> {
    return result.rows;
  }
  protected abstract nextRequestFunction(): (
    params: P
  ) => Promise<Response<AllDocsResult>>;

  protected override checkBoundary(
    penultimateItem: DocsResultRow,
    lastItem: DocsResultRow
  ) {
    return null;
  }

  protected getValidateParamsAbsentErrorMessage(paramName) {
    let errorMsg = super.getValidateParamsAbsentErrorMessage(paramName);
    if (paramName === 'key') {
      errorMsg = `${errorMsg} No need to paginate as 'key' returns a single result for an ID.`;
    }
    return errorMsg;
  }
}
