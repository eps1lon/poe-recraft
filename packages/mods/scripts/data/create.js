// used to generate files in data/
const path = require('path');
const createMods = require('./createMods');
const createItems = require('./createItems');
const createAtlas = require('./createAtlas');
const createEssences = require('./createEssences');
const createCraftingBenchOptions = require('./createCraftingBenchOptions');

const DATA_DIR = path.join(__dirname, '../../data');

console.time('done');

console.time('mods');
const mods = createMods.run(DATA_DIR).then(() => console.timeEnd('mods'));

console.time('items');
const items = createItems.run(DATA_DIR).then(() => console.timeEnd('items'));

console.time('atlas');
const atlas = createAtlas.run(DATA_DIR).then(() => console.timeEnd('atlas'));

console.time('craftinbenchoptions');
const craftinbenchoptions = createCraftingBenchOptions
  .run(DATA_DIR)
  .then(() => console.timeEnd('craftinbenchoptions'));

console.time('essences');
const essences = createEssences
  .run(DATA_DIR)
  .then(() => console.timeEnd('essences'));

Promise.all([ mods, items, atlas, craftinbenchoptions, essences]).then(
  () => console.timeEnd('done'),
);
