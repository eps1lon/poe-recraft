// @flow
import { createTables } from '../../__fixtures__/util';
import { Item } from '../../containers/';
import { metaMods as META_MODS, Mod } from '../../mods';

import Orb from '../Orb';

const { items, mods } = createTables();

it('should consider tags', () => {
  const orb: Orb<Mod, Item> = new Orb([]);

  const no_attack_mods = mods.fromPrimary(META_MODS.NO_ATTACK_MODS);
  const ipd = mods.fromPrimary(793);
  const sturdy = mods.fromPrimary(1465);

  const weapon = items.fromPrimary(1025).setRarity('rare');

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
