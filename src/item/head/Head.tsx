import classnames from 'classnames';
import * as React from 'react';

import { ItemProps, Rarity } from '../poe';

import TypeLine from './TypeLine';
import DoubleLine from './DoubleLine';

export interface Props {
  item: ItemProps;
}

export default class Head extends React.PureComponent<Props> {
  render() {
    const { item } = this.props;
    const single_line = hasSingleNameLine(item);

    return (
      <header className={classnames({ 'double-line': !single_line })}>
        {single_line ? <TypeLine item={item} /> : <DoubleLine item={item} />}
      </header>
    );
  }
}

function hasSingleNameLine(item: ItemProps) {
  return item.rarity === Rarity.magic || item.rarity === Rarity.normal;
}
