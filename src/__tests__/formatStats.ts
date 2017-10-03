import { StatLocaleData } from '../types/StatDescription';

import data from '../__fixtures__/english';
import formatStats, { Fallback, Stat } from '../formatStats';

it('should translate single stat line', () => {
  expect(() =>
    formatStats([{ id: 'weapon_physical_damage_+%', value: 0 }], { data })
  ).toThrowError(
    "matching translation not found for 'weapon_physical_damage_+%'"
  );
});

it('should throw if the values dont match', () => {
  expect(
    formatStats([{ id: 'weapon_physical_damage_+%', value: 25 }], { data })
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

  expect(formatStats(stats, { data: aliased_locale })).toEqual([
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

  expect(() => formatStats(stats, { data: aliased_locale })).toThrowError(
    'no descriptions found for weapon_physical_damage_+%'
  );
});

it('should translate douple stat lines', () => {
  expect(
    formatStats(
      [
        { id: 'attack_minimum_added_physical_damage', value: 1 },
        { id: 'attack_maximum_added_physical_damage', value: 56 }
      ],
      { data }
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
    { data }
  );

  expect(translated).toContain('5% reduced Attack Speed while Leeching');
  expect(translated).toContain('Adds 20 to 300 Physical Damage to Attacks');
  expect(translated).toContain('Suffixes Cannot Be Changed');
  expect(translated).toContain('25% increased Physical Damage with Weapons');
});

// they are save in the .txt with `no_description id`
it('should return the id with a hint for no_desc stats', () => {
  expect(formatStats([{ id: 'item_drop_slots', value: 3 }], { data })).toEqual([
    'item_drop_slots (hidden)'
  ]);
});

it('should translate production bug 1', () => {
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
      { data }
    ).sort()
  ).toEqual([
    '+24 to Armour',
    '+24 to maximum Life',
    '+51 to Strength',
    '4 Life Regenerated per second'
  ]);
});

it('should translate if not enough stats are provided by defaulting to 0', () => {
  // this is not a behavior that I like but to which I have to conform since
  // the descriptions are provided that way in the .txt
  // adding exception rules to every stat for which we default to 0 is just
  // not a viable option

  expect(
    formatStats([{ id: 'attack_minimum_added_physical_damage', value: 1 }], {
      data
    })
  ).toEqual(['Adds 1 to 0 Physical Damage to Attacks']);

  expect(
    formatStats([{ id: 'always_freeze', value: 1 }], { data }).sort()
  ).toEqual(['Always Freezes Enemies on Hit']);

  expect(
    formatStats([{ id: 'base_chance_to_freeze_%', value: 12 }], { data }).sort()
  ).toEqual(['12% chance to Freeze']);
});

it('can be configured to use global local data', () => {
  expect(() =>
    formatStats([{ id: 'base_chance_to_freeze_%', value: 12 }]).sort()
  ).toThrowError(
    'locale data not provided. Set it either via passed option or #configure'
  );

  formatStats.configure({ data });

  expect(
    formatStats([{ id: 'base_chance_to_freeze_%', value: 12 }]).sort()
  ).toEqual(['12% chance to Freeze']);
});

it('should support id fallback', () => {
  expect(
    formatStats([{ id: 'from_armour_movement_speed_+%', value: -3 }], {
      data,
      fallback: Fallback.id
    })
  ).toEqual(['from_armour_movement_speed_+%']);
});

it('should support skipping fallback', () => {
  expect(
    formatStats([{ id: 'from_armour_movement_speed_+%', value: -3 }], {
      data,
      fallback: Fallback.skip
    })
  ).toEqual([]);
});

it('should throw if we provide an unrecognize fallback', () => {
  expect(() =>
    formatStats([{ id: 'from_armour_movement_speed_+%', value: -3 }], {
      data,
      fallback: 345678
    })
  ).toThrowError("unrecognized fallback type '345678'");
});

it('should support custom fallback methods', () => {
  expect(
    formatStats(
      [
        { id: 'from_armour_movement_speed_+%', value: -3 },
        { id: 'dummy_stat_display_nothing', value: -3 }
      ],
      {
        data,
        fallback: (id: string, stat: Stat) =>
          id === 'dummy_stat_display_nothing' ? null : id
      }
    )
  ).toEqual(['from_armour_movement_speed_+%']);
});
