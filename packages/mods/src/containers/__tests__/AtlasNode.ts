import { createTables, fromWorldAreaId } from '../../__fixtures__/util';
import { AtlasNodeProps } from '../../schema';

import AtlasNode from '../AtlasNode';

const { atlas: atlas_nodes, mods } = createTables();

let atlas: AtlasNode[] = [];

const getNode = (id: string) => {
  const node = atlas.find(
    (other: AtlasNode) => other.props.world_area.id === id,
  );

  if (node === undefined) {
    throw new Error(`node ${id} not found`);
  }

  return node;
};
const getNodeIndex = (id: string) =>
  atlas.findIndex((node: AtlasNode) => node.props.world_area.id === id);
const ids = ({
  props: {
    world_area: { id },
  },
}: AtlasNode) => id;

beforeEach(() => {
  atlas = atlas_nodes
    .all()
    .map((node_props: AtlasNodeProps) => new AtlasNode([], node_props));
});

it('should build', () => {
  expect(fromWorldAreaId('MapWorldsDunes', atlas_nodes)).toBeInstanceOf(
    AtlasNode,
  );
});

it('should know sextant ranges', () => {
  const dunes = fromWorldAreaId('MapWorldsDunes', atlas_nodes);
  const far_map = fromWorldAreaId('MapWorldsThicket', atlas_nodes);
  const close_map = fromWorldAreaId('MapWorldsOrchard', atlas_nodes);

  expect(dunes.isInSextantRange(close_map)).toBe(true);
  expect(close_map.isInSextantRange(dunes)).toBe(true);

  expect(dunes.isInSextantRange(far_map)).toBe(false);
  expect(far_map.isInSextantRange(dunes)).toBe(false);
});

it('should collect maps in range', () => {
  const dunes = fromWorldAreaId('MapWorldsDunes', atlas_nodes);
  const dunes_unique = fromWorldAreaId('MapWorldsDunesUnique', atlas_nodes);
  const orchard = fromWorldAreaId('MapWorldsOrchard', atlas_nodes);
  const peninsula = fromWorldAreaId('MapWorldsPeninsula', atlas_nodes);
  const strand = fromWorldAreaId('MapWorldsStrand', atlas_nodes);
  const villa = fromWorldAreaId('MapWorldsVilla', atlas_nodes);

  const affected = dunes.inSextantRange([
    dunes,
    dunes_unique,
    orchard,
    peninsula,
    strand,
    villa,
  ]);

  expect(affected).toHaveLength(3);
  expect(affected).toEqual([dunes, dunes_unique, orchard]);
});

it('should be able to incrementally get maps in range', () => {
  const dunes = getNode('MapWorldsDunes');

  expect(dunes).toBeInstanceOf(AtlasNode);

  expect(dunes.inSextantRange(atlas, 0).map(ids)).toEqual(['MapWorldsDunes']);

  expect(
    dunes
      .inSextantRange(atlas, 1)
      .map(ids)
      .sort(),
  ).toMatchSnapshot();

  expect(
    dunes
      .inSextantRange(atlas, 2)
      .map(ids)
      .sort(),
  ).toMatchSnapshot();
});

it('should consider its area level', () => {
  expect(fromWorldAreaId('MapWorldsDunes', atlas_nodes).level()).toBe(74);
});

it('should know by which mods its affected', () => {
  const strand_index = getNodeIndex('MapWorldsStrand');
  const waka_index = getNodeIndex('MapWorldsStrandUnique');

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
