// @flow
import Mod from '../Mod';

const mods = require('../../__fixtures__/mods.json');

Mod.all = mods;

const ofBrute = Mod.fromPrimary(0);
const sturdy = Mod.fromPrimary(1465);
const plusLevel = Mod.fromPrimary(5215);

it('should build', () => {
  expect(Mod.fromPrimary(1650)).toBeInstanceOf(Mod);

  Mod.all = undefined;
  expect(() => Mod.fromPrimary(1650)).toThrowError('Mod props list not set');
  Mod.all = mods;

  expect(() => Mod.fromPrimary(1600050)).toThrowError(
    "Mod primary '1600050' not found",
  );
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
  const sextant_mod = Mod.fromPrimary(8776);

  expect(sextant_mod.spawnweightFor(taggable));
});
