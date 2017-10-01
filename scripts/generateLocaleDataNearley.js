// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const { Grammar, Parser } = require('nearley');
const path = require('path');

const grammar = require('./stat_descriptions.js');

const readFile = promisify(fs.readFile);

const parser = new Parser(Grammar.fromCompiled(grammar));

readFile(
  path.join(__dirname, './tmp/StatDescriptions/stat_descriptions_dev.txt'),
  {
    encoding: 'utf-8'
  }
)
  .then(text => {
    console.log(typeof text);
    parser.feed(text);

    console.log(JSON.stringify(parser.results, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
