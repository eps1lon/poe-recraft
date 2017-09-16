// @flow
import Generator from '../Generator';

it('should have a mods getter which will prevent mutation', () => {
  const generator = new Generator([]);

  const available_mods = generator.getAvailableMods();

  expect(available_mods).toHaveLength(0);
  expect(available_mods).not.toBe(generator.mods);
});
