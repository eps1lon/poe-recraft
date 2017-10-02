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
  },
  item_generation_cannot_change_suffixes: {
    stats: ['item_generation_cannot_change_suffixes'],
    translations: [
      {
        matchers: ['#'],
        text: 'Suffixes Cannot Be Changed',
        formatters: []
      }
    ]
  },
  'attack_speed_+%_while_leeching': {
    stats: ['attack_speed_+%_while_leeching'],
    translations: [
      {
        matchers: [[1, '#']],
        text: '%1%%% increased Attack Speed while Leeching',
        formatters: []
      },
      {
        matchers: [['#', -1]],
        text: '%1%%% reduced Attack Speed while Leeching',
        formatters: [
          {
            id: 'negate',
            arg: 1
          }
        ]
      }
    ]
  }
};

it('should translate single stat line', () => {
  expect(() =>
    formatStats([{ id: 'weapon_physical_damage_+%', value: 0 }], locale)
  ).toThrowError(
    'matching translation not found for weapon_physical_damage_+%'
  );
});

it('should throw if the values dont match', () => {
  expect(
    formatStats([{ id: 'weapon_physical_damage_+%', value: 25 }], locale)
  ).toEqual(['25% increased Physical Damage with Weapons']);
});

it('should fallback to deep search', () => {
  const stats = [
    { id: 'attack_minimum_added_physical_damage', value: 5 },
    { id: 'attack_maximum_added_physical_damage', value: 13 }
  ];

  const aliased_locale: StatLocaleData = {
    aliased: {
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

  expect(formatStats(stats, aliased_locale)).toEqual([
    'Adds 5 to 13 Physical Damage to Attacks'
  ]);
});

it('should throw if something was not translated', () => {
  const stats = [
    { id: 'weapon_physical_damage_+%', value: 25 },
    { id: 'attack_minimum_added_physical_damage', value: 5 },
    { id: 'attack_maximum_added_physical_damage', value: 13 }
  ];

  const aliased_locale: StatLocaleData = {
    aliased: {
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

  expect(() => formatStats(stats, aliased_locale)).toThrowError(
    'no descriptions found for weapon_physical_damage_+%'
  );
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

it('should translate collections of stats', () => {
  const translated = formatStats(
    [
      { id: 'attack_minimum_added_physical_damage', value: 20 },
      { id: 'attack_maximum_added_physical_damage', value: 300 },
      { id: 'item_generation_cannot_change_suffixes', value: -3 },
      { id: 'attack_speed_+%_while_leeching', value: -5 },
      { id: 'weapon_physical_damage_+%', value: 25 }
    ],
    locale
  );

  expect(translated).toContain('5% reduced Attack Speed while Leeching');
  expect(translated).toContain('Adds 20 to 300 Physical Damage to Attacks');
  expect(translated).toContain('Suffixes Cannot Be Changed');
  expect(translated).toContain('25% increased Physical Damage with Weapons');
});
