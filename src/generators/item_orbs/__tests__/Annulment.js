// @flow
import { Item } from '../../../containers';
import { Alchemy } from '../index';
import { metaMods as META_MODS, Mod, MasterMod } from '../../../mods';

import Annulment from '../Annulment';

Item.all = require('../../../__fixtures__/baseitemtypes.json');
MasterMod.option_props_list = require('../../../__fixtures__/craftingbenchoptions.json');
Mod.all = require('../../../__fixtures__/mods.json');

const greaves = Item.fromPrimary(1650);

it('should only work on certain items', () => {
  const annul = new Annulment();

  expect(annul.isApplicableTo(greaves)).toBe(false);
  expect(annul.isApplicableTo(greaves.setRarity('magic'))).toBe(true);
  expect(annul.isApplicableTo(greaves.setRarity('rare'))).toBe(true);
  expect(annul.isApplicableTo(greaves.mirror())).toBe(false);
  expect(annul.isApplicableTo(greaves.corrupt())).toBe(false);
});

it('should remove one mod while preserving rarity', () => {
  const annul = new Annulment();
  const alchemy = Alchemy.build(Mod.all);

  // random testing
  for (let tries = 1; tries <= 10; tries += 1) {
    let crafted = alchemy.applyTo(greaves);
    const pre_rarity = crafted.props.rarity;

    let old_mods_tally = crafted.affixes.mods.length;
    expect(old_mods_tally).toBeGreaterThan(0);

    while (crafted.affixes.mods.length > 0) {
      crafted = annul.applyTo(crafted);
      const new_mods_tally = crafted.affixes.mods.length;

      expect(old_mods_tally - new_mods_tally).toBe(1);
      expect(crafted.props.rarity).toBe(pre_rarity);

      old_mods_tally = new_mods_tally;
    }
  }
});

it('should consider meta mods', () => {
  const annul = new Annulment();

  const life = Mod.fromPrimary(198);
  const armour = Mod.fromPrimary(1035);
  const ms = Mod.fromPrimary(1503);
  const res = Mod.fromPrimary(2232);
  const strength = Mod.fromPrimary(0);

  const locked_prefixes = MasterMod.fromPrimary(META_MODS.LOCKED_PREFIXES);

  const crafted = greaves
    .setRarity('rare')
    .addMod(life)
    .addMod(armour)
    .addMod(ms)
    .addMod(res)
    .addMod(strength)
    .addMod(locked_prefixes);

  expect(crafted.getPrefixes()).toHaveLength(3);

  for (let tries = 1; tries <= 20; tries += 1) {
    expect(annul.applyTo(crafted).getPrefixes()).toHaveLength(3);
  }
});
