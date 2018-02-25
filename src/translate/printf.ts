import { formatValues } from '../localize/formatValues';
import { Formatter } from '../types/StatDescription';

export type Params = Array<number | [number, number]>;
type PreparedParams = Array<number | string>;

export default function printf(
  text: string,
  params: Params,
  formatters: Formatter[] = []
): string {
  const prepared = formatValues(params, { formatters });

  return prepared
    .reduce(
      (formatted, param, i) =>
        formatted
          .replace(new RegExp(`%${i + 1}%`, 'g'), String(param))
          .replace(`%${i + 1}$+d`, `+${String(param)}`),
      text
    )
    .replace(/%%/g, '%');
}
