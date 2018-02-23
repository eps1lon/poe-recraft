import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MenuLink } from '@storybook/components';
import { withInfo } from '@storybook/addon-info';

import { Item, Rarity, Type } from '../../src/item/poe';
import { Type as ModType, Group as ModGroup } from '../../src/mod/poe';

import { Popup } from '../../src';
import '../../themes/poe.scss';

const ItemTypeDefinition = () => (
  <div style={{ marginTop: '10px' }}>
    <MenuLink style={{ fontSize: '1.3em' }} href="/docs/api/globals.html#item">
      <strong>detailed Item type definition</strong>
    </MenuLink>
  </div>
);

storiesOf('ItemPopup', module).add(
  'Helmet',
  withInfo({
    inline: true,
    source: false,
  })(() => (
    <>
      <Popup
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
      <ItemTypeDefinition />
    </>
  )),
);
