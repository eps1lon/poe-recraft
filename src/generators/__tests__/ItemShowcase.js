// @flow
import ItemShowcase from '../ItemShowcase';
import { Item } from '../../containers/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const mods = require('../../__fixtures__/mods.json');

it('should build', () => {
  const showcase = new ItemShowcase(mods, craftingbenchoptions);

  expect(showcase).toBeInstanceOf(ItemShowcase);
  expect(showcase.mods.length).toBeGreaterThan(0);
});

it('should not do anything, just showcase', () => {
  const showcase = new ItemShowcase(mods, craftingbenchoptions);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650));

  expect(showcase.applyTo(greaves)).toBe(greaves);
  expect(showcase.modsFor(greaves).length).toBeGreaterThan(0);
});
