// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Explicits from './Explicits';
import Implicits from './Implicits';
import Properties from './Properties';
import Requirements from './Requirements';

type Props = {
  item: Item
};

const Content = ({ item }: Props) => {
  return (
    <div className="content">
      <Properties item={item} />
      <Requirements item={item} />
      <Implicits item={item} />
      <Explicits item={item} />
    </div>
  );
};

export default Content;
