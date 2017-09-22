// @flow
import { createTables } from '../../__fixtures__/util';
import ItemShowcase from '../ItemShowcase';

const { craftingbenchoptions, items, mods } = createTables();

// this is a non exhaustive lists of previously generated mods
// this is mainly used to track changes in the behavior

const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());

const formatForSnapshot = ({ mod, ...props }) => ({
  mod: mod.props.id,
  type: mod.constructor.name,
  ...props,
});

// some equipment classes. this is in no way complete
it('should match the previously generated helmet mods', () => {
  const helmet = items.fromPrimary(1511);
  expect(showcase.modsFor(helmet).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated boots mods', () => {
  const boots = items.fromPrimary(1650);
  expect(showcase.modsFor(boots).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated gloves mods', () => {
  const gloves = items.fromPrimary(1751);
  expect(showcase.modsFor(gloves).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated wand mods', () => {
  const wand = items.fromPrimary(1011);
  expect(showcase.modsFor(wand).map(formatForSnapshot)).toMatchSnapshot();
});
