// @flow
import React from 'react';
import ReactTable from 'react-table';

import type { GeneratorDetails } from './ModsTable';

import Mod from '../../poe/Mod/';

export type Props = {
  className?: string,
  details: GeneratorDetails[],
  options: {
    exclude?: string[]
  },
  onAddMod: (mod: Mod) => mixed
};

const defaultSorted = [{ id: 'ilvl', desc: true }];

// TODO spawnchance, flags, mod#t
const UngroupedMods = (props: Props) => {
  const { className = '', details, options, onAddMod } = props;
  const { exclude = [] } = options;

  const columns = [
    {
      accessor: 'mod.props.level',
      className: 'ilvl',
      id: 'ilvl',
      Header: 'iLvl'
    },
    {
      accessor: (details: GeneratorDetails) =>
        details.mod.props.stats.map(({ id }) => id).join(','),
      className: 'stats',
      Header: 'Stats',
      id: 'stats'
    },
    {
      accessor: 'mod.props.name',
      className: 'name',
      Header: 'Name',
      id: 'name'
    },
    {
      accessor: (details: GeneratorDetails) => String(details.spawnweight),
      className: 'spawn-chance',
      Header: 'Chance',
      id: 'chance'
    },
    {
      Header: 'add',
      id: 'add_mod',
      Cell: ({ original: mod }) => {
        return <button onClick={() => onAddMod(mod)}>addMod</button>;
      }
    }
  ].filter(({ id }) => !exclude.includes(id));

  return (
    <ReactTable
      {...{
        className: `mods ${className}`,
        data: details,
        columns,
        defaultSorted,
        showPagination: false,
        minRows: 1,
        getTrProps: (state, rowInfo) => {
          // rowInfo.original.mod || undefined
          const mod =
            rowInfo !== undefined && rowInfo.original && rowInfo.original.mod;

          if (mod instanceof Mod) {
            return {
              className: `mod ${mod.constructor.name} ${mod.modType()}`
            };
          } else {
            return {};
          }
        }
      }}
    />
  );
};

UngroupedMods.defaultProps = {
  options: {},
  onAddMod: () => undefined
};

export default UngroupedMods;
