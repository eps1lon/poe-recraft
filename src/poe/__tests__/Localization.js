// @flow
import Localization from '../Localization';

const localization = new Localization({
  summon_skeletons_additional_warrior_skeleton_one_twentieth_chance: {
    options: [
      {
        and: ['1'],
        text:
          '20% chance to Summon an additional Skeleton Warrior with Summon Skeleton'
      },
      {
        and: ['2'],
        text:
          '40% chance to Summon an additional Skeleton Warrior with Summon Skeleton'
      },
      {
        and: ['3'],
        text:
          '60% chance to Summon an additional Skeleton Warrior with Summon Skeleton'
      },
      {
        and: ['4'],
        text:
          '80% chance to Summon an additional Skeleton Warrior with Summon Skeleton'
      },
      {
        and: ['5|#'],
        text: 'Summon an additional Skeleton Warrior with Summon Skeleton'
      }
    ],
    params: [
      'summon_skeletons_additional_warrior_skeleton_one_twentieth_chance'
    ]
  },
  'summon_skeletons_additional_warrior_skeleton_%_chance': {
    options: [
      {
        and: ['#'],
        text:
          '{param_1}% chance to Summon an additional Skeleton Warrior with Summon Skeleton'
      }
    ],
    params: ['summon_skeletons_additional_warrior_skeleton_%_chance']
  },
  summon_skeletons_cooldown_modifier_ms: {
    options: [
      {
        and: ['1000'],
        text: '{param_1} second to Summon Skeleton Cooldown',
        handles: {
          '1': 'milliseconds_to_seconds'
        }
      },
      {
        and: ['#'],
        text: '{param_1} seconds to Summon Skeleton Cooldown',
        handles: {
          '1': 'milliseconds_to_seconds'
        }
      }
    ],
    params: ['summon_skeletons_cooldown_modifier_ms']
  },
  'storm_burst_damage_+%': {
    options: [
      {
        and: ['1|#'],
        text: '{param_1}% increased Storm Burst Damage'
      },
      {
        and: ['#|-1'],
        text: '{param_1}% reduced Storm Burst Damage',
        handles: {
          '1': 'negate'
        }
      }
    ],
    params: ['storm_burst_damage_+%']
  }
});

it('should be able to lookup strings', () => {
  expect(localization.lookupStringAndApplyHandles('unknown_key', [])).toBe(
    null
  );
});

it('should be ablle to translate', () => {
  expect(localization.t('storm_burst_damage_+%', [[-5, -1]])).toBe(
    '(5 to 1)% reduced Storm Burst Damage'
  );
  expect(localization.t('storm_burst_damage_+%', [[1, 5]])).toBe(
    '(1 to 5)% increased Storm Burst Damage'
  );
});
