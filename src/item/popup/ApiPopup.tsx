import * as classnames from 'classnames';
import * as React from 'react';

import FrameType from '../FrameType';

import Head from './ApiHead';
import Body from './ApiBody';

export interface ItemProps {
  // only required for rare and unique items
  name?: string;
  typeLine: string;
  identified: boolean;
  category: { [key: string]: string[] };
  frameType: FrameType;
  elder?: boolean;
  shaper?: boolean;
  corrupted?: boolean;
  utilityMods?: React.ReactNode[];
  implicitMods?: React.ReactNode[];
  explicitMods?: React.ReactNode[];
  craftedMods?: React.ReactNode[];
  enchantMods?: React.ReactNode[];
  properties?: LineContent[];
  requirements?: LineContent[];
}

export interface LineContent {
  name: string;
  values: [string, number][];
  displayMode: number;
  type?: number;
}

export interface Props {
  classname?: string;
  item: ItemProps;
}

export default class ItemPopup extends React.PureComponent<Props> {
  public static defaultProps = {
    classname: 'poe-item',
  };

  public static assertValidProps(
    item: ItemProps,
    onError: (err: string) => void,
  ) {
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
    const { classname, item } = this.props;

    return (
      <div className={classnames(classname, FrameType[item.frameType])}>
        <Head item={item} />
        <Body item={item} />
      </div>
    );
  }
}
