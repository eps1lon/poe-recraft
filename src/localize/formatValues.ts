import { Formatter } from '../types/StatDescription';
import { StatValue } from '../types/StatValue';
import formatFactory from './formatters';

export type Options = {
  formatter?: Formatter;
  formatters?: Formatter[];
};

export function formatValues(values: StatValue[], options: Options): string[] {
  const { formatters } = options;

  if (formatters === undefined) {
    throw new Error('formatters not set');
  }

  const formatted: Array<StatValue | string> = [...values];

  formatters.forEach((formatter, i) => {
    if (typeof formatter.arg === 'number') {
      const target_param = values[+formatter.arg - 1];

      if (target_param !== undefined) {
        formatted[+formatter.arg - 1] = formatValue(target_param, {
          formatter
        });
      } else {
        throw new Error(`no param given for formatter '${formatter.id}'`);
      }
    }
  });

  return formatted.map(
    value =>
      typeof value === 'string'
        ? value
        : formatValue(value, { formatter: { id: 'id', arg: 1 } })
  );
}

export function formatValue(value: StatValue, options: Options): string {
  const { formatter } = options;

  if (formatter === undefined) {
    throw new Error('no formatter given');
  }

  return String(formatFactory(formatter.id)(value));
}
