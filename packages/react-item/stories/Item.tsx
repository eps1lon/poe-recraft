import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Popup } from '../src';

storiesOf('item', module)
  .add('shaped', () => (
    <Popup
      item={{
        base: {
          name: 'Hubris Circlet',
        },
        name: 'Mind Brow',
        rarity: 'rare',
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
          intelligence: {
            value: 154,
          },
        },
        explicitStats: [
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
  ))
  .add('normal', () => (
    <Popup
      item={{
        base: {
          name: 'Hubris Circlet',
        },
        rarity: 'normal',
        energy_shield: {
          value: 200,
          augmented: false,
        },
        quality: 0,
        requirements: {
          level: {
            value: 69,
          },
          intelligence: {
            value: 154,
          },
        },
      }}
    />
  ));
