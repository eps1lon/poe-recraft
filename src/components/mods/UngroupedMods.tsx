import classNames from 'classnames';
import { Mod } from 'poe-mods';
import React, { SFC } from 'react';
import ReactTable, { RowInfo } from 'react-table';

import FormattedModName from 'containers/i18n/FormattedModName';
import { disabled } from 'util/mods';
import FlagsTooltip from './FlagsTooltip';
import { GeneratorDetails } from './ModsTable';
import Stats from '../poe/Stats';

export type Props = {
  className?: string;
  details: GeneratorDetails[];
  options?: Partial<{
    exclude: string[];
  }>;
  onAddMod: (mod: Mod) => any;
};

const defaultSorted = [{ id: 'ilvl', desc: true }];

// TODO spawnchance, flags, mod#t
const UngroupedMods: SFC<Props> = props => {
  const {
    className = '',
    details: all_details,
    options = {},
    onAddMod
  } = props;
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
      accessor: (details: GeneratorDetails) => {
        const id = `${details.mod.props.id}-stats`;
        return (
          <div>
            <span id={id}>
              <Stats className="stats" stats={details.mod.statsJoined()} />
            </span>
            <FlagsTooltip
              id={id}
              flags={[details.applicable, details.spawnable]}
            />
          </div>
        );
      },
      className: 'stats',
      Header: 'Stats',
      id: 'stats',
      minWidth: 200
    },
    {
      accessor: (details: GeneratorDetails) => (
        <FormattedModName mod={details.mod} />
      ),
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
      Cell: ({ original }: { original: GeneratorDetails }) => {
        return (
          !disabled(original) && (
            <button onClick={() => onAddMod(original.mod)}>add</button>
          )
        );
      },
      minWdth: 30
    }
  ].filter(({ id }) => !exclude.includes(id));

  return (
    <ReactTable
      {...{
        className: `mods ${className}`,
        data: all_details,
        columns,
        defaultSorted,
        showPagination: false,
        minRows: 1,
        pageSize: Number.MAX_VALUE,
        getTrProps: (state: any, rowInfo: any) => {
          // rowInfo.original.mod || undefined
          const mod: Mod | null =
            rowInfo !== undefined && rowInfo.original
              ? rowInfo.original.mod
              : null;

          if (mod instanceof Mod) {
            return {
              className: classNames(
                `mod domain-${mod.props.domain}`,
                mod.modType(),
                { disabled: disabled(rowInfo.original) }
              )
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
