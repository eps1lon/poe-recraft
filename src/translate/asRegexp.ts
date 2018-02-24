import { Translation } from '../types/StatDescription';
import { regexpFactory } from '../localize/formatters';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';

export default function asRegexp(translation: Translation): NamedGroupsRegexp {
  const { formatters, text } = translation;
  const groups: string[] = [];

  const regexp = text
    .replace(/%(\d+)(\$\+d|%)/g, (match, arg, modifier) => {
      groups.push(arg);

      const formatter = formatters.find(({ arg: other }) => `${other}` === arg);
      const prefix = modifier === '$+d' ? '\\+' : '';

      if (formatter === undefined) {
        return `${prefix}(\\d+)`;
      } else {
        return `${prefix}(${regexpFactory(formatter.id)})`;
      }
    })
    .replace('%%', '%');

  return new NamedGroupsRegexp(new RegExp(regexp), groups);
}
