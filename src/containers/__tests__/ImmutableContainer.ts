import { createTables } from '../../__fixtures__/util';
import ImmutableContainer from '../ImmutableContainer';

const { mods } = createTables();

const sturdy = mods.fromId('LocalBaseArmourAndEvasionRating5');
const plusLevel = mods.fromId('GemLevelCorruption');
const craftedCastSpeed = mods.fromId('IntMasterCastSpeedCrafted');
const craftedSpellDamage = mods.fromId('IntMasterIncreasedSpellDamageCrafted1');
const essenceWeaponRange = mods.fromId(
  'LocalIncreasedMeleeWeaponRangeEssence5',
);

class TestImmutableContainer extends ImmutableContainer<any, any> {
  public static withBuilder(builder: { mods: any[] }) {
    return new TestImmutableContainer(builder.mods);
  }

  public inDomainOf(domain: number): boolean {
    return true;
  }

  public maxModsOfType(mod: any): number {
    return Number.POSITIVE_INFINITY;
  }
  public level(): number {
    return Number.POSITIVE_INFINITY;
  }
}

it('should not crash', () => {
  const mc_1 = new TestImmutableContainer([]);

  expect(mc_1.mods).toHaveLength(0);
});

it('should not hold duplicate mods', () => {
  const container = new TestImmutableContainer([]);

  expect(container.mods).toHaveLength(0);
  expect(container.addMod(sturdy).mods).toHaveLength(1);
  expect(container.addMod(sturdy).addMod(plusLevel).mods).toHaveLength(2);
  expect(
    container
      .addMod(sturdy)
      .addMod(plusLevel)
      .addMod(sturdy).mods,
  ).toHaveLength(2);
});

it('should have any if it has mods', () => {
  const container = new TestImmutableContainer([]);

  expect(container.any()).toBe(false);

  expect(container.addMod(sturdy).any()).toBe(true);
});

it('should consider the tags of its mods', () => {
  const container = new TestImmutableContainer([]);

  expect(container.getTags()).toHaveLength(0);
  expect(container.addMod(sturdy).getTags()).toHaveLength(0);
  expect(container.addMod(craftedCastSpeed).getTags()).toHaveLength(1);
  expect(container.addMod(craftedCastSpeed).getTags()).toHaveLength(1);
  expect(
    container
      // mods have same tag
      .addMod(craftedCastSpeed)
      .addMod(craftedSpellDamage)
      .getTags(),
  ).toHaveLength(1);
  expect(
    container
      .addMod(craftedCastSpeed)
      .addMod(essenceWeaponRange)
      .getTags(),
  ).toHaveLength(2);
});

it('should sum its stats grouped by stat id considering affixes/implicits', () => {
  const container = new TestImmutableContainer([]);

  expect(container.stats()).toEqual({});

  const with_ipd = container.addMod(
    mods.fromId('LocalIncreasedPhysicalDamagePercent7'),
  );
  const with_ipd_stats = with_ipd.stats();
  expect(
    Object.keys(with_ipd_stats).map(id => [id, with_ipd_stats[id].values]),
  ).toEqual([['local_physical_damage_+%', { min: 155, max: 169 }]]);

  const with_hybrid_and_ipd = with_ipd.addMod(
    mods.fromId('LocalIncreasedPhysicalDamagePercentAndAccuracyRating2'),
  );
  const with_hybrid_and_ipd_stats = with_hybrid_and_ipd.stats();
  expect(
    Object.keys(with_hybrid_and_ipd_stats).map(id => [
      id,
      with_hybrid_and_ipd_stats[id].values,
    ]),
  ).toEqual([
    ['local_physical_damage_+%', { min: 175, max: 193 }],
    ['local_accuracy_rating', { min: 8, max: 30 }],
  ]);
});
