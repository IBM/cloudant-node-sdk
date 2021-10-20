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

'use strict';

const fs = require('fs');
const dotenv = require('dotenv');

// this variable will either hold the normal `describe` method from `jest`
// or will be an alias for `describe.skip` from `jest` (skipping all tests)
let describeToUse;

// this variable holds the name of the file passed into prepareTests.
let configFilename;

let configFileExists;

// `filename` is the location of the credentials file
// returns the appropriate "describe" to be used for the tests.
module.exports.prepareTests = (filename) => {
  // Save off the name of the config file.
  configFilename = filename;

  // set the filepath as an environment variable so that the
  // service factory can find it.
  process.env.IBM_CREDENTIALS_FILE = filename;

  configFileExists = fs.existsSync(filename);

  if (configFileExists) {
    describeToUse = describe;
  } else {
    describeToUse = describe.skip.bind(describe);
    describeToUse.skip = describeToUse;
  }

  return describeToUse;
};

module.exports.getDescribe = () => describeToUse;

// This function will load the contents of "configFilename" and
// set the properties as environment variables.
module.exports.loadEnv = () => {
  if (configFileExists) {
    dotenv.config({ path: configFilename });
  }
};

// This function will load the contents of "configFilename" and return the
// property/value pairs in an object.
module.exports.loadConfig = () => {
  if (configFileExists) {
    return dotenv.parse(fs.readFileSync(configFilename));
  }
  return {};
};
