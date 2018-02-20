import classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
const stat_descriptions = require('poe-i18n/locale-data/en/stat_descriptions.json');

import { Group as ModGroup } from '../src/mod/poe';
import Stats from '../src/stat/Stats';
import { Stat } from '../src/stat/poe';

export interface Props {
  rarity: 'normal' | 'magic' | 'rare';
  stats: Stat[];
  type: ModGroup;
}

const Story: React.SFC<Props> = ({ rarity, type, ...props }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Stats
          classname={ModGroup[type]}
          {...props}
          translations={{ stat_descriptions }}
        />
      </section>
    </div>
  );
};

storiesOf('stats', module)
  .add('basic', () => (
    <Story
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
    <Story
      type={ModGroup.explicit}
      rarity="rare"
      stats={[
        { id: 'attack_minimum_added_physical_damage', value: [1, 3] },
        { id: 'attack_maximum_added_physical_damage', value: [13, 18] },
      ]}
    />
  ))
  .add('only one picked', () => (
    <Story
      type={ModGroup.explicit}
      rarity="rare"
      stats={[
        { id: 'weapon_physical_damage_+%', value: 25 },
        { id: 'weapon_physical_damage_+%', value: 30 },
      ]}
    />
  ))
  .add('crafted', () => (
    <Story
      type={ModGroup.crafted}
      rarity="rare"
      stats={[{ id: 'item_generation_cannot_change_suffixes', value: 1 }]}
    />
  ));
