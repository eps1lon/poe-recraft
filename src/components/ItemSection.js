// @flow
import type { Item } from 'poe-mods';
import React from 'react';

import BaseItemPreview from './item/BaseItemPreview';
import RaritySwitcher from 'containers/RaritySwitcher';

export type Props = {
  item: ?Item
};

const ItemSection = (props: Props) => {
  const { item } = props;

  return (
    <section id="item">
      {item != null && <BaseItemPreview item={item} />}
      <RaritySwitcher available={['normal', 'magic', 'rare']} />
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined
};

export default ItemSection;
