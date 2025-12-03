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
const http = require('http');
const fs = require('fs');
const sinon = require('sinon');
const {
  getInfoFromExistingDatabase,
} = require('../examples/src/js/GetInfoFromExistingDatabase.js');
const { createDbAndDoc } = require('../examples/src/js/CreateDbAndDoc.js');
const { updateDoc } = require('../examples/src/js/UpdateDoc.js');
const { deleteDoc } = require('../examples/src/js/DeleteDoc.js');

const setAuthentication = () => {
  process.env.CLOUDANT_AUTH_TYPE = 'noauth';
  process.env.CLOUDANT_URL = process.env.WIREMOCK_URL;
};

function getExpectedJoinedConsoleOutput(filename) {
  return fs.readFileSync(filename, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    return data;
  });
}

describe('Readme integration tests', () => {
  let consoleLogSpy;

  // jest --runInBand should be set to run the test cases in order
  beforeAll(() => {
    const wiremockURL = new URL(process.env.WIREMOCK_URL);
    const request = http.request({
      host: wiremockURL.hostname,
      port: wiremockURL.port,
      path: '/__admin/scenarios/reset',
      method: 'POST',
    });
    const p = new Promise((resolve, reject) => {
      request
        .on('response', (resp) => {
          resolve(resp);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
    request.end();
    setAuthentication();
    return p; // Reset Wiremock states
  });

  beforeEach(() => {
    consoleLogSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleLogSpy.restore();
  });

  it('Create db and doc for the first time', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/CreateDbAndDoc.txt'
    );
    await createDbAndDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map((a) => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Get document from orders database', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/GetInfoFromExistingDatabase.txt'
    );
    await getInfoFromExistingDatabase();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map((a) => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Update doc for the first time', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/UpdateDoc.txt'
    );
    await updateDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map((a) => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Update doc for the second time', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/UpdateDoc2.txt'
    );
    await updateDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map((a) => a.args[0])
      .join('\n');
    expect(consoleOutput).toStrictEqual(expectedJoinedConsoleOutput);
  });

  it('Delete existing doc', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/DeleteDoc.txt'
    );
    await deleteDoc();
    const consoleOutput = consoleLogSpy.getCalls().map((a) => a.args[0]);
    expect(consoleOutput.join('\n')).toBe(expectedJoinedConsoleOutput);
  });

  it('Delete non-existing doc', async () => {
    const expectedJoinedConsoleOutput = getExpectedJoinedConsoleOutput(
      'test/examples/output/DeleteDoc2.txt'
    );
    await deleteDoc();
    const consoleOutput = consoleLogSpy
      .getCalls()
      .map((a) => a.args[0])
      .join('\n');
    expect(consoleOutput).toBe(expectedJoinedConsoleOutput);
  });
});
