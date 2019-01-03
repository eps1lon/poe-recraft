const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const grammar_dir = path.join(__dirname, '../src/grammars');
const grammar_ext = '.ne';

const isGrammar = file => file.endsWith(grammar_ext);

fs
  .readdirSync(grammar_dir)
  .filter(isGrammar)
  .forEach(file => {
    const grammar_file = path.join(grammar_dir, file);

    fs.watchFile(grammar_file, () => {
      exec('yarn run compile-grammars');
    });
  });
