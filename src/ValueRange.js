// @flow
export type ValueRange = [number, number];

export const add = (a: ValueRange, b: ValueRange): ValueRange => [
  a[0] + b[0],
  a[1] + b[1],
];

export const mult = (a: ValueRange, b: ValueRange): ValueRange => [
  a[0] * b[0],
  a[1] * b[1],
];
