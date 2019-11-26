import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// 'poe-components-item'
import { Popup, PopupProps } from '../../src/';

import '../../themes/poe.scss';

export const helmet: PopupProps['item'] = {
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

storiesOf('ItemPopup', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      source: false,
      text: `
  [detailed Item type definition](api/globals.html#item)
  `,
    },
  })
  .add('Helmet', (props: any) => <Popup item={helmet} />);
storiesOf('ItemPopup', module).add('Helm', () => (
  <Popup
    messages={{
      'poe.api.Attacks per Second': 'Attacken pro Sekunde',
      'poe.api.Armour': 'Rüstung',
      'poe.api.Block': 'Block',
      'poe.api.Chaos Damage': 'Chaos Schaden',
      'poe.api.Corrupted': 'Verderbt',
      'poe.api.Critical Strike Chance': 'Kritische Treffer Chance',
      'poe.api.Elemental Damage': 'Elementarschaden',
      'poe.api.Energy Shield': 'Energie Schild',
      'poe.api.Evasion': 'Ausweichwert',
      'poe.api.Physical Damage': 'Physischer Schaden',
      'poe.api.Quality': 'Qualität',
      'poe.api.Weapon Range': 'Reichweite',
      'poe.api.Dex': 'Ges',
      'poe.api.Int': 'Int',
      'poe.api.Level': 'Stufe',
      'poe.api.Str': 'Str',
      'poe.api.Requires': 'Erfordert',
    }}
    item={helmet}
  />
));
