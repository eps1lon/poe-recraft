# poe-18n 
[![Build Status](https://dev.azure.com/silbermannsebastian/poe-recraft/_apis/build/status/eps1lon.poe-recraft?branchName=master)](https://dev.azure.com/silbermannsebastian/poe-recraft/_build/latest?definitionId=7&branchName=master)
![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/silbermannsebastian/poe-recraft/7)
[![npm version](https://badge.fury.io/js/poe-i18n.svg)](https://badge.fury.io/js/poe-i18n)
[![dependencies Status](https://david-dm.org/eps1lon/poe-i18n/status.svg)](https://david-dm.org/eps1lon/poe-i18n)
[![devDependencies Status](https://david-dm.org/eps1lon/poe-i18n/dev-status.svg)](https://david-dm.org/eps1lon/poe-i18n?type=dev)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=eps1lon/poe-recraft)](https://dependabot.com)

i18n utility for Path of Exile@`3.3.0` with minimal dependencies.

## Install
```bash
$ npm install --save poe-i18n
```

## Usage
The package provides translations that are currently support by the game
client. Additional languages can be used but I'm not planning on maintaining languages that I can't parse from the game data.

```typescript
import { formatStats } from 'poe-i18n';
import stat_descriptions from 'poe-i18n/locale-data/en/stat_descriptions.json'

const merciless_translation: string[] = formatStats(
  [{ id: 'physical_damage_+%', value: 150 }],
  { datas: { stat_descriptions } }
);

console.log(merciless_translation); // ['+150% increased Physical Damage']
```

## Documentation
- [API](docs/api.md)
- [changelog](CHANGELOG.md)

## License
MIT