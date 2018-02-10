import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Separator from './Separator';
import Stats from '../poe/Stats';

type Props = {
  item: Item;
};

// @ts-ignore: react array element not supported yet
const Implicits: SFC<Props> = ({ item }) => {
  const { implicits } = item;

  if (implicits.mods.length === 0) {
    return null;
  } else {
    return [
      <Separator key="sep" />,
      <Stats
        key="stats"
        stats={Object.values(implicits.stats())}
        className="implicit augmented"
      />
    ];
  }
};

export default Implicits;
