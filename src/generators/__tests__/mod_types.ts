import {
  ElderMods,
  ShapedMods,
  BestiaryAspectMods,
  MasterSignatureMods,
} from '../mod_types';
import { createTables } from '../../__fixtures__/util';

const { mods } = createTables();

it('should match the curated list of Elder mods', () => {
  expect(
    ElderMods.build(mods.all()).mods.map(mod => mod.props.id),
  ).toMatchSnapshot();
});

it('should match the curated list of Shaped mods', () => {
  expect(
    ShapedMods.build(mods.all()).mods.map(mod => mod.props.id),
  ).toMatchSnapshot();
});

it('should match the curated list of Bestiary Aspect mods', () => {
  expect(
    BestiaryAspectMods.build(mods.all()).mods.map(mod => mod.props.id),
  ).toMatchSnapshot();
});

it('should match the curated list of Master Signature mods', () => {
  expect(
    MasterSignatureMods.build(mods.all()).mods.map(mod => mod.props.id),
  ).toMatchSnapshot();
});
