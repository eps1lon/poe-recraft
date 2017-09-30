// @flow
import { Mod } from 'poe-mods';
import React from 'react';
import ReactTable from 'react-table';

import type { GeneratorDetails } from './ModsTable';

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
      Header: 'iLvl',
      minWidth: 15
    },
    {
      accessor: (details: GeneratorDetails) =>
        details.mod.props.stats.map(({ id }) => id).join(','),
      className: 'stats',
      Header: 'Stats',
      id: 'stats',
      minWidth: 200
    },
    {
      accessor: 'mod.props.name',
      className: 'name',
      Header: 'Name',
      id: 'name',
      minWidth: 80
    },
    {
      accessor: (details: GeneratorDetails) =>
        String(details.spawnweight || 'none'),
      className: 'spawn-chance',
      Header: 'Chance',
      id: 'chance',
      minWidth: 30
    },
    {
      Header: '',
      id: 'add_mod',
      Cell: ({ original: details }: { original: GeneratorDetails }) => {
        return <button onClick={() => onAddMod(details.mod)}>add</button>;
      },
      minWdth: 30
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
          const mod: ?Mod =
            rowInfo !== undefined && rowInfo.original
              ? rowInfo.original.mod
              : null;

          if (mod instanceof Mod) {
            return {
              className: `mod domain-${mod.props.domain} ${String(
                mod.modType()
              )}`
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
