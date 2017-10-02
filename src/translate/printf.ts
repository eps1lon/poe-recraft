import formatFactory from '../localize/formatters';
import { Formatter } from '../types/StatDescription';

type Param = number;
type Params = Param[];
type PreparedParams = Array<number | string>;
type Formatters = Formatter[];

export default function printf(
  text: string,
  params: Params,
  formatters: Formatters = []
): string {
  const prepared = prepareParams(params, formatters);

  // reduce ignoring initial value type. tilted right now...
  let formatted = text;
  prepared.forEach((param, i) => {
    formatted = formatted
      .replace(`%${i + 1}%`, String(param))
      .replace(`%${i + 1}$+d`, `+${String(param)}`);
  });

  return formatted.replace('%%', '%');
}

function prepareParams(params: Params, formatters: Formatters): PreparedParams {
  const prepared: PreparedParams = [...params];

  formatters.forEach((formatter, i) => {
    const target_param = params[+formatter.arg - 1];

    if (target_param !== undefined) {
      prepared[+formatter.arg - 1] = formatFactory(formatter.id)(target_param);
    } else {
      throw new Error(`no param given for formatter ${i}`);
    }
  });

  return prepared;
}
