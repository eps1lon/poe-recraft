import { Mod } from '../../../mods/';
import { TagProps } from '../../../schema';
import { createTables } from '../../../__fixtures__/util';
import Item, { UnacceptedMod } from '../Item';
import Stat from '../../../calculator/Stat';
import { tagProps, Tag } from '../atlasModifier';

const tables = createTables();

const { items, mods } = tables;

const ofBrute = mods.fromId('Strength1');
const sturdy = mods.fromId('LocalBaseArmourAndEvasionRating5');
const plusLevel = mods.fromId('GemLevelCorruption');
const craftedCastSpeed = mods.fromId('IntMasterCastSpeedCrafted');

it('should build with the implicits of the baseitem', () => {
  const item = items.fromName('Iron Greaves');

  expect(item).toBeInstanceOf(Item);

  const gripped_gloves = items.fromName('Gripped Gloves');

  expect(gripped_gloves.implicits.mods).toHaveLength(1);
});

it('should not allow to much affixes', () => {
  const greaves = items.fromName('Iron Greaves');

  expect(greaves.maxModsOfType(ofBrute)).toBe(0);
  expect(greaves.maxModsOfType(ofBrute)).toBe(0);
  expect(greaves.rarity.set('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(greaves.rarity.set('rare').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.rarity.set('showcase').maxModsOfType(ofBrute)).toBe(3);
  expect(greaves.rarity.set('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );

  const jewel = items.fromName('Viridian Jewel');
  expect(jewel.maxModsOfType(ofBrute)).toBe(0);
  expect(jewel.rarity.set('magic').maxModsOfType(ofBrute)).toBe(1);
  expect(jewel.rarity.set('rare').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.rarity.set('showcase').maxModsOfType(ofBrute)).toBe(2);
  expect(jewel.rarity.set('unique').maxModsOfType(ofBrute)).toBe(
    Number.POSITIVE_INFINITY,
  );
});

it('should know about allowed mod domains', () => {
  const greaves = items.fromName('Iron Greaves');
  expect(greaves.affixes.inDomainOf(Mod.DOMAIN.ITEM)).toBe(true);

  const jewel = items.fromName('Viridian Jewel');
  expect(jewel.affixes.inDomainOf(Mod.DOMAIN.JEWEL)).toBe(true);

  const flask = items.fromName('Bismuth Flask');
  expect(flask.affixes.inDomainOf(Mod.DOMAIN.FLASK)).toBe(true);

  const map = items.fromName('Cursed Crypt Map');
  expect(map.affixes.inDomainOf(Mod.DOMAIN.MAP)).toBe(true);
});

it('should know to which container it should add', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');

  expect(item.implicits.mods).toHaveLength(0);
  expect(item.addMod(sturdy).implicits.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).implicits.mods).toHaveLength(1);

  expect(item.affixes.mods).toHaveLength(0);
  expect(item.addMod(plusLevel).affixes.mods).toHaveLength(0);
  expect(item.addMod(sturdy).affixes.mods).toHaveLength(1);
});

it('accepts non other than affixes and implicits', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');
  const talisman = mods.fromId('TalismanMonsterUnsetAmulet');

  expect(() => item.addMod(talisman)).toThrowError(UnacceptedMod);
});

it('should also not hold duplicate mods', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');

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
    .fromName('Iron Greaves')
    .rarity.set('rare')
    .addMod(plusLevel)
    .addMod(sturdy);

  expect(item.implicits.mods).toHaveLength(1);
  expect(item.affixes.mods).toHaveLength(1);

  expect(item.removeAllMods().affixes.mods).toHaveLength(0);
  expect(item.removeAllMods().implicits.mods).toHaveLength(1);
});

it('should not change with no mods when removing', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');

  expect(item.removeAllMods()).toBe(item);

  const with_mods = item.addMod(sturdy);

  expect(with_mods.removeAllMods()).not.toBe(with_mods);
  expect(with_mods.removeMod(ofBrute)).toBe(with_mods);
});

it('changes referentiel equality', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');
  expect(item.addMod(sturdy)).not.toBe(item);
});

it('should consider the tags of meta data, baseitem and its mods', () => {
  const item = items.fromName('Iron Greaves').rarity.set('rare');

  const compareableTags = (tags: TagProps[]) => tags.map(({ id }) => id).sort();

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
  const paganWand = items.fromName('Pagan Wand').rarity.set('rare');

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
  const item = items.fromName('Iron Greaves');
  const mirrored = item.mirror();

  expect(mirrored).not.toBe(item);
  expect(item.props.mirrored).toBe(false);
  expect(mirrored.props.mirrored).toBe(true);
});

