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
