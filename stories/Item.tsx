import * as React from 'react';
import { storiesOf } from '@storybook/react';
const stat_descriptions = require('poe-i18n/locale-data/en/stat_descriptions.json');

import { Item, Rarity } from '../src/item/poe';
import { Type as ModType, Group as ModGroup } from '../src/mod/poe';

import { Popup } from '../src';

storiesOf('item', module).add('shaped', () => (
  <Popup
    translations={{ stat_descriptions }}
    item={{
      base: {
        name: 'Hubris Circlet',
      },
      name: 'Mind Brow',
      kind: 'armour',
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
        {
          id: 'AdditionalMinesPlacedSupportedUber1_',
          type: ModType.suffix,
          stats: [
            {
              id: 'number_of_additional_mines_to_place',
              value: 1,
            },
            {
              id: 'local_display_socketed_gems_get_remote_mine_level',
              value: 18,
            },
          ],
        },
        {
          id: 'IncreasedChillEffectSupportedUber1',
          type: ModType.suffix,
          stats: [
            {
              id: 'chill_effect_+%',
              value: 16,
            },
            {
              id: 'local_display_socketed_gems_supported_by_x_hypothermia',
              value: 18,
            },
          ],
        },
        {
          id: 'LocalIncreaseSocketedMinionGemLevel1',
          type: ModType.prefix,
          stats: [
            {
              id: 'local_socketed_minion_gem_level_+',
              value: 1,
            },
          ],
        },
        {
          id: 'IncreasedLife6',
          type: ModType.prefix,
          stats: [
            {
              id: 'base_maximum_life',
              value: 67,
            },
          ],
        },
        {
          id: 'StunRecovery3',
          type: ModType.suffix,
          stats: [
            {
              id: 'base_stun_recovery_+%',
              value: 18,
            },
          ],
        },
        {
          id: 'SpellAddedLightningDamageUber3',
          type: ModType.prefix,
          stats: [
            {
              id: 'spell_minimum_added_lightning_damage',
              value: 5,
            },
            {
              id: 'spell_maximum_added_lightning_damage',
              value: 89,
            },
          ],
        },
      ],
    }}
  />
));
