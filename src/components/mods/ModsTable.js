// @flow
import React from 'react';

import type FlagSet from '../../poe/FlagSet';
import type Mod from '../../poe/Mod/';

import GroupedMods from './GroupedMods';
import UngroupedMods from './UngroupedMods';

type Options = {
  grouped?: boolean,
  exclude?: string[]
};

export type GeneratorDetails = {
  mod: Mod,
  applicable?: FlagSet,
  spawnable?: FlagSet,
  spawnweight?: number
};

export type Props = {
  className: string,
  human?: string,
  details: GeneratorDetails[],
  options: Options
};

// TODO sortable
const ModsTable = ({
  className,
  human = className,
  details,
  options
}: Props) => {
  const { grouped = false, exclude = [] } = options;

  const Mods = grouped ? GroupedMods : UngroupedMods;

  return (
    <div className={className}>
      <h4 id={`${className}-caption`}>
        {human} /<span className="count">{details.length}</span>
      </h4>
      <Mods details={details} options={{ exclude }} />
    </div>
  );
};

export default ModsTable;
