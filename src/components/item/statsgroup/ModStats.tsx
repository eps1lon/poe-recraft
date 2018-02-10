import { Container as ModContainer, Mod } from 'poe-mods';
import React, { SFC } from 'react';

import { Mods } from 'containers/poe/mods';
import Statsgroup from './';

export type Props = {
  className: string;
  container: ModContainer<Mod>;
};

const ModStats: SFC<Props> = ({ className, container }) => {
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
