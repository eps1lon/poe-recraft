import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { formatStats, Fallback } from 'poe-i18n';
// 'poe-components-item'
import { Popup } from '../../src/';

// tslint:disable-next-line: no-var-requires
const base_item_types = require('poe-i18n/locale-data/en/BaseItemTypes.json');
// tslint:disable-next-line: no-var-requires
const stat_descriptions = require('poe-i18n/locale-data/en/stat_descriptions.json');

storiesOf('i18n integration', module).add('Helmet', () => (
  <Popup
    item={{
      explicitStats: formatStats(
        [
          { id: 'number_of_additional_mines_to_place', value: 1 },
          {
            id: 'local_display_socketed_gems_get_remote_mine_level',
            value: 18,
          },
          { id: 'chill_effectiveness_on_self_+%', value: [16, 18] },
          {
            id: 'local_display_socketed_gems_supported_by_x_hypothermia',
            value: 18,
          },
          { id: 'local_socketed_minion_gem_level_+', value: 1 },
          { id: 'base_maximum_life', value: 67 },
          { id: 'base_stun_recovery_+%', value: 18 },
          { id: 'spell_minimum_added_lightning_damage', value: 5 },
          { id: 'spell_maximum_added_lightning_damage', value: 89 },
        ],
        {
          datas: { stat_descriptions },
          fallback: Fallback.id,
        },
      ),
      base: {
        name:
          base_item_types['Metadata/Items/Armours/Helmets/HelmetInt11'].name,
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
    }}
  />
));
