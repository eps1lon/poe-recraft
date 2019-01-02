const path = require('path');
const createFromApi = require('./createFromApi');
const createItems = require('./createItems');
const createMods = require('./createMods');
const { nullToUndefined } = require('./util');

module.exports = {
  run: createCraftingbenchoptions,
  format: formatCraftingbenchoption,
};

async function createCraftingbenchoptions(data_dir) {
  return await createFromApi(
    '/scoped/CraftingBenchOptions/for-poe-mods',
    path.join(data_dir, 'craftingbenchoptions.json'),
    {
      transform: formatCraftingbenchoptions,
    },
  );
}

function formatCraftingbenchoptions(options) {
  return options.map(formatCraftingbenchoption);
}

function formatCraftingbenchoption(option) {
  const {
    // omit
    hideout_np_cs_key,
    // map
    cost_base_item_types,
    crafting_item_class_categories,
    hideout_npc: { npc_master_key },
    mod,
    mods_key,
    // keep
    ...props
  } = option;

  const costs = cost_base_item_types
    .sort((a, b) => {
      return (
        a.CraftingBenchOptionHabtmCostBaseitemtype.priority -
        b.CraftingBenchOptionHabtmCostBaseitemtype.priority
      );
    })
    .map(
      ({
        CraftingBenchOptionHabtmCostBaseitemtype: { value },
        ...base_item_type
      }) => {
        return {
          amount: value,
          base_item_type: createItems.format(base_item_type),
        };
      },
    );

  const formatted_item_classes = crafting_item_class_categories
    .sort((a, b) => {
      return (
        a.CraftingBenchOptionHabtmCraftingItemClassCategory.priority -
        b.CraftingBenchOptionHabtmCraftingItemClassCategory.priority
      );
    })
    .map(({ item_classes }) => item_classes.map(({ id }) => id))
    .reduce((flat_ids, ids) => {
      return flat_ids.concat(ids);
    }, []);

  return {
    ...props,
    costs,
    mod: mod == null ? undefined : createMods.format(mod),
    item_classes: formatted_item_classes,
    mods_key: nullToUndefined(mods_key),
    npc_master_key,
  };
}
