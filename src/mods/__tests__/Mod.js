// @flow
import { createTables } from '../../__fixtures__/util';

import Mod from '../Mod';

const { mods } = createTables();

const ofBrute = mods.fromPrimary(0);
const sturdy = mods.fromPrimary(1465);
const plusLevel = mods.fromPrimary(5215);

it('should build', () => {
  expect(mods.fromPrimary(1650)).toBeInstanceOf(Mod);
});

it('should know its type', () => {
  expect(ofBrute.isPrefix()).toBe(false);
  expect(ofBrute.isSuffix()).toBe(true);
  expect(ofBrute.isAffix()).toBe(true);
  expect(ofBrute.implicitCandidate()).toBe(false);

  expect(sturdy.isPrefix()).toBe(true);
  expect(sturdy.isSuffix()).toBe(false);
  expect(ofBrute.isAffix()).toBe(true);
  expect(sturdy.implicitCandidate()).toBe(false);

  expect(plusLevel.isPrefix()).toBe(false);
  expect(plusLevel.isSuffix()).toBe(false);
  expect(plusLevel.isType('vaal')).toBe(true);
  expect(plusLevel.implicitCandidate()).toBe(true);
});

it('should fill in the value range for its stats', () => {
  expect(
    ofBrute.statsJoined().find(stat => stat.props.id === 'additional_strength'),
  ).toMatchObject({
    values: [8, 12],
  });
});

it('should fallback to the default spawnweight if defined', () => {
  const taggable = {
    getTags() {
      return [{ id: 'dummy_tag', primary: 1 }];
    },
  };
  const sextant_mod = mods.fromPrimary(8776);

  expect(sextant_mod.spawnweightFor(taggable));
});
