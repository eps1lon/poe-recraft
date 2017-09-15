// @flow
import { Implicits } from '../';

it('should not crash', () => {
  const implicits = new Implicits([]);

  expect(implicits.mods).toHaveLength(0);
});
