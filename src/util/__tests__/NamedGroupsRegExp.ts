import NamedGroupsRegexp from '../NamedGroupsRegexp';

it('maps index based groups to named groups', () => {
  const regexp = new NamedGroupsRegexp(/([0-9]+) ([a-z]+)/, [
    'numbers',
    'strings'
  ]);

  expect(regexp.match('15 apples')).toEqual({
    numbers: '15',
    strings: 'apples'
  });
});

it('throws if named grousp count doesnt match index based groups', () => {
  const underflow = new NamedGroupsRegexp(/([0-9]+) ([a-z]+)/, ['numbers']);
  expect(() => underflow.match('15 apples')).toThrow();

  const overflow = new NamedGroupsRegexp(/([0-9]+) ([a-z]+)/, [
    'numbers',
    'strings',
    'to_much'
  ]);
  expect(() => overflow.match('15 apples')).toThrow();
});
