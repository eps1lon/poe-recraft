import MasterBenchOption from '../../generators/MasterBenchOption';

import PropsTable from '../PropsTable';

// tslint:disable: no-var-requires
const all_options = require('../../../data/craftingbenchoptions.json');

it('should find props', () => {
  const table = new PropsTable(all_options, MasterBenchOption, undefined);

  expect(table.find(props => props.primary === 3)).toBeDefined();
  expect(table.find(() => false)).toBeUndefined();
  expect(table.find(props => props.required_level === 72)).toEqual(
    expect.any(Object),
  );
});

it('should throw when the entry was not found', () => {
  const table = new PropsTable(all_options, MasterBenchOption, undefined);

  expect(() => table.fromPrimary(-5)).toThrowError(
    "MasterBenchOption not found with primary '-5'",
  );
});

it('should have a fromPrimary finder', () => {
  const table = new PropsTable(all_options, MasterBenchOption, undefined);

  expect(table.fromPrimary(1)).toBeInstanceOf(MasterBenchOption);
});
