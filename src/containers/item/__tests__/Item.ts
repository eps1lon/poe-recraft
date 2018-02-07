import { Mod } from '../../../mods/';
import PropsTable from '../../../helpers/PropsTable';
import { BaseItemTypeProps, ModProps, TagProps } from '../../../schema';
import { createTables } from '../../../__fixtures__/util';
import Item from '../Item';
import Stat from '../../../calculator/Stat';

const tables = createTables();

const { items, mods } = tables;

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

it('should sum its stats grouped by stat id', () => {
  const formatStats = (stats: { [key: string]: Stat }) =>
    Object.keys(stats).map(id => [id, stats[id].values]);

  const bow = items.fromPrimary(1214);

  const ipd = mods.fromPrimary(797);
  const ipd_acc = mods.fromPrimary(784);
  const crit = mods.fromPrimary(2171);

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
  const gripped_gloves = items.fromPrimary(1761);

  expect(gripped_gloves.any()).toBe(true);

  const greaves = items.fromPrimary(1650);

  expect(greaves.any()).toBe(false);
  expect(greaves.addMod(sturdy).any()).toBe(true);
});
