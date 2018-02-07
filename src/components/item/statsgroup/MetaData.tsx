import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Statsgroup from './';

export type Props = {
  item: Item;
};

const MetaData: SFC<Props> = ({ item }) => {
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
