import escapeStringRegexp from 'escape-string-regexp';

import { regexpFactory } from '../localize/formatters';
import { Translation, UnaryFormatter } from '../types/StatDescription';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';

export default function asRegexp(translation: Translation): NamedGroupsRegexp {
  const { formatters, text } = translation;
  const groups: string[] = [];

  const regexp = escapeStringRegexp(text)
    .replace(/%(\d+)(\\\$\\\+d|%)/g, (match, arg, modifier) => {
      groups.push(arg);

      const formatter = formatters
        .filter((f): f is UnaryFormatter => typeof f !== 'string')
        .find(({ arg: other }) => `${other}` === arg);
      const prefix = modifier === '\\$\\+d' ? '\\+' : '';

      if (formatter === undefined) {
        return `${prefix}(-?\\d+)`;
      } else {
        return `${prefix}(${regexpFactory(formatter.id)})`;
      }
    })
    .replace(/%%/g, '%');

  return new NamedGroupsRegexp(new RegExp(`^${regexp}$`), groups);
}
