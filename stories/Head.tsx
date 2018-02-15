import * as React from 'react';

import Head from '../src/item/head';
import { Item as ItemProps } from '../src/item/poe';
import Item from '../src/item';

const Story: React.SFC<{ item: ItemProps }> = ({ item }) => {
  Item.assertValidProps(item, console.warn);

  return <Head item={item} />;
};
export default Story;
