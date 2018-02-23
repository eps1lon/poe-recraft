import * as classnames from 'classnames';
import * as React from 'react';

import { Item as ItemProps, Rarity } from '../poe';
import Head from './head';
import Body from './body';

export interface Props {
  classname?: string;
  item: ItemProps;
  translations?: {};
}

export default class ItemPopup extends React.PureComponent<Props> {
  public static defaultProps = {
    classname: 'poe-item',
    translations: {},
  };

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

  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      ItemPopup.assertValidProps(props.item, console.warn);
    }
  }

  public render() {
    const { item, translations = {} } = this.props;

    return (
      <div className={classnames(this.props.classname, Rarity[item.rarity])}>
        <Head item={item} />
        <Body item={item} translations={translations} />
      </div>
    );
  }
}
