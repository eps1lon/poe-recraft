const path = require('path');
const createFromApi = require('./createFromApi');
const createMods = require('./createMods');

module.exports = { run: createItems, format: formatItem };

async function createItems(data_dir) {
  return await createFromApi(
    '/scoped/BaseItemTypes/for-poe-mods',
    path.join(data_dir, 'items.json'),
    {
      transform: formatItems,
    },
  );
}

function formatItems(items) {
  return items.map(formatItem);
}

function formatItem(item) {
  const {
    // omit
    primary,
    item_classes_key,
    // map
    item_class,
    implicit_mods,
    tags,
    component_attribute_requirements: [component_attribute_requirement = null],
    component_armour: [component_armour = null],
    // keep
    ...props
  } = item;

  const formatted_implicits = implicit_mods.map(
    ({ BaseItemTypeHabtmImplicitMod, ...implicit }) =>
      createMods.format(implicit),
  );

  const formatted_tags = tags.map(({ id }) => id);

  return {
    ...props,
    component_attribute_requirement,
    component_armour,
    implicit_mods: formatted_implicits,
    item_class: item_class.id,
    tags: formatted_tags,
  };
}
