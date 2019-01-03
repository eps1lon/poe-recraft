import { isZero, anyCmp } from '../AugmentableValue';

describe('isZero', () => {
  it('returns true if bottom value is given', () => {
    expect(isZero(undefined)).toBe(true);
    expect(isZero(null)).toBe(true);
  });

  it('returns true if range or single value is 0', () => {
    expect(isZero({ value: 0 })).toBe(true);
    expect(isZero({ value: [0, 0] })).toBe(true);
  });

  it('returns false if any part of the value is unequal 0', () => {
    expect(isZero({ value: -1 })).toBe(false);
    expect(isZero({ value: 1 })).toBe(false);
    expect(isZero({ value: 200324 })).toBe(false);
    expect(isZero({ value: [0, 1] })).toBe(false);
    expect(isZero({ value: [2, -3] })).toBe(false);
  });
});

describe('anyCmp', () => {
  it('works for single value', () => {
    expect(anyCmp({ value: 1 }, n => n < 1)).toBe(false);
    expect(anyCmp({ value: 1 }, n => n >= 1)).toBe(true);
  });

  it('returns true if any value of the ranges returns true', () => {
    expect(anyCmp({ value: [0, 2] }, n => n < 1)).toBe(true);
    expect(anyCmp({ value: [-2, 0] }, n => n < 1)).toBe(true);
    expect(anyCmp({ value: [1, 3] }, n => n < 1)).toBe(false);
  });
});
