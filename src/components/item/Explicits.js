// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';
import Stats from '../poe/Stats';

type Props = {
  item: Item
};

const Explicits = ({ item }: Props) => {
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
