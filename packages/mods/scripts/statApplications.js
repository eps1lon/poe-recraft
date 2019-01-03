const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const mods = require('../src/__fixtures__/mods.json');

const applications = {};

const modFilter = mod =>
  // item prefixes, suffixes, corruptions
  ([1, 2, 5].includes(mod.generation_type) && mod.domain === 1) ||
  // pre generated implicits
  (mod.generation_type === 3 && /Implicit/.test(mod.name)) ||
  // mastermods non legacy
  (mod.domain === 10 && mod.name !== '');

mods.filter(modFilter).forEach(mod => {
  mod.stats.forEach(({ id }) => {
    if (!applications[id]) {
      let type = 'flat';
      if (/_\+%$/.test(id)) {
        type = 'inc';
      } else if (/_final$/.test(id)) {
        type = 'more';
      }

      applications[id] = {
        classification: [],
        type,
      };
    }
  });
});

const sortedByKey = _.fromPairs(
  _.toPairs(applications).sort((a, b) => a[0].localeCompare(b[0])),
);

fs.writeFileSync(
  path.join(__dirname, '../src/calculator/stat_applications.json'),
  JSON.stringify(sortedByKey, null, 2),
);
