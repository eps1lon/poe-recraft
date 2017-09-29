// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';

type Props = {
  item: Item
};

const Explicits = ({ item }: Props) => {
  const { affixes } = item;

  if (affixes.mods.length === 0) {
    return null;
  } else {
    return [<Separator key="sep" />];
  }
};

export default Explicits;
