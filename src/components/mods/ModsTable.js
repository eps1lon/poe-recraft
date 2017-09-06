// @flow
import React from 'react';
import './ModsTable.css';
import 'react-table/react-table.css';

import type Mod from '../../poe/Mod/';

import GroupedMods from './GroupedMods';
import UngroupedMods from './UngroupedMods';

type Options = {
  grouped: boolean
};

export type Props = {
  className: string,
  human?: string,
  mods: Mod[],
  options: Options
};

// TODO sortable
const ModsTable = ({ className, human = className, mods, options }: Props) => {
  const { grouped } = options;

  const Mods = grouped ? GroupedMods : UngroupedMods;

  return [
    <h4 key="caption" id="implicits-caption">
      {human} /<span className="count">{mods.length}</span>
    </h4>,
    <Mods key="mods" className={className} mods={mods} />
  ];
};

export default ModsTable;
