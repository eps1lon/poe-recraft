import { StatLocaleData } from '../types/StatDescription';

import locale from '../__fixtures__/english';
import formatStats from '../formatStats';

it('should translate single stat line', () => {
  expect(() =>
    formatStats([{ id: 'weapon_physical_damage_+%', value: 0 }], locale)
  ).toThrowError(
    "matching translation not found for 'weapon_physical_damage_+%'"
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
    "matching translation not found for 'attack_minimum_added_physical_damage'"
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

// they are save in the .txt with `no_description id`
it('should return the id with a hint for no_desc stats', () => {
  expect(formatStats([{ id: 'item_drop_slots', value: 3 }], locale)).toEqual([
    'item_drop_slots (hidden)'
  ]);
});

it('should translate collections that threw in production', () => {
  // this one only threw because the translation was not provided which was
  // fixed in 8d1cd8f8a1433a843e36250f893e64c72e98a005
  expect(
    formatStats(
      [
        { id: 'additional_strength', value: 51 },
        { id: 'base_life_regeneration_rate_per_minute', value: 241 },
        { id: 'base_maximum_life', value: 24 },
        { id: 'local_base_physical_damage_reduction_rating', value: 24 }
      ],
      locale
    ).sort()
  ).toEqual([
    '+24 to Armour',
    '+24 to maximum Life',
    '+51 to Strength',
    '4 Life Regenerated per second'
  ]);
});
