import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Requirements from '../Requirements';

it('should display all', () => {
  expect(
    renderer
      .create(
        <Requirements
          requirements={{
            level: { value: 5 },
            dexterity: { value: 10 },
            intelligence: { value: 1 },
            strength: { value: 500, augmented: true },
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it('should display once', () => {
  expect(
    renderer
      .create(
        <Requirements
          requirements={{
            level: { value: 5 },
          }}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});
