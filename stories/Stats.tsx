import * as classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Group as ModGroup } from '../src/mod/poe';
import Stats from '../src/stat/Stats';

export interface Props {
  rarity: 'normal' | 'magic' | 'rare';
  stats: string[];
  type: ModGroup;
}

const Story: React.SFC<Props> = ({ rarity, type, stats }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Stats classname={`${ModGroup[type]}Mod`}>{stats}</Stats>
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
        '25% increased Physical Damage with Weapons',
        'Adds 5 to 13 Physical Damage to Attacks',
        'unknown_stat',
      ]}
    />
  ))
  .add('ranges', () => (
    <Story
      type={ModGroup.explicit}
      rarity="rare"
      stats={['Adds (1 - 3) to (13 - 18) Physical Damage to Attacks']}
    />
  ))
  .add('crafted', () => (
    <Story
      type={ModGroup.crafted}
      rarity="rare"
      stats={['Suffixes Cannot Be Changed']}
    />
  ));
