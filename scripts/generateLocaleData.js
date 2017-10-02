// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const { Grammar, Parser } = require('nearley');

const grammar = Grammar.fromCompiled(
  require('../src/grammars/generated/stat_descriptions.js')
);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const txt_dir = path.join(__dirname, './');
const json_dir = path.join(__dirname, '../locale-data/unprocessed');

readdir(txt_dir).then(files => {
  files.filter(file => file.endsWith('.txt')).forEach(file => {
    const text = fs.readFileSync(path.join(txt_dir, file), {
      encoding: 'utf8'
    });

    const out = fs.createWriteStream(
      path.join(json_dir, path.basename(file, '.txt') + '.json')
    );
    out.write('[\n');

    const regex = /^[ \t]*description/gm;
    let chunk_start = 0;

    while ((token = regex.exec(text)) !== null) {
      const chunk = text.substring(chunk_start, token.index);
      const parser = new Parser(grammar);

      if (chunk !== '') {
        try {
          parser.feed(chunk);
        } catch (err) {
          console.log(file);
          console.log(chunk);
          throw err;
        }

        const [results] = parser.results;

        results.forEach(result => {
          if (chunk_start > 0) {
            out.write(',\n');
          }

          out.write(JSON.stringify(result, null, 2));
        });
      }

      chunk_start = token.index;
    }

    // closing
    out.write('\n]');
    out.end();
  });
});
