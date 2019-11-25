/* eslint-env node */
const path = require('path');
const createFromApi = require('./createFromApi');

module.exports = { run: createMods, format: formatMod };

async function createMods(data_dir) {
  return await createFromApi(
    '/scoped/Mods/for-poe-mods',
    path.join(data_dir, 'mods.json'),
    {
      transform: formatMods,
    },
  );
}

function formatMods(mods) {
  return mods.map(formatMod);
}

function formatMod(mod) {
  const {
    // map
    stats1,
    stats2,
    stats3,
    stats4,
    stats5,
    tags,
    spawn_weight_tags,
    // omit
    primary,
    stats_key1,
    stats_key2,
    stats_key3,
    stats_key4,
    stats_key5,
    mod_type_key,
    // keep
    ...props
  } = mod;

  const spawn_weights = spawn_weight_tags
    .sort((a, b) => {
      return (
        a.ModHabtmSpawnWeightTag.priority - b.ModHabtmSpawnWeightTag.priority
      );
    })
    .map(({ ModHabtmSpawnWeightTag: { value }, id }) => {
      return {
        tag: id,
        value,
      };
    });

  const stats = [stats1, stats2, stats3, stats4, stats5]
    .filter(Boolean)
    // omit primary
    .map(({ primary, ...props }) => props);

  return {
    ...props,
    spawn_weights,
    stats,
    tags: tags.map(({ id }) => id),
  };
}
