const dotProp = require('dot-prop');

const { LOCALES } = require('./config');
const { getStashTab, getTradeItem } = require('./poe');
const { mergeAllMessages } = require('./util');

const MESSAGE_KEYS = [
  createRequirementsProperty('Level'),
  createRequirementsProperty('Dex'),
  createRequirementsProperty('Int'),
  createRequirementsProperty('Str'),
  createPropertiesProperty('Claw'),
  createPropertiesProperty('Dagger'),
  createPropertiesProperty('Wand'),
  // sceptres are display with one hand mace
  createPropertiesProperty('One Handed Axe'),
  createPropertiesProperty('One Handed Mace'),
  createPropertiesProperty('One Handed Sword'),
  createPropertiesProperty('Two Handed Axe'),
  createPropertiesProperty('Two Handed Mace'),
  createPropertiesProperty('Two Handed Sword'),
  createPropertiesProperty('Staff'),
  createPropertiesProperty('Bow'),
  createPropertiesProperty('Physical Damage'),
  createPropertiesProperty('Elemental Damage'),
  createPropertiesProperty('Chaos Damage'),
  createPropertiesProperty('Critical Strike Chance'),
  createPropertiesProperty('Attacks per Second'),
  createPropertiesProperty('Weapon Range'),
  createPropertiesProperty('Armour'),
  createPropertiesProperty('Energy Shield'),
  createPropertiesProperty('Evasion Rating')
];

findMessages()
  .then(messages => {
    return mergeAllMessages(messages);
  })
  .then(() => {
    return console.log('done');
  });

async function findMessages() {
  const messages = LOCALES.reduce((acc, locale) => {
    acc[locale.short] = {};
    return acc;
  }, {});

  let covered_properties, missing_properties, item;
  for await ({ covered_properties, missing_properties, item } of exampleItems(
    MESSAGE_KEYS,
    '0'
  )) {
    console.log(
      'Covered: ',
      covered_properties.map(({ key }) => key),
      'Missing',
      missing_properties.map(({ key }) => key),
      'Latest: ',
      item.id
    );
  }

  await Promise.all(
    // group properties by item
    groupBy(covered_properties, ({ item }) => item.id).map(group => {
      return Promise.all(
        LOCALES.map(locale => {
          return getTradeItem(group[0].item.id, {
            subdomain: locale.subdomain || locale.short
          })
            .then(([item]) => {
              for (const property of group) {
                const value = dotProp.get(item, property.access_path);
                messages[locale.short][property.key] = value;
              }
            })
            .catch(err => {
              console.warn(err, group[0].item.id);
            });
        })
      );
    })
  );

  return messages;
}

async function* exampleItems(properties, start_id) {
  let stash_tab_api_id = start_id;
  let missing_properties = properties.slice();
  const covered_properties = [];

  while (missing_properties.length > 0) {
    const { next_change_id, stashes } = await getStashTab(stash_tab_api_id);

    for (const item of stashTabApiItems(stashes)) {
      const new_covered_properties = [];
      const new_missing_properties = missing_properties.filter(property => {
        const access_path = property.findAccessPath(item);
        if (access_path !== undefined) {
          new_covered_properties.push({ ...property, access_path, item });
          return false;
        }

        return true;
      });

      if (new_covered_properties.length > 0) {
        covered_properties.push(...new_covered_properties);
        missing_properties = new_missing_properties;
        yield { covered_properties, missing_properties, item };
      }
    }

    stash_tab_api_id = next_change_id;
  }

  return { covered_properties, missing_properties };
}

function* stashTabApiItems(stashes) {
  for (const { items = [] } of stashes) {
    for (const item of items) {
      yield item;
    }
  }
}

function createProperty(name, dotProp) {
  return {
    key: name,
    findAccessPath: item => dotProp(item, name)
  };
}

function createRequirementsProperty(name) {
  return createProperty(name, ({ requirements = [] }) => {
    const index = requirements.findIndex(requirement => {
      return requirement.name === name;
    });

    if (index === -1) {
      return undefined;
    } else {
      return `requirements.${index}.name`;
    }
  });
}

function createPropertiesProperty(name) {
  return createProperty(name, ({ properties = [] }) => {
    const index = properties.findIndex(property => {
      return property.name === name;
    });

    if (index === -1) {
      return undefined;
    } else {
      return `properties.${index}.name`;
    }
  });
}

function groupBy(arr, group) {
  const groups = arr.reduce((acc, entry) => {
    const key = group(entry);
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(entry);
    return acc;
  }, new Map());

  return Array.from(groups.values());
}
