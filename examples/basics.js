import { Transmute } from 'poe-mods';
import { tables } from 'poe-mods/util';

// data has to be provided. see eps1lon/poedb
const items = tables.createItems(require('./items.json'));
const mods = tables.createMods(require('./mods.json'));

const greaves = items.find(mod => mod.name === 'Iron Greaves');

const transmute = Transmute.build(mods.all());

console.log(transmute.modsFor(greaves).map(({ mod }) => mod)); // => GeneratorDetails[]
console.log(transmute.applyTo(greaves)); // => Item
