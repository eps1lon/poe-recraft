import Exalted from '../Exalted';
import { Item } from '../../containers/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

it('should build', () => {
  const exalted = Exalted.build(mods);

  expect(exalted).toBeInstanceOf(Exalted);
});

it('should only have prefixes and suffixes', () => {
  const exalted = Exalted.build(mods);

  expect(
    exalted.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to rare items', () => {
  const exalted = Exalted.build(mods);

  expect(greaves.props.rarity).toBe('normal');

  expect(exalted.applicableTo(greaves)).toEqual({
    not_rare: true,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
  });

  expect(exalted.applicableTo(greaves.setRarity('rare'))).toEqual({
    not_rare: false,
    corrupted: false,
    mirrored: false,
    not_an_item: false,
  });
});

it('should add one mod', () => {
  const exalted = Exalted.build(mods);
  const craftable = greaves.setRarity('rare');

  expect(craftable.mods).toHaveLength(0);

  const crafted = exalted.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.setRarity('rare').props);
  expect(crafted.mods).toHaveLength(1);

  const twice_crafted = exalted.applyTo(crafted);

  expect(twice_crafted).not.toBe(crafted);
  expect(twice_crafted.props).toEqual(craftable.setRarity('rare').props);
  expect(twice_crafted.mods).toHaveLength(2);

  const thrice_crafted = exalted.applyTo(twice_crafted);

  expect(thrice_crafted).not.toBe(crafted);
  expect(thrice_crafted.props).toEqual(craftable.setRarity('rare').props);
  expect(thrice_crafted.mods).toHaveLength(3);
});
