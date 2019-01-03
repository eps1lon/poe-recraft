const path = require('path');
const fs = require('fs');

const isDescription = file => file.endsWith('stat_descriptions.json');

const locale_dir = path.join(__dirname, '../locale-data/en');
const out_file = path.join(
  __dirname,
  '../src/translate/descriptions_dependency.ts'
);

const dependencies = fs.readdirSync(locale_dir).reduce((dependencies, file) => {
  if (isDescription(file)) {
    const { meta: { include } } = require(path.join(locale_dir, file));

    dependencies[path.basename(file, '.json')] = include;
  }
  return dependencies;
}, {});

fs.writeFileSync(out_file, JSON.stringify(dependencies));
