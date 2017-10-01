// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const { Grammar, Parser } = require('nearley');
const path = require('path');

const grammar = require('../src/grammars/generated/stat_descriptions.js');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const parser = new Parser(Grammar.fromCompiled(grammar));

const txt_dir = path.join(__dirname, './');
const json_dir = path.join(__dirname, '../locale-data/json');

const file = path.join(__dirname, './stat_descriptions_dev.txt');

readdir(txt_dir).then(files => {
  return Promise.all(
    files.filter(file => file.endsWith('.txt')).map(file => {
      return readFile(path.join(txt_dir, file), { encoding: 'utf-8' })
        .then(text => {
          parser.feed(text);

          console.log(JSON.stringify(parser.results, null, 2));
          return writeFile(
            path.join(json_dir, path.basename(file, '.txt') + '.json'),
            JSON.stringify(parser.results[0], null, 2)
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
});
