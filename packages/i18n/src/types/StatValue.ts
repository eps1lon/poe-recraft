// e.g. (5–10) with en dash for number range
export type StatValue = number | Range;
export type Range = [number, number];

export const isRange = (value: StatValue): value is Range =>
  Array.isArray(value) && value.length === 2;

export const isZero = (value: StatValue): boolean =>
  isRange(value) ? value[0] === 0 && value[1] === 0 : value === 0;
