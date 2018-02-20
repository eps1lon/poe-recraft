import * as React from 'react';

import { Item, Rarity } from '../../poe';

const NameLine: React.SFC<{
  item: Item;
}> = ({ item }) => {
  if (!hasNameLine(item)) {
    return null;
  } else {
    return <div className="item-name">{item.name}</div>;
  }
};

export function hasNameLine(item: Item) {
  return item.rarity === Rarity.rare || item.rarity === Rarity.unique;
}

export default NameLine;
