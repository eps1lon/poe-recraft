import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemProps, Rarity } from '../src/item/poe';
import Head from './Head';

import '../src/themes/poe/style.scss';

const magic_greaves: ItemProps = {
  base: {
    name: 'Iron Greaves',
  },
  rarity: Rarity.magic,
  explicits: [{ id: 'Strength1', generation_type: 2, name: 'of Brute' }],
};

storiesOf('magic Iron Greaves', module).add('Head', () => (
  <div className="poe-item magic">
    <Head item={magic_greaves} />
  </div>
));
