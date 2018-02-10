import React, { SFC } from 'react';
import ReactTable, { ControlledStateOverrideProps, RowInfo } from 'react-table';

import UngroupedMods from 'containers/mods/UngroupedMods';
import { ReactTableExpanded } from 'actions/gui';

import { GeneratorDetails } from './ModsTable';

export type Props = {
  className: string;
  details: GeneratorDetails[];
  options: {};
  expanded: ReactTableExpanded;
  onTableExpandedChange: (id: string, expanded: ReactTableExpanded) => any;
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

const SubComponent: SFC<{ row: GeneratorDetails[] }> = ({ row: details }) => {
  return <UngroupedMods className="correct-group" details={details} />;
};

// TODO spawnchance, flags, mod#t
const GroupedMods: SFC<Props> = props => {
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
        pageSize: Number.MAX_VALUE,
        getTrProps: (
          state: any,
          rowInfo: RowInfo | undefined,
          column: any,
          instance: any
        ) => {
          if (rowInfo != null) {
            const { viewIndex } = rowInfo;

            const new_expanded = state.expanded[viewIndex] ? false : {};
            const new_expanded_state = {
              ...state.expanded,
              [viewIndex]: new_expanded
            };

            return {
              onClick: (e: any, handleOriginal: any) => {
                instance.props.onExpandedChange(new_expanded_state);
              }
            };
          } else {
            return {};
          }
        },
        onExpandedChange: changed_expanded => {
          onTableExpandedChange(className, changed_expanded);
        }
      }}
    />
  );
};

GroupedMods.defaultProps = default_props;

export default GroupedMods;
