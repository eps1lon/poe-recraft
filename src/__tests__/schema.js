// @flow

import {
  verifyAtlas,
  verifyCraftingBenchOptions,
  verifyItems,
  verifyMods,
} from '../util';

const atlas = require('../__fixtures__/atlas.json');
const baseitemtypes = require('../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../__fixtures__/craftingbenchoptions.json');
const mods = require('../__fixtures__/mods.json');

describe('schema', () => {
  it('should verify atlas', () => {
    verifyAtlas(atlas);
  });

  it('should verify craftingbenchoptions', () => {
    verifyCraftingBenchOptions(craftingbenchoptions);
  });

  it('should verify items', () => {
    verifyItems(baseitemtypes);
  });

  it('should verify mods', () => {
    verifyMods(mods);
  });
});
