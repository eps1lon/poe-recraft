import * as React from 'react';

import Head from '../src/item/head';
import { ItemProps } from '../src/item/poe';

const Story: React.SFC<{ item: ItemProps }> = ({ item }) => (
  <Head item={item} />
);
export default Story;
