import { Item } from '../../containers/';
import { Exalted } from '../';
import { MasterMod, metaMods as META_MODS } from '../../mods';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

describe('no_*_mods', () => {
  const weapon = Item.build(
    findByPrimary(baseitemtypes, 1025),
    meta_datas,
  ).setRarity('rare');

  const no_attack_mods = MasterMod.build(
    findByPrimary(mods, META_MODS.NO_ATTACK_MODS),
    craftingbenchoptions,
  );

  const no_caster_mods = MasterMod.build(
    findByPrimary(mods, META_MODS.NO_CASTER_MODS),
    craftingbenchoptions,
  );

  const exalted = Exalted.build(mods);

  // pre
  expect(
    exalted
      .modsFor(weapon)
      .find(({ mod }) => mod.props.id === 'SpellAddedFireDamage1'),
  ).toBeDefined();

  // post
  expect(
    exalted
      .modsFor(weapon.addMod(no_caster_mods))
      .find(({ mod }) => mod.props.id === 'SpellAddedFireDamage1'),
  ).toBeUndefined();

  // pre
  expect(
    exalted
      .modsFor(weapon)
      .find(
        ({ mod }) => mod.props.id === 'LocalIncreasedPhysicalDamagePercent3',
      ),
  ).toBeDefined();

  // post
  expect(
    exalted
      .modsFor(weapon.addMod(no_attack_mods))
      .find(
        ({ mod }) => mod.props.id === 'LocalIncreasedPhysicalDamagePercent3',
      ),
  ).toBeUndefined();
});

describe('leo pvp mod', () => {
  // 36 mod levels guarantess item lvl requirement <= 28
  it('should exclude mods above level 36', () => {
    const weapon = Item.build(
      findByPrimary(baseitemtypes, 1025),
      meta_datas,
    ).setRarity('rare');

    const leo_mod = MasterMod.build(
      findByPrimary(mods, META_MODS.LLD_MOD),
      craftingbenchoptions,
    );

    const exalted = Exalted.build(mods);

    expect(weapon.props.item_level).toBeGreaterThan(50);

    expect(
      exalted
        .modsFor(weapon.addMod(leo_mod))
        .every(({ mod }) => mod.props.level <= 36),
    ).toBe(true);
  });
});

describe('multimod', () => {
  it('should allow more than one crafted mod', () => {
    const craftable_greaves = Item.build(
      findByPrimary(baseitemtypes, 1650),
      meta_datas,
    ).setRarity('rare');

    const craftedLife = MasterMod.build(
      findByPrimary(mods, 5596),
      craftingbenchoptions,
    );
    const craftedArmour = MasterMod.build(
      findByPrimary(mods, 5550),
      craftingbenchoptions,
    );
    const multimod = MasterMod.build(
      findByPrimary(mods, META_MODS.MULTIMOD),
      craftingbenchoptions,
    );

    expect(craftedLife.applicableTo(craftable_greaves)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
      wrong_itemclass: false,
    });

    expect(
      craftedArmour.applicableTo(craftable_greaves.addMod(craftedLife)),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: true,
      wrong_domain: false,
      wrong_itemclass: false,
    });

    expect(
      craftedArmour.applicableTo(
        craftable_greaves.addMod(multimod).addMod(craftedLife),
      ),
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

describe('lock_*_mods', () => {});
