import { StatLocaleDatas } from '../types/StatDescription';

const english: StatLocaleDatas = {
  active_skill_gem_stat_descriptions: {
    meta: { include: 'stat_descriptions' },
    data: {
      'weapon_physical_damage_+%': {
        stats: ['weapon_physical_damage_+%'],
        translations: [
          {
            matchers: [[1, '#']],
            text:
              '%1%%% increased Physical Damage with Weapons on Active Skills',
            formatters: []
          }
        ]
      }
    }
  },
  stat_descriptions: {
    meta: {},
    data: {
      'movement_velocity_+1%_per_X_evasion_rating': {
        stats: ['movement_velocity_+1%_per_X_evasion_rating'],
        translations: [
          {
            matchers: ['#'],
            text:
              '1%% increased Movement Speed per %1% Evasion Rating, up to 100%%',
            formatters: []
          }
        ]
      },
      spell_minimum_base_fire_damage: {
        stats: [
          'spell_minimum_base_fire_damage',
          'spell_maximum_base_fire_damage',
          'spell_base_fire_damage_%_maximum_life'
        ],
        translations: [
          {
            matchers: ['#', '#', 0],
            text: 'Deals %1% to %2% Fire Damage',
            formatters: []
          },
          {
            matchers: ['#', '#', [1, '#']],
            text:
              'This Spell deals %1% to %2%, plus %3%%% of your maximum Life, as base Fire Damage',
            formatters: []
          }
        ]
      },
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
      },
      item_drop_slots: {
        stats: ['item_drop_slots'],
        translations: [],
        no_description: true
      },
      additional_strength: {
        stats: ['additional_strength'],
        translations: [
          {
            matchers: ['#'],
            text: '%1$+d to Strength',
            formatters: []
          }
        ]
      },
      local_base_physical_damage_reduction_rating: {
        stats: ['local_base_physical_damage_reduction_rating'],
        translations: [
          {
            matchers: ['#'],
            text: '%1$+d to Armour',
            formatters: []
          }
        ]
      },
      base_life_regeneration_rate_per_minute: {
        stats: ['base_life_regeneration_rate_per_minute'],
        translations: [
          {
            matchers: [[1, '#']],
            text: '%1% Life Regenerated per second',
            formatters: [
              {
                id: 'per_minute_to_per_second',
                arg: 1
              }
            ]
          }
        ]
      },
      base_maximum_life: {
        stats: ['base_maximum_life'],
        translations: [
          {
            matchers: ['#'],
            text: '%1$+d to maximum Life',
            formatters: []
          }
        ]
      },
      'base_chance_to_freeze_%': {
        stats: ['base_chance_to_freeze_%', 'always_freeze'],
        translations: [
          {
            matchers: ['#', [1, '#']],
            text: 'Always Freezes Enemies on Hit',
            formatters: [
              {
                id: 'reminderstring',
                arg: 'ReminderTextFreeze'
              }
            ]
          },
          {
            matchers: [[100, '#'], 0],
            text: 'Always Freeze',
            formatters: [
              {
                id: 'reminderstring',
                arg: 'ReminderTextFreeze'
              }
            ]
          },
          {
            matchers: [[1, 99], 0],
            text: '%1%%% chance to Freeze',
            formatters: [
              {
                id: 'reminderstring',
                arg: 'ReminderTextFreeze'
              }
            ]
          }
        ]
      }
    }
  }
};

export default english;
