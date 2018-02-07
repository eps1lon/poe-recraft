import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import ModStats from './ModStats';

export type Props = {
  item: Item;
};

// @ts-ignore: jsx array elements not supported
const Mods: SFC<Props> = ({ item }) => {
  const { implicits } = item;

  return [
    item.mods.length > 0 && (
      <ModStats key={'affixes'} className={'affixes'} container={item} />
    ),
    implicits.mods.length > 0 && (
      <ModStats
        key={'implicits'}
        className={'implicits'}
        container={implicits}
      />
    )
  ].filter(Boolean);
};

export default Mods;
