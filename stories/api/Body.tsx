import * as classnames from 'classnames';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';

import Body from '../../src/item/popup/ApiBody';
import FrameType from '../../src/item/FrameType';

const Story: React.SFC<{ item: Body['props']['item'] }> = ({ item }) => {
  return (
    <IntlProvider>
      <div className={classnames('poe-item', FrameType.rare)}>
        <Body item={item} />
      </div>
    </IntlProvider>
  );
};

const requirements: Body['props']['item']['requirements'] = [
  {
    displayMode: 1,
    name: 'Requirement',
    values: [['5', 0]],
  },
];
storiesOf('api/body', module)
  .add('no mods', () => <Story item={{ requirements }} />)
  .add('with crafted', () => (
    <Story item={{ craftedMods: ['I was crafted'], requirements }} />
  ))
  .add('crafted + explicits', () => (
    <Story
      item={{
        craftedMods: ['I was crafted'],
        explicitMods: ['I was there before'],
        requirements,
      }}
    />
  ))
  .add('crafted + explicits + enchanted', () => (
    <Story
      item={{
        craftedMods: ['I was crafted'],
        enchantmentMods: ["I was enchanted"],
        explicitMods: ['I was there before'],
        requirements,
      }}
    />
  ))
  .add('crafted + explicits + enchanted + implicits', () => (
    <Story
      item={{
        craftedMods: ['I was crafted'],
        enchantmentMods: ["I was enchanted"],
        explicitMods: ['I was there before'],
        implicitMods: ["I am implicit"],
        requirements,
      }}
    />
  ))
  .add('all', () => (
    <Story
      item={{
        craftedMods: ['I was crafted'],
        enchantmentMods: ["I was enchanted"],
        explicitMods: ['I was there before'],
        implicitMods: ["I am implicit"],
        utilityMods: ["I should not be here but they display me anyway"],
        requirements,
      }}
    />
  ));
