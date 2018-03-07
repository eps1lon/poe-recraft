import { Mod } from 'poe-mods';
import React, { SFC } from 'react';

import UngroupedMods from 'containers/mods/UngroupedMods';
import CorrectGroup from 'containers/i18n/CorrectGroup';
import { ReactTableExpanded } from 'actions/gui';

import { GeneratorDetails } from './ModsTable';

export type Props = {
  className: string;
  groups: Map<string, GeneratorDetails[]>;
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

const columns = [
  {
    accessor: '0',
    id: 'correct_group',
    className: 'correct-group',
    Cell: ({ original }: { original: [any, GeneratorDetails[]] }) => {
      return <CorrectGroup mods={original[1].map(({ mod }) => mod)} />;
    }
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

const defaultSorted = [{ id: 'correct_group' }];

// FIXME: await for merge of DefinitelyTyped/Definitely#23852
const SubComponent: SFC<any> = props => {
  return (
    <UngroupedMods className="correct-group" details={props.original[1]} />
  );
};

// TODO spawnchance, flags, mod#t
const GroupedMods: SFC<Props> = props => {
  const { className, groups, onTableExpandedChange, expanded } = props;

  return <div />;
};

GroupedMods.defaultProps = default_props;

export default GroupedMods;
