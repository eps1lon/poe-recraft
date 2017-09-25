// @flow
import {
  verifyAtlasNodes,
  verifyMasterBenchOptions,
  verifyItems,
  verifyMods,
} from '../../helpers/verifySchema';

const atlas = require('../atlas.json');
const baseitemtypes = require('../baseitemtypes.json');
const craftingbenchoptions = require('../craftingbenchoptions.json');
const mods = require('../mods.json');

it('should verify the fixtures', () => {
  expect(verifyAtlasNodes(atlas));
  expect(verifyMasterBenchOptions(craftingbenchoptions));
  expect(verifyItems(baseitemtypes));
  expect(verifyMods(mods));
});
