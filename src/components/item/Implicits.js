// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';
import Stats from './Stats';

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
      // $FlowFixMe no it's not
      <Stats
        key="stats"
        stats={implicits.stats()}
        className="implicit augmented"
      />
    ];
  }
};

export default Implicits;
