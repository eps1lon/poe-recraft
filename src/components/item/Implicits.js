// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';
import Stats from '../poe/Stats';

type Props = {
  item: Item
};

const Implicits = ({ item }: Props) => {
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
