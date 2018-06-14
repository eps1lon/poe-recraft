import * as classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ApiPopup } from '../../src/item/popup';

const Story: React.SFC<PropsType<typeof ApiPopup>> = props => {
  return <ApiPopup {...props} />;
};

storiesOf('api/item', module).add('shaped', () => (
  <Story
    item={{
      frameType: 2,
      identified: true,
      category: {
        armour: ['helmet'],
      },
      name: 'Mind Brow',
      typeLine: 'Hubris Circlet',
      shaper: true,
      properties: [
        { name: 'Quality', values: [['6%', 1]], displayMode: 0 },
        { name: 'Energy Shield', values: [['200', 1]], displayMode: 0 },
      ],
      requirements: [
        { name: 'Level', values: [['69', 0]], displayMode: 0 },
        { name: 'Int', values: [['154', 0]], displayMode: 1 },
      ],
      explicitMods: [
        'Place an additional Mine',
        'Socketed Gems are Supported by Level 18 Remote Mine',
        '16% increased Effect of Chill',
        'Socketed Gems are Supported by Level 18 Hypothermia',
        '+1 to Level of Socketed Minion Gems',
        '+67 to maximum Life',
        '18% increased Stun and Block Recovery',
        'Adds 5 to 89 Lightning Damage to Spells',
      ],
      corrupted: true,
    }}
  />
));
