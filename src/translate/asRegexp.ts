import { Translation } from '../types/StatDescription';
import { regexpFactory } from '../localize/formatters';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';

export default function asRegexp(translation: Translation): NamedGroupsRegexp {
  const { formatters, text } = translation;
  const groups: string[] = [];

  const regexp = text
    .replace(/%(\d+)(\$\+)?%/, (match, arg, leading_plus) => {
      groups.push(arg);

      const formatter = formatters.find(({ arg: other }) => `${other}` === arg);
      const prefix = leading_plus ? '\\+' : '';

      if (formatter === undefined) {
        return `${prefix}(\\d+)`;
      } else {
        return `${prefix}(${regexpFactory(formatter.id)})`;
      }
    })
    .replace('%%', '%');

  return new NamedGroupsRegexp(new RegExp(regexp), groups);
}
