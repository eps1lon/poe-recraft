import { createTables } from '../../__fixtures__/util';

import Mod from '../Mod';

const { mods } = createTables();

const ofBrute = mods.fromId('Strength1');
const sturdy = mods.fromId('LocalBaseArmourAndEvasionRating5');
const plusLevel = mods.fromId('GemLevelCorruption');

it('should build', () => {
  expect(mods.fromId('SpellDamageOnWeaponImplicitWand2')).toBeInstanceOf(Mod);
});

it('should know its type', () => {
  expect(ofBrute.isPrefix()).toBe(false);
  expect(ofBrute.isSuffix()).toBe(true);
  expect(ofBrute.isAffix()).toBe(true);
  expect(ofBrute.implicitCandidate()).toBe(false);

  expect(sturdy.isPrefix()).toBe(true);
  expect(sturdy.isSuffix()).toBe(false);
  expect(ofBrute.isAffix()).toBe(true);
  expect(sturdy.implicitCandidate()).toBe(false);

  expect(plusLevel.isPrefix()).toBe(false);
  expect(plusLevel.isSuffix()).toBe(false);
  expect(plusLevel.isType('vaal')).toBe(true);
  expect(plusLevel.implicitCandidate()).toBe(true);
});

it('should fill in the value range for its stats', () => {
  expect(
    ofBrute.statsJoined().find(stat => stat.props.id === 'additional_strength'),
  ).toMatchObject({
    values: { min: 8, max: 12 },
  });
});

it('should fallback to the default spawnweight if defined', () => {
  const taggable = {
    getTags() {
      return [{ id: 'dummy_tag', primary: 1 }];
    },
  };
  const sextant_mod = mods.fromId('MapAtlasMoveAttackCastSpeed');

  expect(sextant_mod.spawnweightFor(taggable));
});

it('should have a string represantation of its generation type', () => {
  const suffix = mods.fromId('FireDamagePercent3');
  expect(suffix.modType()).toBe('suffix');

  const enchantment = mods.fromId('EnchantmentOfBladesOnHit1');
  expect(enchantment.modType()).toBe('enchantment');

  expect(
    new Mod({ ...enchantment.props, generation_type: -1 }).modType(),
  ).toBeUndefined();
});
