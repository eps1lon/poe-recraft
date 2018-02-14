import * as React from 'react';

import { ItemProps, isPrefix, isSuffix, Rarity } from '../poe';

const ItemType: React.SFC<{ item: ItemProps }> = ({ item }) => {
  return <span>item.base.name</span>;
};

const MagicTypeLine: React.SFC<{
  item: ItemProps;
}> = ({ item }) => {
  const { explicits = [] } = item;
  const prefix = explicits.filter(isPrefix)[0];
  const suffix = explicits.filter(isSuffix)[0];

  return (
    <span className="typeline">
      {prefix && String(prefix.name)}
      <TypeLine key="item_name" item={item} />
      {suffix && String(suffix.name)}
    </span>
  );
};

const TypeLine: React.SFC<{ item: ItemProps }> = ({ item }) =>
  item.rarity === Rarity.magic ? (
    <MagicTypeLine item={item} />
  ) : (
    <ItemType item={item} />
  );

export default TypeLine;
