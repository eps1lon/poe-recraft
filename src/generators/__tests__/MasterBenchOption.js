// @flow
import { createTables } from '../../__fixtures__/util';
import { Mod } from '../../mods/';

import MasterBenchOption from '../MasterBenchOption';

const { craftingbenchoptions: options, items } = createTables();

it('should build with master mods', () => {
  const haku_life = options.fromPrimary(1);

  expect(haku_life).toBeInstanceOf(MasterBenchOption);
  expect(haku_life.mod).toBeInstanceOf(Mod);
  expect(haku_life.mod != null && haku_life.mod.isMasterMod()).toBe(true);
});

it('should throw when picking an unavailable option', () => {
  expect(() => options.fromPrimary(1111111)).toThrow();
});

it('should apply the chosen option', () => {
  const haku_life = options.fromPrimary(1);
  const greaves = items.fromPrimary(1650);

  const crafted = haku_life.applyTo(greaves);

  expect(crafted).not.toBe(greaves);
  expect(crafted.props.rarity).toBe('magic');
  expect(crafted.mods[0].props.name).toEqual('Stalwart');
});

describe('applicable mods', () => {
  const bench = options.fromPrimary(1);
  const greaves = items.fromPrimary(1650);

  const craftedLife = bench.mods[0];

  it('should check for equipment type', () => {
    const weapon = items.fromPrimary(1025).setRarity('magic');

    expect(bench.isModApplicableTo(craftedLife, weapon)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
      wrong_itemclass: true,
    });

    const jewel = items.fromPrimary(2273).setRarity('magic');

    expect(bench.isModApplicableTo(craftedLife, jewel)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: true,
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
      wrong_itemclass: false,
    });
  });

  it('should work on magic and rares', () => {
    expect(
      bench.isModApplicableTo(craftedLife, greaves.setRarity('magic')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
      wrong_itemclass: false,
    });
    expect(
      bench.isModApplicableTo(craftedLife, greaves.setRarity('rare')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
      wrong_itemclass: false,
    });
  });
});
