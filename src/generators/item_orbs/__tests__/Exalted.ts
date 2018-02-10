import { createTables } from '../../../__fixtures__/util';
import Exalted from '../Exalted';

const { items, mods } = createTables();

const greaves = items.fromName('Iron Greaves');

it('should build', () => {
  const exalted = Exalted.build(mods.all());

  expect(exalted).toBeInstanceOf(Exalted);
});

it('should only have prefixes and suffixes', () => {
  const exalted = Exalted.build(mods.all());

  expect(
    exalted.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to rare items', () => {
  const exalted = Exalted.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(exalted.applicableTo(greaves)).toEqual({
    not_rare: true,
    corrupted: false,
    mirrored: false,
  });
  expect(exalted.applyTo(greaves)).toBe(greaves);

  expect(exalted.applicableTo(greaves.rarity.set('rare'))).toEqual({
    not_rare: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should add one mod', () => {
  const exalted = Exalted.build(mods.all());
  const craftable = greaves.rarity.set('rare');

  expect(craftable.mods).toHaveLength(0);

  const crafted = exalted.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.rarity.set('rare').props);
  expect(crafted.mods).toHaveLength(1);

  const twice_crafted = exalted.applyTo(crafted);

  expect(twice_crafted).not.toBe(crafted);
  expect(twice_crafted.props).toEqual(craftable.rarity.set('rare').props);
  expect(twice_crafted.mods).toHaveLength(2);

  const thrice_crafted = exalted.applyTo(twice_crafted);

  expect(thrice_crafted).not.toBe(crafted);
  expect(thrice_crafted.props).toEqual(craftable.rarity.set('rare').props);
  expect(thrice_crafted.mods).toHaveLength(3);
});
