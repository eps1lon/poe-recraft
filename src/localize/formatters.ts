import { isRange, StatValue } from '../types/StatValue';

export type Formatter = (value: number) => number | string;

// usually everything in poe is rounded down but in this case
// it's done properly
// evidence: life regen rolls 60 - 120 which would result in (1-2)
// Alyways rounding down would result in virtually no 2 rolls.
// but there are currenty ~300 amulets with 2 and ~160 with 1 listed on poe.trade
// reason beeing that the next tier rolls 121-180.
const formatters: { [key: string]: Formatter } = {
  deciseconds_to_seconds: n => n * 10,
  divide_by_one_hundred: n => n / 100,
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
  id: n => n
};

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
