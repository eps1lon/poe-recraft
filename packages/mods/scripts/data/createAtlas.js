const path = require('path');
const createFromApi = require('./createFromApi');
const createMods = require('./createMods');

module.exports = { run: createAtlas, format: formatAtlasNode };

async function createAtlas(data_dir) {
  return await createFromApi(
    '/scoped/AtlasNodes/atlas',
    path.join(data_dir, 'atlas.json'),
    {
      transform: formatAtlas,
    },
  );
}

function formatAtlas(atlas) {
  return atlas.map(formatAtlasNode);
}

function formatAtlasNode(node) {
  const {
    // map
    atlas_node,
    world_area,
    // omit
    world_areas_key,
    // keep
    ...props
  } = node;

  return {
    ...props,
    adjacent: atlas_node.map(({ row }) => row),
    world_area: formatWorldAreaFromAtlas(world_area),
  };
}

function formatWorldAreaFromAtlas(world_area) {
  const {
    // map
    area_type_tags,
    tags,
    mods,
    // omit
    row,
    // keep
    ...props
  } = world_area;

  return {
    ...props,
    area_type_tags: area_type_tags.map(({ id }) => id),
    tags: tags.map(({ id }) => id),
    mods: mods.map(({ WorldAreaHabtmMod, ...mod }) => createMods.format(mod)),
  };
}
