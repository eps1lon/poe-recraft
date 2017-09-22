// @flow
import { createTables } from '../../__fixtures__/util';

import ItemShowcase from '../ItemShowcase';

const { craftingbenchoptions, items, mods } = createTables();

it('should build', () => {
  const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());

  expect(showcase).toBeInstanceOf(ItemShowcase);
  expect(showcase.mods.length).toBeGreaterThan(0);
});

it('should not do anything, just showcase', () => {
  const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());
  const greaves = items.fromPrimary(1650);

  expect(showcase.applyTo(greaves)).toBe(greaves);
  expect(showcase.modsFor(greaves).length).toBeGreaterThan(0);
});
