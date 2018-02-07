// @flow
import Mod from '../../../../mods/Mod';
import PropsTable from '../../../../helpers/PropsTable';
import { BaseItemTypeProps, ModProps } from '../../../../schema';
import { createTables } from '../../../../__fixtures__/util';

import Item from '../../Item';

const tables = createTables();
const { items, mods } = tables;

it('should consider its mods for its required level', () => {
  const greaves = items.fromPrimary(1652).rarity.set('rare');

  expect(greaves.requirements.level()).toBe(23);
  // 17 modrequirements.level
  expect(greaves.addMod(mods.fromPrimary(2)).requirements.level()).toBe(23);
  // 26 mod
  expect(greaves.addMod(mods.fromPrimary(3)).requirements.level()).toBe(26);
});

it('should have attr requirements', () => {
  const greaves = items.fromPrimary(1652);

  expect(greaves.requirements.list()).toEqual({
    level: 23,
    str: 44,
    dex: 0,
    int: 0,
  });
});

it('should have requirements if any are greater than zero', () => {
  expect(items.fromPrimary(2276).requirements.any()).toBe(false);

  expect(items.fromPrimary(1652).requirements.any()).toBe(true);
});
