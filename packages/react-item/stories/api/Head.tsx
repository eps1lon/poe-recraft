import * as classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Head from '../../src/item/popup/ApiHead';
import FrameType from '../../src/item/FrameType';

const Story: React.SFC<{ item: Head['props']['item'] }> = ({ item }) => {
  return (
    <div className={classnames('poe-item', FrameType[item.frameType])}>
      <Head item={item} />
    </div>
  );
};

const rare_item = {
  name: 'Gale Salvation',
  typeLine: 'Vaal Regalia',
  frameType: FrameType.rare,
};

storiesOf('api/head', module)
  .add('normal', () => (
    <Story
      item={{
        frameType: FrameType.normal,
        typeLine: 'Full Scale Armour',
      }}
    />
  ))
  .add('magic', () => (
    <Story
      item={{
        typeLine: 'Buzzing Blinder of Mastery',
        frameType: FrameType.magic,
      }}
    />
  ))
  .add('rare', () => <Story item={rare_item} />)
  .add('unique', () => (
    <Story
      item={{
        name: 'Sidhebreath',
        typeLine: 'Paua Amulet',
        frameType: FrameType.unique,
      }}
    />
  ))
  .add('shaped/elder', () => [
    <Story key="shaped" item={{ ...rare_item, shaper: true }} />,
    <Story key="elder" item={{ ...rare_item, elder: true }} />,
  ]);
