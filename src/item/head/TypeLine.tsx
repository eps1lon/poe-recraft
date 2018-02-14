import * as React from 'react';

import { ItemProps, isPrefix, isSuffix, Rarity } from '../poe';

const ItemType: React.SFC<{ item: ItemProps }> = ({ item }) => {
  return <span>{item.base.name}</span>;
};

const MagicTypeLine: React.SFC<{
  item: ItemProps;
}> = ({ item }) => {
  const { explicits = [] } = item;
  const prefix = explicits.filter(isPrefix)[0];
  const suffix = explicits.filter(isSuffix)[0];

  return (
    <span>
      {prefix && `${String(prefix.name)} `}
      <ItemType item={item} />
      {suffix && ` ${String(suffix.name)}`}
    </span>
  );
};

const TypeLine: React.SFC<{ item: ItemProps }> = ({ item }) => (
  <div className="item-name type-line">
    {item.rarity === Rarity.magic ? (
      <MagicTypeLine item={item} />
    ) : (
      <ItemType item={item} />
    )}
  </div>
);

export default TypeLine;
