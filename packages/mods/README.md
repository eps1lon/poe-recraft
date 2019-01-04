# Path of Exile Mods
[![Build Status](https://travis-ci.org/eps1lon/poe-mods.svg?branch=master)](https://travis-ci.org/eps1lon/poe-mods) 
[![npm version](https://badge.fury.io/js/poe-mods.svg)](https://badge.fury.io/js/poe-mods)
[![Coverage Status](https://coveralls.io/repos/github/eps1lon/poe-mods/badge.svg?branch=master)](https://coveralls.io/github/eps1lon/poe-mods?branch=master)
[![dependencies Status](https://david-dm.org/eps1lon/poe-mods/status.svg)](https://david-dm.org/eps1lon/poe-mods)
[![devDependencies Status](https://david-dm.org/eps1lon/poe-mods/dev-status.svg)](https://david-dm.org/eps1lon/poe-mods?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/eps1lon/poe-mods.svg)](https://greenkeeper.io/)

Emulates interaction of Mods with Items, Atlas etc. in Path of Exile@`3.3.0`.

# Install

```bash
$ npm install --save poe-mods
```

# Usage
Typescript is supported.
```typescript
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

## Data
Data for for the [`create*`](https://github.com/eps1lon/poe-mods/blob/master/src/helpers/createTables.ts)
helpers can be imported from [`poe-mods/data/`](https://github.com/eps1lon/poe-mods/tree/master/data).

If you want to use the data somewhere else you can use 
https://unpkg.com/poe-mods@/data/. The data provided by unpkg supports compression. 
## Immutability
To provide the best support for redux every class is immutable.

```typescript
declare var item: Item;

item.setRaritiy('magic') === item // false

item.addMod(someMod) === item // false
```

# Documentation
- [API](https://eps1lon.github.io/poe-mods/)
- [changelog](CHANGELOG.md)

# Contributing
Issue reports and pull requests are always welcome.

When you contribute code please make sure that it passes
the test, lint and format checks. Pull requests should be made against
the master branch and Travis will inform you wheather all checks have
passed.

# License
MIT