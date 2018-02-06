// @flow
import type { Item } from 'poe-mods';
import React from 'react';

import EditItem from 'containers/edit_item/Modal';
import BaseItemPreview from './item/BaseItemPreview';

export type Props = {
  item: ?Item
};

const ItemSection = (props: Props) => {
  const { item } = props;

  return (
    <section id="item">
      {item != null && <BaseItemPreview item={item} />}
      <EditItem />
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined
};

export default ItemSection;
