import { createMods, Mod } from 'poe-mods';

import datas from '../../__fixtures__/english';
import groupMods, { Options, Stat } from '../groupMods';
import { Fallback } from '../stats';

it('merges multiple mods (mod = one ore more stats) into a single line', () => {
  expect(
    groupMods([[{ id: 'weapon_physical_damage_+%', value: 25 }]], { datas })
  ).toEqual('#% increased Physical Damage with Weapons');

  expect(
    groupMods(
      [
        [
          { id: 'attack_minimum_added_physical_damage', value: 1 },
          { id: 'attack_maximum_added_physical_damage', value: 5 }
        ],

        [
          { id: 'attack_minimum_added_physical_damage', value: 10 },
          { id: 'attack_maximum_added_physical_damage', value: 20 }
        ]
      ],
      { datas }
    )
  ).toEqual('Adds # to # Physical Damage to Attacks');
});

it('merges multiple stats within a mod by "/"', () => {
  expect(
    groupMods(
      [
        [
          { id: 'local_energy_shield_+%', value: 5 },
          { id: 'base_stun_recovery_+%', value: 10 }
        ]
      ],
      { datas }
    )
  ).toEqual(
    '#% increased Energy Shield / #% increased Stun and Block Recovery'
  );
});

it('its resolve conflict strategy can be configured', () => {
  expect(
    groupMods(
      [
        [{ id: 'local_socketed_fire_gem_level_+', value: 1 }],

        [{ id: 'local_socketed_cold_gem_level_+', value: 10 }]
      ],
      { datas }
    )
  ).toEqual('+# to Level of Socketed * Gems');
});

it('returns an emtpy string if no mods were given', () => {
  expect(groupMods([])).toEqual('');
});

it('merges multiple mods (mod = one ore more stats) into a single line', () => {
  expect(
    groupMods([[{ id: 'weapon_physical_damage_+%', value: 25 }]], { datas })
  ).toEqual('#% increased Physical Damage with Weapons');

  expect(
    groupMods(
      [
        [
          { id: 'attack_minimum_added_physical_damage', value: [1, 5] },
          { id: 'attack_maximum_added_physical_damage', value: [10, 15] }
        ],

        [
          { id: 'attack_minimum_added_physical_damage', value: [6, 10] },
          { id: 'attack_maximum_added_physical_damage', value: [16, 20] }
        ]
      ],
      { datas }
    )
  ).toEqual('Adds # to # Physical Damage to Attacks');
});

describe('usage with poe-mods', () => {
  const modStats = (mod: Mod['props']) =>
    mod.stats.map((stat, i) => {
      const key_min = `stat${i + 1}_min` as keyof typeof mod;
      const key_max = `stat${i + 1}_min` as keyof typeof mod;

      return {
        id: stat.id,
        value: [+mod[key_min], +mod[key_max]] as [number, number]
      };
    });
  const groupByCorrectGroup = (mods: Array<Mod['props']>) => {
    return mods.reduce((groups, mod) => {
      if (!groups.has(mod.correct_group)) {
        groups.set(mod.correct_group, []);
      }
      groups.get(mod.correct_group)!.push(modStats(mod));
      return groups;
    }, new Map<string, Stat[][]>());
  };

  const locale_data = {
    stat_descriptions: require('../../../locale-data/en/stat_descriptions.json')
  };

  const options: Partial<Options> = {
    datas: locale_data,
    fallback: Fallback.skip
  };

  const prefixes = createMods(require('poe-mods/data/mods/prefixes.json'));
  // skip monster domain
  const prefix_groups = groupByCorrectGroup(
    prefixes.all().filter(mod => mod.domain === 1)
  );
  for (const [correct_group, mods] of prefix_groups.entries()) {
    it(`matches the snapshot of '${correct_group}'`, () => {
      expect(groupMods(mods, options)).toMatchSnapshot();
    });
  }

  it('groups matching words', () => {
    const group = prefixes
      .all()
      .filter(mod => mod.correct_group === 'AreaOfEffect');
    const t = groupMods(group.map(modStats), options);
    expect(t).toEqual('#% increased Area of Effect *');
  });
});
