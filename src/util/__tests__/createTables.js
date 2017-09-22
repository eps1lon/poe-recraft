// @flow
import PropsTable from '../PropsTable';

import * as tables from '../createTables';

const atlas = require('../../__fixtures__/atlas.json');
const options = require('../../__fixtures__/craftingbenchoptions.json');
const items = require('../../__fixtures__/baseitemtypes.json');
const mods = require('../../__fixtures__/mods.json');

it('should build an atlas table', () => {
  const table = tables.createAtlas(atlas);

  expect(table).toBeInstanceOf(PropsTable);
});

it('should build an options table', () => {
  const table = tables.createCraftingBenchOptions(options);

  expect(table).toBeInstanceOf(PropsTable);
});

it('should build an items table', () => {
  const table = tables.createItems(items);

  expect(table).toBeInstanceOf(PropsTable);
});

it('should build an mods table', () => {
  const table = tables.createMods(mods);

  expect(table).toBeInstanceOf(PropsTable);
});
