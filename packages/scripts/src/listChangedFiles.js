// fork off https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const execFileSync = require('child_process').execFileSync;

const exec = (command, args) => {
  console.log('> ' + [command].concat(args).join(' '));
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return execFileSync(command, args, options);
};

const execGitCmd = args =>
  exec('git', args)
    .trim()
    .toString()
    .split('\n');

const listChangedFiles = () => {
  const mergeBase = execGitCmd(['merge-base', 'HEAD', 'master']);
  return new Set([
    ...execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
    ...execGitCmd(['ls-files', '--others', '--exclude-standard']),
  ]);
};

module.exports = listChangedFiles;