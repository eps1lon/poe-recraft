// @flow
import { Item } from '../../containers/';
import MasterMod from '../MasterMod';
import META_MODS from '../meta_mods';
import { findByPrimary } from '../../__fixtures__/util';

const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);
const craftedLife = MasterMod.build(
  findByPrimary(mods, 5596),
  craftingbenchoptions,
);

it('should build', () => {
  expect(craftedLife).toBeInstanceOf(MasterMod);

  const sturdyProps = findByPrimary(mods, 0);
  expect(sturdyProps).toBeDefined();
  expect(() => MasterMod.build(sturdyProps, craftingbenchoptions)).toThrowError(
    'option not found for mod 0',
  );
});

it('should check for equipment type', () => {
  const weapon = Item.build(
    findByPrimary(baseitemtypes, 1025),
    meta_datas,
  ).setRarity('magic');

  expect(craftedLife.applicableTo(weapon)).toEqual({
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

  expect(craftedLife.applicableTo(jewel)).toEqual({
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
  expect(craftedLife.applicableTo(greaves)).toEqual({
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
  expect(craftedLife.applicableTo(greaves.setRarity('magic'))).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    no_multimod: false,
    wrong_domain: false,
    wrong_itemclass: false,
  });
  expect(craftedLife.applicableTo(greaves.setRarity('rare'))).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    no_multimod: false,
    wrong_domain: false,
    wrong_itemclass: false,
  });
});

it('should consider multimodding', () => {
  const craftable_greaves = greaves.setRarity('rare');

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
