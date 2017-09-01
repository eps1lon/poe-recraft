import ModContainer from '../';

it('should not crash', () => {
  const mc_1 = new ModContainer();

  expect(mc_1.mods).toHaveLength(0);
});
