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
const {
  getInfoFromExistingDatabase,
} = require('../examples/src/js/GetInfoFromExistingDatabase.js');
const { createDbAndDoc } = require('../examples/src/js/CreateDbAndDoc.js');
const { updateDoc } = require('../examples/src/js/UpdateDoc.js');
const { deleteDoc } = require('../examples/src/js/DeleteDoc.js');

const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http'); // workaround from https://stackoverflow.com/a/57320262

const fs = require('fs');
const sinon = require('sinon');

const setAuthentication = () => {
  process.env.CLOUDANT_AUTH_TYPE = 'basic';
  process.env.CLOUDANT_USERNAME = 'admin';
  process.env.CLOUDANT_PASSWORD = 'pass';
  process.env.CLOUDANT_URL = process.env.WIREMOCK_URL;

  process.env.EXAMPLES_AUTH_TYPE = 'noauth';
  process.env.EXAMPLES_URL = process.env.WIREMOCK_URL;
};

describe('Readme integration tests', () => {
  let consoleLogSpy;

  // jest --runInBand should be set to run the test cases in order
  beforeAll(async () => {
    await axios.post(process.env.WIREMOCK_URL + '/__admin/scenarios/reset'); // Reset Wiremock states
    setAuthentication();
  });

  beforeEach(() => {
    consoleLogSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleLogSpy.restore();
  });

  it('Get document from example database', async () => {
    const expectedJoinedConsoleOutput = fs.readFileSync(
      'test/examples/output/GetInfoFromExistingDatabase.txt',
      'utf8',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        return data;
      }
    );
    await getInfoFromExistingDatabase();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Create db and doc for the first time', async () => {
    const expectedJoinedConsoleOutput = fs.readFileSync(
      'test/examples/output/CreateDbAndDoc.txt',
      'utf8',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        return data;
      }
    );
    await createDbAndDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Create db and doc for the second time', async () => {
    const expectedJoinedConsoleOutput = fs.readFileSync(
      'test/examples/output/CreateDbAndDoc2.txt',
      'utf8',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        return data;
      }
    );
    await createDbAndDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Update doc for the first time', async () => {
    const expectedJoinedConsoleOutput = fs.readFileSync(
      'test/examples/output/UpdateDoc2.txt',
      'utf8',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        return data;
      }
    );
    await updateDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Update doc for the second time', async () => {
    const expectedJoinedConsoleOutput = fs.readFileSync(
      'test/examples/output/UpdateDoc3.txt',
      'utf8',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        return data;
      }
    );
    await updateDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Delete existing doc', async () => {
    await deleteDoc();
    const consoleOutput = consoleLogSpy.getCalls().map(a => a.args[0]);
    expect(consoleOutput.join('\n')).toBe('You have deleted the document.');
  });

  it('Delete non-existing doc', async () => {
    await deleteDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map(a => a.args[0])
      .join('\n');
    expect(consoleOutput).toBe(
      'Cannot delete document because either "orders" database or the "example" document was not found.'
    );
  });
});
