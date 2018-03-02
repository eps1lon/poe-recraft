import { createTables } from '../../../../../__fixtures__/util';

const tables = createTables();

const { items, mods } = tables;

it('needs component_armour in baseitem for baseline stats', () => {
  const garb = items.fromName('Sacrificial Garb');
  const { properties } = garb;

  // mutation here for test purpose
  const { component_armour } = garb.baseitem;
  garb.baseitem.component_armour = undefined;

  // @ts-ignore: runtime type checking only
  expect(() => properties.defences()).toThrow(
    'component_armour not set while attempting to calculate defences',
  );

  // revert
  garb.baseitem.component_armour = component_armour;
});

it('get the basics', () => {
  const garb = items.fromName('Sacrificial Garb');
  const { properties } = garb;

  // @ts-ignore: runtime type checking only
  const defences = properties.defences();
  expect(defences.armour).toHaveProperty('value', 329);
  expect(defences).toMatchObject({
    armour: { augmented: false, value: 329 },
    evasion: { augmented: false, value: 329 },
    energy_shield: { augmented: false, value: 64 },
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

  // @ts-ignore: runtime type checking only
  expect(garb.addMod(flat_armour).properties.defences()).toMatchObject({
    armour: { augmented: true, value: [468, 651] },
    evasion: { augmented: false, value: 329 },
    energy_shield: { augmented: false, value: 64 },
  });

  expect(
    garb
      .addMod(flat_armour)
      .addMod(percent_armour)
      // @ts-ignore: runtime type checking only
      .properties.defences(),
  ).toMatchObject({
    armour: { augmented: true, value: [594, 859] },
    evasion: { augmented: false, value: 329 },
    energy_shield: { augmented: false, value: 64 },
  });
});

it('should consider stats for evasion', () => {
  const garb = items.fromName('Sacrificial Garb');

  const flat_evasion = mods.fromId('LocalIncreasedEvasionRating5');
  const percent_evasion = mods.fromId('LocalIncreasedEvasionRatingPercent5');

  // @ts-ignore: runtime type checking only
  expect(garb.addMod(flat_evasion).properties.defences()).toMatchObject({
    armour: { augmented: false, value: 329 },
    evasion: { augmented: true, value: [468, 651] },
    energy_shield: { augmented: false, value: 64 },
  });

  const props = garb
    .addMod(flat_evasion)
    .addMod(percent_evasion)
    // @ts-ignore: runtime type checking only
    .properties.defences();
  expect(props.evasion.augmented).toBe(true);
  expect(props.evasion.value).toEqual([786, 1165]);
});

it('should consider stats for es', () => {
  const garb = items.fromName('Sacrificial Garb');

  const flat_es = mods.fromId('LocalIncreasedEnergyShield6');
  const percent_es = mods.fromId(
    'LocalIncreasedEnergyShieldPercentAndStunRecovery4',
  );

  // @ts-ignore: runtime type checking only
  expect(garb.addMod(flat_es).properties.defences()).toMatchObject({
    armour: { augmented: false, value: 329 },
    evasion: { augmented: false, value: 329 },
    energy_shield: { augmented: true, value: [95, 102] },
  });

  const props = garb
    .addMod(flat_es)
    .addMod(percent_es)
    // @ts-ignore: runtime type checking only
    .properties.defences();
  expect(props.energy_shield.augmented).toBe(true);
  expect(props.energy_shield.value).toEqual([120, 134]);
});
