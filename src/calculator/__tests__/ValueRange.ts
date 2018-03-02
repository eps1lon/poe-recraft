import ValueRange from '../ValueRange';

it('should not change if identity operations are performed', () => {
  const orig: ValueRange = new ValueRange([5, 5]);

  expect(orig.add(new ValueRange([0, 0]))).toBe(orig);
  expect(orig.add(new ValueRange([0, 1]))).not.toBe(orig);

  expect(orig.mult(new ValueRange([1, 1]))).toBe(orig);
  expect(orig.mult(new ValueRange([1, 1.1]))).not.toBe(orig);
});

it('should return a single value if min and max are equal', () => {
  expect(new ValueRange([1, 3]).valueOf()).toEqual([1, 3]);
  expect(new ValueRange([3, 3]).valueOf()).toEqual(3);
  expect(new ValueRange([3, 3]).mult([2, 3]).valueOf()).toEqual([6, 9]);
  expect(new ValueRange([10, 10]).mult(1 / 3).valueOf()).toEqual(10 * (1 / 3));
});
