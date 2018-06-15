import { isRange, StatValue } from '../../types/StatValue';
import Formatter from './Formatter';
import mod_value_to_item_class from './mod_value_to_item_class';
import per_minute_to_per_second from './per_minute_to_per_second';
import { NUMBER } from './regexp_util';

/*
 * rule of thumb: is the formatter self explanatory and only need
 * arguments => declare in this file. Otherwise create additional
 * files. `mod_value_to_item_class` needs auxiliary item_classes and
 * per_minute_to_per_second has some extra documentation
 */

export const formatters: { [key: string]: Formatter } = {
  deciseconds_to_seconds: {
    format: n => `${n * 10}`,
    inverse: s => +s / 10,
    regexp: NUMBER
  },
  divide_by_two_0dp: {
    format: n => (n / 2).toFixed(0),
    inverse: s => +s * 2,
    regexp: NUMBER
  },
  divide_by_ten_0dp: {
    format: n => (n / 10).toFixed(0),
    inverse: s => +s * 10,
    regexp: NUMBER
  },
  divide_by_fifteen_0dp: {
    format: n => (n / 15).toFixed(0),
    inverse: s => +s * 15,
    regexp: NUMBER
  },
  divide_by_twenty_then_double_0dp: {
    format: n => `${Math.floor(n / 20) * 2}`,
    inverse: s => +s * 10,
    regexp: NUMBER
  },
  divide_by_one_hundred: {
    format: n => `${n / 100}`,
    inverse: s => +s * 100,
    regexp: `${NUMBER}\\.?\\d{0,2}`
  },
  divide_by_one_hundred_2dp: {
    format: n => (n / 100).toFixed(2),
    inverse: s => +s * 100,
    regexp: `${NUMBER}\\.\\d{2}`
  },
  per_minute_to_per_second,
  milliseconds_to_seconds: {
    format: n => `${n / 1000}`,
    inverse: s => +s * 1000,
    regexp: `${NUMBER}\\.?\\d{0,3}`
  },
  negate: {
    format: n => `${-n}`,
    inverse: s => -s,
    regexp: NUMBER
  },
  divide_by_one_hundred_and_negate: {
    format: n => `${-n / 100}`,
    inverse: s => -s * 100,
    regexp: `${NUMBER}\\.?\\d{0,2}`
  },
  old_leech_percent: {
    format: n => `${n / 5}`,
    inverse: s => +s * 5,
    regexp: `${NUMBER}\\.?\\d{0,2}`
  },
  old_leech_permyriad: {
    format: n => `${n / 50}`,
    inverse: s => +s * 50,
    regexp: `${NUMBER}\\.?\\d{0,2}`
  },
  per_minute_to_per_second_0dp: {
    format: n => (n / 60).toFixed(0),
    inverse: s => +s * 60,
    regexp: NUMBER
  },
  per_minute_to_per_second_2dp: {
    format: n => (n / 60).toFixed(2),
    inverse: s => +s * 60,
    regexp: `${NUMBER}\\.\\d{2}`
  },
  per_minute_to_per_second_2dp_if_required: {
    format: n => (n / 60).toFixed(2).replace(/\.?0*$/, ''),
    inverse: s => +s * 60,
    regexp: `${NUMBER}\\.?\\d{0,2}`
  },
  milliseconds_to_seconds_0dp: {
    format: n => (n / 1000).toFixed(0),
    inverse: s => +s * 1000,
    regexp: NUMBER
  },
  milliseconds_to_seconds_2dp: {
    format: n => (n / 1000).toFixed(2),
    inverse: s => +s * 1000,
    regexp: `${NUMBER}\\.?\\d{2}`
  },
  multiplicative_damage_modifier: {
    format: n => `${n}`,
    inverse: s => +s,
    regexp: NUMBER
  },
  '60%_of_value': {
    format: n => `${n * 0.6}`, // TODO
    inverse: s => +s / 0.6,
    regexp: `${NUMBER}\\.?\\d*`
  },
  id: {
    format: n => `${n}`,
    inverse: s => +s,
    regexp: NUMBER
  },
  mod_value_to_item_class,
  // TODO what is this
  canonical_stat: {
    format: n => `${n}`, // TODO
    inverse: s => +s,
    regexp: NUMBER
  },
  placeholder: {
    format: () => '#',
    inverse: () => Number.NaN,
    regexp: '#'
  }
};

export function inverseFactory(formatter_id: string): (s: string) => number {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const { inverse } = formatters[formatter_id];

  // TODO add ranges

  return inverse;
}

export function regexpFactory(formatter_id: string): string {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const { regexp } = formatters[formatter_id];

  // TODO add ranges

  return regexp;
}

export default function factory(
  formatter_id: string
): (value: StatValue) => string {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const { format } = formatters[formatter_id];

  return (value: StatValue) => {
    if (isRange(value)) {
      if (value[0] === value[1]) {
        return String(format(value[0]));
      } else {
        const [min, max] = valueOrder(value, formatter_id);

        return `(${format(min)} - ${format(max)})`;
      }
    } else {
      return String(format(value));
    }
  };
}

/**
 * orders the given values so that the smallest displayed is min
 *
 * reduced stats are given as negative values and then negated for display
 * whichs results in [-30, -15] being displayed as "(30 - 15) reduced"
 * @param param0
 *
 */
function valueOrder(
  [left, right]: [number, number],
  formatter_id: string
): [number, number] {
  const sign = Math.sign(left);
  if ((left < right && sign === 1) || (left > right && sign === -1)) {
    return [left, right];
  } else {
    return [right, left];
  }
}
