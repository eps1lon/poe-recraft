const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(child_process.exec);

const grammar_dir = path.join(__dirname, '../src/grammars');
const grammar_ext = '.ne';

const isGrammar = file => file.endsWith(grammar_ext);

fs
  .readdirSync(grammar_dir)
  .filter(isGrammar)
  .forEach(file => {
    const grammar_file = path.join(grammar_dir, file);
    const out_file = path.join(
      grammar_dir,
      'generated',
      path.basename(file, grammar_ext) + '.js'
    );

    const cmd =
      path.join(__dirname, '../node_modules/.bin/nearleyc') +
      ' ' +
      grammar_file +
      ' -o ' +
      out_file;

    exec(cmd).then(() => console.log('done', file));
  });
