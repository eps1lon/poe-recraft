// @flow
import type { Item } from 'poe-mods/lib/containers';
import React from 'react';

import Statsgroup from './';

export type Props = {
  item: Item
};

const MetaData = ({ item }: Props) => {
  return (
    <Statsgroup className="meta-data">
      {[
        item.baseitem.item_class.name,
        item
          .getTags()
          .map(({ id }) => id)
          .join(', ')
      ]}
    </Statsgroup>
  );
};

export default MetaData;
