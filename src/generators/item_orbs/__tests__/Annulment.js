// @flow
import { createTables } from '../../../__fixtures__/util';
import { Alchemy } from '../index';
import { metaMods as META_MODS } from '../../../mods';

import Annulment from '../Annulment';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

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
  const alchemy = Alchemy.build(mods.all());

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

  const life = mods.fromPrimary(198);
  const armour = mods.fromPrimary(1035);
  const ms = mods.fromPrimary(1503);
  const res = mods.fromPrimary(2232);
  const strength = mods.fromPrimary(0);

  const locked_prefixes = mods.fromPrimary(META_MODS.LOCKED_PREFIXES);

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
