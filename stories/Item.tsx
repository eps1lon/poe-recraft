import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Item, Rarity } from '../src/item/poe';
import { Type as ModType, Group as ModGroup } from '../src/mod/poe';

import Head from './Head';
import Properties from './Properties';
import Requirements from './Requirements';
import Stats from './Stats';

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

storiesOf('head', module)
  .add('normal', () => (
    <div className="poe-item normal">
      <Head item={normal_item} />
    </div>
  ))
  .add('magic', () => (
    <div className="poe-item magic">
      <Head item={magic_item} />
    </div>
  ))
  .add('rare', () => (
    <div className="poe-item rare">
      <Head item={rare_item} />
    </div>
  ))
  .add('unique', () => (
    <div className="poe-item unique">
      <Head item={unique_item} />
    </div>
  ))
  .add('shaped/elder', () => [
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
        quality: 5,
        kind: 'armour',
        armour: { value: 100, augmented: true },
        energy_shield: { value: 10, augmented: true },
        evasion: { value: 50.5, augmented: true },
      }}
    />
  ))
  .add('dagger', () => (
    <Properties
      rarity="rare"
      properties={{
        quality: 5,
        kind: 'weapon',
        physical_damage: {
          value: 6,
          augmented: true,
        },
        cold_damage: [10, 13],
        fire_damage: 4,
        lightning_damage: [1, 400],
        attack_time: {
          value: 750,
        },
        crit: {
          value: 750,
          augmented: true,
        },
      }}
    />
  ))
  .add('claw', () => (
    <Properties
      rarity="rare"
      properties={{
        kind: 'weapon',
        cold_damage: [10, 13],
        chaos_damage: [500, 600],
        attack_time: {
          value: 750,
        },
        crit: {
          value: 750,
          augmented: true,
        },
      }}
    />
  ));

storiesOf('requirements', module)
  .add('all', () => (
    <Requirements
      rarity="rare"
      requirements={{
        level: { value: 5 },
        dexterity: { value: 10 },
        inteliligence: { value: 1 },
        strength: { value: 500, augmented: true },
      }}
    />
  ))
  .add('once', () => (
    <Requirements
      rarity="rare"
      requirements={{
        level: { value: 5 },
      }}
    />
  ));

storiesOf('stats', module)
  .add('basic', () => (
    <Stats
      type={ModGroup.explicit}
      rarity="rare"
      stats={[
        { id: 'unknown_stat', value: 5 },
        { id: 'dummy_stat_display_nothing', value: 5 },
        { id: 'weapon_physical_damage_+%', value: 25 },
        { id: 'attack_minimum_added_physical_damage', value: 5 },
        { id: 'attack_maximum_added_physical_damage', value: 13 },
      ]}
    />
  ))
  .add('ranges', () => (
    <Stats
      type={ModGroup.explicit}
      rarity="rare"
      stats={[
        { id: 'attack_minimum_added_physical_damage', value: [1, 3] },
        { id: 'attack_maximum_added_physical_damage', value: [13, 18] },
      ]}
    />
  ))
  .add('only one picked', () => (
    <Stats
      type={ModGroup.explicit}
      rarity="rare"
      stats={[
        { id: 'weapon_physical_damage_+%', value: 25 },
        { id: 'weapon_physical_damage_+%', value: 30 },
      ]}
    />
  ))
  .add('crafted', () => (
    <Stats
      type={ModGroup.crafted}
      rarity="rare"
      stats={[{ id: 'item_generation_cannot_change_suffixes', value: 1 }]}
    />
  ));
