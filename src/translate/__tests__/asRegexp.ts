import { Translation } from '../../types/StatDescription';
import asRegexp from '../asRegexp';
import printf from '../printf';

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

it('can handle multiple parameters', () => {
  const translation = {
    matchers: ['#', '#'],
    text: 'Adds %1% to %2% Physical Damage to Attacks',
    formatters: []
  } as Translation;
  const translated = printf(translation.text, [5, 50], translation.formatters);
  const regexp = asRegexp(translation);
  const match = regexp.match(translated);

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('5');
  expect(match!['2']).toEqual('50');
});

it('ignores regexp modifiers', () => {
  const translation = {
    matchers: [[1, '#']],
    // interesting part here is the '+' which is a regexp modifier
    // without escaping this new RegExp would throw because there is
    // nothing to repeat
    text: '+1 to Level of Socketed Active Skill Gems per %1% Player Levels',
    formatters: []
  } as Translation;
  const translated = printf(translation.text, [10], translation.formatters);
  const regexp = asRegexp(translation);
  const match = regexp.match(translated);

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('10');
});

it('can handle negative numbers', () => {
  const translation = {
    matchers: ['#'],
    text: 'Cannot roll Mods with Required Level above %1%',
    formatters: []
  } as Translation;
  const translated = printf(
    translation.text,
    [-523234],
    translation.formatters
  );
  const regexp = asRegexp(translation);
  const match = regexp.match(translated);

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('-523234');
});

it('only matches hole words', () => {
  const translation = {
    matchers: ['#'],
    text: '1%% increased Movement Speed per %1% Evasion Rating, up to 100%%',
    formatters: []
  } as Translation;

  const regexp = asRegexp(translation);
  expect(regexp.match('1% increased Movement Speed')).toEqual(null);

  const match = regexp.match(
    '1% increased Movement Speed per 5 Evasion Rating, up to 100%'
  );

  expect(match).not.toEqual(null);
  expect(match!['1']).toEqual('5');
});
