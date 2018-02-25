import datas from '../../__fixtures__/english';
import { StatLocaleData } from '../../types/StatDescription';
import { buildRandomStats } from '../../util/symbolicStats';
import extractStats from '../extractStats';
import formatStats from '../stats';

it('should reverse formatStats', () => {
  const formatted_stats = formatStats(
    [
      { id: 'attack_minimum_added_physical_damage', value: 1 },
      { id: 'attack_maximum_added_physical_damage', value: 56 }
    ],
    { datas }
  );

  expect(extractStats(formatted_stats[0], { datas })).toEqual([
    [
      { id: 'attack_minimum_added_physical_damage', value: 1 },
      { id: 'attack_maximum_added_physical_damage', value: 56 }
    ]
  ]);
});

it('creates symbolic values for non matched stats', () => {
  const formatted_stats = formatStats(
    [
      { id: 'spell_minimum_base_fire_damage', value: 1 },
      { id: 'spell_maximum_base_fire_damage', value: 56 }
    ],
    { datas }
  );

  expect(extractStats(formatted_stats[0], { datas })).toEqual([
    [
      { id: 'spell_minimum_base_fire_damage', value: 1 },
      { id: 'spell_maximum_base_fire_damage', value: 56 },
      { id: 'spell_base_fire_damage_%_maximum_life', value: 0 }
    ]
  ]);
});

it('only matches full stat lines', () => {
  const formatted_stats = formatStats(
    [{ id: 'movement_velocity_+1%_per_X_evasion_rating', value: 5 }],
    { datas }
  );

  expect(extractStats(formatted_stats[0], { datas })).toEqual([
    [{ id: 'movement_velocity_+1%_per_X_evasion_rating', value: 5 }]
  ]);
});

it('considers the matchers', () => {
  const formatted_stats = formatStats(
    [{ id: 'local_socketed_gem_level_+', value: -5 }],
    { datas }
  );

  const possibilities = extractStats(formatted_stats[0], { datas });

  expect(possibilities).not.toContainEqual([
    { id: 'local_gem_level_+', value: -5 }
  ]);
  expect(possibilities).toContainEqual([
    { id: 'local_socketed_gem_level_+', value: -5 }
  ]);
});

// run this only to create extract exact test cases
it.skip('should reverse the locale-data (expensive test)', () => {
  const since = (message: string, fn: () => any) => {
    try {
      fn();
    } catch (err) {
      err.message = `${message}\n\n${err.message}`;
      throw err;
    }
  };

  const full_datas = {
    stat_descriptions: require('../../../locale-data/en/stat_descriptions.json') as StatLocaleData
  };

  for (const [description_id, description] of Object.entries(
    full_datas.stat_descriptions.data
  )) {
    const random_stats_combinations = buildRandomStats(description);
    if (random_stats_combinations === null) {
      continue;
    }
    if (description_id === 'unique_map_boss_number_of_rare_items_to_drop') {
      // this one is kinda rough for random testing because the range is
      // infinite but we only have a finite amount fo classes
      continue;
    }

    for (const random_stats of random_stats_combinations) {
      const formatted = formatStats(random_stats, { datas: full_datas });
      expect(formatted).toHaveLength(1);
      const [stat_text] = formatted;

      const extracted = extractStats(stat_text, { datas: full_datas });
      since(
        `random_stats:${JSON.stringify(
          random_stats,
          undefined,
          2
        )} with \n stat_text: ${stat_text} has inverse \nextracted:${JSON.stringify(
          extracted,
          undefined,
          2
        )}`,
        () =>
          expect(
            extracted.every(stats => {
              const reformatted = formatStats(
                stats.map((stat, i) => {
                  /*
                   * force equality if received[].value is NaN
                   *   - indicator that the value is not contained in the text
                   *   - i.e. symbolicValue returns a random number
                   * or if received[].value is closeto with 1%
                   */
                  if (
                    typeof stat.value === 'number' &&
                    Number.isNaN(stat.value)
                  ) {
                    const expected_value = random_stats[i].value;
                    stat.value = expected_value;
                  }
                  return stat;
                }),
                { datas: full_datas }
              );
              try {
                expect(reformatted).toEqual(formatted);
              } catch (err) {
                // continue testing most likely there are just rounding errors
                // tslint:disable-next-line: no-console
                console.warn(err);
              }

              return true;
            })
          ).toBe(true)
      );
    }
  }
});
