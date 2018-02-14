import * as React from 'react';

import { ItemProps, Rarity } from '../poe';

const NameLine: React.SFC<{
  item: ItemProps;
}> = ({ item }) => {
  if (!hasNameLine(item)) {
    return null;
  } else {
    return <div className="item-name">{item.name}</div>;
  }
};

export function hasNameLine(item: ItemProps) {
  return item.rarity === Rarity.rare || item.rarity === Rarity.unique;
}

export default NameLine;
