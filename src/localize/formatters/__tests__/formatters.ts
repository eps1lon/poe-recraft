import factory, {
  formatters,
  inverseFactory,
  regexpFactory
} from '../';

it('should throw if the specified formatter doesnt exist', () => {
  expect(() => factory('foobar')).toThrowError("'foobar' not found");
});

it('should match all the formats', () => {
  expect(factory('deciseconds_to_seconds')(4)).toBe('40');

  expect(factory('divide_by_one_hundred')(340).substr(0, 3)).toBe('3.4');

  expect(factory('per_minute_to_per_second')(10)).toBe('0');

  expect(factory('milliseconds_to_seconds')(400).substr(0, 3)).toBe('0.4');

  expect(factory('negate')(4)).toBe('-4');

  expect(factory('divide_by_one_hundred_and_negate')(4).substr(0, 5)).toBe(
    '-0.04'
  );

  expect(factory('old_leech_percent')(10)).toBe('2');

  expect(factory('old_leech_permyriad')(200)).toBe('4');

  expect(factory('per_minute_to_per_second_0dp')(120)).toBe('2');
  expect(factory('per_minute_to_per_second_0dp')(80)).toBe('1');
  expect(factory('per_minute_to_per_second_0dp')(110)).toBe('2');

  expect(factory('per_minute_to_per_second_2dp')(4)).toBe('0.07');
  expect(factory('per_minute_to_per_second_2dp')(10)).toBe('0.17');
  expect(factory('per_minute_to_per_second_2dp')(6)).toBe('0.10');

  expect(factory('per_minute_to_per_second_2dp_if_required')(10)).toBe('0.17');
  expect(factory('per_minute_to_per_second_2dp_if_required')(60)).toBe('1');
  expect(factory('per_minute_to_per_second_2dp_if_required')(66)).toBe('1.1');

  expect(factory('milliseconds_to_seconds_0dp')(100)).toBe('0');

  expect(factory('milliseconds_to_seconds_2dp')(100)).toBe('0.10');
  expect(factory('milliseconds_to_seconds_2dp')(110)).toBe('0.11');
  expect(factory('milliseconds_to_seconds_2dp')(115)).toBe('0.12');

  expect(factory('multiplicative_damage_modifier')(4)).toBe('4');

  expect(factory('60%_of_value')(4)).toBe('2.4');

  expect(factory('mod_value_to_item_class')(500)).toBe('Amulets');
  expect(factory('mod_value_to_item_class')(1)).toBe('Rings');
});

it('should support ranges', () => {
  expect(factory('negate')([-20, -10])).toBe('(10 - 20)');
  expect(factory('per_minute_to_per_second_0dp')([120, 240])).toBe('(2 - 4)');
});

it('should not display as range if min == max', () => {
  expect(factory('id')([-10, -10])).toBe('-10');
  expect(factory('id')([-10, -11])).toBe('(-10 - -11)');
});

it('orders range values', () => {
  expect(factory('negate')([-30, -15])).toEqual('(15 - 30)');
  expect(factory('negate')([-15, -30])).toEqual('(15 - 30)');
  expect(factory('id')([15, 30])).toEqual('(15 - 30)');
  expect(factory('id')([30, 15])).toEqual('(15 - 30)');
});

describe('regxp', () => {
  it('should match the output of format', () => {
    const values = [15, 0, -3];
    for (const formatter_id of Object.keys(formatters)) {
      if (formatter_id === 'mod_value_to_item_class') {
        // tricky because the matcher is infinite but we only have a finite
        // amount of classes
        continue;
      }

      for (const value of values) {
        const formatted = factory(formatter_id)(value);
        const regexp = regexpFactory(formatter_id);
        const match = formatted.match(new RegExp(`^(${regexp})$`));
        expect(match).not.toBe(null);
        // if match is null expect throws => match !== null at this point
        expect((match as RegExpMatchArray)[1]).toEqual(formatted);
      }
    }
  });

  it('throws if it could not produce a string for regexp', () => {
    expect(() => regexpFactory('unknonw')).toThrow();
  });
});

describe('inverse', () => {
  it('acts as an inverse to formatters', () => {
    const skip = ['mod_value_to_item_class', 'placeholder'];
    // use reasonably big values because we blindly test every formatter
    // which can apply divisions by 1000
    const values = [120000, 0, -30000];
    for (const formatter_id of Object.keys(formatters)) {
      if (skip.includes(formatter_id)) {
        // tricky because the matcher is infinite but we only have a finite
        // amount of classes
        continue;
      }
      for (const value of values) {
        const formatted = factory(formatter_id)(value);
        const inverse = inverseFactory(formatter_id)(formatted);

        expect(inverse).toBeCloseTo(value, 5);
      }
    }

    expect(inverseFactory('mod_value_to_item_class')('Rings')).toBe(1);
    expect(inverseFactory('mod_value_to_item_class')('Sceptres')).toBe(19);
  });
});
