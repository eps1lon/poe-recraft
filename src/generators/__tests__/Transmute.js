// @flow
import Transmute from '../Transmute';
import { Item } from '../../containers/';
import { anySet } from '../../util/Flags';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

it('should build', () => {
  const transmute = Transmute.build(mods);

  expect(transmute).toBeInstanceOf(Transmute);
});

it('should only have prefixes and suffixes', () => {
  const transmute = Transmute.build(mods);

  expect(
    transmute.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to white items', () => {
  const transmute = Transmute.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(transmute.applicableTo(greaves)).toEqual({
    not_white: false,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
  });

  expect(transmute.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_white: true,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
  });
});

it('should add mods while upgrading the item to magic', () => {
  const transmute = Transmute.build(mods);
  const craftable = greaves;

  expect(anySet(transmute.applicableTo(craftable))).toBe(false);

  const crafted = transmute.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.setRarity('magic').props);
  expect(crafted.mods.length).toBeGreaterThan(0);
});
