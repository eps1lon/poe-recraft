// @flow
import { Mod } from '../../mods';
import { Stat } from '../../util';
import { createTables } from '../../__fixtures__/util';

import Item from '../Item';

const { items, mods } = createTables();

const ofBrute = mods.fromPrimary(0);
const sturdy = mods.fromPrimary(1465);
const plusLevel = mods.fromPrimary(5215);
const craftedCastSpeed = mods.fromPrimary(5653);

it('should build with the implicits of the baseitem', () => {
  const item = items.fromPrimary(1650);

  expect(item).toBeInstanceOf(Item);

  const gripped_gloves = items.fromPrimary(1761);

  expect(gripped_gloves.implicits.mods).toHaveLength(1);
});

it('should not allow to much affixes', () => {
  const greaves = items.fromPrimary(1650);

  expect(greaves.maxModsOfType(ofBrute)).toBe(0);
  expect(greaves.maxModsOfType(ofBrute)).toBe(0);
  expect(greaves.setRarity('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(greaves.setRarity('rare').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.setRarity('showcase').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.setRarity('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );

  const jewel = items.fromPrimary(2273);
  expect(jewel.maxModsOfType(ofBrute)).toBe(0);
  expect(jewel.setRarity('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(jewel.setRarity('rare').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.setRarity('showcase').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.setRarity('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );
});

it('should know about allowed mod domains', () => {
  const greaves = items.fromPrimary(1650);
  expect(greaves.modDomainEquiv()).toBe(Mod.DOMAIN.ITEM);

  const jewel = items.fromPrimary(2273);
  expect(jewel.modDomainEquiv()).toBe(Mod.DOMAIN.JEWEL);

  const flask = items.fromPrimary(1807);
  expect(flask.modDomainEquiv()).toBe(Mod.DOMAIN.FLASK);

  const map = items.fromPrimary(2276);
  expect(map.modDomainEquiv()).toBe(Mod.DOMAIN.MAP);
});

it('should know to which container it should add', () => {
  const item = items.fromPrimary(1650).setRarity('rare');

  expect(item.implicits.mods).toHaveLength(0);
  expect(item.addMod(sturdy).implicits.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).implicits.mods).toHaveLength(1);

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
});

it('should also not hold duplicate mods', () => {
  const item = items.fromPrimary(1650).setRarity('rare');

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
  expect(item.addMod(sturdy).addMod(ofBrute).affixes.mods).toHaveLength(2);
  expect(
    item
      .addMod(sturdy)
      .addMod(ofBrute)
      .addMod(sturdy).affixes.mods,
  ).toHaveLength(2);
});

it('should only remove affixes', () => {
  const item = items
    .fromPrimary(1650)
    .setRarity('rare')
    .addMod(plusLevel)
    .addMod(sturdy);

  expect(item.implicits.mods).toHaveLength(1);
  expect(item.affixes.mods).toHaveLength(1);

  expect(item.removeAllMods().affixes.mods).toHaveLength(0);
  expect(item.removeAllMods().implicits.mods).toHaveLength(1);
});

it('should not change with no mods when removing', () => {
  const item = items.fromPrimary(1650).setRarity('rare');

  expect(item.removeAllMods()).toBe(item);

  const with_mods = item.addMod(sturdy);

  expect(with_mods.removeAllMods()).not.toBe(with_mods);
  expect(with_mods.removeMod(ofBrute)).toBe(with_mods);
});

it('changes referentiel equality', () => {
  const item = items
    .fromPrimary(1650)
    .setRarity('rare')
    .addMod(sturdy);
  expect(item.addMod(sturdy)).not.toBe(item);
});

it('should consider the tags of meta data, baseitem and its mods', () => {
  const item = items.fromPrimary(1650).setRarity('rare');

  expect(item.getTags()).toHaveLength(4);
  expect(item.addMod(craftedCastSpeed).getTags()).toHaveLength(5);

  const paganWand = items.fromPrimary(1011).setRarity('rare');

  expect(paganWand.getTags()).toHaveLength(8);
});

it('should make a mirrored version', () => {
  const item = items.fromPrimary(1650);
  const mirrored = item.mirror();

  expect(mirrored).not.toBe(item);
  expect(item.props.mirrored).toBe(false);
  expect(mirrored.props.mirrored).toBe(true);
});

it('should not be mirrorable if it is already mirrored', () => {
  const item = items.fromPrimary(1650);
  const mirrored = item.mirror();

  expect(() => mirrored.mirror()).toThrowError(
    'invalid state: is already mirrored',
  );
});

it('should make a corrupted version', () => {
  const item = items.fromPrimary(1650);
  const corrupted = item.corrupt();

  expect(corrupted).not.toBe(item);
  expect(item.props.corrupted).toBe(false);
  expect(corrupted.props.corrupted).toBe(true);
});

it('should not be corruptable if it is already corrupted', () => {
  const item = items.fromPrimary(1650);
  const corrupted = item.corrupt();

  expect(() => corrupted.corrupt()).toThrowError(
    'invalid state: is already corrupted',
  );
});

it('should have stats grouped by id', () => {
  const weapon = items.fromPrimary(1025).setRarity('rare');

  const ipd = mods.fromPrimary(793);
  const ipd_acc = mods.fromPrimary(790);

  const crafted = weapon.addMod(ipd).addMod(ipd_acc);

  expect(
    Object.entries(crafted.stats()).map(([stat_id, stat]) => {
      if (!(stat instanceof Stat)) throw new Error('stat is not a Stat');

      return {
        stat: stat_id,
        values: stat.values,
      };
    }),
  ).toEqual([
    {
      stat: 'local_physical_damage_+%',
      values: [140, 163],
    },
    {
      stat: 'local_accuracy_rating',
      values: [135, 169],
    },
    {
      stat: 'critical_strike_chance_+%',
      values: [30, 30],
    },
  ]);
});

it('should upgrade rarity normal->magic-rare', () => {
  const normal = items.fromPrimary(1650);

  const magic = normal.upgradeRarity();

  expect(magic).not.toBe(normal);
  expect(magic.props.rarity).toBe('magic');

  const rare = magic.upgradeRarity();

  expect(rare).not.toBe(magic);
  expect(rare.props.rarity).toBe('rare');

  const also_rare = rare.upgradeRarity();

  expect(also_rare).toBe(rare);
});

it('should generate the name lines like ingame', () => {
  const normal = items.fromPrimary(1650);

  expect(normal.nameLines()).toEqual(['Iron Greaves']);

  const magic = normal.setRarity('magic');

  expect(magic.nameLines()).toEqual(['Iron Greaves']);
  expect(magic.addMod(ofBrute).nameLines()).toEqual([
    'Iron Greaves of the Brute',
  ]);
  expect(
    magic
      .addMod(ofBrute)
      .addMod(sturdy)
      .nameLines(),
  ).toEqual(['Sturdy Iron Greaves of the Brute']);

  const rare = normal.setRarity('rare');

  expect(rare.nameLines()).toEqual(['Random Name', 'Iron Greaves']);

  const unique = normal.setRarity('unique');

  expect(unique.nameLines()).toEqual(['TODO unique name?', 'Iron Greaves']);
});

it('should consider its mods for its required level', () => {
  const greaves = items.fromPrimary(1652).setRarity('rare');

  expect(greaves.requiredLevel()).toBe(23);
  // 17 mod
  expect(greaves.addMod(mods.fromPrimary(2)).requiredLevel()).toBe(23);
  // 26 mod
  expect(greaves.addMod(mods.fromPrimary(3)).requiredLevel()).toBe(26);
});

it('should have attr requirements', () => {
  const greaves = items.fromPrimary(1652);

  expect(greaves.requirements()).toEqual({
    level: 23,
    str: 44,
    dex: 0,
    int: 0,
  });
});

it('should have a string represantation of its rarity', () => {
  const item = items.fromPrimary(1650);

  expect(item.rarityIdent()).toEqual('normal');
  expect(item.setRarity('magic').rarityIdent()).toEqual('magic');
  expect(item.setRarity('rare').rarityIdent()).toEqual('rare');
  expect(item.setRarity('unique').rarityIdent()).toEqual('unique');
  expect(item.setRarity('showcase').rarityIdent()).toEqual('showcase');
});

it('should have a skeleton version of local stats', () => {
  const armour = items.fromPrimary(1650);
  expect(armour.localStats()).toEqual({
    physical_damage_reduction: '6',
  });

  const weapon = items.fromPrimary(1025);
  expect(() => weapon.localStats()).toThrowError('could not build');
});
