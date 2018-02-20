import * as React from 'react';

import { Item, Rarity, Affix } from '../../poe';
import { isPrefix, isSuffix, isMod } from '../../../mod/poe';

const ItemType: React.SFC<{ item: Item }> = ({ item }) => {
  return <span>{item.base.name}</span>;
};

const MagicTypeLine: React.SFC<{
  item: Item;
}> = ({ item }) => {
  const { explicits = [] } = item;
  const prefix = item.prefix || explicits.filter(isMod).find(isPrefix);
  const suffix = item.suffix || explicits.filter(isMod).find(isSuffix);

  return (
    <span>
      {prefix &&
        `${typeof prefix === 'string' ? prefix : String(prefix.name)} `}
      <ItemType item={item} />
      {suffix &&
        ` ${typeof suffix === 'string' ? suffix : String(suffix.name)}`}
    </span>
  );
};

const TypeLine: React.SFC<{ item: Item }> = ({ item }) => (
  <div className="item-name type-line">
    {item.rarity === Rarity.magic ? (
      <MagicTypeLine item={item} />
    ) : (
      <ItemType item={item} />
    )}
  </div>
);

export default TypeLine;
