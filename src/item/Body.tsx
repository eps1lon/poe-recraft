import { PureComponent } from 'react';

import { ItemProps, Rarity } from './poe';

export interface Props {
  item: ItemProps;
}

export default class Body extends PureComponent<Props> {
  render() {
    return 'Body';
  }
}
