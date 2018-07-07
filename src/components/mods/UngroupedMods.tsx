import classNames from 'classnames';
import { Mod } from 'poe-mods';
import React, { PureComponent } from 'react';

import FormattedModName from 'containers/i18n/FormattedModName';
import { disabled } from 'util/flags';
import Table from '../FlexTable';
import Stats from '../poe/Stats';
import AddMod from './AddMod';
import FlagsTooltip from './FlagsTooltip';
import { GeneratorDetails } from './ModsTable';

export interface Props {
  className?: string;
  details: GeneratorDetails[];
  options?: Partial<{
    exclude: string[];
  }>;
  onAddMod: (mod: Mod) => any;
}

const renderSpawnweight = (spawnweight?: number) =>
  String(spawnweight || 'none');

export default class UngroupedMods extends PureComponent<Props> {
  public render() {
    const { className = '', details: all_details, options = {} } = this.props;
    const { exclude = [] } = options;

    const columns = this.getColumns();

    return (
      <Table
        data={all_details}
        columns={columns.filter(({ id }) => !exclude.includes(id))}
        getTrProps={this.getTrProps}
      />
    );
  }

  private getColumns(): Table<GeneratorDetails>['props']['columns'] {
    const { onAddMod } = this.props;

    return [
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
        id: 'name'
      },
      {
        renderCell: ({
          spawnchance,
          spawnweight,
          relative_weight = 0
        }: GeneratorDetails) => {
          if (spawnchance !== undefined) {
            return (
              <span
                title={renderSpawnweight(spawnweight)}
                className={classNames(
                  'color-scale',
                  // scale 0..1 to from 0..4
                  `scale-${Math.floor(relative_weight * 4)}`
                )}
              >
                {(spawnchance * 100).toFixed(2)}%
              </span>
            );
          } else {
            return renderSpawnweight(spawnweight);
          }
        },
        className: 'spawn-chance',
        renderHeader: () => 'Chance',
        id: 'chance',
        sortBy: ({ spawnweight }: GeneratorDetails) =>
          spawnweight === undefined ? 0 : spawnweight
      },
      {
        className: 'add-mod',
        id: 'add_mod',
        renderHeader: () => '',
        renderCell: details => {
          return (
            !disabled(details) && (
              <AddMod mod={details.mod} onClick={onAddMod} />
            )
          );
        }
      }
    ];
  }

  private getTrProps(data: GeneratorDetails) {
    return {
      className: classNames({ disabled: disabled(data) })
    };
  }
}
