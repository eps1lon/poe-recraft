import { createTables } from '../../__fixtures__/util';
import { AtlasNodeProps } from '../../schema';

import AtlasNode from '../AtlasNode';

const { atlas: atlas_nodes, mods } = createTables();

let atlas: AtlasNode[] = [];

const getNode = (primary: number) => {
  const node = atlas.find(
    (other: AtlasNode) => other.props.primary === primary,
  );

  if (node === undefined) {
    throw new Error(`node ${primary} not found`);
  }

  return node;
};
const getNodeIndex = (primary: number) =>
  atlas.findIndex((node: AtlasNode) => node.props.primary === primary);
const ids = ({ props: { world_area: { id } } }: AtlasNode) => id;

beforeEach(() => {
  atlas = atlas_nodes
    .all()
    .map((node_props: AtlasNodeProps) => new AtlasNode([], node_props));
});

it('should build', () => {
  expect(atlas_nodes.fromPrimary(26)).toBeInstanceOf(AtlasNode);
});

it('should know sextant ranges', () => {
  const dunes = atlas_nodes.fromPrimary(26);
  const oasis = atlas_nodes.fromPrimary(7);
  const strand = atlas_nodes.fromPrimary(37);

  expect(dunes.isInSextantRange(strand)).toBe(true);
  expect(strand.isInSextantRange(dunes)).toBe(true);

  expect(dunes.isInSextantRange(oasis)).toBe(false);
  expect(oasis.isInSextantRange(dunes)).toBe(false);
});

it('should collect maps in range', () => {
  const arid = atlas_nodes.fromPrimary(8);
  const dunes = atlas_nodes.fromPrimary(26);
  const oasis = atlas_nodes.fromPrimary(7);
  const peninsula = atlas_nodes.fromPrimary(25);
  const strand = atlas_nodes.fromPrimary(37);
  const villa = atlas_nodes.fromPrimary(22);

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

it('should consider its area level', () => {
  expect(atlas_nodes.fromPrimary(26).level()).toBe(72);
});

it('should know by which mods its affected', () => {
  const strand_index = getNodeIndex(37);
  const waka_index = getNodeIndex(38);

  const master_mod = mods.fromId('MapAtlasContainsMaster');
  const invasion_mod = mods.fromId('MapAtlasContainsAdditionalRandomBoss');

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

it('has a human readable identifier', () => {
  expect(atlas_nodes.fromPrimary(8).humanId()).toBe('AridLake');
  expect(atlas_nodes.fromPrimary(26).humanId()).toBe('Dunes');
  expect(atlas_nodes.fromPrimary(7).humanId()).toBe('Oasis');
  expect(atlas_nodes.fromPrimary(25).humanId()).toBe('DryPeninsula');
  expect(atlas_nodes.fromPrimary(37).humanId()).toBe('Strand');
  expect(atlas_nodes.fromPrimary(22).humanId()).toBe('Villa');
});
