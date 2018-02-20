import * as React from 'react';
import renderer from 'react-test-renderer';

import Head from '../Component';
import { Type as ModType } from '../../../../mod/poe';
import { Item as ItemProps } from '../../../poe';
import { Popup } from '../../../index';
import { Item, Rarity } from '../../../poe';

it('should display normal', () => {
  expect(
    renderer
      .create(
        <Head
          item={{
            base: {
              name: 'Full Scale Armour',
            },
            rarity: Rarity.normal,
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display magic', () => {
  expect(
    renderer
      .create(
        <Head
          item={{
            base: {
              name: 'Blinder',
            },
            rarity: Rarity.magic,
            explicits: [
              {
                type: ModType.prefix,
                name: 'Buzzing',
                stats: [],
              },
              {
                type: ModType.suffix,
                name: 'of Mastery',
                stats: [],
              },
            ],
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display rare', () => {
  expect(
    renderer
      .create(
        <Head
          item={{
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
              {
                type: ModType.suffix,
                id: 'FireResist6',
                name: 'of the Volcano',
              },
            ],
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});
