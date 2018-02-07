import { createTables } from '../../../__fixtures__/util';
import Regal from '../Regal';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

it('should build', () => {
  const regal = Regal.build(mods.all());

  expect(regal).toBeInstanceOf(Regal);
});

it('should only have prefixes and suffixes', () => {
  const regal = Regal.build(mods.all());

  expect(
    regal.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to magic items', () => {
  const regal = Regal.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(regal.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });
  expect(regal.applyTo(greaves)).toBe(greaves);

  expect(regal.applicableTo(greaves.rarity.set('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should add mods while upgrading the item to rare', () => {
  const regal = Regal.build(mods.all());
  const craftable = greaves.rarity.set('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = regal.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.rarity.set('rare').props);
  expect(crafted.mods.length).toBeGreaterThan(0);
});
