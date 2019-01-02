// creates filtered snapshots of data/*json
const fs = require('fs');
const path = require('path');

const { Item, Mod } = require('../dist/cjs');

const all_filters = {
  // [file: string]: Filters[]
  items: {
    build: () => require('../data/items.json').map(props => Item.build(props)),
    filters: [
      { file: 'equipment', fn: item => item.meta_data.isA('Equipment') },
    ],
    serialize: item => item.baseitem,
  },
  mods: {
    build: () => require('../data/mods.json').map(props => new Mod(props)),
    filters: [
      { file: 'prefixes', fn: mod => mod.isPrefix() },
      { file: 'suffixes', fn: mod => mod.isSuffix() },
    ],
    serialize: mod => mod.props,
  },
};

const data_path = path.join(__dirname, '../data');

for (const [all_file, { build, filters, serialize }] of Object.entries(
  all_filters,
)) {
  const output_path = path.join(data_path, all_file);
  const all = build();

  for (const filter of filters) {
    const filtered = all.filter(filter.fn);
    fs.writeFileSync(
      path.join(output_path, `${filter.file}.json`),
      JSON.stringify(filtered.map(serialize), undefined, 2),
    );
  }
}
