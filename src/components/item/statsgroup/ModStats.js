// @flow
import React from 'react';

import type ModContainer from '../../../poe/ModContainer/';

import { Mods } from '../../../containers/poe/mods';
import Statsgroup from './';

export type Props = {
  className: string,
  container: ModContainer
};

const ModStats = ({ className, container }: Props) => {
  return (
    <Statsgroup className={className}>
      {[
        <Mods
          key="mods"
          className={`mods ${className}`}
          mods={container.mods}
        />
      ]}
    </Statsgroup>
  );
};

export default ModStats;
