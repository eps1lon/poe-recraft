import { Item } from 'poe-mods/containers';
import { Transmute } from 'poe-mods';

// data has to be provided. see eps1lon/poedb
const items = require('./items.json');
const meta_datas = require('./meta_data.json');
const mods = require('./mods.json');

const greaves = Item.build(
  items.find(mod => mod.name === 'Iron Greaves'),
  meta_datas,
);

const transmute = Transmute.build(mods);

console.log(transmute.modsFor(greaves).map(({ mod }) => mod));
console.log(transmute.applyTo(greaves));
