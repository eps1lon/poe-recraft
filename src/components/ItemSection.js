// @flow
import React from 'react';

import ItemClassGroup from './item/ItemClassGroup';
import groups from './class_groups';

export type Props = {};

const ItemSection = (props: Props) => {
  return (
    <section id="item">
      <h2>Item</h2>

      {groups.map(group => <ItemClassGroup key={group.name} {...group} />)}
    </section>
  );
};

export default ItemSection;
