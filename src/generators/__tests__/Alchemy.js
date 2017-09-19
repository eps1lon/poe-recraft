// @flow
import Alchemy from '../Alchemy';
import { Item } from '../../containers/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

it('should build', () => {
  const alchemy = Alchemy.build(mods);

  expect(alchemy).toBeInstanceOf(Alchemy);
});

it('should only have prefixes and suffixes', () => {
  const alchemy = Alchemy.build(mods);

  expect(
    alchemy.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to white items', () => {
  const alchemy = Alchemy.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(alchemy.applicableTo(greaves)).toEqual({
    not_white: false,
    corrupted: false,
    mirrored: false,
  });

  expect(alchemy.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_white: true,
    corrupted: false,
    mirrored: false,
  });
});
