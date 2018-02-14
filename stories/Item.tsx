import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemProps, Rarity } from '../src/item/poe';
import Head from './Head';

import '../src/themes/poe/style.scss';

const normal_item: ItemProps = {
  base: {
    name: 'Full Scale Armour',
  },
  rarity: Rarity.normal,
};

const magic_item: ItemProps = {
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

const rare_item: ItemProps = {
  base: {
    name: 'Vaal Regalia',
  },
  name: 'Gale Salvation',
  rarity: Rarity.rare,
  explicits: [
    { generation_type: 1, id: 'Sapphire', name: 'Sapphire' },
    {
      generation_type: 1,
      id: 'LocalIncreasedEnergyShieldPercentAndStunRecovery3',
      name: "Boggart's",
    },
    {
      generation_type: 1,
      id: 'IncreasedEnergyShieldPercent2',
      name: 'Strong-Willed',
    },
    { generation_type: 2, id: 'FireResist6', name: 'of the Volcano' },
  ],
};

const unique_item: ItemProps = {
  base: {
    name: 'Paua Amulet',
  },
  name: 'Sidhebreath',
  rarity: Rarity.rare,
  explicits: [{ generation_type: 3, id: 'SomeUniqueMod', name: 'Unique' }],
};

const elder_item: ItemProps = { ...magic_item, elder: true };
const shaped: ItemProps = { ...rare_item, shaper: true };

const head_stories = storiesOf('head', module);

// normal item
head_stories.add('normal', () => (
  <div className="poe-item normal">
    <Head item={normal_item} />
  </div>
));

// magic item
head_stories.add('magic', () => (
  <div className="poe-item magic">
    <Head item={magic_item} />
  </div>
));

// rare item
head_stories.add('rare', () => (
  <div className="poe-item rare">
    <Head item={rare_item} />
  </div>
));

// unique item
head_stories.add('unique', () => (
  <div className="poe-item unique">
    <Head item={unique_item} />
  </div>
));

// shaped/elder
head_stories.add('shaped/elder', () => [
  <div key="elder" className="poe-item magic">
    <Head item={elder_item} />
  </div>,
  <div key="shaped" className="poe-item rare">
    <Head item={shaped} />
  </div>,
]);
