export type StatValue = number | Range;
export type Range = [number, number];

export const isRange = (value: StatValue): value is Range =>
  Array.isArray(value) && value.length === 2;
