import factory from '../formatters';

it('should throw if the specified formatter doesnt exist', () => {
  expect(() => factory('foobar')).toThrowError("'foobar' not found");
});

it('should match all the formats', () => {
  expect(factory('deciseconds_to_seconds')(4)).toBe(40);

  expect(factory('divide_by_one_hundred')(340)).toBeCloseTo(3.4, 5);

  expect(factory('per_minute_to_per_second')(10)).toBe(0);

  expect(factory('milliseconds_to_seconds')(400)).toBeCloseTo(0.4, 5);

  expect(factory('negate')(4)).toBe(-4);

  expect(factory('divide_by_one_hundred_and_negate')(4)).toBeCloseTo(-0.04, 5);

  expect(factory('old_leech_percent')(10)).toBe(2);

  expect(factory('old_leech_permyriad')(200)).toBe(4);

  expect(factory('per_minute_to_per_second_0dp')(120)).toBe('2');
  expect(factory('per_minute_to_per_second_0dp')(80)).toBe('1');
  expect(factory('per_minute_to_per_second_0dp')(110)).toBe('2');

  expect(factory('per_minute_to_per_second_2dp')(4)).toBe('0.07');
  expect(factory('per_minute_to_per_second_2dp')(10)).toBe('0.17');
  expect(factory('per_minute_to_per_second_2dp')(6)).toBe('0.10');

  expect(factory('per_minute_to_per_second_2dp_if_required')(10)).toBe('0.17');
  expect(factory('per_minute_to_per_second_2dp_if_required')(60)).toBe('1.0');
  expect(factory('per_minute_to_per_second_2dp_if_required')(66)).toBe('1.1');

  expect(factory('milliseconds_to_seconds_0dp')(100)).toBe('0');

  expect(factory('milliseconds_to_seconds_2dp')(100)).toBe('0.10');
  expect(factory('milliseconds_to_seconds_2dp')(110)).toBe('0.11');
  expect(factory('milliseconds_to_seconds_2dp')(115)).toBe('0.12');

  expect(factory('multiplicative_damage_modifier')(4)).toBe(4);

  expect(factory('60%_of_value')(4)).toBeCloseTo(2.4);
});
