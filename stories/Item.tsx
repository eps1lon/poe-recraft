import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemProps, Rarity } from '../src/item/poe';
import Head from './Head';

import '../src/themes/poe/style.scss';

const magic_greaves: ItemProps = {
  base: {
    name: 'Blinder',
  },
  rarity: Rarity.magic,
  explicits: [
    { id: 'LocalAddedLightningDamage2', generation_type: 1, name: 'Buzzing' },
    {
      id: 'LocalIncreasedAttackSpeed3',
      generation_type: 2,
      name: 'of Mastery',
    },
  ],
};

storiesOf('magic item', module).add('Head', () => (
  <div className="poe-item magic">
    <Head item={magic_greaves} />
  </div>
));
