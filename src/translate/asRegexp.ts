import { Translation } from '../types/StatDescription';
import { regexpFactory } from '../localize/formatters';

export default function asRegexp(translation: Translation): string {
  const { formatters, text } = translation;

  return text
    .replace(/%(\d+)(\$\+)?%/, (match, arg, leading_plus) => {
      const formatter = formatters.find(({ arg: other }) => `${other}` === arg);
      const prefix = leading_plus ? '\\+' : '';

      if (formatter === undefined) {
        return `${prefix}(\\d+)`;
      } else {
        return `${prefix}(${regexpFactory(formatter.id)})`;
      }
    })
    .replace('%%', '%');
}
