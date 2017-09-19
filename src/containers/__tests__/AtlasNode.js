// @flow
import AtlasNode from '../AtlasNode';
import { findByPrimary } from '../../__fixtures__/util';

const atlas_nods_props = require('../../__fixtures__/atlas.json');

it('should know sextant ranges', () => {
  const dunes = new AtlasNode([], findByPrimary(atlas_nods_props, 26));
  const oasis = new AtlasNode([], findByPrimary(atlas_nods_props, 7));
  const strand = new AtlasNode([], findByPrimary(atlas_nods_props, 37));

  expect(dunes.isInSextantRange(strand)).toBe(true);
  expect(strand.isInSextantRange(dunes)).toBe(true);

  expect(dunes.isInSextantRange(oasis)).toBe(false);
  expect(oasis.isInSextantRange(dunes)).toBe(false);
});

it('should collect maps in range', () => {
  const arid = new AtlasNode([], findByPrimary(atlas_nods_props, 8));
  const dunes = new AtlasNode([], findByPrimary(atlas_nods_props, 26));
  const oasis = new AtlasNode([], findByPrimary(atlas_nods_props, 7));
  const peninsula = new AtlasNode([], findByPrimary(atlas_nods_props, 25));
  const strand = new AtlasNode([], findByPrimary(atlas_nods_props, 37));
  const villa = new AtlasNode([], findByPrimary(atlas_nods_props, 22));

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
  const atlas = atlas_nods_props.map(
    node_props => new AtlasNode([], node_props),
  );

  const getNode = primary => atlas.find(node => node.props.primary === primary);
  const ids = ({ props: { world_area: { id } } }) => id;

  const dunes = getNode(26);

  expect(dunes.inSextantRange(atlas, 0).map(ids)).toEqual(['MapAtlasDunes']);

  expect(
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
