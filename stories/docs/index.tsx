import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Helmet from './helmet';

import '../../themes/poe.scss';

storiesOf('ItemPopup', module).add(
  'Helmet',
  withInfo({
    inline: true,
    source: false,
    text: `
    [detailed Item type definition](api/globals.html#item)
    `,
  })(Helmet),
);
