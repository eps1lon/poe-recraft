import AtlasNode from '../AtlasNode';
import { Mod } from '../../mods';
import { findByPrimary } from '../../__fixtures__/util';

const atlas_nodes_props = require('../../__fixtures__/atlas.json');
const mods = require('../../__fixtures__/mods.json');

let atlas;

const getNode = primary => atlas.find(node => node.props.primary === primary);
const getNodeIndex = primary =>
  atlas.findIndex(node => node.props.primary === primary);
const ids = ({ props: { world_area: { id } } }) => id;

beforeEach(() => {
  atlas = atlas_nodes_props.map(node_props => new AtlasNode([], node_props));
});

it('should know sextant ranges', () => {
  const dunes = new AtlasNode([], findByPrimary(atlas_nodes_props, 26));
  const oasis = new AtlasNode([], findByPrimary(atlas_nodes_props, 7));
  const strand = new AtlasNode([], findByPrimary(atlas_nodes_props, 37));

  expect(dunes.isInSextantRange(strand)).toBe(true);
  expect(strand.isInSextantRange(dunes)).toBe(true);

  expect(dunes.isInSextantRange(oasis)).toBe(false);
  expect(oasis.isInSextantRange(dunes)).toBe(false);
});

it('should collect maps in range', () => {
  const arid = new AtlasNode([], findByPrimary(atlas_nodes_props, 8));
  const dunes = new AtlasNode([], findByPrimary(atlas_nodes_props, 26));
  const oasis = new AtlasNode([], findByPrimary(atlas_nodes_props, 7));
  const peninsula = new AtlasNode([], findByPrimary(atlas_nodes_props, 25));
  const strand = new AtlasNode([], findByPrimary(atlas_nodes_props, 37));
  const villa = new AtlasNode([], findByPrimary(atlas_nodes_props, 22));

  const affected = dunes.inSextantRange([
    arid,
    dunes,
    oasis,
    peninsula,
    strand,
    villa,
  ]);

  expect(affected).toHaveLength(4);
  expect(affected).toEqual([dunes, arid, strand, villa]);
});

it('should be able to incrementally get maps in range', () => {
  const dunes = getNode(26);

  expect(dunes).toBeInstanceOf(AtlasNode);

  // $FlowFixMe
  expect(dunes.inSextantRange(atlas, 0).map(ids)).toEqual(['MapAtlasDunes']);

  expect(
    // $FlowFixMe
    dunes
      .inSextantRange(atlas, 1)
      .map(ids)
      .sort(),
  ).toEqual([
    'MapAtlasAridLake',
    'MapAtlasDunes',
    'MapAtlasStrand',
    'MapAtlasStrandUnique',
    'MapAtlasVilla',
  ]);

  expect(
    // $FlowFixMe
    dunes
      .inSextantRange(atlas, 2)
      .map(ids)
      .sort(),
  ).toEqual([
    'MapAtlasAridLake',
    'MapAtlasCastleRuins',
    'MapAtlasDryPeninsula',
    'MapAtlasDunes',
    'MapAtlasDungeon',
    'MapAtlasGrotto',
    'MapAtlasOasis',
    'MapAtlasStrand',
    'MapAtlasStrandUnique',
    'MapAtlasVilla',
    'MapAtlasWharf',
  ]);
});

it('should consider its area level', () => {
  expect(new AtlasNode([], findByPrimary(atlas_nodes_props, 26)).level()).toBe(
    72,
  );
});

it('should know by which mods its affected', () => {
  const strand_index = getNodeIndex(37);
  const waka_index = getNodeIndex(38);

  const master_mod = new Mod(findByPrimary(mods, 8760));
  const invasion_mod = new Mod(findByPrimary(mods, 8772));

  atlas[waka_index] = atlas[waka_index].addMod(master_mod);

  expect(atlas[waka_index].mods).toContain(master_mod);
  expect(atlas[waka_index].affectingMods(atlas)).toContain(master_mod);
  expect(atlas[waka_index].activeMods(atlas)).not.toContain(master_mod);
  expect(atlas[waka_index].inactiveMods(atlas)).toContain(master_mod);

  atlas[strand_index] = atlas[strand_index].addMod(invasion_mod);
  expect(atlas[strand_index].mods).toContain(invasion_mod);
  expect(atlas[strand_index].affectingMods(atlas)).toContain(invasion_mod);
  expect(atlas[strand_index].affectingMods(atlas)).toContain(master_mod);
  expect(atlas[waka_index].affectingMods(atlas)).toContain(invasion_mod);
  expect(atlas[waka_index].activeMods(atlas)).toContain(invasion_mod);
  expect(atlas[waka_index].inactiveMods(atlas)).not.toContain(invasion_mod);
});
