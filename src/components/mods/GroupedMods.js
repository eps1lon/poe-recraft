// @flow
import React from 'react';
import ReactTable from 'react-table';

import type Mod from '../../poe/Mod/';

import UngroupedMods from './UngroupedMods';

export type Props = {
  className?: string,
  mods: Mod[]
};

const groupMods = (mods: Mod[]): Map<string, Mod[]> => {
  const groups: Map<string, Mod[]> = new Map();

  for (const mod of mods) {
    const group = mod.props.correct_group;

    let grouped_mods = groups.get(group);

    if (!Array.isArray(grouped_mods)) {
      grouped_mods = [];
      groups.set(group, grouped_mods);
    }

    // mutate
    grouped_mods.push(mod);
  }

  return groups;
};

const columns = [
  {
    accessor: '0',
    id: 'correct_group',
    className: 'correct-group'
  },
  {
    accessor: '1.length',
    id: 'tally',
    className: 'group-mods-tally'
  }
];

const defaultSorted = ['correct_group'];

const SubComponent = ({ original: [group, mods], ...row }) => {
  return <UngroupedMods className="correct-group" mods={mods} />;
};

// TODO spawnchance, flags, mod#t
const GroupedMods = ({ className = '', mods }: Props) => {
  const groups = groupMods(mods);

  return (
    <ReactTable
      {...{
        data: Array.from(groups),
        className: `grouped ${className}`,
        columns,
        defaultSorted,
        SubComponent,
        showPagination: false,
        minRows: 1,
        getTrProps: (state, rowInfo, column, instance) => {
          if (rowInfo != null) {
            const { viewIndex } = rowInfo;

            const new_expanded = state.expanded[viewIndex] ? false : {};
            const new_state = {
              expanded: {
                ...state.expanded,
                [viewIndex]: new_expanded
              }
            };

            return {
              onClick: (e, handleOriginal) => {
                instance.setState(new_state);
              }
            };
          } else {
            return {};
          }
        }
      }}
    />
  );
};

export default GroupedMods;
