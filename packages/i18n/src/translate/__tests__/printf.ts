import printf from '../printf';

it('throws if params and formatters dont match', () => {
  expect(() => printf('empty', [], [{ id: 'negate', arg: 1 }])).toThrowError(
    "no param given for formatter 'negate'"
  );

  // but not for reminderstrings
  expect(
    printf(
      'unaltered',
      [],
      [
        {
          id: 'reminderstring',
          arg: 'ReminderTextUncappedResist'
        }
      ]
    )
  ).toEqual('unaltered');
});

it('format somewhat similar to printf', () => {
  expect(printf('', [])).toBe('');

  expect(printf('Suffixes Cannot Be Changed', [1])).toBe(
    'Suffixes Cannot Be Changed'
  );

  expect(printf('%1$+d to Level of Socketed Aura Gems', [1])).toBe(
    '+1 to Level of Socketed Aura Gems'
  );
  expect(printf('%1$+d to Level of Socketed Aura Gems', [5])).toBe(
    '+5 to Level of Socketed Aura Gems'
  );

  expect(printf('%1%%% increased Damage taken from Melee Attacks', [25])).toBe(
    '25% increased Damage taken from Melee Attacks'
  );
});

it('should use formatters', () => {
  expect(
    printf(
      '%1%%% reduced Damage taken from Melee Attacks',
      [-10],
      [{ id: 'negate', arg: 1 }]
    )
  ).toBe('10% reduced Damage taken from Melee Attacks');

  expect(
    printf(
      '%1% Life Regenerated per second',
      [86],
      [{ id: 'per_minute_to_per_second', arg: 1 }]
    )
  ).toBe('1 Life Regenerated per second');
  expect(printf('', [])).toBe('');
});

it('can fill values multiple times', () => {
  expect(
    printf(
      '%1%%% increased Damage Taken from Hits from Labyrinth Traps\\n%1%%% increased effectiveness of Damage over Time Debuffs from Labyrinth Traps on Players',
      [10]
    )
  ).toBe(
    '10% increased Damage Taken from Hits from Labyrinth Traps\\n10% increased effectiveness of Damage over Time Debuffs from Labyrinth Traps on Players'
  );
});
