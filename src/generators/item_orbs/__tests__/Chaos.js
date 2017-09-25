// @flow
import { createTables } from '../../../__fixtures__/util';
import Chaos from '../Chaos';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

it('should build', () => {
  const chaos = Chaos.build(mods.all());

  expect(chaos).toBeInstanceOf(Chaos);
});

it('should only have prefixes and suffixes', () => {
  const chaos = Chaos.build(mods.all());

  expect(
    chaos.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to rare items', () => {
  const chaos = Chaos.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(chaos.applicableTo(greaves)).toEqual({
    not_rare: true,
    corrupted: false,
    mirrored: false,
  });
  expect(chaos.applyTo(greaves)).toBe(greaves);

  expect(chaos.applicableTo(greaves.rarity.set('rare'))).toEqual({
    not_rare: false,
    corrupted: false,
    mirrored: false,
  });
});

it('should reroll mods', () => {
  const chaos = Chaos.build(mods.all());
  const craftable = greaves.rarity.set('rare');

  expect(craftable.mods).toHaveLength(0);

  const crafted = chaos.applyTo(craftable);

  expect(crafted).not.toBe(craftable);
  expect(crafted.props).toEqual(craftable.props);
  expect(crafted.mods).not.toBe(craftable.mods);
  expect(crafted.mods.length).toBeGreaterThan(2);
});
