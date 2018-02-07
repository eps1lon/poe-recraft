// @flow
import { createTables } from '../../__fixtures__/util';

import { calculateSpawnchance } from '../util';

const { mods } = createTables();

it('should calculate spawnchances from weights', () => {
  const wicked = mods.fromPrimary(793);
  const vicious = mods.fromPrimary(794);
  const wickedCrafted = mods.fromPrimary(5749);

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
