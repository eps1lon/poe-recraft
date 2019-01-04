import { createTables } from '../../../__fixtures__/util';
import { anySet } from '../../../util/Flags';

import Transmute from '../Transmute';

const { items, mods } = createTables();

const greaves = items.fromName('Iron Greaves');

it('should build', () => {
  const transmute = Transmute.build(mods.all());

  expect(transmute).toBeInstanceOf(Transmute);
});

it('should only have prefixes and suffixes', () => {
  const transmute = Transmute.build(mods.all());

  expect(
    transmute.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to white items', () => {
  const transmute = Transmute.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(transmute.applicableTo(greaves)).toEqual({
    not_white: false,
    corrupted: false,
    mirrored: false,
  });

  expect(transmute.applicableTo(greaves.rarity.set('magic'))).toEqual({
    not_white: true,
    corrupted: false,
    mirrored: false,
  });
});

it('should add mods while upgrading the item to magic', () => {
  const transmute = Transmute.build(mods.all());
  const craftable = greaves;

  expect(anySet(transmute.applicableTo(craftable))).toBe(false);

  // random testing with seeded Math.random from jest setupFiles
  for (let i = 0; i < 5; i += 1) {
    const crafted = transmute.applyTo(craftable);
    expect(crafted).not.toBe(craftable);
    expect(crafted.props).toEqual(craftable.rarity.set('magic').props);
    expect(crafted.mods.length).toBeGreaterThan(0);
  }
});
