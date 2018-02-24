import asRegexp from '../asRegexp';
import printf from '../printf';
import { Translation } from '../../types/StatDescription';

import NamedGroupsRegexp from '../../util/NamedGroupsRegexp';

it('generates a regexp for printf', () => {
  const translation = {
    matchers: [[1, '#']],
    text: '%1%%% increased Effect of Socketed Jewels',
    formatters: []
  } as Translation;
  const translated = printf(translation.text, [5], translation.formatters);
  const regexp = asRegexp(translation);
  const match = regexp.match(translated);

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('5');
});

it('works with modifiers', () => {
  const translation = {
    matchers: [[1, '#']],
    text: '%1$+d to maximum Life',
    formatters: []
  } as Translation;
  const translated = printf(translation.text, [5], translation.formatters);
  const regexp = asRegexp(translation);
  const match = regexp.match(translated);

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('5');
});
