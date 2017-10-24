# poe-18n [![Build Status](https://travis-ci.org/eps1lon/poe-i18n.svg?branch=master)](https://travis-ci.org/eps1lon/poe-i18n) [![Coverage Status](https://coveralls.io/repos/github/eps1lon/poe-i18n/badge.svg?branch=master)](https://coveralls.io/github/eps1lon/poe-i18n?branch=master) [![npm version](https://badge.fury.io/js/poe-i18n.svg)](https://badge.fury.io/js/poe-i18n)

i18n utility for Path of Exile

## Install
```bash
$ npm install --save poe-i18n
```

## Usage
The package provides translations that are currently support by the game
client. Additional languages can be used but I'm not planning on maintaining languages that I can't parse from the game data.

```javascript
import { format } from 'poe-i18n';
import stat_descriptions from 'poe-i18n/locale-data/en/stat_descriptions.json'

format.configure({ datas: { stat_descriptions } });

const merciless_translation = format.stats(
  [{ id: 'physical_damage_+%', value: 150 }]
);

console.log(merciless_translation); // ['+150% increased Physical Damage']
```

## Documentation
- [API](docs/api.md)
- [changelog](CHANGELOG.md)

## License
MIT