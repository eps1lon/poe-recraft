// @flow
import EnchantmentBench from '../EnchantmentBench';
import { Item } from '../../containers/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

it('should build', () => {
  const bench = EnchantmentBench.build(mods);

  expect(bench).toBeInstanceOf(EnchantmentBench);
});

it('should only have prefixes and suffixes', () => {
  const bench = EnchantmentBench.build(mods);

  expect(bench.getAvailableMods().every(mod => mod.isEnchantment())).toBe(true);
});

it('should add an enchantment while preserving props', () => {
  const bench = EnchantmentBench.build(mods);

  const boots = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  const crafted_boots = bench.applyTo(boots);

  expect(crafted_boots).not.toBe(boots);
  expect(crafted_boots.props).toEqual(boots.props);
  expect(crafted_boots.implicits.mods).toHaveLength(1);
  expect(crafted_boots.implicits.mods[0].isEnchantment()).toBe(true);

  const gloves = Item.build(findByPrimary(baseitemtypes, 1761), meta_datas);

  expect(gloves.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_gloves = bench.applyTo(gloves);

  expect(crafted_gloves).not.toBe(gloves);
  expect(crafted_gloves.props).toEqual(gloves.props);
  expect(crafted_gloves.implicits.mods).toHaveLength(1);
  expect(crafted_gloves.implicits.mods[0].isEnchantment()).toBe(true);

  const helmet = Item.build(findByPrimary(baseitemtypes, 1544), meta_datas);

  expect(helmet.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_helmet = bench.applyTo(helmet);

  expect(crafted_helmet).not.toBe(helmet);
  expect(crafted_helmet.props).toEqual(helmet.props);
  expect(crafted_helmet.implicits.mods).toHaveLength(1);
  expect(crafted_helmet.implicits.mods[0].isEnchantment()).toBe(true);
});
