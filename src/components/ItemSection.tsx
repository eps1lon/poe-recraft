import { Popup as ItemPopup } from 'poe-components-item';
import React, { SFC } from 'react';

import EditItem from 'containers/edit_item/Modal';

import 'poe-components-item/themes/poe.css';

export type Props = {
  item?: ItemPopup['props']['item'] | undefined;
};

const ItemSection: SFC<Props> = props => {
  const { item } = props;

  return (
    <section id="item">
      {item != null && <ItemPopup item={item} />}
      <EditItem />
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined
};

export default ItemSection;
