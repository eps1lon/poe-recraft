// @flow
import { createTables } from '../../__fixtures__/util';
import Item from '../../containers/item';
import Mod from '../../mods/Mod';

import Generator from '../Generator';

const { items, mods } = createTables();

it('is abstract and throws if access in a non abstract way', () => {
  const generator = new Generator([]);
  const item = items.fromPrimary(1);

  expect(() => generator.applyTo(item)).toThrowError(
    'override abstract method Generator#applyTo',
  );

  expect(() => generator.modsFor(item)).toThrowError(
    'override abstract method Generator#modsFor',
  );

  expect(() => generator.applicableTo(item)).toThrowError(
    'override abstract method Generator#applicableTo',
  );

  class StillAbstractGenerator extends Generator<*, *> {}

  expect(() => new StillAbstractGenerator([]).applyTo(item)).toThrowError(
    'override abstract method StillAbstractGenerator#applyTo',
  );
});

it('should have a mods getter which will prevent mutation', () => {
  const generator = new Generator([]);

  const available_mods = generator.getAvailableMods();

  expect(available_mods).toHaveLength(0);
  expect(available_mods).not.toBe(generator.mods);
});

it('should work like ingame', () => {
  const generator: Generator<Mod, Item> = new Generator([]);

  const greaves = items.fromPrimary(1650);

  const ofBrute = mods.fromPrimary(0);
  const ofWrestler = mods.fromPrimary(1);
  const sturdy = mods.fromPrimary(1465);

  // normal items cant have mods
  expect(generator.isModApplicableTo(ofBrute, greaves)).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: true,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // cant add magic item can only have 1 prefix and not double mods
  expect(
    generator.isModApplicableTo(
      ofBrute,
      greaves.rarity.set('magic').addMod(ofBrute),
    ),
  ).toEqual({
    above_lld_level: false,
    already_present: true,
    domain_full: true,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // cant have 2 mods of same group
  expect(
    generator.isModApplicableTo(
      ofWrestler,
      greaves.rarity.set('rare').addMod(ofBrute),
    ),
  ).toEqual({
    above_lld_level: false,
    already_present: true,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // can only apply to items with high enough ilvl
  expect(
    generator.isModApplicableTo(
      ofBrute,
      greaves.rarity.set('magic').setProperty('item_level', 0),
    ),
  ).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: true,
    wrong_domain: false,
  });

  // magic and place for prefix => everything is fine
  expect(
    generator.isModApplicableTo(
      sturdy,
      greaves.rarity.set('magic').addMod(ofBrute),
    ),
  ).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });

  // place for affixes => everything is fine
  expect(
    generator.isModApplicableTo(ofBrute, greaves.rarity.set('magic')),
  ).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });
});
