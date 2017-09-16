// @flow
import { Item } from '../../containers/';
import MasterMod from '../MasterMod';
import RollableMod from '../RollableMod';
import META_MODS from '../meta_mods';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

it('should consider tags', () => {
  const weapon = Item.build(
    findByPrimary(baseitemtypes, 1025),
    meta_datas,
  ).setRarity('rare');

  const no_attack_mods = MasterMod.build(
    findByPrimary(mods, META_MODS.NO_ATTACK_MODS),
    craftingbenchoptions,
  );

  const ipd = new RollableMod(findByPrimary(mods, 793));

  expect(ipd.spawnweightFor(weapon)).toBe(1000);
  expect(ipd.spawnableOn(weapon)).toEqual({
    no_matching_tags: false,
    spawnweight_zero: false,
  });
  expect(ipd.spawnweightFor(weapon.addMod(no_attack_mods))).toBe(0);
  expect(ipd.spawnableOn(weapon.addMod(no_attack_mods))).toEqual({
    no_matching_tags: false,
    spawnweight_zero: true,
  });

  const sturdy = new RollableMod(findByPrimary(mods, 1465));
  expect(sturdy.spawnweightFor(weapon)).toBe(0);
  expect(sturdy.spawnableOn(weapon)).toEqual({
    no_matching_tags: false,
    spawnweight_zero: true,
  });
});