it('should not be mirrorable if it is already mirrored', () => {
  const item = items.fromName('Iron Greaves');
  const mirrored = item.mirror();

  expect(() => mirrored.mirror()).toThrowError(
    'invalid state: is already mirrored',
  );
});

it('should make a corrupted version', () => {
  const item = items.fromName('Iron Greaves');
  const corrupted = item.corrupt();

  expect(corrupted).not.toBe(item);
  expect(item.props.corrupted).toBe(false);
  expect(corrupted.props.corrupted).toBe(true);
});

it('should not be corruptable if it is already corrupted', () => {
  const item = items.fromName('Iron Greaves');
  const corrupted = item.corrupt();

  expect(() => corrupted.corrupt()).toThrowError(
    'invalid state: is already corrupted',
  );
});

it('should sum its stats grouped by stat id', () => {
  const formatStats = (stats: { [key: string]: Stat }) =>
    Object.keys(stats).map(id => [id, stats[id].values]);

  const bow = items.fromName('Decimation Bow');

  const ipd = mods.fromId('LocalIncreasedPhysicalDamagePercent7');
  const ipd_acc = mods.fromId(
    'LocalIncreasedPhysicalDamagePercentAndAccuracyRating2',
  );
  const crit = mods.fromId('CriticalStrikeChance2');

  expect(formatStats(bow.stats())).toEqual([
    ['local_critical_strike_chance_+%', { min: 30, max: 50 }],
  ]);

  expect(formatStats(bow.addMod(ipd).stats())).toEqual([
    ['local_critical_strike_chance_+%', { min: 30, max: 50 }],
    ['local_physical_damage_+%', { min: 155, max: 169 }],
  ]);

  expect(
    formatStats(
      bow
        .addMod(ipd)
        .addMod(ipd_acc)
        .stats(),
    ),
  ).toEqual([
    ['local_critical_strike_chance_+%', { min: 30, max: 50 }],
    ['local_physical_damage_+%', { min: 175, max: 193 }],
    ['local_accuracy_rating', { min: 8, max: 30 }],
  ]);

  expect(
    formatStats(
      bow
        .addMod(ipd)
        .addMod(ipd_acc)
        .addMod(crit)
        .stats(),
    ),
  ).toEqual([
    ['local_critical_strike_chance_+%', { min: 30, max: 50 }],
    ['local_physical_damage_+%', { min: 175, max: 193 }],
    ['local_accuracy_rating', { min: 8, max: 30 }],
    ['critical_strike_chance_+%', { min: 15, max: 19 }],
  ]);
});

it('should have any if it has any mods', () => {
  const gripped_gloves = items.fromName('Gripped Gloves');

  expect(gripped_gloves.any()).toBe(true);

  const greaves = items.fromName('Iron Greaves');

  expect(greaves.any()).toBe(false);
  expect(greaves.addMod(sturdy).any()).toBe(true);
});

it('throws if it cant find its meta data', () => {
  expect(() => {
    const greave_props = {
      ...items.find(p => p.primary === 1907),
      inherits_from: 'Unknown',
    };

    Item.build(greave_props);
  }).toThrow('meta_data for Unknown not found');
});

describe('elder/shaper items', () => {
  const greaves = items.fromName('Iron Greaves');
  const eldered = greaves.asElderItem();
  const shaped = greaves.asShaperItem();

  it('cant have elder/shaper mods by default', () => {
    expect(greaves.isElderItem()).toBe(false);
    expect(greaves.isSHaperItem()).toBe(false);
  });

  it('can be altered to be a elder/shaper item', () => {
    expect(eldered.isElderItem()).toBe(true);
    expect(eldered.isSHaperItem()).toBe(false);

    expect(shaped.isElderItem()).toBe(false);
    expect(shaped.isSHaperItem()).toBe(true);
  });

  it('cant be a shaper and elder item at the same time', () => {
    expect(() =>
      Item.build({
        ...greaves.baseitem,
        tags: [
          ...greaves.baseitem.tags,
          tagProps(Tag.elder_item),
          tagProps(Tag.shaper_item),
        ],
      }),
    ).toThrow('Item can only be shaper or elder item not both.');
  });
});
