// @flow
import { Container } from '../';
import { Mod } from '../../mods/';

import { findByPrimary } from '../../__fixtures__/util';

const mods = require('../../__fixtures__/mods.json');

const sturdy = new Mod(findByPrimary(mods, 1465));
const plusLevel = new Mod(findByPrimary(mods, 5215));

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
