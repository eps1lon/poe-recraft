import { Transmute } from 'poe-mods';
import { Transmute } from 'poe-mods';

// data has to be provided. see eps1lon/poedb
const items = require('./items.json');
const mods = require('./mods.json');

const greaves = Item.build(items.find(mod => mod.name === 'Iron Greaves'));

const transmute = Transmute.build(mods);

console.log(transmute.modsFor(greaves).map(({ mod }) => mod));
console.log(transmute.applyTo(greaves));
