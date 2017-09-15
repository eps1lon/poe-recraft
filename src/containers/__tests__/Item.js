// @flow
import { Item } from '../';
import { Mod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greavesProps = findByPrimary(baseitemtypes, 1650);

const ofBrute = new Mod(findByPrimary(mods, 0));
const sturdy = new Mod(findByPrimary(mods, 1465));
const plusLevel = new Mod(findByPrimary(mods, 5215));
const bladesOnHit = new Mod(findByPrimary(mods, 7058));
const craftedCastSpeed = new Mod(findByPrimary(mods, 5653));

it('should build', () => {
  const item = Item.build(greavesProps, meta_datas);

  expect(item).toBeInstanceOf(Item);
});

it('should know to which container it should add', () => {
  const item = Item.build(greavesProps, meta_datas).setRarity('rare');

  expect(item.implicits.mods).toHaveLength(0);
  expect(item.addMod(sturdy).implicits.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).implicits.mods).toHaveLength(1);

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
});

it('should also not hold duplicate mods', () => {
  const item = Item.build(greavesProps, meta_datas).setRarity('rare');

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
  expect(item.addMod(sturdy).addMod(ofBrute).affixes.mods).toHaveLength(2);
  expect(
    item
      .addMod(sturdy)
      .addMod(ofBrute)
      .addMod(sturdy).affixes.mods,
  ).toHaveLength(2);
});

it('should only remove affixes', () => {
  const item = Item.build(greavesProps, meta_datas)
    .setRarity('rare')
    .addMod(plusLevel)
    .addMod(sturdy);

  expect(item.implicits.mods).toHaveLength(1);
  expect(item.affixes.mods).toHaveLength(1);

  expect(item.removeAllMods().affixes.mods).toHaveLength(0);
  expect(item.removeAllMods().implicits.mods).toHaveLength(1);
});

it('should consider the tags of meta data, baseitem and its mods', () => {
  const item = Item.build(greavesProps, meta_datas).setRarity('rare');

  expect(item.getTags()).toHaveLength(4);
  expect(item.addMod(craftedCastSpeed).getTags()).toHaveLength(5);

  const paganWand = Item.build(
    findByPrimary(baseitemtypes, 1011),
    meta_datas,
  ).setRarity('rare');

  expect(paganWand.getTags()).toHaveLength(8);
});
