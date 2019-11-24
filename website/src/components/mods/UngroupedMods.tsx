import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { colors } from 'poe-components-item';
import { Mod } from 'poe-mods';
import React from 'react';

import FormattedModName from 'containers/i18n/FormattedModName';
import { isDisabled } from 'util/flags';
import Table, { Props as TableProps } from '../FlexTable';
import Stats from '../poe/Stats';
import AddMod from './AddMod';
import FlagsTooltip from './FlagsTooltip';
import { GeneratorDetails } from './ModsTable';

export interface Props {
  className: string;
  details: GeneratorDetails[];
  exclude?: string[];
  onAddMod: (mod: Mod) => void;
  sortColumn?: number;
  sortOrder?: 'asc' | 'desc';
  onSortChange: (index: number, newOrder: 'asc' | 'desc') => void;
}

const styles = createStyles({
  disabled: {
    textDecoration: 'line-through',
  },
  colIlvl: {
    width: '2em',
    textAlign: 'right',
  },
  colName: {},
  colStats: {
    flex: 1,
  },
  colSpanwChance: {
    textAlign: 'right',
    width: '4em',
  },
  colAddMod: {
    width: '2em',
  },
  colorScale0: {
    color: '#ff0000',
  },
  colorScale1: {
    color: '#ff7f00',
  },
  colorScale2: {
    color: '#ffff00',
  },
  colorScale3: {
    color: '#7fff00',
  },
  colorScale4: {
    color: '#00ff00',
  },
  enchantmentMod: {
    color: colors.enchant_color,
  },
  masterMod: {
    color: colors.crafted_color,
  },
  modStats: {
    color: colors.mod_stats,
  },
  stats: {},
});
const useClasses = makeStyles(styles, { name: 'UngroupedMods' });

function renderSpawnweight(spawnweight?: number) {
  return String(spawnweight || 'none');
}

function UngroupedMods(props: Props) {
  const {
    details: all_details,
    exclude = [],
    sortColumn,
    sortOrder,
    onAddMod,
    onSortChange,
  } = props;

  const classes = useClasses(props);

  const allColumns = React.useMemo(() => {
    function getColorScaleClassName(relativeWeight: number): string {
      // scale 0..1 to from 0..4
      // @ts-ignore
      return String(classes[`colorScale${Math.floor(relativeWeight * 4)}`]);
    }

    const columns: TableProps<GeneratorDetails>['columns'] = [
      {
        renderCell: (details: GeneratorDetails) => details.mod.props.level,
        className: classes.colIlvl,
        id: 'ilvl',
        renderHeader: () => 'iLvl',
        sortBy: (details: GeneratorDetails) => details.mod.props.level,
      },
      {
        renderCell: (details: GeneratorDetails) => {
          const { mod } = details;

          return (
            <div>
              <FlagsTooltip flags={[details.applicable, details.spawnable]}>
                <span
                  className={classNames(classes.modStats, {
                    [classes.masterMod]: mod.isMasterMod(),
                    [classes.enchantmentMod]: mod.isEnchantment(),
                  })}
                >
                  <Stats className={classes.stats} stats={mod.statsJoined()} />
                </span>
              </FlagsTooltip>
            </div>
          );
        },
        className: classes.colStats,
        renderHeader: () => 'Stats',
        id: 'stats',
      },
      {
        renderCell: (details: GeneratorDetails) => (
          <FormattedModName mod={details.mod} />
        ),
        className: classes.colName,
        renderHeader: () => 'Name',
        id: 'name',
      },
      {
        renderCell: ({
          spawnchance,
          spawnweight,
          relative_weight = 0,
        }: GeneratorDetails) => {
          if (spawnchance !== undefined) {
            return (
              <span
                title={renderSpawnweight(spawnweight)}
                className={getColorScaleClassName(relative_weight)}
              >
                {(spawnchance * 100).toFixed(2)}%
              </span>
            );
          } else {
            return renderSpawnweight(spawnweight);
          }
        },
        className: classes.colSpanwChance,
        renderHeader: () => 'Chance',
        id: 'chance',
        sortBy: ({ relative_weight }: GeneratorDetails) =>
          relative_weight == null ? 0 : relative_weight,
      },
      {
        className: classes.colAddMod,
        id: 'add_mod',
        renderHeader: () => '',
        renderCell: details => {
          return (
            !isDisabled(details) && (
              <AddMod mod={details.mod} onClick={onAddMod} />
            )
          );
        },
      },
    ];

    return columns;
  }, [onAddMod, classes]);

  const displayedColumns = React.useMemo(() => {
    return allColumns.filter(({ id }) => !exclude.includes(id));
  }, [allColumns, exclude]);

  const getTrProps = React.useCallback(
    (data: GeneratorDetails) => {
      return {
        className: classNames({ [classes.disabled]: isDisabled(data) }),
      };
    },
    [classes.disabled],
  );

  return (
    <Table
      data={all_details}
      columns={displayedColumns as any}
      getTrProps={getTrProps as any}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={onSortChange}
    />
  );
}

export default React.memo(UngroupedMods);
