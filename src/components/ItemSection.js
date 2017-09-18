// @flow
import type { Item } from 'poe-mods/lib/containers';
import React from 'react';

import BaseItemPreview from './item/BaseItemPreview';
import ItemClassGroup from './item/ItemClassGroup';
import groups from './class_groups';

export type Props = {
  item: ?Item
};

const ItemSection = (props: Props) => {
  const { item } = props;

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
