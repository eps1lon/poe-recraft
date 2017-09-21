import { Item } from '../../containers';
import { findByPrimary } from '../../__fixtures__/util';

import MasterBench from '../MasterBench';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const meta_datas = require('../../__fixtures__/meta_data.json');

it('should build', () => {
  const all_masters = MasterBench.build(craftingbenchoptions);

  expect(all_masters).toBeInstanceOf(MasterBench);

  const haku = MasterBench.build(craftingbenchoptions, 6);
  expect(haku).toBeInstanceOf(MasterBench);
});

it('should throw if the specified master key was not found', () => {
  expect(() => MasterBench.build(craftingbenchoptions, 324166)).toThrowError(
    "no options found for '324166'",
  );
});

it('should apply an option', () => {
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(
    haku.applyOptionTo(greaves, 1).affixes.mods.map(({ props: { id } }) => id),
  ).toContain('StrMasterLifeCrafted1');
});

it('throw if the option was not found', () => {
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(() => haku.applyOptionTo(greaves, 213324234)).toThrowError(
    "option '213324234' not found",
  );
});
