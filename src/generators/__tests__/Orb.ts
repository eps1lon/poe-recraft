import { createTables } from '../../__fixtures__/util';
import Item from '../../containers/item';
import META_MODS from '../../mods/meta_mods';

import Orb from '../Orb';

const { items, mods } = createTables();

class TestOrb extends Orb<Item> {
  public applicableTo(container: Item): any {
    throw new Error('abstract');
  }
  public applyTo(container: Item): Item {
    throw new Error('abstract');
  }
}

it('should consider tags', () => {
  const orb: Orb<Item> = new TestOrb([]);

  const no_attack_mods = mods.fromPrimary(META_MODS.NO_ATTACK_MODS);
  const ipd = mods.fromId('LocalIncreasedPhysicalDamagePercent3');
  const sturdy = mods.fromId('LocalBaseArmourAndEvasionRating5');

  const weapon = items.fromName('Skinning Knife').rarity.set('rare');

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
