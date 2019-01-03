import { asPercentString } from '../number';

it('rounds down by default', () => {
  expect(asPercentString(12)).toBe('12');
  expect(asPercentString(12, 0)).toBe('12');
});

it('has fixed precisision after comma', () => {
  expect(asPercentString(1234, 1)).toBe('123.4');
  expect(asPercentString(1230, 2)).toBe('12.30');
  expect(asPercentString(1200, 2)).toBe('12.00');
});
