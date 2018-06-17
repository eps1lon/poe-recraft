import { formatValue } from '../formatValues';

const negate = { id: 'negate', arg: 1 };

it('can format single values', () => {
  expect(formatValue(1)).toEqual('1');
  expect(formatValue(-1, { formatter: negate })).toEqual('1');
});
it('treates ranges with equal values as a single value', () => {
  expect(formatValue([-2, -2])).toEqual('-2');
  expect(formatValue([-2, -2], { formatter: negate })).toEqual('2');
  expect(formatValue([2, 2])).toEqual('2');
});
it('can format ranges and rearanges to a sensible order', () => {
  expect(formatValue([-2, 1])).toEqual('-2–1');
  expect(formatValue([1, -2])).toEqual('-2–1');
  expect(formatValue([-3, -2])).toEqual('-3–-2');
  expect(formatValue([-2, -3])).toEqual('-3–-2');

  expect(formatValue([-2, 1], { formatter: negate })).toEqual('-1–2');
  expect(formatValue([1, -2], { formatter: negate })).toEqual('-1–2');
  expect(formatValue([-3, -2], { formatter: negate })).toEqual('2–3');
  expect(formatValue([-2, -3], { formatter: negate })).toEqual('2–3');
});
