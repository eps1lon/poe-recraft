import { createTables } from '../../__fixtures__/util';
import AtlasNode from '../../containers/AtlasNode';
import Sextant from '../../generators/Sextant';

import Atlas from '../Atlas';

const { atlas: atlas_props, mods } = createTables();

it('should build', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas).toBeInstanceOf(Atlas);
});

it('should have a human readable getter', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas.get('MapWorldsDunes')).toBeInstanceOf(AtlasNode);
  expect(atlas.get('MapWorldsGardens')).toBeInstanceOf(AtlasNode);
  expect(() => atlas.get('UndefinedMap')).toThrow(
    "IndexError: 'UndefinedMap' not found",
  );
});

it('should return a new only if it changed', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas.withMutations(b => b)).toBe(atlas);
  // created a new reference, not checking shallow equal
  expect(atlas.withMutations(b => ({ ...b }))).not.toBe(atlas);
});

it('should add mods', () => {
  const atlas = Atlas.build(atlas_props.all());
  const invasion_mod = mods.fromId('MapAtlasContainsAdditionalRandomBoss');

  const with_mods = atlas.addMod(invasion_mod, 'MapWorldsDunes');

  expect(with_mods).not.toBe(atlas);
  expect(atlas.get('MapWorldsDunes')).not.toBe(with_mods.get('MapWorldsDunes'));
  expect(with_mods.get('MapWorldsDunes').hasMod(invasion_mod)).toBe(true);

  // node didnt change => atlas didnt change
  expect(with_mods.addMod(invasion_mod, 'MapWorldsDunes')).toBe(with_mods);
});

it('should remove mods', () => {
  const invasion_mod = mods.fromId('MapAtlasContainsAdditionalRandomBoss');
  const atlas = Atlas.build(atlas_props.all()).addMod(
    invasion_mod,
    'MapWorldsDunes',
  );

  const without_mods = atlas.removeMod(invasion_mod, 'MapWorldsDunes');

  expect(without_mods).not.toBe(atlas);
  expect(without_mods.get('MapWorldsDunes')).not.toBe(
    atlas.get('MapWorldsDunes'),
  );
  expect(without_mods.get('MapWorldsDunes').hasMod(invasion_mod)).toBe(false);

  // node didnt change => atlas didnt change
  expect(without_mods.removeMod(invasion_mod, 'MapWorldsDunes')).toBe(
    without_mods,
  );
});

it('should be resettable', () => {
  const invasion_mod = mods.fromId('MapAtlasContainsAdditionalRandomBoss');
  const magick_packs_mod = mods.fromId('MapAtlasMagicPackSize');
  const atlas = Atlas.build(atlas_props.all())
    .addMod(invasion_mod, 'MapWorldsDunes')
    .addMod(magick_packs_mod, 'MapWorldsArcade');

  // pre
  expect(atlas.get('MapWorldsDunes').hasMod(invasion_mod)).toBe(true);
  expect(atlas.get('MapWorldsArcade').hasMod(magick_packs_mod)).toBe(true);

  const without_mods = atlas.reset();

  // post
  expect(without_mods).not.toBe(atlas);

  expect(without_mods.get('MapWorldsDunes').mods).toHaveLength(0);
  expect(without_mods.get('MapWorldsArcade').mods).toHaveLength(0);

  // reset always changes
  expect(without_mods.reset).not.toBe(without_mods);
});

it('should calc mods from sextants', () => {
  const atlas = Atlas.build(atlas_props.all());
  const sextant = Sextant.build(mods.all());

  const available_mods = atlas
    .modsFor(sextant, 'MapWorldsDunes')
    .map(({ mod }) => mod.props.id);

  expect(available_mods).toMatchSnapshot();
});

it('should apply sextants', () => {
  const atlas = Atlas.build(atlas_props.all());
  const sextant = Sextant.build(mods.all());

  const crafted = atlas.applySextant(sextant, 'MapWorldsDunes');

  // post
  expect(crafted.get('MapWorldsDunes').mods).toHaveLength(1);
  expect(crafted).not.toBe(atlas);

  sextant.type = Sextant.type.apprentice;
  // apprentice on red map
  expect(atlas.applySextant(sextant, 'MapWorldsPlaza')).toBe(atlas);
});
