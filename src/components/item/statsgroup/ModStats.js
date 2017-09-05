// @flow
import React from 'react';

import type ModContainer from '../../../poe/ModContainer/';

import Statsgroup from './';
import { Mods } from '../../poe/mods/';

export type Props = {
  className: string,
  container: ModContainer
};

const ModStats = ({ className, container }: Props) => {
  return (
    <Statsgroup className={className}>
      {[<Mods className={`mods ${className}`} mods={container.mods} />]}
    </Statsgroup>
  );
};

export default ModStats;
