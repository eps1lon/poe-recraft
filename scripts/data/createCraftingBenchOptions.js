const path = require('path');
const createFromApi = require('./createFromApi');
const createItems = require('./createItems');
const createMods = require('./createMods');

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
    // map
    cost_base_item_types,
    item_classes,
    mod,
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

  const formatted_item_classes = item_classes
    .sort((a, b) => {
      return (
        a.CraftingBenchOptionHabtmItemClass.priority -
        b.CraftingBenchOptionHabtmItemClass.priority
      );
    })
    .map(({ id }) => id);

  return {
    ...props,
    costs,
    mod: mod === null ? null : createMods.format(mod),
    item_classes: formatted_item_classes,
  };
}
