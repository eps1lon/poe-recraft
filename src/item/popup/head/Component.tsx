import classnames from 'classnames';
import * as React from 'react';

import { Item, Rarity } from '../../poe';

import NameLine, { hasNameLine } from './NameLine';
import TypeLine from './TypeLine';

export interface Props {
  item: Item;
}

export default class Head extends React.PureComponent<Props> {
  render() {
    const { item } = this.props;
    const single_line = !hasNameLine(item);

    return (
      <header
        className={classnames({
          'double-line': !single_line,
          shaper: Boolean(item.shaper),
          elder: Boolean(item.elder),
        })}
      >
        <span className="name-left" />
        <NameLine item={item} />
        <TypeLine item={item} />
        <span className="name-right" />
      </header>
    );
  }
}
