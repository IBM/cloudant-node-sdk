/**
 * © Copyright IBM Corporation 2022, 2024. All Rights Reserved.
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

const core = require('ibm-cloud-sdk-core');
const { testParams } = require('./testParams');
const {
  ChangesFollower,
  Mode,
} = require('../../../cloudant/features/changesFollower.ts');
const CloudantV1 = require('../../../cloudant/v1.ts');
const {
  ChangesParamsHelper,
} = require('../../../cloudant/features/changesParamsHelper.ts');

function getParams(isValid) {
  const validOptions = [];
  for (let i = 0; i < Object.entries(testParams).length; i += 1) {
    const testParam = Object.entries(testParams)[i];
    if (testParam[1].isValid === isValid) {
      validOptions.push(
        JSON.parse(
          `{"${testParam[0]}": ${JSON.stringify(testParam[1].params)}}`
        )
      );
    }
  }
  return validOptions;
}

function getModes() {
  return [Mode.FINITE, Mode.LISTEN];
}

function getStates() {
  const modes = getModes();
  const states = [];
  for (let i = 0; i < modes.length; i += 1) {
    for (let j = 0; j < modes.length; j += 1) {
      states.push({ firstCallMode: i, secondCallMode: j });
    }
  }
  return states;
}

function getModesAndLimits(batchSize = ChangesFollower.BATCH_SIZE) {
  // Use something smaller, equal and larger than batch size.
  // For larger cases make something an exact multiple of batches
  // and something not an exact multiple.
  const limits = [batchSize / 2, batchSize, batchSize * 2, batchSize * 2 + 3];
  const modes = getModes();
  const modesAndLimits = [];
  for (let i = 0; i < modes.length; i += 1) {
    for (let j = 0; j < limits.length; j += 1) {
      modesAndLimits.push({ mode: modes[i], limit: limits[j] });
    }
  }
  return modesAndLimits;
}

const { NoAuthAuthenticator } = core;

function getCloudantServiceOptions() {
  return {
    authenticator: new NoAuthAuthenticator(),
    serviceUrl: 'http://localhost:5984',
  };
}

function getClientWithTimeouts(readTimeout) {
  return new CloudantV1({
    timeout: readTimeout,
    ...getCloudantServiceOptions(),
  });
}

function getClient() {
  return new CloudantV1(getCloudantServiceOptions());
}

function getInvalidTimeoutClients() {
  return [
    getClientWithTimeouts(15000),
    getClientWithTimeouts(30000),
    getClientWithTimeouts(ChangesParamsHelper.LONGPOLL_TIMEOUT),
  ];
}

function getValidTimeoutClients() {
  return [
    getClientWithTimeouts(ChangesParamsHelper.MIN_CLIENT_TIMEOUT),
    getClientWithTimeouts(150000),
  ];
}

const Action = {
  SUCCESS: 'SUCCESS',
  SUPPRESS: 'SUPPRESS',
  THROW: 'THROW',
};

function getSuppressionSequences() {
  const firstAndSecondPlace = [Action.SUCCESS, Action.SUPPRESS];
  const thirdPlace = firstAndSecondPlace.concat([Action.THROW]);
  const sequences = [];
  for (let i = 0; i < firstAndSecondPlace.length; i += 1) {
    for (let j = 0; j < firstAndSecondPlace.length; j += 1) {
      for (let k = 0; k < thirdPlace.length; k += 1) {
        if (
          firstAndSecondPlace[i] !== firstAndSecondPlace[j] ||
          firstAndSecondPlace[i] !== thirdPlace[k]
        ) {
          sequences.push({
            first: firstAndSecondPlace[i],
            second: firstAndSecondPlace[j],
            third: thirdPlace[k],
            all() {
              return [this.first, this.second, this.third];
            },
            toString() {
              return JSON.stringify(this.all());
            },
          });
        }
      }
    }
  }
  return sequences;
}

module.exports = {
  getClient,
  getInvalidTimeoutClients,
  getModes,
  getModesAndLimits,
  getParams,
  getStates,
  getValidTimeoutClients,
  getSuppressionSequences,
  Action,
};
