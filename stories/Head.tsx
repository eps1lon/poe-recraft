import classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Head from '../src/item/popup/head';
import { Type as ModType } from '../src/mod/poe';
import { Item as ItemProps } from '../src/item/poe';
import { Popup } from '../src/item';
import { Item, Rarity } from '../src/item/poe';

const Story: React.SFC<{ item: ItemProps }> = ({ item }) => {
  Popup.assertValidProps(item, console.warn);

  return (
    <div className={classnames('poe-item', Rarity[item.rarity])}>
      <Head item={item} />
    </div>
  );
};

const rare_item: Item = {
  base: {
    name: 'Vaal Regalia',
  },
  name: 'Gale Salvation',
  rarity: Rarity.rare,
  explicits: [
    { type: ModType.prefix, id: 'Sapphire', name: 'Sapphire' },
    {
      type: ModType.prefix,
      id: 'LocalIncreasedEnergyShieldPercentAndStunRecovery3',
      name: "Boggart's",
    },
    {
      type: ModType.prefix,
      id: 'IncreasedEnergyShieldPercent2',
      name: 'Strong-Willed',
    },
    { type: ModType.suffix, id: 'FireResist6', name: 'of the Volcano' },
  ],
};

storiesOf('head', module)
  .add('normal', () => (
    <Story
      item={{
        base: {
          name: 'Full Scale Armour',
        },
        rarity: Rarity.normal,
      }}
    />
  ))
  .add('magic', () => (
    <Story
      item={{
        base: {
          name: 'Blinder',
        },
        rarity: Rarity.magic,
        explicits: [
          {
            id: 'LocalAddedLightningDamage2',
            type: ModType.prefix,
            name: 'Buzzing',
          },
          {
            id: 'LocalIncreasedAttackSpeed3',
            type: ModType.suffix,
            name: 'of Mastery',
          },
        ],
      }}
    />
  ))
  .add('rare', () => <Story item={rare_item} />)
  .add('unique', () => (
    <Story
      item={{
        base: {
          name: 'Paua Amulet',
        },
        name: 'Sidhebreath',
        rarity: Rarity.unique,
        explicits: [
          { type: ModType.unique, id: 'SomeUniqueMod', name: 'Unique' },
        ],
      }}
    />
  ))
  .add('shaped/elder', () => [
    <Story item={{ ...rare_item, shaper: true }} />,
    <Story item={{ ...rare_item, elder: true }} />,
  ]);
