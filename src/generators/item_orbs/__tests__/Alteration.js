// @flow
import { createTables } from '../../../__fixtures__/util';

import Alteration from '../Alteration';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

it('should build', () => {
  const alteration = Alteration.build(mods.all());

  expect(alteration).toBeInstanceOf(Alteration);
});

it('should only have prefixes and suffixes', () => {
  const alteration = Alteration.build(mods.all());

  expect(
    alteration
      .getAvailableMods()
      .every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to blue items', () => {
  const alteration = Alteration.build(mods.all());

  expect(greaves.props.rarity).toBe('normal');

  expect(alteration.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });
  expect(alteration.applyTo(greaves)).toBe(greaves);

  expect(alteration.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should reroll mods', () => {
  const alteration = Alteration.build(mods.all());
  const craftable = greaves.setRarity('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = alteration.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.props);
  expect(crafted.mods).not.toBe(craftable.mods);
});
