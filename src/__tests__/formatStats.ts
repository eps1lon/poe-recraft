import formatStats from '../formatStats';
import { StatLocaleData } from '../types/StatDescription';

const locale: StatLocaleData = {
  'weapon_physical_damage_+%': {
    stats: ['weapon_physical_damage_+%'],
    translations: [
      {
        matchers: [[1, '#']],
        text: '%1%%% increased Physical Damage with Weapons',
        formatters: []
      }
    ]
  },
  attack_minimum_added_physical_damage: {
    stats: [
      'attack_minimum_added_physical_damage',
      'attack_maximum_added_physical_damage'
    ],
    translations: [
      {
        matchers: ['#', '#'],
        text: 'Adds %1% to %2% Physical Damage to Attacks',
        formatters: []
      }
    ]
  }
};

it('should translate single stat line', () => {
  expect(
    formatStats([{ id: 'weapon_physical_damage_+%', value: 25 }], locale)
  ).toEqual(['25% increased Physical Damage with Weapons']);
});

it('should translate douple stat lines', () => {
  expect(() =>
    formatStats(
      [{ id: 'attack_minimum_added_physical_damage', value: 1 }],
      locale
    )
  ).toThrow(
    "stat 'attack_maximum_added_physical_damage' required for translation not provided"
  );

  expect(
    formatStats(
      [
        { id: 'attack_minimum_added_physical_damage', value: 1 },
        { id: 'attack_maximum_added_physical_damage', value: 56 }
      ],
      locale
    )
  ).toEqual(['Adds 1 to 56 Physical Damage to Attacks']);
});

it.skip('should translate collections of stats', () => {
  //
});
