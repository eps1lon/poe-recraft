import formatMessage from '../format/message';
import { ICUMessageSyntax } from '../types/intl';
import { Formatter, UnaryFormatter } from '../types/StatDescription';
import { isRange, StatValue } from '../types/StatValue';
import { buildFormatter } from './formatters';

export interface FormatValuesOptions {
  formatters: Formatter[];
  message: ICUMessageSyntax;
}

export function formatValues(
  values: StatValue[],
  options: Partial<FormatValuesOptions> = {}
): string[] {
  const { formatters, message } = options;

  if (formatters === undefined) {
    throw new Error('formatters not set');
  }

  const formatted: Array<StatValue | string> = [...values];

  formatters.forEach((formatter, i) => {
    if (typeof formatter !== 'string' && typeof formatter.arg === 'number') {
      // base_chance_to_freeze% is the only exception
      // see issues #25 and #33
      const offset =
        formatter.id === 'canonical_stat' &&
        formatters.includes('canonical_line')
          ? 0
          : -1;
      const target_param = values[+formatter.arg + offset];

      if (target_param !== undefined) {
        formatted[+formatter.arg - 1] = formatValue(target_param, {
          formatter,
          message
        });
      } else {
        throw new Error(`no param given for formatter '${formatter.id}'`);
      }
    }
  });

  return formatted.map(value =>
    typeof value === 'string' ? value : formatValue(value, { message })
  );
}

export interface FormatValueOptions {
  formatter: UnaryFormatter;
  message: ICUMessageSyntax;
}
const DEFAULT_FORMATTER: UnaryFormatter = { id: 'id', arg: 1 };

export function formatValue(
  value: StatValue,
  options: Partial<FormatValueOptions> = {}
): string {
  const { formatter = DEFAULT_FORMATTER, message = '{min}–{max}' } = options;

  const { negates, format } = buildFormatter(formatter.id);

  if (isRange(value)) {
    const [min, max] = valueOrder(value, negates).map(n => format(n));
    if (min === max) {
      return min;
    } else {
      return formatMessage(message, { min, max });
    }
  } else {
    return format(value);
  }
}

/**
 * orders the given values so that the smallest displayed is min
 *
 * reduced stats are given as negative values and then negated for display
 * whichs results in [-30, -15] being displayed as "(30 - 15) reduced"
 * @param param0
 * @param negates - true if the values will be negated
 */
function valueOrder(
  [left, right]: [number, number],
  negates: boolean
): [number, number] {
  if ((left < right && !negates) || (left > right && negates)) {
    return [left, right];
  } else {
    return [right, left];
  }
}
