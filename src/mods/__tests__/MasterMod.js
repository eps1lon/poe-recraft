// @flow
import MasterMod from '../MasterMod';
import { findByPrimary } from '../../__fixtures__/util';

const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const mods = require('../../__fixtures__/mods.json');

const craftedLife = MasterMod.build(
  findByPrimary(mods, 5596),
  craftingbenchoptions,
);

it('should build', () => {
  expect(craftedLife).toBeInstanceOf(MasterMod);

  const sturdyProps = findByPrimary(mods, 0);
  expect(sturdyProps).toBeDefined();
  expect(() => MasterMod.build(sturdyProps, craftingbenchoptions)).toThrowError(
    'option not found for mod 0',
  );
});
