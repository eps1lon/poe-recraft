import { createTables } from '../../../../../__fixtures__/util';

import build from '../ArmourProperties';

const tables = createTables();

const { items, mods } = tables;

it('should throw while attempting to build with anything else but armours', () => {
  const weapon = items.fromName('Skinning Knife');

  expect(() => build(weapon)).toThrow(
    'component_armour not set while attempting to build ArmourProperties',
  );
});

it('get the basics', () => {
  const garb = items.fromName('Sacrificial Garb');

  expect(build(garb)).toEqual({
    armour: { type: 'simple', values: 329 },
    evasion: { type: 'simple', values: 329 },
    energy_shield: { type: 'simple', values: 64 },
  });
});

it('should consider stats for armour', () => {
  const garb = items.fromName('Sacrificial Garb');

  const flat_armour = mods.fromId(
    'LocalIncreasedPhysicalDamageReductionRating5',
  );
  const percent_armour = mods.fromId(
    'LocalIncreasedPhysicalDamageReductionRatingPercentAndStunRecovery4',
  );

  expect(build(garb.addMod(flat_armour))).toEqual({
    armour: { type: 'augmented', values: [468, 651] },
    evasion: { type: 'simple', values: 329 },
    energy_shield: { type: 'simple', values: 64 },
  });

  expect(build(garb.addMod(flat_armour).addMod(percent_armour))).toEqual({
    armour: { type: 'augmented', values: [594, 859] },
    evasion: { type: 'simple', values: 329 },
    energy_shield: { type: 'simple', values: 64 },
  });
});

it('should consider stats for evasion', () => {
  const garb = items.fromName('Sacrificial Garb');

  const flat_evasion = mods.fromId('LocalIncreasedEvasionRating5');
  const percent_evasion = mods.fromId('LocalIncreasedEvasionRatingPercent5');

  expect(build(garb.addMod(flat_evasion))).toEqual({
    armour: { type: 'simple', values: 329 },
    evasion: { type: 'augmented', values: [468, 651] },
    energy_shield: { type: 'simple', values: 64 },
  });

  const props = build(garb.addMod(flat_evasion).addMod(percent_evasion));
  expect(props.evasion.type).toBe('augmented');
  expect(props.evasion.values).toEqual([786, 1165]);
});

it('should consider stats for es', () => {
  const garb = items.fromName('Sacrificial Garb');

  const flat_es = mods.fromId('LocalIncreasedEnergyShield6');
  const percent_es = mods.fromId(
    'LocalIncreasedEnergyShieldPercentAndStunRecovery4',
  );

  expect(build(garb.addMod(flat_es))).toEqual({
    armour: { type: 'simple', values: 329 },
    evasion: { type: 'simple', values: 329 },
    energy_shield: { type: 'augmented', values: [95, 102] },
  });

  const props = build(garb.addMod(flat_es).addMod(percent_es));
  expect(props.energy_shield.type).toBe('augmented');
  expect(props.energy_shield.values).toEqual([120, 134]);
});
