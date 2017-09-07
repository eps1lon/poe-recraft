// @flow
import React from 'react';
import ReactTable from 'react-table';

import type Mod from '../../poe/Mod/';
import type { GeneratorDetails } from './ModsTable';

import UngroupedMods from './UngroupedMods';

export type Props = {
  className?: string,
  details: GeneratorDetails[],
  options: {},
  onAddMod: (mod: Mod) => mixed
};

const groupMods = (
  details: GeneratorDetails[]
): Map<string, GeneratorDetails[]> => {
  const groups: Map<string, GeneratorDetails[]> = new Map();

  for (const detail of details) {
    const group = detail.mod.props.correct_group;

    let grouped_mods = groups.get(group);

    if (!Array.isArray(grouped_mods)) {
      grouped_mods = [];
      groups.set(group, grouped_mods);
    }

    // mutate
    grouped_mods.push(detail);
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

const subComponentWithHandles = ({ onAddMod }) => ({
  original: [group, details],
  ...row
}) => {
  return (
    <UngroupedMods
      className="correct-group"
      details={details}
      onAddMod={onAddMod}
    />
  );
};

// TODO spawnchance, flags, mod#t
const GroupedMods = ({ className = '', details, onAddMod }: Props) => {
  const groups = groupMods(details);

  return (
    <ReactTable
      {...{
        data: Array.from(groups),
        className: `grouped ${className}`,
        columns,
        defaultSorted,
        SubComponent: subComponentWithHandles({ onAddMod }),
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

GroupedMods.defaultProps = {
  options: {},
  onAddMod: () => undefined
};

export default GroupedMods;
