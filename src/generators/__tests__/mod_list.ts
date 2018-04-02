import { createTables } from '../../__fixtures__/util';
import ItemShowcase from '../ItemShowcase';
import { GeneratorDetails } from '../Generator';
import Mod from '../../mods/Mod';

const { craftingbenchoptions, essences, items, mods } = createTables();

// this is a non exhaustive lists of previously generated mods
// this is mainly used to track changes in the behavior
// this also fails when new mods are add or removed
// so failing does not neccessarily mean that something is wrong

const showcase = new ItemShowcase(
  mods.all(),
  craftingbenchoptions.all(),
  essences.all(),
);

const formatForSnapshot = ({ mod, ...props }: GeneratorDetails<Mod>) => ({
  mod: mod.props.id,
  type: mod.constructor.name,
  ...props,
});

// some equipment classes. this is in no way complete
it('should match the previously generated helmet mods', () => {
  const helmet = items.fromName('Hubris Circlet');
  expect(showcase.modsFor(helmet).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated boots mods', () => {
  const boots = items.fromName('Iron Greaves');
  expect(showcase.modsFor(boots).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated gloves mods', () => {
  const gloves = items.fromName('Wrapped Mitts');
  expect(showcase.modsFor(gloves).map(formatForSnapshot)).toMatchSnapshot();
});

it('should match the previously generated wand mods', () => {
  const wand = items.fromName('Pagan Wand');
  expect(showcase.modsFor(wand).map(formatForSnapshot)).toMatchSnapshot();
});

it('should be able to generate elder mods', () => {
  const boots = items.fromName('Iron Greaves').asElderItem();

  expect(
    showcase
      .modsFor(boots)
      .filter(({ mod }) => /Elder/.test(mod.props.name))
      .map(formatForSnapshot),
  ).toMatchSnapshot();
});

it('should be able to generate shaper mods', () => {
  const boots = items.fromName('Iron Greaves').asShaperItem();

  expect(
    showcase
      .modsFor(boots)
      .filter(
        ({ mod }) =>
          mod.props.name.startsWith("The Shaper's") ||
          mod.props.name.endsWith('of Shaping'),
      )
      .map(formatForSnapshot),
  ).toMatchSnapshot();
});
