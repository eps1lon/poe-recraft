// @flow

import {
  verifyAtlasNodes,
  verifyMasterBenchOptions,
  verifyItems,
  verifyMods,
} from '../';

const atlas = require('../__fixtures__/atlas.json');
const baseitemtypes = require('../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../__fixtures__/craftingbenchoptions.json');
const mods = require('../__fixtures__/mods.json');

describe('schema', () => {
  it('should verify atlas', () => {
    verifyAtlasNodes(atlas);
  });

  it('should verify craftingbenchoptions', () => {
    verifyMasterBenchOptions(craftingbenchoptions);
  });

  it('should verify items', () => {
    verifyItems(baseitemtypes);
  });

  it('should verify mods', () => {
    verifyMods(mods);
  });
});
