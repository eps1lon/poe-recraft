// @flow
import React from 'react';
import ReactTable from 'react-table';

import Mod from '../../poe/Mod/';
import RollableMod from '../../poe/Mod/RollableMod';

export type Props = {
  className: string,
  mods: Mod[]
};

const columns = [
  {
    accessor: 'props.level',
    className: 'ilvl',
    id: 'ilvl',
    Header: 'iLvl'
  },
  {
    accessor: (mod: Mod) => mod.props.stats.map(({ id }) => id).join(','),
    className: 'stats',
    Header: 'Stats',
    id: 'stats'
  },
  {
    accessor: 'props.name',
    className: 'name',
    Header: 'Name',
    id: 'name'
  },
  {
    accessor: (mod: Mod) => mod instanceof RollableMod && mod.spawnweight,
    className: 'spawn-chance',
    Header: 'Chance',
    id: 'chance'
  }
];

const defaultSorted = [{ id: 'ilvl' }];

// TODO spawnchance, flags, mod#t
const UngroupedMods = ({ className, mods }: Props) => {
  return (
    <ReactTable
      {...{
        className: className,
        data: mods,
        columns,
        defaultSorted,
        showPagination: false,
        minRows: 1,
        getTrProps: (state, rowInfo) => {
          const original = rowInfo !== undefined && rowInfo.original;

          if (original instanceof Mod) {
            return {
              className: original.modType()
            };
          } else {
            return {};
          }
        }
      }}
    />
  );
};

export default UngroupedMods;
