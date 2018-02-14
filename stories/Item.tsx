import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemProps, Rarity } from '../src/item/poe';
import Head from './Head';

const magic_greaves: ItemProps = {
  base: {
    name: 'Iron Greaves',
  },
  rarity: Rarity.magic,
};

storiesOf('magic Iron Greaves', module).add('Head', () => (
  <Head item={magic_greaves} />
));
