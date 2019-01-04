import { createTables } from '../../__fixtures__/util';

import MasterBench from '../MasterBench';

const { craftingbenchoptions, items } = createTables();

it('should build', () => {
  const all_masters = MasterBench.build(craftingbenchoptions.all());

  expect(all_masters).toBeInstanceOf(MasterBench);

  const haku = MasterBench.build(craftingbenchoptions.all(), 6);
  expect(haku).toBeInstanceOf(MasterBench);
});

it('should throw if the specified master key was not found', () => {
  expect(() =>
    MasterBench.build(craftingbenchoptions.all(), 324166),
  ).toThrowError("no options found for '324166'");
});

it('should apply an option', () => {
  const greaves = items.fromName('Iron Greaves');
  const helena = MasterBench.build(craftingbenchoptions.all(), 3);

  expect(
    helena
      .applyOptionTo(greaves, 74)
      .affixes.mods.map(({ props: { id } }) => id),
  ).toContain('HelenaMasterIncreasedLife1');
});

it('throw if the option was not found', () => {
  const greaves = items.fromName('Iron Greaves');
  const helena = MasterBench.build(craftingbenchoptions.all(), 3);

  expect(() => helena.applyOptionTo(greaves, 213324234)).toThrowError(
    "option '213324234' not found",
  );
});
