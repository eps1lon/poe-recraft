// @flow
import React from 'react';

import type Item from '../../../poe/ModContainer/Item';

import ModStats from './ModStats';

export type Props = {
  item: Item
};

const Mods = ({ item }: Props) => {
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
