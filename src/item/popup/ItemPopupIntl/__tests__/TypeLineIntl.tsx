import * as React from 'react';
import { IntlProvider } from 'react-intl';
import * as renderer from 'react-test-renderer';

import TypeLineIntl from '../TypeLineIntl';

const messages = {
  'poe.baseitemtypes.normal.name': 'A normal item',
  'poe.baseitemtypes.unique.name': 'Unique!',
  'poe.baseitemtypes.magic1.name': 'Some Magic',
  'poe.mods.prefix1.name': 'This is',
  'poe.mods.mod1.name': 'Mod',
};
const MockIntl: React.SFC = ({ children }) => (
  <IntlProvider locale="en" messages={messages}>
    {children}
  </IntlProvider>
);
const testIntl = (comp: React.ReactNode) =>
  renderer.create(<MockIntl>{comp}</MockIntl>).toJSON();

it('should display only basename on none magic', () => {
  expect(testIntl(<TypeLineIntl item_id="normal" rarity="normal" />)).toEqual(
    'A normal item',
  );
  expect(testIntl(<TypeLineIntl item_id="unique" rarity="unique" />)).toEqual(
    'Unique!',
  );
});
it('should display prefix basename suffix for magic', () => {
  expect(
    testIntl(
      <TypeLineIntl item_id="magic1" rarity="magic" prefix_id="prefix1" />,
    ),
  ).toEqual('This is Some Magic');
  expect(
    testIntl(
      <TypeLineIntl item_id="magic1" rarity="magic" suffix_id="prefix1" />,
    ),
  ).toEqual('Some Magic This is');
  expect(
    testIntl(
      <TypeLineIntl
        item_id="magic1"
        rarity="magic"
        suffix_id="prefix1"
        prefix_id="mod1"
      />,
    ),
  ).toEqual('Mod Some Magic This is');
});
