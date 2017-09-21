# Path of Exile Mods [![Build Status](https://travis-ci.org/eps1lon/poe-mods.svg?branch=master)](https://travis-ci.org/eps1lon/poe-mods) [![Coverage Status](https://coveralls.io/repos/github/eps1lon/poe-mods/badge.svg?branch=master)](https://coveralls.io/github/eps1lon/poe-mods?branch=master)

Reverse engineered behavior of Mods in Path of Exile.

# Install

```bash
$ npm install --save poe-mods
```

# Usage
Flow is supported.
```javascript
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
```

## Immutability
To provide the best support for redux every class is immutable

```javascript
// @flow
declare var item: Item;

item.setRaritiy('magic') === item // false

item.addMod(someMod) === item // false
```