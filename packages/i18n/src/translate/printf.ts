import { formatValues } from '../localize/formatValues';
import { Formatter } from '../types/StatDescription';

export type Params = Array<number | [number, number]>;

export default function printf(
  text: string,
  params: Params,
  formatters: Formatter[] = [],
  range_message = '({min}–{max})',
): string {
  const prepared = formatValues(params, { formatters, message: range_message });

  return prepared
    .reduce(
      (formatted, param, i) =>
        formatted
          .replace(new RegExp(`%${i + 1}%`, 'g'), String(param))
          .replace(`%${i + 1}$+d`, `+${String(param)}`),
      text,
    )
    .replace(/%%/g, '%');
}
