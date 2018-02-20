import classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Properties, {
  Props as PropertiesProps,
} from '../src/item/body/Properties';

export interface Props extends PropertiesProps {
  rarity: 'normal' | 'magic' | 'rare';
}

const Story: React.SFC<Props> = ({ rarity, ...props }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Properties {...props} />
      </section>
    </div>
  );
};

storiesOf('properties', module)
  .add('shield armour', () => (
    <Story
      rarity="rare"
      properties={{ kind: 'armour', armour: { value: 1 }, block: { value: 3 } }}
    />
  ))
  .add('sacrifical garb', () => (
    <Story
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
    <Story
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
    <Story
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
