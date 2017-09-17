// @flow
import { Implicits } from '../';
import { Mod } from '../../mods/';

import { findByPrimary } from '../../__fixtures__/util';

const mods = require('../../__fixtures__/mods.json');

const sturdy = new Mod(findByPrimary(mods, 1465));
const plusLevel = new Mod(findByPrimary(mods, 5215));
const bladesOnHit = new Mod(findByPrimary(mods, 7058));

it('should not crash', () => {
  const implicits = new Implicits([]);

  expect(implicits.mods).toHaveLength(0);
});

it('should know its limits', () => {
  const implicits = new Implicits([]);

  expect(implicits.maxModsOfType(sturdy)).toBe(-1);
  expect(implicits.maxModsOfType(plusLevel)).toBe(1);
  expect(implicits.maxModsOfType(bladesOnHit)).toBe(1);
});

it('should disallow foreign mods', () => {
  const implicits = new Implicits([]);

  expect(implicits.addMod(sturdy)).toBe(implicits);
});

it('should be immutable', () => {
  const implicits = new Implicits([]);
  const new_implicits = implicits.addMod(plusLevel);

  expect(new_implicits).not.toBe(implicits);
  expect(new_implicits.mods).toHaveLength(1);
});

it('should ignore duplicate or non existing ones', () => {
  const implicits = new Implicits([]).addMod(plusLevel);

  expect(implicits.addMod(plusLevel)).toBe(implicits);
  expect(implicits.removeMod(bladesOnHit)).toBe(implicits);
});

it('should be able to remove specified mods', () => {
  const implicits = new Implicits([]).addMod(plusLevel);

  expect(implicits.mods).toHaveLength(1);

  const cleaned = implicits.removeMod(plusLevel);

  expect(cleaned).not.toBe(implicits);
  expect(cleaned.mods).toHaveLength(0);
});
