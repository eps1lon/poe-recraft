import Formatter from './Formatter';
import { NUMBER } from './regexp_util';

/** usually everything in poe is rounded down but in this case
 * it's done properly
 * evidence: life regen rolls 60 - 120 which would result in (1-2)
 * Alyways rounding down would result in virtually no 2 rolls.
 * but there are currenty ~300 amulets with 2 and ~160 with 1 listed on poe.trade
 * reason beeing that the next tier rolls 121-180.
 */
const per_minute_to_per_second: Formatter = {
  format: n => `${Math.round(n / 60)}`,
  inverse: s => +s * 60,
  regexp: NUMBER,
  negates: false,
};

export default per_minute_to_per_second;
