# Path of Exile Mods
[![Build Status](https://travis-ci.org/eps1lon/poe-mods.svg?branch=master)](https://travis-ci.org/eps1lon/poe-mods) [![Coverage Status](https://coveralls.io/repos/github/eps1lon/poe-mods/badge.svg?branch=master)](https://coveralls.io/github/eps1lon/poe-mods?branch=master)
[![dependencies Status](https://david-dm.org/eps1lon/poe-mods/status.svg)](https://david-dm.org/eps1lon/poe-mods)
[![devDependencies Status](https://david-dm.org/eps1lon/poe-mods/dev-status.svg)](https://david-dm.org/eps1lon/poe-mods?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/eps1lon/poe-mods.svg)](https://greenkeeper.io/)

Emulates interaction of Mods with Items, Atlas etc. in Path of Exile.

# Install

```bash
$ npm install --save poe-mods
```

# Usage
Flow is supported.
```javascript
import { createItems, createMods, Transmute } from 'poe-mods';

// data has to be provided. see eps1lon/poedb
Promise.all([
  fetch('/items.json')
    .then(body => body.json())
    .then(props => createItems(props))
    .then(items => {
      return items.from(item => {
        return item.name === 'Iron Greaves';
      });
    }),
  fetch('/mods.json')
    .then(body => body.json())
    .then(props => createMods(props))
    .then(mods => Transmute.build(mods.all())),
]).then(([greaves, transmute]) => {
  console.log(transmute.modsFor(greaves).map(({ mod }) => mod)); // => GeneratorDetails[]
  console.log(transmute.applyTo(greaves)); // => Item
});
```

## Immutability
To provide the best support for redux every class is immutable

```javascript
// @flow
declare var item: Item;

item.setRaritiy('magic') === item // false

item.addMod(someMod) === item // false
```