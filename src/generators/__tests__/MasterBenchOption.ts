import { createTables } from '../../__fixtures__/util';
import Mod from '../../mods/Mod';

import MasterBenchOption from '../MasterBenchOption';

const { craftingbenchoptions: options, items } = createTables();

it('should build with master mods', () => {
  const haku_life = options.fromPrimary(1);

  expect(haku_life).toBeInstanceOf(MasterBenchOption);
  expect(haku_life.mod).toBeInstanceOf(Mod);
  expect(haku_life.mod != null && haku_life.mod.isMasterMod()).toBe(true);
});

it('should build with no mods on custom actions', () => {
  const remove_crafted_mod = options.fromPrimary(0);

  expect(remove_crafted_mod.mods).toHaveLength(0);
  expect(remove_crafted_mod.mod).not.toBe(expect.anything());
});

it('doesnt support custom actions yet', () => {
  const greaves = items.fromName('Iron Greaves');
  const remove_crafted_mod = options.fromPrimary(0);

  expect(() => remove_crafted_mod.applyTo(greaves)).toThrowError(
    'customactions are not implemented yet',
  );
});

it('should apply the chosen option', () => {
  const haku_life = options.fromPrimary(1);
  const greaves = items.fromName('Iron Greaves');

  const crafted = haku_life.applyTo(greaves);

  expect(crafted).not.toBe(greaves);
  expect(crafted.rarity.toString()).toBe('magic');
  expect(crafted.mods[0].props.name).toEqual('Stalwart');
});

it('should return the same item if it cant apply', () => {
  const jewel = items.fromName('Viridian Jewel').rarity.set('magic');
  const haku_life = options.fromPrimary(1);

  expect(haku_life.applyTo(jewel)).toBe(jewel);
});

describe('applicable mods', () => {
  const bench = options.fromPrimary(1);
  const greaves = items.fromName('Iron Greaves');

  const craftedLife = bench.mods[0];

  it('should check for equipment type', () => {
    const weapon = items.fromName('Skinning Knife').rarity.set('magic');

    expect(bench.isModApplicableTo(craftedLife, weapon)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
    expect(bench.applicableTo(weapon)).toEqual({
      wrong_itemclass: true,
    });

    const jewel = items.fromName('Viridian Jewel').rarity.set('magic');

    expect(bench.isModApplicableTo(craftedLife, jewel)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: true,
    });
    expect(bench.applicableTo(jewel)).toEqual({
      wrong_itemclass: true,
    });
  });

  it('should not be applicable to white items', () => {
    expect(bench.isModApplicableTo(craftedLife, greaves)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: true,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
  });

  it('should work on magic and rares', () => {
    expect(
      bench.isModApplicableTo(craftedLife, greaves.rarity.set('magic')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
    expect(
      bench.isModApplicableTo(craftedLife, greaves.rarity.set('rare')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
  });
});
