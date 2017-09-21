// @flow
import EnchantmentBench from '../EnchantmentBench';
import { Item } from '../../../containers/';

Item.all = require('../../../__fixtures__/baseitemtypes.json');
const mods = require('../../../__fixtures__/mods.json');

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

  const boots = Item.fromPrimary(1650);

  const crafted_boots = bench.applyTo(boots);

  expect(crafted_boots).not.toBe(boots);
  expect(crafted_boots.props).toEqual(boots.props);
  expect(crafted_boots.implicits.mods).toHaveLength(1);
  expect(crafted_boots.implicits.mods[0].isEnchantment()).toBe(true);

  const gloves = Item.fromPrimary(1761);

  expect(gloves.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_gloves = bench.applyTo(gloves);

  expect(crafted_gloves).not.toBe(gloves);
  expect(crafted_gloves.props).toEqual(gloves.props);
  expect(crafted_gloves.implicits.mods).toHaveLength(1);
  expect(crafted_gloves.implicits.mods[0].isEnchantment()).toBe(true);

  const helmet = Item.fromPrimary(1544);

  expect(helmet.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_helmet = bench.applyTo(helmet);

  expect(crafted_helmet).not.toBe(helmet);
  expect(crafted_helmet.props).toEqual(helmet.props);
  expect(crafted_helmet.implicits.mods).toHaveLength(1);
  expect(crafted_helmet.implicits.mods[0].isEnchantment()).toBe(true);
});
