import { createTables } from '../../../../../__fixtures__/util';
import ItemWeaponProperties from '../WeaponProperties';

const tables = createTables();

const { items, mods } = tables;

it('needs weapon_Type in baseitem for baseline stats', () => {
  const dagger = items.fromName('Platinum Kris');
  const { properties } = dagger;

  // mutation here for test purpose
  const { weapon_type } = dagger.baseitem;
  dagger.baseitem.weapon_type = undefined;

  expect(() => (properties as ItemWeaponProperties).physical_damage()).toThrow(
    'weapon_type not set in baseitem',
  );

  // revert
  dagger.baseitem.weapon_type = weapon_type;
});

describe('physical damage', () => {
  const dagger = items.fromName('Platinum Kris');

  it('has the base of the weapon', () => {
    expect(
      (dagger.properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 24 },
      max: { augmented: false, value: 95 },
    });
  });

  it('is affected by flat and inc stats', () => {
    expect(
      (dagger.addMod(mods.fromId('LocalAddedPhysicalDamage9'))
        .properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [44, 51] },
      max: { augmented: true, value: [136, 144] },
    });

    expect(
      (dagger.addMod(mods.fromId('LocalIncreasedPhysicalDamagePercent7'))
        .properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [61, 64] },
      max: { augmented: true, value: [242, 255] },
    });

    expect(
      (dagger
        .addMod(mods.fromId('LocalAddedPhysicalDamage9'))
        .addMod(mods.fromId('LocalIncreasedPhysicalDamagePercent7'))
        .properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [112, 137] },
      max: { augmented: true, value: [346, 387] },
    });
  });

  it('is affected by quality', () => {
    // pre
    expect(
      (dagger.properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 24 },
      max: { augmented: false, value: 95 },
    });
    // add quality
    const with_quality = dagger.properties.setQuality(15);
    // post
    expect(
      (with_quality.properties as ItemWeaponProperties).physical_damage(),
    ).toMatchObject({
      min: { augmented: true, value: 27 },
      max: { augmented: true, value: 109 },
    });
  });
});

describe('chaos damage', () => {
  const dagger = items.fromName('Platinum Kris');

  it('has 0 as base', () => {
    expect(
      (dagger.properties as ItemWeaponProperties).chaos_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 0 },
      max: { augmented: false, value: 0 },
    });
  });

  it('considers stats', () => {
    expect(
      (dagger.addMod(mods.fromId('LocalAddedChaosDamage1'))
        .properties as ItemWeaponProperties).chaos_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [47, 72] },
      max: { augmented: true, value: [98, 123] },
    });
  });

  it('is not affected by quality', () => {
    const with_damage = dagger.addMod(mods.fromId('LocalAddedChaosDamage1'));
    const with_quality = with_damage.properties.setQuality(1);

    expect(
      (with_damage.properties as ItemWeaponProperties).chaos_damage(),
    ).toEqual((with_quality.properties as ItemWeaponProperties).chaos_damage());
  });
});

describe('cold damage', () => {
  const dagger = items.fromName('Platinum Kris');

  it('has 0 as base', () => {
    expect(
      (dagger.properties as ItemWeaponProperties).cold_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 0 },
      max: { augmented: false, value: 0 },
    });
  });

  it('considers stats', () => {
    expect(
      (dagger.addMod(mods.fromId('LocalAddedColdDamage1'))
        .properties as ItemWeaponProperties).cold_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [1, 2] },
      max: { augmented: true, value: 3 },
    });
  });

  it('is not affected by quality', () => {
    const with_damage = dagger.addMod(mods.fromId('LocalAddedColdDamage1'));
    const with_quality = with_damage.properties.setQuality(3);

    expect(
      (with_damage.properties as ItemWeaponProperties).chaos_damage(),
    ).toEqual((with_quality.properties as ItemWeaponProperties).chaos_damage());
  });
});

describe('fire damage', () => {
  const dagger = items.fromName('Platinum Kris');

  it('has 0 as base', () => {
    expect(
      (dagger.properties as ItemWeaponProperties).fire_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 0 },
      max: { augmented: false, value: 0 },
    });
  });

  it('considers stats', () => {
    expect(
      (dagger.addMod(mods.fromId('LocalAddedFireDamage2'))
        .properties as ItemWeaponProperties).fire_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [8, 10] },
      max: { augmented: true, value: [15, 18] },
    });
  });

  it('is not affected by quality', () => {
    const with_damage = dagger.addMod(mods.fromId('LocalAddedFireDamage2'));
    const with_quality = with_damage.properties.setQuality(7);

    expect(
      (with_damage.properties as ItemWeaponProperties).chaos_damage(),
    ).toEqual((with_quality.properties as ItemWeaponProperties).chaos_damage());
  });
});

describe('lightning damage', () => {
  const dagger = items.fromName('Platinum Kris');

  it('has 0 as base', () => {
    expect(
      (dagger.properties as ItemWeaponProperties).lightning_damage(),
    ).toMatchObject({
      min: { augmented: false, value: 0 },
      max: { augmented: false, value: 0 },
    });
  });

  it('considers stats', () => {
    expect(
      (dagger.addMod(mods.fromId('LocalAddedLightningDamage3'))
        .properties as ItemWeaponProperties).lightning_damage(),
    ).toMatchObject({
      min: { augmented: true, value: [1, 3] },
      max: { augmented: true, value: [41, 43] },
    });
  });

  it('is not affected by quality', () => {
    const with_damage = dagger.addMod(
      mods.fromId('LocalAddedLightningDamage3'),
    );
    const with_quality = with_damage.properties.setQuality(13);

    expect(
      (with_damage.properties as ItemWeaponProperties).chaos_damage(),
    ).toEqual((with_quality.properties as ItemWeaponProperties).chaos_damage());
  });
});

describe('attack_time', () => {
  const bow = items.fromName('Short Bow');

  it('has the base of the weapon', () => {
    expect(
      (bow.properties as ItemWeaponProperties).attack_speed(),
    ).toMatchObject({ augmented: false, value: 150 });
  });

  it('is affected by stats', () => {
    expect(
      (bow.addMod(mods.fromId('LocalIncreasedAttackSpeed8'))
        .properties as ItemWeaponProperties).attack_speed(),
    ).toMatchObject({ augmented: true, value: [189, 190] });
  });
});

describe('crit chance', () => {
  const sword = items.fromName('Vaal Rapier');

  it('has the base of the weapon', () => {
    expect((sword.properties as ItemWeaponProperties).crit()).toMatchObject({
      augmented: false,
      value: 650,
    });
  });

  it('is affected by stats', () => {
    expect(
      (sword.addMod(mods.fromId('LocalCriticalStrikeChance5'))
        .properties as ItemWeaponProperties).crit(),
    ).toMatchObject({ augmented: true, value: [845, 871] });
  });
});

describe('weapon range', () => {
  const sword = items.fromName('Vaal Rapier');

  it('has the base of the weapon', () => {
    expect(
      (sword.properties as ItemWeaponProperties).weapon_range(),
    ).toMatchObject({
      augmented: false,
      value: 12,
    });
  });

  it('is affected by stats', () => {
    expect(
      (sword.addMod(mods.fromId('LocalIncreasedMeleeWeaponRangeEssence6'))
        .properties as ItemWeaponProperties).weapon_range(),
    ).toMatchObject({ augmented: true, value: 14 });
  });
});
