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

it('should consider stats for evasion', () => {
  const garb = items.fromPrimary(1648);

  const flat_evasion = mods.fromPrimary(1416);
  const percent_evasion = mods.fromPrimary(1082);

  expect(build(garb.addMod(flat_evasion))).toEqual({
    armour: { type: 'simple', values: [329, 329] },
    evasion: { type: 'augmented', values: [468, 651] },
    energy_shield: { type: 'simple', values: [64, 64] },
  });

  const props = build(garb.addMod(flat_evasion).addMod(percent_evasion));
  expect(props.evasion.type).toBe('augmented');
  expect(props.evasion.values[0]).toBeCloseTo(468 * 1.68, 5);
  expect(props.evasion.values[1]).toBeCloseTo(651 * 1.79, 5);
});

it('should consider stats for es', () => {
  const garb = items.fromPrimary(1648);

  const flat_es = mods.fromPrimary(468);
  const percent_es = mods.fromPrimary(1218);

  expect(build(garb.addMod(flat_es))).toEqual({
    armour: { type: 'simple', values: [329, 329] },
    evasion: { type: 'simple', values: [329, 329] },
    energy_shield: { type: 'augmented', values: [95, 102] },
  });

  const props = build(garb.addMod(flat_es).addMod(percent_es));
  expect(props.energy_shield.type).toBe('augmented');
  expect(props.energy_shield.values[0]).toBeCloseTo(95 * 1.27, 5);
  expect(props.energy_shield.values[1]).toBeCloseTo(102 * 1.32, 5);
});
