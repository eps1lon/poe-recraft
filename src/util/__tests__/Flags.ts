import { anySet } from '../Flags';

it('should consider true values not in whitelist', () => {
  expect(
    anySet({
      foo: true,
      bar: false,
    }),
  ).toBe(true);

  expect(
    anySet({
      foo: false,
      bar: false,
    }),
  ).toBe(false);

  expect(
    anySet(
      {
        foo: true,
        bar: false,
      },
      ['foo'],
    ),
  ).toBe(false);

  expect(
    anySet(
      {
        foo: true,
        bar: false,
      },
      ['bar'],
    ),
  ).toBe(true);

  expect(
    anySet(
      {
        foo: true,
        bar: true,
      },
      ['bar', 'foo'],
    ),
  ).toBe(false);
});
