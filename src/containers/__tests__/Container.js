// @flow
import { Container } from '../';

it('should not crash', () => {
  const mc_1 = new Container([]);

  expect(mc_1.mods).toHaveLength(0);
});
