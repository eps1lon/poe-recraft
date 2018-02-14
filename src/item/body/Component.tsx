import { PureComponent } from 'react';

import { ItemProps } from '../poe';

export interface Props {
  item: ItemProps;
}

export default class Body extends PureComponent<Props> {
  render() {
    return 'Body';
  }
}
