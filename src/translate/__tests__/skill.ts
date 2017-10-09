import translate from '../skill';

it('should throw on unrecognized ids', () => {
  expect(() => translate('asdasdasd', [])).toThrowError(
    "unrecognized skill 'asdasdasd'"
  );
});

it('should only translate the lines that have translations', () => {
  const { effects: empty_effects } = translate(
    'new_arctic_armour',
    [{ id: 'filtered_stat', value: 1 }],
    { language: 'en' }
  );

  expect(empty_effects).toEqual([]);

  const { effects: aa_effects } = translate(
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
    { language: 'en' }
  );

  expect(aa_effects).toEqual([
    'Chill Enemy for 0.5 seconds when Hit',
    '8% less Physical Damage taken when Hit',
    '8% less Fire Damage taken when Hit',
    'Base duration is 2.50 seconds'
  ]);

  const { effects: ab_effects } = translate(
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
    { language: 'en' }
  );

  expect(ab_effects.sort()).toEqual([
    'Base duration is 0.88 seconds',
    'Deals 52 to 78 Cold Damage'
  ]);
});

it('should use the specified files first', () => {
  const { effects: vitality_effects } = translate(
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
    { language: 'en' }
  );

  expect(vitality_effects.sort()).toEqual([
    '+1 to radius',
    'You and nearby allies regenerate 0.70% Life per second'
  ]);
});
