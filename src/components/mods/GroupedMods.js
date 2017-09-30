// @flow
import React from 'react';
import ReactTable from 'react-table';

import UngroupedMods from 'containers/mods/UngroupedMods';
import type { ReactTableExpanded } from 'reducers/gui/expanded';

import type { GeneratorDetails } from './ModsTable';

export type Props = {
  className: string,
  details: GeneratorDetails[],
  options: {},
  expanded: ReactTableExpanded,
  onTableExpandedChange: (string, ReactTableExpanded) => any
};

const default_props = {
  expanded: {},
  options: {},
  onCollapse: () => undefined,
  onTableExpandedChange: () => undefined
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
  },
  // hide the default expander because we want the hole row
  // to be the expander
  {
    expander: true,
    id: 'expander',
    show: false
  }
];

const defaultSorted = ['correct_group'];

const SubComponent = ({ original: [group, details], ...row }) => {
  return <UngroupedMods className="correct-group" details={details} />;
};

// TODO spawnchance, flags, mod#t
const GroupedMods = (props: Props) => {
  const { className, details, onTableExpandedChange, expanded } = props;
  const groups = groupMods(details);

  return (
    <ReactTable
      {...{
        data: Array.from(groups),
        className: `grouped ${className}`,
        columns,
        defaultSorted,
        expanded,
        SubComponent,
        showPagination: false,
        minRows: 1,
        getTrProps: (state, rowInfo, column, instance) => {
          if (rowInfo != null) {
            const { viewIndex } = rowInfo;

            const new_expanded = state.expanded[viewIndex] ? false : {};
            const new_expanded_state = {
              ...state.expanded,
              [viewIndex]: new_expanded
            };

            return {
              onClick: (e, handleOriginal) => {
                instance.props.onExpandedChange(new_expanded_state);
              }
            };
          } else {
            return {};
          }
        },
        onExpandedChange: expanded => {
          onTableExpandedChange(className, expanded);
        }
      }}
    />
  );
};

GroupedMods.defaultProps = default_props;

export default GroupedMods;
