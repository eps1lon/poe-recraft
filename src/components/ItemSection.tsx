import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import EditItem from 'containers/edit_item/Modal';
import BaseItemPreview from './item/BaseItemPreview';

export type Props = {
  item: Item | undefined;
};

const ItemSection: SFC<Props> = props => {
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
