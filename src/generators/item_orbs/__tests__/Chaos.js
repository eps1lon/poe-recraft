// @flow
import Chaos from '../Chaos';
import { Item } from '../../../containers/';
import { findByPrimary } from '../../../__fixtures__/util';

const baseitemtypes = require('../../../__fixtures__/baseitemtypes.json');
const mods = require('../../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650));

it('should build', () => {
  const chaos = Chaos.build(mods);

  expect(chaos).toBeInstanceOf(Chaos);
});

it('should only have prefixes and suffixes', () => {
  const chaos = Chaos.build(mods);

  expect(
    chaos.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to rare items', () => {
  const chaos = Chaos.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(chaos.applicableTo(greaves)).toEqual({
    not_rare: true,
    corrupted: false,
    mirrored: false,
  });

  expect(chaos.applicableTo(greaves.setRarity('rare'))).toEqual({
    not_rare: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should reroll mods', () => {
  const chaos = Chaos.build(mods);
  const craftable = greaves.setRarity('rare');

  expect(craftable.mods).toHaveLength(0);

  const crafted = chaos.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.props);
  expect(crafted.mods).not.toBe(craftable.mods);
  expect(crafted.mods.length).toBeGreaterThan(2);
});
