// @flow
import { Item } from '../';
import { Mod, RollableMod } from '../../mods/';
import Stat from '../../Stat';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greavesProps = findByPrimary(baseitemtypes, 1650);

const ofBrute = new Mod(findByPrimary(mods, 0));
const sturdy = new Mod(findByPrimary(mods, 1465));
const plusLevel = new Mod(findByPrimary(mods, 5215));
const craftedCastSpeed = new Mod(findByPrimary(mods, 5653));

it('should build with the implicits of the baseitem', () => {
  const item = Item.build(greavesProps, meta_datas);

  expect(item).toBeInstanceOf(Item);

  const gripped_gloves = Item.build(
    findByPrimary(baseitemtypes, 1761),
    meta_datas,
  );

  expect(gripped_gloves.implicits.mods).toHaveLength(1);
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

it('should make a mirrored version', () => {
  const item = Item.build(greavesProps, meta_datas);
  const mirrored = item.mirror();

  expect(mirrored).not.toBe(item);
  expect(item.props.mirrored).toBe(false);
  expect(mirrored.props.mirrored).toBe(true);
});

it('should not be mirrorable if it is already mirrored', () => {
  const item = Item.build(greavesProps, meta_datas);
  const mirrored = item.mirror();

  expect(() => mirrored.mirror()).toThrowError(
    'invalid state: is already mirrored',
  );
});

it('should make a corrupted version', () => {
  const item = Item.build(greavesProps, meta_datas);
  const corrupted = item.corrupt();

  expect(corrupted).not.toBe(item);
  expect(item.props.corrupted).toBe(false);
  expect(corrupted.props.corrupted).toBe(true);
});

it('should not be corruptable if it is already corrupted', () => {
  const item = Item.build(greavesProps, meta_datas);
  const corrupted = item.corrupt();

  expect(() => corrupted.corrupt()).toThrowError(
    'invalid state: is already corrupted',
  );
});

it('should have stats grouped by id', () => {
  const weapon = Item.build(
    findByPrimary(baseitemtypes, 1025),
    meta_datas,
  ).setRarity('rare');

  const ipd = new RollableMod(findByPrimary(mods, 793));
  const ipd_acc = new RollableMod(findByPrimary(mods, 790));

  const crafted = weapon.addMod(ipd).addMod(ipd_acc);

  expect(
    Object.entries(crafted.stats()).map(([stat_id, stat]) => {
      if (!(stat instanceof Stat)) throw new Error('stat is not a Stat');

      return {
        stat: stat_id,
        values: stat.values,
      };
    }),
  ).toEqual([
    {
      stat: 'local_physical_damage_+%',
      values: [140, 163],
    },
    {
      stat: 'local_accuracy_rating',
      values: [135, 169],
    },
    {
      stat: 'critical_strike_chance_+%',
      values: [30, 30],
    },
  ]);
});
