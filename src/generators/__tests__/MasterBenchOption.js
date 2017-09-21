// @flow
import MasterBenchOption from '../MasterBenchOption';
import { Item } from '../../containers/';
import { MasterMod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

it('should build with master mods', () => {
  const haku_life = MasterBenchOption.build(craftingbenchoptions, 1);

  expect(haku_life).toBeInstanceOf(MasterBenchOption);
  expect(haku_life.mods.length).toBeGreaterThan(0);
  expect(haku_life.mods.every(mod => mod instanceof MasterMod)).toBe(true);
});

it('should throw when picking an unavailable option', () => {
  expect(() =>
    MasterBenchOption.build(craftingbenchoptions, 1111111),
  ).toThrow();
});

it('should apply the chosen option', () => {
  const haku_life = MasterBenchOption.build(craftingbenchoptions, 1);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  const crafted = haku_life.applyTo(greaves);

  expect(crafted).not.toBe(greaves);
  expect(crafted.props.rarity).toBe('magic');
  expect(crafted.mods[0].props.name).toEqual('Stalwart');
});

describe('applicable mods', () => {
  const bench = new MasterBenchOption([]);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  const craftedLife = MasterMod.build(
    findByPrimary(mods, 5596),
    craftingbenchoptions,
  );

  it('should check for equipment type', () => {
    const weapon = Item.build(
      findByPrimary(baseitemtypes, 1025),
      meta_datas,
    ).setRarity('magic');

    expect(bench.isModApplicableTo(craftedLife, weapon)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
      wrong_itemclass: true,
    });

    const jewel = Item.build(
      findByPrimary(baseitemtypes, 2273),
      meta_datas,
    ).setRarity('magic');

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
