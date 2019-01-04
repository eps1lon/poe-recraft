const path = require('path');
const createFromApi = require('./createFromApi');
const createItems = require('./createItems');

module.exports = { run: createEssences, format: formatEssence };

async function createEssences(data_dir) {
  return await createFromApi(
    '/recraft/essencesForMods',
    path.join(data_dir, 'essences.json'),
    {
      transform: formatEssences,
    },
  );
}

function formatEssences(essences) {
  return essences.map(formatEssence);
}

function formatEssence(essence) {
  const {
    // map none
    base_item_type,
    // omit
    base_item_types_key,
    essence_type_key,
    // include
    ...rest
  } = essence;

  return {
    ...rest,
    base_item_type: createItems.format(base_item_type)
  };
}
