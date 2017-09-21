// @flow
import Augment from '../Augment';
import { Item } from '../../../containers/';
import { findByPrimary } from '../../../__fixtures__/util';

const baseitemtypes = require('../../../__fixtures__/baseitemtypes.json');
const mods = require('../../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650));

it('should build', () => {
  const augment = Augment.build(mods);

  expect(augment).toBeInstanceOf(Augment);
});

it('should only have prefixes and suffixes', () => {
  const augment = Augment.build(mods);

  expect(
    augment.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to magic items', () => {
  const augment = Augment.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(augment.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });

  expect(augment.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should add one mods', () => {
  const augment = Augment.build(mods);
  const craftable = greaves.setRarity('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = augment.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.setRarity('magic').props);
  expect(crafted.mods).toHaveLength(1);

  const twice_crafte = augment.applyTo(crafted);

  expect(twice_crafte).not.toBe(crafted);
  expect(twice_crafte.props).toEqual(craftable.setRarity('magic').props);
  expect(twice_crafte.mods).toHaveLength(2);
});
