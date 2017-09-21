// @flow
import Orb from '../Orb';
import { Item } from '../../containers/';
import { metaMods as META_MODS, Mod, MasterMod } from '../../mods';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const mods = require('../../__fixtures__/mods.json');

it('should consider tags', () => {
  const orb: Orb<Mod, Item> = new Orb([]);

  const no_attack_mods = MasterMod.build(
    findByPrimary(mods, META_MODS.NO_ATTACK_MODS),
    craftingbenchoptions,
  );
  const ipd = new Mod(findByPrimary(mods, 793));
  const sturdy = new Mod(findByPrimary(mods, 1465));

  const weapon = Item.build(findByPrimary(baseitemtypes, 1025)).setRarity(
    'rare',
  );

  expect(ipd.spawnweightFor(weapon)).toBe(1000);
  expect(orb.isModSpawnableOn(ipd, weapon)).toEqual({
    no_matching_tags: false,
    spawnweight_zero: false,
  });
  expect(ipd.spawnweightFor(weapon.addMod(no_attack_mods))).toBe(0);
  expect(orb.isModSpawnableOn(ipd, weapon.addMod(no_attack_mods))).toEqual({
    no_matching_tags: false,
    spawnweight_zero: true,
  });

  expect(sturdy.spawnweightFor(weapon)).toBe(0);
  expect(orb.isModSpawnableOn(sturdy, weapon)).toEqual({
    no_matching_tags: false,
    spawnweight_zero: true,
  });
});
