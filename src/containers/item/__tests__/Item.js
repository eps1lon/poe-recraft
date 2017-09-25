// @flow
import { Mod } from '../../../mods';
import type PropsTable from '../../../helpers/PropsTable';
import { Stat } from '../../../util';
import type { BaseItemTypeProps, ModProps } from '../../../schema';
import { createTables } from '../../../__fixtures__/util';

import Item from '../Item';

const tables = createTables();

const items = (tables.items: PropsTable<BaseItemTypeProps, Item>);
const mods = (tables.mods: PropsTable<ModProps, Mod>);

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
  expect(greaves.rarity.set('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(greaves.rarity.set('rare').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.rarity.set('showcase').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.rarity.set('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );

  const jewel = items.fromPrimary(2273);
  expect(jewel.maxModsOfType(ofBrute)).toBe(0);
  expect(jewel.rarity.set('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(jewel.rarity.set('rare').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.rarity.set('showcase').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.rarity.set('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );
});

it('should know about allowed mod domains', () => {
  const greaves = items.fromPrimary(1650);
  expect(greaves.affixes.inDomainOf(Mod.DOMAIN.ITEM)).toBe(true);

  const jewel = items.fromPrimary(2273);
  expect(jewel.affixes.inDomainOf(Mod.DOMAIN.JEWEL)).toBe(true);

  const flask = items.fromPrimary(1807);
  expect(flask.affixes.inDomainOf(Mod.DOMAIN.FLASK)).toBe(true);

  const map = items.fromPrimary(2276);
  expect(map.affixes.inDomainOf(Mod.DOMAIN.MAP)).toBe(true);
});

it('should know to which container it should add', () => {
  const item = items.fromPrimary(1650).rarity.set('rare');

  expect(item.implicits.mods).toHaveLength(0);
  expect(item.addMod(sturdy).implicits.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).implicits.mods).toHaveLength(1);

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
});

it('should also not hold duplicate mods', () => {
  const item = items.fromPrimary(1650).rarity.set('rare');

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
    .rarity.set('rare')
    .addMod(plusLevel)
    .addMod(sturdy);

  expect(item.implicits.mods).toHaveLength(1);
  expect(item.affixes.mods).toHaveLength(1);

  expect(item.removeAllMods().affixes.mods).toHaveLength(0);
  expect(item.removeAllMods().implicits.mods).toHaveLength(1);
});

it('should not change with no mods when removing', () => {
  const item = items.fromPrimary(1650).rarity.set('rare');

  expect(item.removeAllMods()).toBe(item);

  const with_mods = item.addMod(sturdy);

  expect(with_mods.removeAllMods()).not.toBe(with_mods);
  expect(with_mods.removeMod(ofBrute)).toBe(with_mods);
});

it('changes referentiel equality', () => {
  const item = items.fromPrimary(1650).rarity.set('rare');
  expect(item.addMod(sturdy)).not.toBe(item);
});

it('should consider the tags of meta data, baseitem and its mods', () => {
  const item = items.fromPrimary(1650).rarity.set('rare');

  const compareableTags = tags => tags.map(({ id }) => id).sort();

  expect(compareableTags(item.getTags())).toEqual([
    'armour',
    'boots',
    'default',
    'str_armour',
  ]);
  expect(compareableTags(item.addMod(craftedCastSpeed).getTags())).toEqual([
    'armour',
    'boots',
    'default',
    'has_caster_mod',
    'str_armour',
  ]);
  const paganWand = items.fromPrimary(1011).rarity.set('rare');

  expect(compareableTags(paganWand.getTags())).toEqual([
    'default',
    'has_caster_mod',
    'maraketh',
    'not_for_sale',
    'one_hand_weapon',
    'onehand',
    'ranged',
    'wand',
    'weapon',
  ]);
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
  const weapon = items.fromPrimary(1025).rarity.set('rare');

  const ipd = mods.fromPrimary(793);
  const ipd_acc = mods.fromPrimary(790);

  const crafted = weapon.addMod(ipd).addMod(ipd_acc);

  expect(
    Object.entries(crafted.stats.list())
      .map(([stat_id, stat]) => {
        if (!(stat instanceof Stat)) throw new Error('stat is not a Stat');

        return {
          stat: stat_id,
          values: stat.values,
        };
      })
      .sort((a, b) => a.stat.localeCompare(b.stat)),
  ).toEqual([
    {
      stat: 'critical_strike_chance_+%',
      values: [30, 30],
    },
    {
      stat: 'local_accuracy_rating',
      values: [135, 169],
    },
    {
      stat: 'local_physical_damage_+%',
      values: [140, 163],
    },
  ]);
});

it('should upgrade rarity normal->magic-rare', () => {
  const normal = items.fromPrimary(1650);

  const magic = normal.rarity.upgrade();

  expect(magic).not.toBe(normal);
  expect(magic.rarity.toString()).toBe('magic');

  const rare = magic.rarity.upgrade();

  expect(rare).not.toBe(magic);
  expect(rare.rarity.toString()).toBe('rare');

  const also_rare = rare.rarity.upgrade();

  expect(also_rare).toBe(rare);
});

