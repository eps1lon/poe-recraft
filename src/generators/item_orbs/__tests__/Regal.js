// @flow
import Regal from '../Regal';
import { Item } from '../../../containers/';

Item.all = require('../../../__fixtures__/baseitemtypes.json');
const mods = require('../../../__fixtures__/mods.json');

const greaves = Item.fromPrimary(1650);

it('should build', () => {
  const regal = Regal.build(mods);

  expect(regal).toBeInstanceOf(Regal);
});

it('should only have prefixes and suffixes', () => {
  const regal = Regal.build(mods);

  expect(
    regal.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to magic items', () => {
  const regal = Regal.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(regal.applicableTo(greaves)).toEqual({
    not_magic: true,
    corrupted: false,
    mirrored: false,
  });

  expect(regal.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should add mods while upgrading the item to rare', () => {
  const regal = Regal.build(mods);
  const craftable = greaves.setRarity('magic');

  expect(craftable.mods).toHaveLength(0);

  const crafted = regal.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.setRarity('rare').props);
  expect(crafted.mods.length).toBeGreaterThan(0);
});
