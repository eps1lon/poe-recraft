import * as React from 'react';
import { ItemProps } from '../poe';

export interface Props {
  item: ItemProps;
}

export default class Head extends React.PureComponent<Props> {
  render() {
    return 'SingleLine';
  }
}
