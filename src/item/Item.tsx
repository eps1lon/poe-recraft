import { PureComponent } from 'react';

import { BaseItemProps, ItemProps, Rarity } from './poe';
import Head from './head';
import Body from './Body';

export interface Props {
  className: string;
  item: ItemProps;
}

export default class Item extends PureComponent<Props> {
  public static assertValidProps(props: Props, onError: (err: string) => void) {
    const { item } = props;
    if (item.name === undefined && item.rarity === Rarity.rare) {
      onError('rare items need a name in addition to the name of the baseitem');
    }
  }

  static defaultProps = {
    className: 'poe-item',
  };

  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      Item.assertValidProps(props, console.warn);
    }
  }

  public render() {
    const { item } = this.props;

    return (
      <div className={this.props.className}>
        <Head item={item} />
        <Body item={item} />
      </div>
    );
  }
}
