// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';

type Props = {
  item: Item
};

const Requirements = ({ item }: Props) => {
  const { requirements } = item;

  if (requirements.any()) {
    return [<Separator key="sep" />];
  } else {
    return null;
  }
};

export default Requirements;
