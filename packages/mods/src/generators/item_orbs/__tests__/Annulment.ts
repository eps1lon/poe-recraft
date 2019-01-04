import { createTables } from '../../../__fixtures__/util';
import Alchemy from '../Alchemy';
import META_MODS from '../../../mods/meta_mods';

import Annulment from '../Annulment';

const { items, mods } = createTables();

const greaves = items.fromName('Iron Greaves');

it('should only work on certain items', () => {
  const annul = new Annulment();

  expect(annul.isApplicableTo(greaves)).toBe(false);
  expect(annul.isApplicableTo(greaves.rarity.set('magic'))).toBe(true);
  expect(annul.isApplicableTo(greaves.rarity.set('rare'))).toBe(true);
  expect(annul.isApplicableTo(greaves.mirror())).toBe(false);
  expect(annul.isApplicableTo(greaves.corrupt())).toBe(false);
});

it('doesnt have any mods', () => {
  const annul = new Annulment();

  expect(annul.modsFor(greaves.rarity.set('magic'))).toHaveLength(0);
});

it('should not change the item if nothing changes', () => {
  const annul = new Annulment();

  // not applicable
  expect(annul.applyTo(greaves)).toBe(greaves);

  const applicable = greaves.rarity.set('magic');
  expect(annul.applyTo(applicable)).toBe(applicable);
});

it('should remove one mod while preserving rarity', () => {
  const annul = new Annulment();
  const alchemy = Alchemy.build(mods.all());

  // random testing
  for (let tries = 1; tries <= 10; tries += 1) {
    let crafted = alchemy.applyTo(greaves);
    const pre_rarity = crafted.rarity.toString();

    let old_mods_tally = crafted.affixes.mods.length;
    expect(old_mods_tally).toBeGreaterThan(0);

    while (crafted.affixes.mods.length > 0) {
      crafted = annul.applyTo(crafted);
      const new_mods_tally = crafted.affixes.mods.length;

      expect(old_mods_tally - new_mods_tally).toBe(1);
      expect(crafted.rarity.toString()).toBe(pre_rarity);

      old_mods_tally = new_mods_tally;
    }
  }
});

it('should consider meta mods', () => {
  const annul = new Annulment();

  const life = mods.fromId('IncreasedLife0');
  const armour = mods.fromId(
    'LocalIncreasedPhysicalDamageReductionRatingPercent3',
  );
  const ms = mods.fromId('MovementVelocity1');
  const res = mods.fromId('FireResist1');
  const strength = mods.fromId('Strength1');

  const locked_prefixes = mods.fromId(META_MODS.LOCKED_PREFIXES);

  const crafted = greaves.rarity
    .set('rare')
    .addMod(life)
    .addMod(armour)
    .addMod(ms)
    .addMod(res)
    .addMod(strength)
    .addMod(locked_prefixes);

  expect(crafted.affixes.getPrefixes()).toHaveLength(3);

  for (let tries = 1; tries <= 20; tries += 1) {
    expect(annul.applyTo(crafted).affixes.getPrefixes()).toHaveLength(3);
  }
});
