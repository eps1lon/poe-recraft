// @flow
import type PropsTable from '../../../../../helpers/PropsTable';
import type { BaseItemTypeProps, ModProps } from '../../../../../schema';
import { createTables } from '../../../../../__fixtures__/util';
import type Item from '../../../Item';
import type Mod from '../../../../../mods/Mod';

import build from '../ArmourProperties';

const tables = createTables();

const items = (tables.items: PropsTable<BaseItemTypeProps, Item>);
const mods = (tables.mods: PropsTable<ModProps, Mod>);

it('should throw while attempting to build with anything else but armours', () => {
  const weapon = items.fromPrimary(1025);

  expect(() => build(weapon)).toThrow(
    'component_armour not set while attempting to build ArmourProperties',
  );
});

it('get the basics', () => {
  const garb = items.fromPrimary(1648);

  expect(build(garb)).toEqual({
    armour: { type: 'simple', values: [329, 329] },
    evasion: { type: 'simple', values: [329, 329] },
    energy_shield: { type: 'simple', values: [64, 64] },
  });
});

it('should consider stats for armour', () => {
  const garb = items.fromPrimary(1648);

  const flat_armour = mods.fromPrimary(1452);
  const percent_armour = mods.fromPrimary(1226);

  expect(build(garb.addMod(flat_armour))).toEqual({
    armour: { type: 'augmented', values: [468, 651] },
    evasion: { type: 'simple', values: [329, 329] },
    energy_shield: { type: 'simple', values: [64, 64] },
  });

  expect(build(garb.addMod(flat_armour).addMod(percent_armour))).toEqual({
    armour: { type: 'augmented', values: [468 * 1.27, 651 * 1.32] },
    evasion: { type: 'simple', values: [329, 329] },
    energy_shield: { type: 'simple', values: [64, 64] },
  });
});
