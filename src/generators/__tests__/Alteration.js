// @flow
import Alteration from '../Alteration';
import { Item } from '../../containers/';
import { anySet } from '../../Flags';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

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
    not_an_item: false,
  });

  expect(alteration.applicableTo(greaves.setRarity('magic'))).toEqual({
    not_magic: false,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
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
