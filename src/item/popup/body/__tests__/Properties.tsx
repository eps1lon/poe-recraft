import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Properties from '../Properties';

it('should display shields', () => {
  expect(
    renderer
      .create(
        <Properties
          properties={{
            armour: { value: 1 },
            block: { value: 3 },
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display sacrifical garb', () => {
  expect(
    renderer
      .create(
        <Properties
          properties={{
            quality: 5,
            armour: { value: 100, augmented: true },
            energy_shield: { value: 10, augmented: true },
            evasion: { value: 50.5, augmented: true },
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display dagger', () => {
  expect(
    renderer
      .create(
        <Properties
          properties={{
            quality: 5,
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
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display claw', () => {
  expect(
    renderer
      .create(
        <Properties
          properties={{
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
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});
