import { createMods, Mod } from 'poe-mods';

import groupMods, { Stat, Options } from '../groupMods';
import { Fallback } from '../stats';
import datas from '../../__fixtures__/english';
import { create } from 'domain';

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

it.only(
  'is designed to create a description of correct_group in eps1lon/poe-mods',
  () => {
    const groupByCorrectGroup = (mods: Mod['props'][]) => {
      return mods.reduce((groups, mod) => {
        if (!groups.has(mod.correct_group)) {
          groups.set(mod.correct_group, []);
        }
        groups.get(mod.correct_group)!.push(
          mod.stats.map((stat, i) => {
            const key_min = `stat${i + 1}_min` as keyof typeof mod;
            const key_max = `stat${i + 1}_min` as keyof typeof mod;

            return {
              id: stat.id,
              value: [+mod[key_min], +mod[key_max]] as [number, number]
            };
          })
        );
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
    const prefix_groups = groupByCorrectGroup(prefixes.all());
    for (const [correct_group, mods] of prefix_groups.entries()) {
      console.log(correct_group, groupMods(mods, options));
    }
  }
);
