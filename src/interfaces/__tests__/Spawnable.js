// @flow
import { calculateSpawnchance } from '../Spawnable';
import { Item } from '../../containers/';
import { ApplicableMod, RollableMod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');
const mods = require('../../__fixtures__/mods.json');

it('should calculate spawnchances from weights', () => {
  const knife = Item.build(
    findByPrimary(baseitemtypes, 1025),
    meta_datas,
  ).setRarity('rare');

  const wicked = new RollableMod(findByPrimary(mods, 793));
  const vicious = new RollableMod(findByPrimary(mods, 794));
  const wickedCrafted = new ApplicableMod(findByPrimary(mods, 5749));

  const maybe_spawnables = [wicked, wickedCrafted, vicious];

  expect(calculateSpawnchance(knife, maybe_spawnables)).toEqual([
    {
      thing: wicked,
      spawnchance: 1000 / 1400,
    },
    {
      thing: wickedCrafted,
      spawnchance: 0,
    },
    {
      thing: vicious,
      spawnchance: 400 / 1400,
    },
  ]);
});
