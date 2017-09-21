// @flow
import { calculateSpawnchance } from '../util';

import { Mod } from '../../mods/';

Mod.all = require('../../__fixtures__/mods.json');

it('should calculate spawnchances from weights', () => {
  const wicked = Mod.fromPrimary(793);
  const vicious = Mod.fromPrimary(794);
  const wickedCrafted = Mod.fromPrimary(5749);

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
