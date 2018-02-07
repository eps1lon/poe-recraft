import classnames from 'classnames';
import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import './assets/item.css';

import Header from './Header';
import Content from './Content';

export type Props = {
  item: Item;
};

const BaseItemPreview: SFC<Props> = ({ item }) => {
  return (
    <div className={classnames('itembox', item.rarity.toString())}>
      <Header item={item} />
      <Content item={item} />
    </div>
  );
};

export default BaseItemPreview;
