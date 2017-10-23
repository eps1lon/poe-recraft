const path = require('path');
import formatGemStats, { requiredLocaleDatas } from '../formatGemStats';

const loadLocaleData = (gem_id: string, code: string) =>
  requiredLocaleDatas(gem_id).reduce((datas, file) => {
    datas[file] = require(path.join(
      __dirname,
      '../../locale-data',
      code,
      `${file}.json`
    ));
    return datas;
  }, {});

it('should only translate the lines that have translations', () => {
  const empty_effects = formatGemStats(
    'new_arctic_armour',
    [{ id: 'filtered_stat', value: 1 }],
    { datas: loadLocaleData('new_arctic_armour', 'en') }
  );

  expect(empty_effects).toEqual([]);

  const aa_effects = formatGemStats(
    'new_arctic_armour',
    [
      {
        id: 'arctic_armour_chill_when_hit_duration',
        value: 500
      },
      {
        id: 'new_arctic_armour_physical_damage_taken_when_hit_+%_final',
        value: -8
      },
      {
        id: 'new_arctic_armour_fire_damage_taken_when_hit_+%_final',
        value: -8
      },
      {
        id: 'base_skill_effect_duration',
        value: 2500
      }
    ],
    { datas: loadLocaleData('new_arctic_armour', 'en') }
  );

  expect(aa_effects).toEqual([
    'Chill Enemy for 0.5 seconds when Hit',
    '8% less Physical Damage taken when Hit',
    '8% less Fire Damage taken when Hit',
    'Base duration is 2.50 seconds'
  ]);

  const ab_effects = formatGemStats(
    'arctic_breath',
    [
      {
        id: 'base_skill_effect_duration',
        value: 880
      },
      {
        id: 'base_is_projectile',
        value: 1
      },
      {
        id: 'spell_minimum_base_cold_damage',
        value: 52
      },
      {
        id: 'spell_maximum_base_cold_damage',
        value: 78
      }
    ],
    { datas: loadLocaleData('arctic_breath', 'en') }
  );

  expect(ab_effects.sort()).toEqual([
    'Base duration is 0.88 seconds',
    'Deals 52 to 78 Cold Damage'
  ]);
});

it('should use the specified files first', () => {
  const vitality_effects = formatGemStats(
    'vitality',
    [
      {
        id: 'life_regeneration_rate_per_minute_%',
        value: 42
      },
      {
        id: 'active_skill_base_radius_+',
        value: 1
      },
      {
        id: 'base_deal_no_damage',
        value: 1
      }
    ],
    { datas: loadLocaleData('vitality', 'en') }
  );

  expect(vitality_effects.sort()).toEqual([
    '+1 to radius',
    'You and nearby allies regenerate 0.70% Life per second'
  ]);
});

it('should assume a support gem if gem_id is not recognized', () => {
  const minion_speed = formatGemStats(
    'minion_speed',
    [{ id: 'minion_movement_speed_+%', value: 25 }],
    { datas: loadLocaleData('minion_speed', 'en') }
  );

  expect(minion_speed.sort()).toEqual([
    'Supported Skills have 25% increased Minion Movement Speed'
  ]);
});
