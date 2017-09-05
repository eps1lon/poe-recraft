// @flow
import React from 'react';

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

  return (
    <table className={`mods ${className}`}>
      <caption id="implicits-caption">
        {human} /<span className="count">{mods.length}</span>
      </caption>
      <thead>
        <tr>
          <th className="ilvl">iLvl</th>
          <th className="stats {sorter: false}">Stats</th>
          <th className="spawn_chance">Chance</th>
          <th className="{sorter: false}" />
        </tr>
      </thead>
      <Mods mods={mods} />
    </table>
  );
};

export default ModsTable;
