import PropsTable from '../PropsTable';

import * as tables from '../createTables';
import { EssenceProps } from '../../schema';

const atlas = require('../../../data/atlas.json');
const options = require('../../../data/craftingbenchoptions.json');
const essences: EssenceProps[] = require('../../../data/essences.json');
const items = require('../../../data/items.json');
const mods = require('../../../data/mods.json');

it('should build an atlas table', () => {
  const table = tables.createAtlasNodes(atlas);

  expect(table).toBeInstanceOf(PropsTable);
});

it('should build an options table', () => {
  const table = tables.createMasterBenchOptions(options);

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

it('should build an essence table', () => {
  const table = tables.createEssences(essences, mods);

  expect(table).toBeInstanceOf(PropsTable);
});
