import { createItems } from 'poe-mods';
import React from 'react';
import renderer from 'react-test-renderer';

import BaseItemPreview from '../BaseItemPreview';

const items = createItems(
  require('../../../../public/data/baseitemtypes.json')
);

it.skip('should render boots', () => {
  const boots = items.from(({ name }) => name === 'Iron Greaves');

  const component = renderer.create(<BaseItemPreview item={boots} />);

  expect(component.toJSON()).toMatchSnapshot();
});
