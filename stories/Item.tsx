import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Item, Rarity } from '../src/item/poe';
import { Type as ModType } from '../src/mod/poe';

import Head from './Head';
import Properties from './Properties';

import '../src/themes/poe/style.scss';

const normal_item: Item = {
  base: {
    name: 'Full Scale Armour',
  },
  rarity: Rarity.normal,
};

const magic_item: Item = {
  base: {
    name: 'Blinder',
  },
  rarity: Rarity.magic,
  explicits: [
    { id: 'LocalAddedLightningDamage2', type: ModType.prefix, name: 'Buzzing' },
    {
      id: 'LocalIncreasedAttackSpeed3',
      type: ModType.suffix,
      name: 'of Mastery',
    },
  ],
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

const unique_item: Item = {
  base: {
    name: 'Paua Amulet',
  },
  name: 'Sidhebreath',
  rarity: Rarity.rare,
  explicits: [{ type: ModType.unique, id: 'SomeUniqueMod', name: 'Unique' }],
};

const elder_item: Item = { ...magic_item, elder: true };
const shaped: Item = { ...rare_item, shaper: true };

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

storiesOf('properties', module)
  .add('shield armour', () => (
    <Properties
      rarity="rare"
      properties={{ kind: 'armour', armour: { value: 1 }, block: { value: 3 } }}
    />
  ))
  .add('sacrifical garb', () => (
    <Properties
      rarity="rare"
      properties={{
        kind: 'armour',
        armour: { value: 100, augmented: true },
        energy_shield: { value: 10, augmented: true },
        evasion: { value: 50.5, augmented: true },
      }}
    />
  ));
