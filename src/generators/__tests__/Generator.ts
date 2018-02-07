import { createTables } from '../../__fixtures__/util';
import Item from '../../containers/item';
import Mod from '../../mods/Mod';

import Generator from '../Generator';

const { items, mods } = createTables();

class TestGenerator extends Generator<any, any> {
  public applyTo(container: any): any {
    throw new Error('abstract');
  }

  public modsFor(container: any, whitelist: string[]): any[] {
    throw new Error('abstract');
  }

  public applicableTo(container: any): any {
    throw new Error('abstract');
  }
}
it('should have a mods getter which will prevent mutation', () => {
  const generator = new TestGenerator([]);

  const available_mods = generator.getAvailableMods();

  expect(available_mods).toHaveLength(0);
  expect(available_mods).not.toBe(generator.mods);
});

it('should work like ingame', () => {
  const generator: Generator<Mod, Item> = new TestGenerator([]);

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

it('should know that it can apply the same mod in implicit and explicit', () => {
  // has implicit dodge
  const shield = items.fromPrimary(1478).rarity.set('rare');
  // explicit dodge
  const dodge = mods.fromPrimary(4877);
  const generator: Generator<Mod, Item> = new TestGenerator([]);

  expect(generator.isModApplicableTo(dodge, shield)).toEqual({
    above_lld_level: false,
    already_present: false,
    domain_full: false,
    lower_ilvl: false,
    wrong_domain: false,
  });
});
