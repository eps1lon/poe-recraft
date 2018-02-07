// @flow
import { createTables } from '../../../../../__fixtures__/util';

import build from '../ArmourProperties';

const tables = createTables();

const { items, mods } = tables;

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
    armour: { type: 'augmented', values: [594, 859] },
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
  expect(props.evasion.values).toEqual([786, 1165]);
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
  expect(props.energy_shield.values).toEqual([120, 134]);
});
