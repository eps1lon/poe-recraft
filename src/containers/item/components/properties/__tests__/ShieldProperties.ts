import { createTables } from '../../../../../__fixtures__/util';
import ShieldProperties from '../ShieldProperties';

const { items, mods } = createTables();

it('should consider have a base block', () => {
  const buckler = items.fromName('Goathide Buckler');

  expect((buckler.properties as ShieldProperties).block().value).toEqual(25);
});

it('should consider stats that improve block', () => {
  const eva_shield = items
    .fromName('Goathide Buckler')
    .addMod(mods.fromId('AdditionalBlockChance1'));
  expect((eva_shield.properties as ShieldProperties).block().value).toEqual([
    26,
    28,
  ]);

  const str_shield = items
    .fromName('Goathide Buckler')
    .addMod(mods.fromId('AdditionalBlockChance1'))
    .addMod(
      mods.fromId(
        'LocalIncreasedPhysicalDamageReductionRatingPercentAndAdditionalBlockChance1',
      ),
    );
  expect((str_shield.properties as ShieldProperties).block().value).toEqual([
    28,
    30,
  ]);
});
