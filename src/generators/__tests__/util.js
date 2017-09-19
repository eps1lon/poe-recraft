// @flow
import { calculateSpawnchance } from '../util';

import { Mod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const mods = require('../../__fixtures__/mods.json');

it('should calculate spawnchances from weights', () => {
  const wicked = new Mod(findByPrimary(mods, 793));
  const vicious = new Mod(findByPrimary(mods, 794));
  const wickedCrafted = new Mod(findByPrimary(mods, 5749));

  const collection = [
    {
      mod: wicked,
      spawnweight: 1000,
    },
    {
      mod: wickedCrafted,
      spawnweight: 0,
    },
    {
      mod: vicious,
      spawnweight: 400,
    },
  ];

  expect(calculateSpawnchance(collection)).toEqual([
    {
      mod: wicked,
      spawnweight: 1000,
      spawnchance: 1000 / 1400,
    },
    {
      mod: wickedCrafted,
      spawnweight: 0,
      spawnchance: 0,
    },
    {
      mod: vicious,
      spawnweight: 400,
      spawnchance: 400 / 1400,
    },
  ]);
});
