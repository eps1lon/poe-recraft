import { isRange, StatValue } from '../types/StatValue';

export type Formatter = (value: number) => number | string;

// TODO howto translate?
// used in 'mod_value_to_item_class' in Poorjoy's Asylum
export const item_classes = [
  'Amulets',
  'Rings',
  'Claws',
  'Daggers',
  'Wands',
  'One Hand Swords',
  // 'Rings', value: 10 }, thrusting
  'One Hand Axes',
  'One Hand Maces',
  'Bows',
  'Staves',
  'Two Hand Swords',
  'Two Hand Maces',
  'Quivers',
  'Belts',
  'Gloves',
  'Boots',
  'Body Armours',
  'Helmets',
  'Shields',
  'Sceptres'
];

// usually everything in poe is rounded down but in this case
// it's done properly
// evidence: life regen rolls 60 - 120 which would result in (1-2)
// Alyways rounding down would result in virtually no 2 rolls.
// but there are currenty ~300 amulets with 2 and ~160 with 1 listed on poe.trade
// reason beeing that the next tier rolls 121-180.
export const formatters: { [key: string]: Formatter } = {
  deciseconds_to_seconds: n => n * 10,
  divide_by_two_0dp: n => (n / 2).toFixed(0),
  divide_by_ten_0dp: n => (n / 10).toFixed(0),
  divide_by_fifteen_0dp: n => (n / 15).toFixed(0),
  divide_by_twenty_then_double_0dp: n => Math.floor(n / 20) * 2,
  divide_by_one_hundred: n => n / 100,
  divide_by_one_hundred_2dp: n => (n / 100).toFixed(2),
  per_minute_to_per_second: n => Math.round(n / 60),
  milliseconds_to_seconds: n => n / 1000,
  negate: n => -n,
  divide_by_one_hundred_and_negate: n => -n / 100,
  old_leech_percent: n => n / 5,
  old_leech_permyriad: n => n / 50,
  per_minute_to_per_second_0dp: n => (n / 60).toFixed(0),
  per_minute_to_per_second_2dp: n => (n / 60).toFixed(2),
  per_minute_to_per_second_2dp_if_required: n =>
    (n / 60).toFixed(2).replace(/\.?0*$/, ''),
  milliseconds_to_seconds_0dp: n => (n / 1000).toFixed(0),
  milliseconds_to_seconds_2dp: n => (n / 1000).toFixed(2),
  multiplicative_damage_modifier: n => n,
  '60%_of_value': n => n * 0.6,
  id: n => n,
  mod_value_to_item_class: n => item_classes[n % item_classes.length],
  canonical_stat: n => n,
  placeholder: () => '#'
};

export const inverse_formatters: { [key: string]: (s: string) => number } = {
  deciseconds_to_seconds: s => +s / 10,
  divide_by_two_0dp: s => +s * 2,
  divide_by_ten_0dp: s => +s * 10,
  divide_by_fifteen_0dp: s => +s * 15,
  divide_by_twenty_then_double_0dp: s => +s * 10,
  divide_by_one_hundred: s => +s * 100,
  divide_by_one_hundred_2dp: s => +s * 100,
  per_minute_to_per_second: s => +s * 60,
  milliseconds_to_seconds: s => +s * 1000,
  negate: s => -s,
  divide_by_one_hundred_and_negate: s => -s * 100,
  old_leech_percent: s => +s * 5,
  old_leech_permyriad: s => +s * 50,
  per_minute_to_per_second_0dp: s => +s * 60,
  per_minute_to_per_second_2dp: s => +s * 60,
  per_minute_to_per_second_2dp_if_required: s => +s * 60,
  milliseconds_to_seconds_0dp: s => +s * 1000,
  milliseconds_to_seconds_2dp: s => +s * 1000,
  multiplicative_damage_modifier: s => +s,
  '60%_of_value': s => +s / 0.6,
  id: s => +s,
  mod_value_to_item_class: item_class => item_classes.indexOf(item_class),
  canonical_stat: s => +s,
  placeholder: s => Number.NaN
};

const number = '-?\\d+';
// "reverse" of {formatters}
const formatter_regexp: { [key: string]: string } = {
  deciseconds_to_seconds: number,
  divide_by_two_0dp: number,
  divide_by_ten_0dp: number,
  divide_by_fifteen_0dp: number,
  divide_by_twenty_then_double_0dp: number,
  divide_by_one_hundred: `${number}\\.?\\d{0,2}`,
  divide_by_one_hundred_2dp: `${number}\\.\\d{2}`,
  per_minute_to_per_second: number,
  milliseconds_to_seconds: `${number}\\.?\\d{0,3}`,
  negate: number,
  divide_by_one_hundred_and_negate: `${number}\\.?\\d{0,2}`,
  old_leech_percent: `${number}\\.?\\d{0,2}`,
  old_leech_permyriad: `${number}\\.?\\d{0,2}`,
  per_minute_to_per_second_0dp: number,
  per_minute_to_per_second_2dp: `${number}\\.\\d{2}`,
  per_minute_to_per_second_2dp_if_required: `${number}\\.?\\d{0,2}`,
  milliseconds_to_seconds_0dp: number,
  milliseconds_to_seconds_2dp: `${number}\\.?\\d{2}`,
  multiplicative_damage_modifier: number,
  '60%_of_value': `${number}\\.?\\d*`,
  id: number,
  mod_value_to_item_class: '.+?',
  // TODO what is this
  canonical_stat: number,
  placeholder: '#'
};

export function inverseFactory(formatter_id: string): (s: string) => number {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const inverse = inverse_formatters[formatter_id];

  // TODO add ranges

  return inverse;
}

export function regexpFactory(formatter_id: string): string {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const formatter = formatter_regexp[formatter_id];

  // TODO add ranges

  return formatter;
}

export default function factory(
  formatter_id: string
): (value: StatValue) => string {
  if (!formatters.hasOwnProperty(formatter_id)) {
    throw new Error(`'${formatter_id}' not found`);
  }

  const formatter = formatters[formatter_id];

  return (value: StatValue) => {
    if (isRange(value)) {
      if (value[0] === value[1]) {
        return String(formatter(value[0]));
      } else {
        return `(${formatter(value[0])} - ${formatter(value[1])})`;
      }
    } else {
      return String(formatter(value));
    }
  };
}
