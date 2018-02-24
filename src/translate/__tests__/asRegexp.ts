import asRegexp from '../asRegexp';
import printf from '../printf';
import { Translation } from '../../types/StatDescription';

it('generates a regexp for printf', () => {
  const translation = {
    matchers: [[1, '#']],
    text: '%1%%% increased Effect of Socketed Jewels',
    formatters: []
  } as Translation;
  const translated = printf(translation.text, [5], translation.formatters);
  const regexp = new RegExp(asRegexp(translation));
  const match = translated.match(regexp);

  expect(match).not.toEqual(null);
  expect((match as RegExpMatchArray)[1]).toEqual('5');
});
