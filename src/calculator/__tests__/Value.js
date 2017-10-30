// @flow
import Stat from '../Stat';
import Value from '../Value';

it('should match tags', () => {
  const local_armour = new Value([0, 0], ['local', 'defences', 'armour']);

  expect(
    local_armour.augmentableBy(
      new Stat({
        id: 'local_base_physical_damage_reduction_rating',
        primary: -1,
      }),
    ),
  ).toBe(true);
});

it('should know about the difference between flat, inc and more', () => {
  const local_armour = new Value([0, 0], ['local', 'defences', 'armour']);

  const augmented = local_armour.augmentWith([
    new Stat(
      {
        id: 'local_base_physical_damage_reduction_rating',
        primary: -1,
      },
      [100, 200],
    ),
    new Stat(
      {
        id: 'local_physical_damage_reduction_rating_+%',
        primary: -1,
      },
      [10, 20],
    ),
  ]);

  expect(augmented.modifiers).toHaveLength(2);

  const computed = augmented.compute();
  expect(computed.min).toBeCloseTo(110, 5);
  expect(computed.max).toBeCloseTo(240, 5);
});

it('should consider its precision', () => {
  const armour = new Value(
    [0, 0],
    ['local', 'defences', 'armour'],
  ).augmentWith([
    new Stat(
      {
        id: 'local_base_physical_damage_reduction_rating',
        primary: -1,
      },
      [1, 2],
    ),
    new Stat(
      {
        id: 'local_physical_damage_reduction_rating_+%',
        primary: -1,
      },
      [10, 20],
    ),
  ]);

  expect(armour.compute(0).asTuple()).toEqual([1, 2]);
  expect(armour.compute(1).asTuple()).toEqual([1.1, 2.4]);

  expect(new Value([1.005, 1.005]).compute(3).asTuple()).toEqual([
    1.005,
    1.005,
  ]);
  expect(new Value([1.005, 1.005]).compute(4).asTuple()).toEqual([
    1.005,
    1.005,
  ]);
});
