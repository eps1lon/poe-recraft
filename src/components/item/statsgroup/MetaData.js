// @flow
import React from 'react';

import type Item from '../../../poe/ModContainer/Item';

import Statsgroup from './';

export type Props = {
  item: Item
};

const MetaData = ({ item }: Props) => {
  return (
    <Statsgroup className="meta-data">
      {[
        item.itemclassName(),
        item
          .getTags()
          .map(({ id }) => id)
          .join(', ')
      ]}
    </Statsgroup>
  );
};

export default MetaData;
