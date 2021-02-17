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


const extensions = ['https://github.com/qjebbs/vscode-plantuml.git','https://github.com/fabiospampinato/vscode-highlight'];

(async () => 
{  
  for (const extension of extensions) 
  {
    try {
      await exec(`git clone --recurse-submodules ${extension} ${repoDir}`);
      
      await exec('npm install', { cwd: repoDir });
      var out = await exec('npm -ddd run compile', { cwd: repoDir });
      console.log(out.stdout);
      console.log(out.stderr);  
    } 
    catch(err)
    {
      console.error(`error: ${err}`);
    } 
    finally 
    {
      exec (`rm -rfv ${repoDir} ${downloadDir}`);
    }
  }
})();
