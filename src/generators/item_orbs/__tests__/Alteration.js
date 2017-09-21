// @flow
import Alteration from '../Alteration';
import { Item } from '../../../containers/';

Item.all = require('../../../__fixtures__/baseitemtypes.json');
const mods = require('../../../__fixtures__/mods.json');

const greaves = Item.fromPrimary(1650);

it('should build', () => {
  const alteration = Alteration.build(mods);

  expect(alteration).toBeInstanceOf(Alteration);
});

it('should only have prefixes and suffixes', () => {
  const alteration = Alteration.build(mods);

  expect(
    alteration
      .getAvailableMods()
      .every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to blue items', () => {
  const alteration = Alteration.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(alteration.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });

  expect(alteration.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should reroll mods', () => {
  const alteration = Alteration.build(mods);
  const craftable = greaves.setRarity('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = alteration.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.props);
  expect(crafted.mods).not.toBe(craftable.mods);
});
