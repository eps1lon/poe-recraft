const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const meta_data_path = path.join(__dirname, '../public/data/meta_data.json');
const meta_data = require(meta_data_path);
const all_tags = require('../public/data/tags.json');

const denormalized = _.mapValues(meta_data, ({ tags, ...props }) => {
  return {
    ...props,
    // there are sometimes holes in the array from remove_tag
    // which will result in an associative array in php which gets
    // converted into an object
    // but we only care about values to Object.values is a sufficient cast
    tags: Object.values(tags).map(tag_primary => {
      if (typeof tag_primary === 'number') {
        const tag = all_tags.find(other => other.primary === tag_primary);

        if (tag === undefined) {
          console.warn('no tag found');
          console.log(props, tag_primary);
          return null;
        } else {
          return tag;
        }
      } else {
        return tag_primary;
      }
    })
  };
});

fs.writeFileSync(meta_data_path, JSON.stringify(denormalized));
