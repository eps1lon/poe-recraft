import { createTables } from '../../../../__fixtures__/util';

const { items, mods } = createTables();

export default [
  items
    .fromName('Platinum Kris')
    .rarity.set('magic')
    .addMod(
      mods.fromId('LocalIncreasedPhysicalDamagePercentAndAccuracyRating2'),
    )
    .setProperty('mirrored', true),
  items
    .fromName('Hubris Circlet')
    .rarity.set('rare')
    .asShaperItem()
    .addMod(mods.fromId('IncreasedLife0'))
    .addMod(mods.fromId('LocalIncreasedEnergyShield2'))
    .addMod(mods.fromId('LocalIncreasedEnergyShieldPercentAndStunRecovery3'))
    .addMod(mods.fromId('FireResist1'))
    .addMod(mods.fromId('ReducedLocalAttributeRequirements1'))
    .addMod(mods.fromId('AdditionalMinesPlacedSupportedUber1_'))
    .setProperty('corrupted', true),
];
