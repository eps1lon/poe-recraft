import * as React from 'react';
import { formatStats } from 'poe-i18n';
// 'poe-components-item'
import { Popup, Rarity, ModType, ItemType } from '../../src/';

const story = () => (
  <Popup
    item={{
      base: {
        name: 'Hubris Circlet',
      },
      name: 'Mind Brow',
      type: ItemType.armour,
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
);

export default story;
