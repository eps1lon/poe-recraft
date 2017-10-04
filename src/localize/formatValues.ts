import { Formatter } from '../types/StatDescription';
import formatFactory from './formatters';

export type Options = {
  formatter?: Formatter;
  formatters?: Formatter[];
};
export type Value = number;

export function formatValues(values: Value[], options: Options): string[] {
  const { formatters } = options;

  if (formatters === undefined) {
    throw new Error('formatters not set');
  }

  const formatted = values.map(String);

  formatters.forEach((formatter, i) => {
    if (typeof formatter.arg === 'number') {
      const target_param = values[+formatter.arg - 1];

      if (target_param !== undefined) {
        formatted[+formatter.arg - 1] = String(
          formatFactory(formatter.id)(target_param)
        );
      } else {
        throw new Error(`no param given for formatter '${formatter.id}'`);
      }
    }
    // nothing to do for strings. used in remindestring arg which doesnt alter
    // the params
  });

  return formatted;
}

export function formatValue(value: Value, options: Options): string {
  return '';
}
