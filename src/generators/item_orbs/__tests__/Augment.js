// @flow
import { createTables } from '../../../__fixtures__/util';
import Augment from '../Augment';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

it('should build', () => {
  const augment = Augment.build(mods.all());

  expect(augment).toBeInstanceOf(Augment);
});

it('should only have prefixes and suffixes', () => {
  const augment = Augment.build(mods.all());

  expect(
    augment.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to magic items', () => {
  const augment = Augment.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(augment.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });
  expect(augment.applyTo(greaves)).toBe(greaves);

  expect(augment.applicableTo(greaves.rarity.set('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should add one mods', () => {
  const augment = Augment.build(mods.all());
  const craftable = greaves.rarity.set('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = augment.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.rarity.set('magic').props);
  expect(crafted.mods).toHaveLength(1);

  const twice_crafte = augment.applyTo(crafted);

  expect(twice_crafte).not.toBe(crafted);
  expect(twice_crafte.props).toEqual(craftable.rarity.set('magic').props);
  expect(twice_crafte.mods).toHaveLength(2);
});
