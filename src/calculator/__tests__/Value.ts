import Stat from '../Stat';
import Value from '../Value';

it('should match tags', () => {
  const local_armour = new Value([0, 0], ['local', 'defences', 'armour']);

  expect(
    local_armour.augmentableBy(
      new Stat({
        id: 'local_base_physical_damage_reduction_rating',
      }),
    ),
  ).toBe(true);
  expect(
    local_armour.augmentableBy(
      new Stat({
        id: 'local_evasion_and_energy_shield_+%',
      }),
    ),
  ).toBe(false);

  const local_shield = new Value([0, 0], ['local', 'block']);
  expect(
    local_shield.augmentableBy(
      new Stat({
        id: 'additional_block_%',
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
      },
      [100, 200],
    ),
    new Stat(
      {
        id: 'local_armour_and_energy_shield_+%',
      },
      [10, 20],
    ),
  ]);

  expect(augmented.modifiers).toHaveLength(2);

  const computed = augmented.compute();
  expect(computed.range.min).toBeCloseTo(110, 5);
  expect(computed.range.max).toBeCloseTo(240, 5);
});

it('should consider its precision', () => {
  const armour = new Value(
    [0, 0],
    ['local', 'defences', 'armour'],
  ).augmentWith([
    new Stat(
      {
        id: 'local_base_physical_damage_reduction_rating',
      },
      [1, 2],
    ),
    new Stat(
      {
        id: 'local_physical_damage_reduction_rating_+%',
      },
      [10, 20],
    ),
  ]);

  expect(armour.compute(0).value).toEqual([1, 2]);
  expect(armour.compute(1).value).toEqual([1.1, 2.4]);

  expect(new Value([1.005, 1.005]).compute(3).value).toEqual(1.005);
  expect(new Value([1.005, 1.005]).compute(4).value).toEqual(1.005);
});
