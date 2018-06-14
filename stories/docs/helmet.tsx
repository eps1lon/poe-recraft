import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// 'poe-components-item'
import { Popup } from '../../src/';

import '../../themes/poe.scss';

export const helmet: PropsType<typeof Popup>['item'] = {
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
};

storiesOf('ItemPopup', module).add(
  'Helmet',
  withInfo({
    inline: true,
    source: false,
    text: `
    [detailed Item type definition](api/globals.html#item)
    `,
  })(() => <Popup item={helmet} />),
);
storiesOf('ItemPopup', module).add('Helm', () => (
  <Popup
    messages={{
      'poe.popup.aps': 'Attacken pro Sekunde',
      'poe.popup.armour': 'Rüstung',
      'poe.popup.block': 'Block',
      'poe.popup.chaos_damage': 'Chaos Schaden',
      'poe.popup.corrupted': 'Verderbt',
      'poe.popup.crit': 'Kritische Treffer Chance',
      'poe.popup.elemental_damage': 'Elementarschaden',
      'poe.popup.energy_shield': 'Energie Schild',
      'poe.popup.evasion': 'Ausweichwert',
      'poe.popup.physical_damage': 'Physischer Schaden',
      'poe.popup.quality': 'Qualität',
      'poe.popup.range': 'Reichweite',
      'poe.popup.requirements.dex': 'Ges',
      'poe.popup.requirements.int': 'Int',
      'poe.popup.requirements.level': 'Stufe',
      'poe.popup.requirements.str': 'Str',
      'poe.popup.requires': 'Erfordert',
    }}
    item={helmet}
  />
));
