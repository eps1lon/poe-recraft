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
    regexp: NUMBER,
    negates: false
  },
  divide_by_two_0dp: {
    format: n => (n / 2).toFixed(0),
    inverse: s => +s * 2,
    regexp: NUMBER,
    negates: false
  },
  divide_by_ten_0dp: {
    format: n => (n / 10).toFixed(0),
    inverse: s => +s * 10,
    regexp: NUMBER,
    negates: false
  },
  divide_by_fifteen_0dp: {
    format: n => (n / 15).toFixed(0),
    inverse: s => +s * 15,
    regexp: NUMBER,
    negates: false
  },
  divide_by_twenty_then_double_0dp: {
    format: n => `${Math.floor(n / 20) * 2}`,
    inverse: s => +s * 10,
    regexp: NUMBER,
    negates: false
  },
  divide_by_one_hundred: {
    format: n => `${n / 100}`,
    inverse: s => +s * 100,
    regexp: `${NUMBER}\\.?\\d{0,2}`,
    negates: false
  },
  divide_by_one_hundred_2dp: {
    format: n => (n / 100).toFixed(2),
    inverse: s => +s * 100,
    regexp: `${NUMBER}\\.\\d{2}`,
    negates: false
  },
  per_minute_to_per_second,
  milliseconds_to_seconds: {
    format: n => `${n / 1000}`,
    inverse: s => +s * 1000,
    regexp: `${NUMBER}\\.?\\d{0,3}`,
    negates: false
  },
  negate: {
    format: n => `${-n}`,
    inverse: s => -s,
    regexp: NUMBER,
    negates: true
  },
  divide_by_one_hundred_and_negate: {
    format: n => `${-n / 100}`,
    inverse: s => -s * 100,
    regexp: `${NUMBER}\\.?\\d{0,2}`,
    negates: false
  },
  old_leech_percent: {
    format: n => `${n / 5}`,
    inverse: s => +s * 5,
    regexp: `${NUMBER}\\.?\\d{0,2}`,
    negates: false
  },
  old_leech_permyriad: {
    format: n => `${n / 50}`,
    inverse: s => +s * 50,
    regexp: `${NUMBER}\\.?\\d{0,2}`,
    negates: false
  },
  per_minute_to_per_second_0dp: {
    format: n => (n / 60).toFixed(0),
    inverse: s => +s * 60,
    regexp: NUMBER,
    negates: false
  },
  per_minute_to_per_second_2dp: {
    format: n => (n / 60).toFixed(2),
    inverse: s => +s * 60,
    regexp: `${NUMBER}\\.\\d{2}`,
    negates: false
  },
  per_minute_to_per_second_2dp_if_required: {
    format: n => (n / 60).toFixed(2).replace(/\.?0*$/, ''),
    inverse: s => +s * 60,
    regexp: `${NUMBER}\\.?\\d{0,2}`,
    negates: false
  },
  milliseconds_to_seconds_0dp: {
    format: n => (n / 1000).toFixed(0),
    inverse: s => +s * 1000,
    regexp: NUMBER,
    negates: false
  },
  milliseconds_to_seconds_2dp: {
    format: n => (n / 1000).toFixed(2),
    inverse: s => +s * 1000,
    regexp: `${NUMBER}\\.?\\d{2}`,
    negates: false
  },
  multiplicative_damage_modifier: {
    format: n => `${n}`,
    inverse: s => +s,
    regexp: NUMBER,
    negates: false
  },
  '60%_of_value': {
    format: n => `${n * 0.6}`, // TODO
    inverse: s => +s / 0.6,
    regexp: `${NUMBER}\\.?\\d*`,
    negates: false
  },
  id: {
    format: n => `${n}`,
    inverse: s => +s,
    regexp: NUMBER,
    negates: false
  },
  mod_value_to_item_class,
  // TODO what is this
  canonical_stat: {
    format: n => `${n}`, // TODO
    inverse: s => +s,
    regexp: NUMBER,
    negates: false
  },
  placeholder: {
    format: () => '#',
    inverse: () => Number.NaN,
    regexp: '#',
    negates: false
  }
};

export function inverseFactory(formatter_id: string): (s: string) => number {
  const { inverse } = buildFormatter(formatter_id);
  // TODO add ranges
  return inverse;
}

export function regexpFactory(formatter_id: string): string {
  const { regexp } = buildFormatter(formatter_id);
  // TODO add ranges
  return regexp;
}

export function buildFormatter(formatter_id: string): Formatter {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }
  return formatters[formatter_id];
}

export default function factory(
  formatter_id: string
): (value: number) => string {
  const { format } = buildFormatter(formatter_id);
  return format;
}
