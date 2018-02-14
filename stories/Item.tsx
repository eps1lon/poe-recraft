import React from 'react';
import { storiesOf } from '@storybook/react';
import Stat from '../src/stat/Stat';

storiesOf('Item', module).add('Stat', () => (
  <Stat is_augmented={false} message="Hello World!" />
));
