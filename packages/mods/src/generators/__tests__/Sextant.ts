import { createTables } from '../../__fixtures__/util';
import AtlasNode from '../../containers/AtlasNode';

import Sextant from '../Sextant';
import Mod from '../../mods/Mod';

const { atlas: atlas_nodes_props, mods } = createTables();

let global_atlas: AtlasNode[];

function getFromAtlas(id: string, atlas: AtlasNode[]): AtlasNode {
  const node = atlas.find(other => other.props.world_area.id === id);

  if (node === undefined) {
    throw new Error(`node '${id}' not found`);
  }

  return node;
}

const getNodeIndex = (id: string) =>
  global_atlas.findIndex(node => node.props.world_area.id === id);

const modIds = ({ props: { id } }: Mod) => id;

beforeEach(() => {
  global_atlas = atlas_nodes_props
    .all()
    .map(node_props => new AtlasNode([], node_props));
});

it('should build', () => {
  const sextant = Sextant.build(mods.all());

  expect(sextant).toBeInstanceOf(Sextant);
  expect(sextant.getAvailableMods()).toMatchSnapshot();
});

it('should consider maplevel', () => {
  const sextant = Sextant.build(mods.all());
  sextant.atlas = global_atlas;

  const low_level_map = getFromAtlas('MapWorldsBarrows', global_atlas);

  expect(
    sextant.modsFor(low_level_map).every(({ mod }) => mod.props.level <= 72),
  ).toBe(true);

  const cemetery = getFromAtlas('MapWorldsCemetery', global_atlas);
  const cemetery_mods = sextant.modsFor(cemetery);
  // all apprentice
  expect(cemetery_mods.every(({ mod }) => mod.props.level <= 75)).toBe(true);
  // some journeyman's
  expect(cemetery_mods.some(({ mod }) => mod.props.level >= 73)).toBe(true);

  const chimera = getFromAtlas('MapWorldsChimera', global_atlas);
  const chimera_mods = sextant.modsFor(chimera);
  // all apprentice
  expect(chimera_mods.every(({ mod }) => mod.props.level <= 83)).toBe(true);
  // some journeyman's
  expect(chimera_mods.some(({ mod }) => mod.props.level >= 73)).toBe(true);
  // some master's
  expect(chimera_mods.some(({ mod }) => mod.props.level >= 78)).toBe(true);
});

describe('sextant blocking', () => {
  it('should work deterministically', () => {
    const sextant = Sextant.build(mods.all());
    sextant.atlas = global_atlas;

    const getMod = (id: string) => {
      const found_mod = sextant.mods.find(mod => mod.props.id === id);
      if (found_mod === undefined) {
        throw new Error('mod not found');
      }
      return found_mod;
    };

    // this is the map on which we wanna block
    const dunes_index = getNodeIndex('MapWorldsSpiderLair');

    // this is how we achieve it
    const oasis_index = getNodeIndex('MapWorldsPort');
    const invasion_mod = getMod('MapAtlasContainsAdditionalRandomBoss');

    const arid_index = getNodeIndex('MapWorldsDesert');
    const onslaught_mod = getMod('MapAtlasOnslaughtWhenHitAndOnslaughtEffect');

    const dungeon_index = getNodeIndex('MapWorldsStrand');
    const turbo_mod = getMod('MapAtlasMoveAttackCastSpeed');

    // pre
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toHaveLength(0);

    global_atlas[oasis_index] = global_atlas[oasis_index].addMod(invasion_mod);

    // post
    expect(global_atlas[oasis_index].mods).toContain(invasion_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(invasion_mod);

    global_atlas[arid_index] = global_atlas[arid_index].addMod(onslaught_mod);

    // post
    expect(global_atlas[arid_index].mods).toContain(onslaught_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(invasion_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(onslaught_mod);

    global_atlas[dungeon_index] = global_atlas[dungeon_index].addMod(turbo_mod);

    // post
    expect(global_atlas[dungeon_index].mods).toContain(turbo_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(invasion_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(onslaught_mod);
    expect(
      Sextant.blockedMods(global_atlas[dunes_index], global_atlas),
    ).toContain(turbo_mod);

    const rollable_mods = sextant
      .modsFor(global_atlas[dunes_index])
      .map(({ mod }) => mod);
    // just to be safe if referentiel equality is broken
    const rollable_ids = rollable_mods.map(modIds);

    expect(rollable_mods).not.toContain(invasion_mod);
    expect(rollable_ids).not.toContain(invasion_mod.props.id);
    expect(rollable_mods).not.toContain(onslaught_mod);
    expect(rollable_ids).not.toContain(onslaught_mod.props.id);
    expect(rollable_mods).not.toContain(turbo_mod);
    expect(rollable_ids).not.toContain(turbo_mod.props.id);
  });
});

it('shouldnt mutate its context', () => {
  const sextant = Sextant.build(mods.all());

  const dunes = getFromAtlas('MapWorldsDunes', global_atlas);

  expect(() => sextant.applyTo(dunes)).toThrowError(
    'context not set, set atlas',
  );

  sextant.atlas = global_atlas;
  const rolled = sextant.applyTo(dunes);

  expect(getFromAtlas('MapWorldsDunes', global_atlas)).toBe(dunes);
  expect(getFromAtlas('MapWorldsDunes', global_atlas)).not.toBe(rolled);
  expect(() => sextant.applyTo(rolled)).toThrowError(
    'context not set, set atlas',
  );
});

it('should consider adjacents for spawnweight if it is zero', () => {
  const sextant = Sextant.build(mods.all());
  sextant.atlas = global_atlas;

  const getMod = (id: string) =>
    sextant.mods.find(({ props }) => id === props.id);

  const unique_index = getNodeIndex('MapWorldsStrandUnique');
  const breach_mod = getMod('MapAtlasAdditionalBreaches');

  const rollable_mods = sextant.modsFor(global_atlas[unique_index]);
  expect(rollable_mods.map(({ mod }) => mod)).toContain(breach_mod);
  expect(
    rollable_mods.every(
      ({ spawnweight }) => spawnweight != null && spawnweight > 0,
    ),
  ).toBe(true);
});

it('should consider sextant types', () => {
  const sextant = Sextant.build(mods.all());

  const low_tier_map = getFromAtlas('MapWorldsMarshes', global_atlas); // marshes
  const mid_tier_map = getFromAtlas('MapWorldsCourtyard', global_atlas); // courtyard
  const high_tier_map = getFromAtlas('MapWorldsPlaza', global_atlas); // plaza

  expect(sextant.type).toBe(Sextant.type.master);
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: false,
  });

  sextant.atlas = global_atlas;
  // master on red map
  expect(sextant.applyTo(high_tier_map)).not.toBe(high_tier_map);

  sextant.type = Sextant.type.journeyman;
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: true,
  });

  sextant.atlas = global_atlas;
  // journeyman on red map
  expect(sextant.applyTo(high_tier_map)).toBe(high_tier_map);

  sextant.type = Sextant.type.apprentice;
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: true,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: true,
  });

  sextant.atlas = global_atlas;
  // apprentice on yellow map
  expect(sextant.applyTo(mid_tier_map)).toBe(mid_tier_map);
});

it('should reroll', () => {
  const sextant = Sextant.build(mods.all());

  let marshes = getFromAtlas('MapWorldsMarshes', global_atlas);

  for (let tries = 1; tries <= 10; tries += 1) {
    sextant.atlas = global_atlas;
    const crafted = sextant.applyTo(marshes);

    expect(crafted).not.toBe(marshes);
    expect(crafted.mods).toHaveLength(1);

    marshes = crafted;
  }
});
