import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Separator from './Separator';
import Stats from '../poe/Stats';

type Props = {
  item: Item;
};

// @ts-ignore: no support for jsx array elements
const Explicits: SFC<Props> = ({ item }) => {
  const { affixes } = item;

  if (affixes.mods.length === 0) {
    return null;
  } else {
    return [
      <Separator key="sep" />,
      <Stats
        key="stats"
        stats={Object.values(affixes.stats())}
        className="explicit augmented"
      />
    ];
  }
};

export default Explicits;
