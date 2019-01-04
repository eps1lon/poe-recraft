import { createTables } from '../../../__fixtures__/util';
import EnchantmentBench from '../EnchantmentBench';

const { items, mods } = createTables();

it('should build', () => {
  const bench = EnchantmentBench.build(mods.all());

  expect(bench).toBeInstanceOf(EnchantmentBench);
});

it('should only have prefixes and suffixes', () => {
  const bench = EnchantmentBench.build(mods.all());

  expect(bench.getAvailableMods().every(mod => mod.isEnchantment())).toBe(true);
});

it('should add an enchantment while preserving props', () => {
  const bench = EnchantmentBench.build(mods.all());

  const boots = items.fromName('Iron Greaves');

  const crafted_boots = bench.applyTo(boots);

  expect(crafted_boots).not.toBe(boots);
  expect(crafted_boots.props).toEqual(boots.props);
  expect(crafted_boots.implicits.mods).toHaveLength(1);
  expect(crafted_boots.implicits.mods[0].isEnchantment()).toBe(true);

  const gloves = items.fromName('Gripped Gloves');

  expect(gloves.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_gloves = bench.applyTo(gloves);

  expect(crafted_gloves).not.toBe(gloves);
  expect(crafted_gloves.props).toEqual(gloves.props);
  expect(crafted_gloves.implicits.mods).toHaveLength(1);
  expect(crafted_gloves.implicits.mods[0].isEnchantment()).toBe(true);

  const helmet = items.fromName('Bone Helmet');

  expect(helmet.implicits.mods[0].isEnchantment()).toBe(false);

  const crafted_helmet = bench.applyTo(helmet);

  expect(crafted_helmet).not.toBe(helmet);
  expect(crafted_helmet.props).toEqual(helmet.props);
  expect(crafted_helmet.implicits.mods).toHaveLength(1);
  expect(crafted_helmet.implicits.mods[0].isEnchantment()).toBe(true);
});
