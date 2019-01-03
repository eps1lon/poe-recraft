import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';

import ExtendedStats from '../../src/item/popup/ApiBody/Stats/ExtendedStats';

const messages = {
  'poe.api.{Range1} to {Range2}': '{Range1} bis {Range2}',
};
const Story: React.SFC<ExtendedStats['props']> = props => {
  return (
    <IntlProvider locale="en" messages={messages}>
      <div className="poe-item extended">
        <div className="body">
          <ExtendedStats {...props} />
        </div>
      </div>
    </IntlProvider>
  );
};

storiesOf('api/extended', module).add('Hybrid Gloves', () => (
  <Story
    className="explicitMod"
    group="explicit"
    extended={{
      hashes: {
        explicit: [
          ['explicit.stat_4067062424', [5]],
          ['explicit.stat_681332047', [1]],
          ['explicit.stat_1050105434', [4]],
          ['explicit.stat_3917489142', [2, 3]],
          ['explicit.stat_4220027924', [0]],
        ],
      },
      mods: {
        explicit: [
          {
            name: 'of the Inuit',
            tier: 'S8',
            magnitudes: [{ hash: 'explicit.stat_4220027924', min: 6, max: 11 }],
          },
          {
            name: 'of Mastery',
            tier: 'S2',
            magnitudes: [{ hash: 'explicit.stat_681332047', min: 11, max: 13 }],
          },
          {
            name: 'of Plunder',
            tier: 'S4',
            magnitudes: [{ hash: 'explicit.stat_3917489142', min: 6, max: 10 }],
          },
          {
            name: "Magpie's",
            tier: 'P4',
            magnitudes: [{ hash: 'explicit.stat_3917489142', min: 8, max: 12 }],
          },
          {
            name: 'Gentian',
            tier: 'P6',
            magnitudes: [
              { hash: 'explicit.stat_1050105434', min: 50, max: 54 },
            ],
          },
          {
            name: 'Frigid',
            tier: 'P6',
            magnitudes: [
              { hash: 'explicit.stat_4067062424', min: 6, max: 9 },
              { hash: 'explicit.stat_4067062424', min: 13, max: 16 },
            ],
          },
        ],
      },
    }}
  >
    {[
      'Adds 7 to 13 Cold Damage to Attacks',
      '13% increased Attack Speed',
      '+51 to maximum Mana',
      '20% increased Rarity of Items found',
      '+9% to Cold Resistance',
    ]}
  </Story>
));
