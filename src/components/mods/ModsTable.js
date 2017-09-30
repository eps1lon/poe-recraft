// @flow
import type { Mod } from 'poe-mods/lib/mods';
import type { Flags } from 'poe-mods/lib/util';
import React from 'react';
import { Button } from 'reactstrap';

import GroupedMods from 'containers/mods/GroupedMods';
import UngroupedMods from 'containers/mods/UngroupedMods';

type Options = {
  grouped?: boolean,
  exclude?: string[]
};

export type GeneratorDetails = {
  mod: Mod,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number
};

export type Props = {
  className: string,
  expanded: boolean,
  group_expanded: boolean,
  human?: string,
  details: GeneratorDetails[],
  options: Options,
  onGroupToggle: string => void,
  onToggle: (string, boolean) => void
};

const defaultProps = {
  expanded: true,
  group_expanded: false,
  onToggle: () => {}, // noop
  onGroupToggle: () => {} // noop
};

// TODO sortable
const ModsTable = (props: Props) => {
  const {
    className,
    expanded,
    group_expanded,
    human = className,
    details,
    onGroupToggle,
    onToggle,
    options
  } = props;
  const { grouped = false, exclude = [] } = options;

  const onCaptionClick = () => onToggle(className, expanded);
  const handleGroupToggle = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    onGroupToggle(className);

    event.stopPropagation();
  };

  // Table componenent
  const Mods = grouped && !group_expanded ? GroupedMods : UngroupedMods;

  return (
    <div className={className}>
      <h4 id={`${className}-caption`} onClick={onCaptionClick}>
        {human} /<span className="count">{details.length}</span>
        {grouped && (
          <Button onClick={handleGroupToggle}>
            {group_expanded ? '-' : '+'}
          </Button>
        )}
      </h4>
      {expanded && (
        <Mods className={className} details={details} options={{ exclude }} />
      )}
    </div>
  );
};

ModsTable.defaultProps = defaultProps;

export default ModsTable;
