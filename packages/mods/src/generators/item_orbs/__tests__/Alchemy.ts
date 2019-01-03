import { createTables } from '../../../__fixtures__/util';

import Alchemy from '../Alchemy';

const { items, mods } = createTables();

const greaves = items.fromName('Iron Greaves');

it('should build', () => {
  const alchemy = Alchemy.build(mods.all());

  expect(alchemy).toBeInstanceOf(Alchemy);
});

it('should only have prefixes and suffixes', () => {
  const alchemy = Alchemy.build(mods.all());

  expect(
    alchemy.getAvailableMods().every(mod => mod.isPrefix() || mod.isSuffix()),
  ).toBe(true);
});

it('should only apply to white items', () => {
  const alchemy = Alchemy.build(mods.all());

  expect(greaves.rarity.toString()).toBe('normal');

  expect(alchemy.applicableTo(greaves)).toEqual({
    not_white: false,
    corrupted: false,
    mirrored: false,
  });

  expect(alchemy.applicableTo(greaves.rarity.set('magic'))).toEqual({
    not_white: true,
    corrupted: false,
    mirrored: false,
  });
});
