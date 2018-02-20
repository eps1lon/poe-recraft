import * as React from 'react';
import { storiesOf } from '@storybook/react';
const stat_descriptions = require('poe-i18n/locale-data/en/stat_descriptions.json');

import { Item, Rarity, Type } from '../src/item/poe';
import { Type as ModType, Group as ModGroup } from '../src/mod/poe';

import { Popup } from '../src';

storiesOf('item', module).add('shaped', () => (
  <Popup
    translations={{ stat_descriptions }}
    item={{
      base: {
        name: 'Hubris Circlet',
      },
      name: 'Mind Brow',
      type: Type.armour,
      rarity: Rarity.rare,
      energy_shield: {
        value: 200,
        augmented: true,
      },
      quality: 6,
      shaper: true,
      requirements: {
        level: {
          value: 69,
        },
        inteliligence: {
          value: 154,
        },
      },
      explicits: [
        'Place an additional Mine',
        'Socketed Gems are Supported by Level 18 Remote Mine',
        '16% increased Effect of Chill',
        'Socketed Gems are Supported by Level 18 Hypothermia',
        '+1 to Level of Socketed Minion Gems',
        '+67 to maximum Life',
        '18% increased Stun and Block Recovery',
        'Adds 5 to 89 Lightning Damage to Spells',
      ],
    }}
  />
));
