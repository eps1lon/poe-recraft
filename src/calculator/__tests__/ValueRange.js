import ValueRange from '../ValueRange';

it('should not change if identity operations are performed', () => {
  const orig = new ValueRange(5, 5);

  expect(orig.add(new ValueRange(0, 0))).toBe(orig);
  expect(orig.add(new ValueRange(0, 1))).not.toBe(orig);

  expect(orig.mult(new ValueRange(1, 1))).toBe(orig);
  expect(orig.mult(new ValueRange(1, 1.1))).not.toBe(orig);
});
