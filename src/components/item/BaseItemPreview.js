// @flow
import React from 'react';

import type Item from '../../poe/ModContainer/Item';

export type Props = {
  item: Item
};

const BaseItemPreview = ({ item }: Props) => {
  console.log(item);
  return (
    <div className="itembox">
      <span className="itemboxheader double-line">
        <span className="itemboxheader-left" />
        <span className="itemName">{item.itemName()}</span>
        <span className="baseName">{item.baseName()}</span>
        <span className="itemboxheader-right" />
      </span>
    </div>
  );
};

export default BaseItemPreview;
