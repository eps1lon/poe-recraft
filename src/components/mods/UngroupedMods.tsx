import classNames from 'classnames';
import { Mod } from 'poe-mods';
import React, { SFC } from 'react';

import FormattedModName from 'containers/i18n/FormattedModName';
import { disabled } from 'util/flags';
import FlagsTooltip from './FlagsTooltip';
import { GeneratorDetails } from './ModsTable';
import Table from '../FlexTable';
import Stats from '../poe/Stats';

export type Props = {
  className?: string;
  details: GeneratorDetails[];
  options?: Partial<{
    exclude: string[];
  }>;
  onAddMod: (mod: Mod) => any;
};

const columns = [
  {
    renderCell: (details: GeneratorDetails) => details.mod.props.level,
    className: 'ilvl',
    id: 'ilvl',
    renderHeader: () => 'iLvl',
    sortBy: (details: GeneratorDetails) => details.mod.props.level
  },
  {
    renderCell: (details: GeneratorDetails) => {
      const id = `${details.mod.props.id}-stats`;
      const { mod } = details;

      return (
        <div>
          <span
            id={id}
            className={classNames('mod-stats', {
              master: mod.isMasterMod(),
              enchantment: mod.isEnchantment()
            })}
          >
            <Stats className="stats" stats={mod.statsJoined()} />
          </span>
          <FlagsTooltip
            id={id}
            flags={[details.applicable, details.spawnable]}
          />
        </div>
      );
    },
    className: 'stats',
    renderHeader: () => 'Stats',
    id: 'stats'
  },
  {
    renderCell: (details: GeneratorDetails) => (
      <FormattedModName mod={details.mod} />
    ),
    className: 'name',
    renderHeader: () => 'Name',
    id: 'name',
    minWidth: 80
  },
  {
    renderCell: (details: GeneratorDetails) =>
      String(details.spawnweight || 'none'),
    className: 'spawn-chance',
    renderHeader: () => 'Chance',
    id: 'chance',
    sortBy: ({ spawnweight }: GeneratorDetails) =>
      spawnweight === undefined ? 0 : spawnweight
  }
];

// TODO spawnchance, flags, mod#t, sort
const UngroupedMods: SFC<Props> = props => {
  const {
    className = '',
    details: all_details,
    options = {},
    onAddMod
  } = props;
  const { exclude = [] } = options;

  return (
    <Table
      data={all_details}
      columns={columns.filter(({ id }) => !exclude.includes(id))}
      getTrProps={data => ({
        className: classNames({ disabled: disabled(data) })
      })}
    />
  );
};

UngroupedMods.defaultProps = {
  options: {},
  onAddMod: () => undefined
};

export default UngroupedMods;
