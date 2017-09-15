// @flow
import { Item } from '../../containers/';
import ApplicableMod from '../ApplicableMod';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

const ofBrute = new ApplicableMod(findByPrimary(mods, 0));
const ofWrestler = new ApplicableMod(findByPrimary(mods, 1));
const sturdy = new ApplicableMod(findByPrimary(mods, 1465));

it('should work like ingame', () => {
  // normal items cant have mods
  expect(ofBrute.applicableTo(greaves)).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: true,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // cant add magic item can only have 1 prefix and not double mods
  expect(
    ofBrute.applicableTo(greaves.setRarity('magic').addMod(ofBrute)),
  ).toEqual({
    above_lld_level: false,
    already_present: true,
    domain_full: true,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // cant have 2 mods of same group
  expect(
    ofWrestler.applicableTo(greaves.setRarity('rare').addMod(ofBrute)),
  ).toEqual({
    above_lld_level: false,
    already_present: true,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // can only apply to items with high enough ilvl
  expect(
    ofBrute.applicableTo(
      greaves.setRarity('magic').setProperty('item_level', 0),
    ),
  ).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: true,
    wrong_domain: false,
  });

  // magic and place for prefix => everything is fine
  expect(
    sturdy.applicableTo(greaves.setRarity('magic').addMod(ofBrute)),
  ).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // place for affixes => everything is fine
  expect(ofBrute.applicableTo(greaves.setRarity('magic'))).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });
});
