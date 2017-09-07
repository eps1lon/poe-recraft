// @flow
import React from 'react';

import type ModContainer from '../../../poe/ModContainer/';

import withModHandles from '../../../containers/withModHandles';
import Statsgroup from './';
import { Mods } from '../../poe/mods/';

const ModsWithHandles = withModHandles(Mods);

export type Props = {
  className: string,
  container: ModContainer
};

const ModStats = ({ className, container }: Props) => {
  return (
    <Statsgroup className={className}>
      {[
        <ModsWithHandles
          className={`mods ${className}`}
          mods={container.mods}
        />
      ]}
    </Statsgroup>
  );
};

export default ModStats;
