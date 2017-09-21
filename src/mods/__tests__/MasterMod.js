// @flow
import MasterMod from '../MasterMod';

const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const mods = require('../../__fixtures__/mods.json');

describe('build', () => {
  beforeEach(() => {
    MasterMod.all = mods;
    MasterMod.option_props_list = craftingbenchoptions;
  });

  it('should build', () => {
    expect(MasterMod.fromPrimary(5596)).toBeInstanceOf(MasterMod);
  });

  it('should throw when mods table is not set', () => {
    MasterMod.all = undefined;
    expect(() => MasterMod.fromPrimary(5596)).toThrowError(
      'MasterMod props list not set',
    );
  });

  it('should throw when options table is not set', () => {
    MasterMod.option_props_list = undefined;
    expect(() => MasterMod.fromPrimary(5596)).toThrowError(
      'MasterMod option props list not set',
    );
  });

  it('should throw when the option is not found', () => {
    expect(() => MasterMod.fromPrimary(0)).toThrow(
      'option not found for mod 0',
    );
  });
});
