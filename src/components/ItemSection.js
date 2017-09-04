// @flow
import React from 'react';

import type Item from '../poe/ModContainer/Item';

import BaseItemPreview from './item/BaseItemPreview';
import ItemClassGroup from './item/ItemClassGroup';
import groups from './class_groups';

export type Props = {
  item: ?Item
};

const ItemSection = (props: Props) => {
  const { item } = props;
  console.log(item, item != null);

  return (
    <section id="item">
      <h2>Item</h2>

      {groups.map(group => <ItemClassGroup key={group.name} {...group} />)}

      <h3>Preview</h3>
      {item != null && <BaseItemPreview item={item} />}
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined
};

export default ItemSection;
