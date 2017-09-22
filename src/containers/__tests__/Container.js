// @flow
import { createTables } from '../../__fixtures__/util';
import Container from '../Container';

const { mods } = createTables();

const sturdy = mods.fromPrimary(1465);
const plusLevel = mods.fromPrimary(5215);
const craftedCastSpeed = mods.fromPrimary(5653);
const craftedSpellDamage = mods.fromPrimary(5660);
const essenceWeaponRange = mods.fromPrimary(4467);

it('should not crash', () => {
  const mc_1 = new Container([]);

  expect(mc_1.mods).toHaveLength(0);
});

it('should not hold duplicate mods', () => {
  const container = new Container([]);

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

it('should consider the tags of its mods', () => {
  const container = new Container([]);

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
