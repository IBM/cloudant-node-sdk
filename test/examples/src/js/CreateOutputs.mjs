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

/**
 * Run this script from the root folder to regenerate outputs of example codes.
 */

import { writeFile } from 'node:fs';

import { getInfoFromExistingDatabase } from './GetInfoFromExistingDatabase';
import { createDbAndDoc } from './CreateDbAndDoc';
import { updateDoc } from './UpdateDoc';
import { deleteDoc } from './DeleteDoc';

let consoleOutput = ''; // flush consoleOutput
const mockedLog = (output) => {
  consoleOutput = `${consoleOutput}\n${output}`;
};
global.console.log = mockedLog; // Mock console.log

const run = async () => {
  await createDbAndDoc();

  writeFile(
    'test/examples/output/CreateDbAndDoc.txt',
    consoleOutput.trim(),
    (err) => {
      if (err) throw err;
    }
  );

  consoleOutput = ''; // flush consoleOutput

  await getInfoFromExistingDatabase();

  writeFile(
    'test/examples/output/GetInfoFromExistingDatabase.txt',
    consoleOutput.trim(),
    (err) => {
      if (err) throw err;
    }
  );

  consoleOutput = ''; // flush consoleOutput

  await updateDoc();

  writeFile(
    'test/examples/output/UpdateDoc.txt',
    consoleOutput.trim(),
    (err) => {
      if (err) throw err;
    }
  );

  consoleOutput = ''; // flush consoleOutput

  await deleteDoc();

  writeFile(
    'test/examples/output/DeleteDoc.txt',
    consoleOutput.trim(),
    (err) => {
      if (err) throw err;
    }
  );
};

run();
