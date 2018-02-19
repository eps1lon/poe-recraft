import classnames from 'classnames';
import * as React from 'react';

import { BaseItem, Item as ItemProps, Rarity } from './poe';
import Head from './head';
import Body from './body';

export interface Props {
  classname?: string;
  item: ItemProps;
}

export default class Item extends React.PureComponent<Props> {
  public static assertValidProps(
    item: ItemProps,
    onError: (err: string) => void,
  ) {
    if (item.name === undefined && item.rarity === Rarity.rare) {
      onError('rare items need a name in addition to the name of the baseitem');
    }

    if (item.elder && item.shaper) {
      onError('item can either be shaped or elder item but not both');
    }
  }

  static defaultProps = {
    classname: 'poe-item',
  };

  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      Item.assertValidProps(props.item, console.warn);
    }
  }

  public render() {
    const { item } = this.props;

    return (
      <div className={classnames(this.props.classname, Rarity[item.rarity])}>
        <Head item={item} />
        <Body item={item} />
      </div>
    );
  }
}
