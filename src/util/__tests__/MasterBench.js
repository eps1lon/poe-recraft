// @flow
import { Item } from '../../containers';

import MasterBench from '../MasterBench';

Item.all = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');

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
  const greaves = Item.fromPrimary(1650);
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(
    haku.applyOptionTo(greaves, 1).affixes.mods.map(({ props: { id } }) => id),
  ).toContain('StrMasterLifeCrafted1');
});

it('throw if the option was not found', () => {
  const greaves = Item.fromPrimary(1650);
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(() => haku.applyOptionTo(greaves, 213324234)).toThrowError(
    "option '213324234' not found",
  );
});
