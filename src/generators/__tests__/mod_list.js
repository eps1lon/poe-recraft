// @flow
import ItemShowcase from '../ItemShowcase';
import { Item } from '../../containers/';

Item.all = require('../../__fixtures__/baseitemtypes.json');
const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const mods = require('../../__fixtures__/mods.json');

// this is a non exhaustive lists of previously generated mods
// this is mainly used to track changes in the behavior

const showcase = new ItemShowcase(mods, craftingbenchoptions);

const formatForSnapshot = ({ mod, ...props }) => ({
  mod: mod.props.id,
  type: mod.constructor.name,
  ...props,
});

// some equipment classes. this is in no way complete
it('should match the previously generated helmet mods', () => {
  const helmet = Item.fromPrimary(1511);
  expect(showcase.modsFor(helmet).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated boots mods', () => {
  const boots = Item.fromPrimary(1650);
  expect(showcase.modsFor(boots).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated gloves mods', () => {
  const gloves = Item.fromPrimary(1751);
  expect(showcase.modsFor(gloves).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated wand mods', () => {
  const wand = Item.fromPrimary(1011);
  expect(showcase.modsFor(wand).map(formatForSnapshot)).toMatchSnapshot();
});
