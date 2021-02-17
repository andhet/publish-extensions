/********************************************************************************
 * Copyright (c) 2020 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

// @ts-check
const fs = require('fs');
const ovsx = require('ovsx');
const path = require('path');
const util = require('util');
const semver = require('semver');
const download = require('download');
const exec = require('./lib/exec');
const readFile = util.promisify(fs.readFile);
//const repoDir = '/home/runner/repository';
//const downloadDir = '/home/runner/download';
const repoDir = '/tmp/repository';
const downloadDir = '/tmp/download';
const extensionRepository = 'https://github.com/qjebbs/vscode-plantuml.git';

(async () => {
  await exec(`git clone --recurse-submodules ${extensionRepository} ${repoDir}`);

  await exec('npm install', { cwd: repoDir });
  await exec('npm run compile', { cwd: repoDir });
 
})();
