// @flow
import Stat from '../Stat';

const mods = require('../../__fixtures__/mods.json');

const ipd = mods.find(
  ({ id }) => id === 'LocalIncreasedPhysicalDamagePercentAndAccuracyRating1',
);

it('should initi with 0,0', () => {
  expect(new Stat(ipd).values).toEqual([0, 0]);
});

it('should add like a simple vector', () => {
  expect(new Stat(ipd).add([-1, 3]).values).toEqual([-1, 3]);
});

it('should multiple multiply like a vector', () => {
  expect(new Stat(ipd).add([0, 2]).mult([22, 0.5]).values).toEqual([0, 1]);
  expect(new Stat(ipd).add([1, 2]).mult([4, 2]).values).toEqual([4, 4]);
});

it('should be replaceable', () => {
  expect(
    new Stat(ipd)
      .add([1, 2])
      .mult([4, 2])
      .set([-45, 13]).values,
  ).toEqual([-45, 13]);
});

it('should have a value string like the wiki', () => {
  expect(new Stat(ipd, [100, 15]).valueString()).toEqual('(100 - 15)');
  expect(new Stat(ipd, [15, 100]).valueString()).toEqual('(15 - 100)');
  expect(new Stat(ipd, [4, 4]).valueString()).toEqual('(4 - 4)');
});
