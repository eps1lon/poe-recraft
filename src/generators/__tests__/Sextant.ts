import { createTables } from '../../__fixtures__/util';
import AtlasNode from '../../containers/AtlasNode';

import Sextant from '../Sextant';
import Mod from '../../mods/Mod';

const { atlas: atlas_nodes_props, mods } = createTables();

let atlas: AtlasNode[];

function getFromCollection<T extends { props: { primary: number } }>(
  primary: number,
  collection: T[],
): T {
  const node = collection.find(other => other.props.primary === primary);

  if (node === undefined) {
    throw new Error(`node ${primary} not found`);
  }

  return node;
}

const getNodeIndex = (primary: number) =>
  atlas.findIndex(node => node.props.primary === primary);

const modIds = ({ props: { id } }: Mod) => id;

beforeEach(() => {
  atlas = atlas_nodes_props
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
  sextant.atlas = atlas;

  const dunes = getFromCollection(26, atlas);

  expect(sextant.modsFor(dunes).every(({ mod }) => mod.props.level <= 72)).toBe(
    true,
  );

  const cemetery = getFromCollection(53, atlas);
  const cemetery_mods = sextant.modsFor(cemetery);
  // all apprentice
  expect(cemetery_mods.every(({ mod }) => mod.props.level <= 75)).toBe(true);
  // some journeyman's
  expect(cemetery_mods.some(({ mod }) => mod.props.level >= 73)).toBe(true);

  const chimera = getFromCollection(120, atlas);
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
    sextant.atlas = atlas;

    const getMod = (id: string) =>
      sextant.mods.find(mod => mod.props.id === id);

    // this is the map on which we wanna block
    const dunes_index = getNodeIndex(26);

    // this is how we achieve it
    const oasis_index = getNodeIndex(7);
    const invasion_mod = getMod('MapAtlasContainsAdditionalRandomBoss');

    const arid_index = getNodeIndex(8);
    const onslaught_mod = getMod('MapAtlasOnslaughtWhenHitAndOnslaughtEffect');

    const dungeon_index = getNodeIndex(18);
    const turbo_mod = getMod('MapAtlasMoveAttackCastSpeed');

    // pre
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toHaveLength(0);

    atlas[oasis_index] = atlas[oasis_index].addMod(invasion_mod);

    // post
    expect(atlas[oasis_index].mods).toContain(invasion_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );

    atlas[arid_index] = atlas[arid_index].addMod(onslaught_mod);

    // post
    expect(atlas[arid_index].mods).toContain(onslaught_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      onslaught_mod,
    );

    atlas[dungeon_index] = atlas[dungeon_index].addMod(turbo_mod);

    // post
    expect(atlas[dungeon_index].mods).toContain(turbo_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      onslaught_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(turbo_mod);

    const rollable_mods = sextant
      .modsFor(atlas[dunes_index])
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

  const dunes = getFromCollection(26, atlas);

  expect(() => sextant.applyTo(dunes)).toThrowError(
    'context not set, set atlas',
  );

  sextant.atlas = atlas;
  const rolled = sextant.applyTo(dunes);

  expect(getFromCollection(26, atlas)).toBe(dunes);
  expect(getFromCollection(26, atlas)).not.toBe(rolled);
  expect(() => sextant.applyTo(rolled)).toThrowError(
    'context not set, set atlas',
  );
});

it('should consider adjacents for spawnweight if it is zero', () => {
  const sextant = Sextant.build(mods.all());
  sextant.atlas = atlas;

  const getMod = (id: string) =>
    sextant.mods.find(({ props }) => id === props.id);

  const waka_index = getNodeIndex(38);
  const breach_mod = getMod('MapAtlasAdditionalBreaches');

  const rollable_mods = sextant.modsFor(atlas[waka_index]);
  expect(rollable_mods.map(({ mod }) => mod)).toContain(breach_mod);
  expect(
    rollable_mods.every(
      ({ spawnweight }) => spawnweight != null && spawnweight > 0,
    ),
  ).toBe(true);
});

it('should consider sextant types', () => {
  const sextant = Sextant.build(mods.all());

  const low_tier_map = getFromCollection(12, atlas); // marshes
  const mid_tier_map = getFromCollection(76, atlas); // courtyard
  const high_tier_map = getFromCollection(105, atlas); // plaza

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

  sextant.atlas = atlas;
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

  sextant.atlas = atlas;
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

  sextant.atlas = atlas;
  // apprentice on yellow map
  expect(sextant.applyTo(mid_tier_map)).toBe(mid_tier_map);
});

it('should reroll', () => {
  const sextant = Sextant.build(mods.all());

  let marshes = getFromCollection(12, atlas);

  for (let tries = 1; tries <= 10; tries += 1) {
    sextant.atlas = atlas;
    const crafted = sextant.applyTo(marshes);

    expect(crafted).not.toBe(marshes);
    expect(crafted.mods).toHaveLength(1);

    marshes = crafted;
  }
});
