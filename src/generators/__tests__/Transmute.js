// @flow
import Transmute from '../Transmute';
import { Item } from '../../containers/';
import { RollableMod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

it('should build', () => {
  const transmute = Transmute.build(mods);

  expect(transmute).toBeInstanceOf(Transmute);
});

it('should have a mods getter which will prevent mutation', () => {
  const transmute = Transmute.build(mods);

  const available_mods = transmute.getAvailableMods();

  expect(available_mods.length).toBeGreaterThan(0);
  expect(available_mods).not.toBe(transmute.mods);
});

it('should only have prefixes and suffixes', () => {
  const transmute = Transmute.build(mods);

  expect(
    transmute.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to white items', () => {
  const transmute = Transmute.build(mods);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  expect(greaves.props.rarity).toBe('normal');

  expect(transmute.applicableTo(greaves)).toEqual({
    not_white: false,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
  });
});
