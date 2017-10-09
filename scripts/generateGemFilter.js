// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { Grammar, Parser } = require('nearley');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const grammar = Grammar.fromCompiled(
  require('../src/grammars/generated/skillpopup_stat_filters.js')
);

const txt_file = path.join(
  __dirname,
  '../tmp/raw',
  'skillpopup_stat_filters.txt'
);
const json_file = path.join(__dirname, '../src/translate', 'gem_filter.json');

const raw = fs.readFileSync(txt_file, { encoding: 'utf8' });

readFile(txt_file, { encoding: 'utf8' })
  .then(raw => {
    const parser = new Parser(grammar);
    parser.feed(raw);
    const [results] = parser.results;

    // process
    const filter = results.reduce(
      (partial, expression) => {
        if (expression.type === 'group') {
          partial.groups[expression.id] = expression.stats;
        } else if (expression.type === 'filter') {
          partial.filters[expression.id] = {
            filter: expression.stats,
            start_file: path.basename(expression.start_file, '.txt')
          };
        } else if (expression.type === 'copy') {
          partial.filters[expression.target] = expression.source;
        } else {
          console.warn(expression);
          throw new Error('unrecognized expression');
        }

        return partial;
      },
      { groups: {}, filters: {} }
    );

    return writeFile(json_file, JSON.stringify(filter));
  })
  .then(() => console.log(`generate ${json_file}`));
