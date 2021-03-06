# Path of Exile Mods
[![Build Status](https://dev.azure.com/silbermannsebastian/poe-recraft/_apis/build/status/eps1lon.poe-recraft?branchName=master)](https://dev.azure.com/silbermannsebastian/poe-recraft/_build/latest?definitionId=7&branchName=master)
[![npm version](https://badge.fury.io/js/poe-mods.svg)](https://badge.fury.io/js/poe-mods)
![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/silbermannsebastian/poe-recraft/7)
[![dependencies Status](https://david-dm.org/eps1lon/poe-mods/status.svg)](https://david-dm.org/eps1lon/poe-mods)
[![devDependencies Status](https://david-dm.org/eps1lon/poe-mods/dev-status.svg)](https://david-dm.org/eps1lon/poe-mods?type=dev)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=eps1lon/poe-recraft)](https://dependabot.com)

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