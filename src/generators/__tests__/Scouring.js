// @flow
import Scouring from '../Scouring';
import { Item } from '../../containers/';
import { ApplicableMod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

it('should not work on uniques or normal items', () => {
  const scour = new Scouring();

  expect(greaves.props.rarity).toBe('normal');

  expect(scour.applicableTo(greaves)).toEqual({
    corrupted: false,
    mirrored: false,
    not_an_item: false,
    unique: false,
    normal: true,
  });

  expect(scour.applicableTo(greaves.setRarity('unique'))).toEqual({
    corrupted: false,
    mirrored: false,
    not_an_item: false,
    unique: true,
    normal: false,
  });

  expect(scour.applicableTo(greaves.setRarity('magic'))).toEqual({
    corrupted: false,
    mirrored: false,
    not_an_item: false,
    unique: false,
    normal: false,
  });

  expect(scour.applicableTo(greaves.setRarity('rare'))).toEqual({
    corrupted: false,
    mirrored: false,
    not_an_item: false,
    unique: false,
    normal: false,
  });
});

it('should remove mods and downgrade to normal', () => {
  const scour = new Scouring();

  const movement = new ApplicableMod(findByPrimary(mods, 1503));
  const life = new ApplicableMod(findByPrimary(mods, 198));

  // pre
  const magic_greaves = greaves.setRarity('magic').addMod(movement);

  expect(magic_greaves.props.rarity).toBe('magic');
  expect(magic_greaves.mods).toHaveLength(1);

  // to test
  const scoured_magic = scour.applyTo(magic_greaves);

  // post
  expect(scoured_magic).not.toBe(magic_greaves);
  expect(scoured_magic.props.rarity).toBe('normal');
  expect(scoured_magic.mods).toHaveLength(0);

  // pre
  const rare_greaves = greaves
    .setRarity('rare')
    .addMod(movement)
    .addMod(life);

  expect(rare_greaves.props.rarity).toBe('rare');
  expect(rare_greaves.mods).toHaveLength(2);

  // to test
  const scoured_rare = scour.applyTo(rare_greaves);

  // post
  expect(scoured_rare).not.toBe(rare_greaves);
  expect(scoured_rare.props.rarity).toBe('normal');
  expect(scoured_rare.mods).toHaveLength(0);
});