it('should generate the name lines like ingame', () => {
  const normal = items.fromPrimary(1650);

  expect(normal.name.lines()).toEqual(['Iron Greaves']);

  const magic = normal.rarity.set('magic');

  expect(magic.name.lines()).toEqual(['Iron Greaves']);
  expect(magic.addMod(ofBrute).name.lines()).toEqual([
    'Iron Greaves of the Brute',
  ]);
  expect(
    magic
      .addMod(ofBrute)
      .addMod(sturdy)
      .name.lines(),
  ).toEqual(['Sturdy Iron Greaves of the Brute']);

  const rare = normal.rarity.set('rare');

  expect(rare.name.lines()).toEqual(['Random Name', 'Iron Greaves']);

  const unique = normal.rarity.set('unique');

  expect(unique.name.lines()).toEqual(['TODO unique name?', 'Iron Greaves']);
});

it('should consider its mods for its required level', () => {
  const greaves = items.fromPrimary(1652).rarity.set('rare');

  expect(greaves.requirements.level()).toBe(23);
  // 17 modrequirements.level
  expect(greaves.addMod(mods.fromPrimary(2)).requirements.level()).toBe(23);
  // 26 mod
  expect(greaves.addMod(mods.fromPrimary(3)).requirements.level()).toBe(26);
});

it('should have attr requirements', () => {
  const greaves = items.fromPrimary(1652);

  expect(greaves.requirements.list()).toEqual({
    level: 23,
    str: 44,
    dex: 0,
    int: 0,
  });
});

it('should have a string represantation of its rarity', () => {
  const item = items.fromPrimary(1650);

  expect(item.rarity.toString()).toEqual('normal');
  expect(item.rarity.set('magic').rarity.toString()).toEqual('magic');
  expect(item.rarity.set('rare').rarity.toString()).toEqual('rare');
  expect(item.rarity.set('unique').rarity.toString()).toEqual('unique');
  expect(item.rarity.set('showcase').rarity.toString()).toEqual('showcase');
});

it('should have a skeleton version of local stats', () => {
  const armour = items.fromPrimary(1650);
  expect(armour.stats.local()).toEqual({
    physical_damage_reduction: '6',
  });

  const weapon = items.fromPrimary(1025);
  expect(() => weapon.stats.local()).toThrowError('could not build');
});

describe('sockets', () => {
  it('should have no more than 4 on boots, gloves, helmets', () => {
    expect(items.fromPrimary(1544).sockets.max()).toBe(4); // Bone Helmet
    expect(items.fromPrimary(1708).sockets.max()).toBe(4); // Iron Gauntlets
    expect(items.fromPrimary(1650).sockets.max()).toBe(4); // Iron Greaves
    expect(items.fromPrimary(1312).sockets.max()).toBe(4); // Fishing Rod
  });

  it('should have no more than 3 on shields and 1H', () => {
    expect(items.fromPrimary(1099).sockets.max()).toBe(3); // Rusted Sword
    expect(items.fromPrimary(1092).sockets.max()).toBe(3); // Siege Axe
    expect(items.fromPrimary(1135).sockets.max()).toBe(3); // Estoc
    expect(items.fromPrimary(1412).sockets.max()).toBe(3); // War Buckler
    expect(items.fromPrimary(1005).sockets.max()).toBe(3); // Driftwood Wand
  });

  it('should have no sockets on jewelry', () => {
    expect(items.fromPrimary(1335).sockets.max()).toBe(0); // Amber Amulet
  });

  it('should have no more than 6 on armour and 2H', () => {
    expect(items.fromPrimary(1545).sockets.max()).toBe(6); // Plate West
    expect(items.fromPrimary(1004).sockets.max()).toBe(6); // Key Blade
    expect(items.fromPrimary(1244).sockets.max()).toBe(6); // Judgement Staff
  });

  it('should check level restrictions', () => {
    const staff = items.fromPrimary(1244);

    expect(staff.setProperty('item_level', 1).sockets.max()).toBe(2);
    expect(staff.setProperty('item_level', 2).sockets.max()).toBe(3);
    expect(staff.setProperty('item_level', 25).sockets.max()).toBe(4);
    expect(staff.setProperty('item_level', 35).sockets.max()).toBe(5);
    expect(staff.setProperty('item_level', 67).sockets.max()).toBe(6);
  });

  it('should check tags', () => {
    expect(items.fromPrimary(1224).sockets.max()).toBe(3); // Gnarled Staff
    expect(items.fromPrimary(1328).sockets.max()).toBe(1); // Unset
    expect(items.fromPrimary(1347).sockets.max()).toBe(1); // Black Maw Talisman
  });
});
