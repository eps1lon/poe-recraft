// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';
import Stats from './Stats';

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
      // $FlowFixMe no it's not
      <Stats
        key="stats"
        stats={affixes.stats()}
        className="explicit augmented"
      />
    ];
  }
};

export default Explicits;
