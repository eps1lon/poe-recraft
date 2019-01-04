import { createTables } from '../../../__fixtures__/util';
import Vaal from '../Vaal';

const { items, mods } = createTables();

const greaves = items.fromName('Iron Greaves');

it('should build', () => {
  const vaal = Vaal.build(mods.all());

  expect(vaal).toBeInstanceOf(Vaal);
  expect(vaal.mods.length).toBeGreaterThan(0);
});

it('should only have vaal mods', () => {
  const vaal = Vaal.build(mods.all());

  expect(vaal.getAvailableMods().every(mod => mod.implicitCandidate())).toBe(
    true,
  );
});

it('should add an implicit while corrupting', () => {
  const vaal = Vaal.build(mods.all());
  const craftable = greaves;

  const crafted = vaal.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props.corrupted).toBe(true);
  expect(crafted.implicits).not.toBe(craftable.implicits);
  expect(crafted.implicits.mods).toHaveLength(1);
});
