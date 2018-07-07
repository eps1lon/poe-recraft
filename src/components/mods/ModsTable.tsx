import classnames from 'classnames';
import { Flags, Mod } from 'poe-mods';
import React, { SFC, SyntheticEvent } from 'react';
import { Button } from 'reactstrap';

import GroupedMods from 'containers/mods/GroupedMods';
import UngroupedMods from 'containers/mods/UngroupedMods';

export interface GeneratorDetails {
  mod: Mod;
  applicable?: Flags;
  spawnable?: Flags;
  spawnweight?: number;
  spawnchance?: number;
  relative_weight?: number;
}

export interface Props {
  className: string;
  expanded: boolean;
  group_expanded: boolean;
  human?: string;
  details: GeneratorDetails[];
  grouped?: boolean;
  exclude?: string[];
  onGroupToggle: (group: string) => void;
  onToggle: (group: string, show: boolean) => void;
}

const defaultProps = {
  expanded: true,
  group_expanded: false,
  onToggle: () => {}, // noop
  onGroupToggle: () => {} // noop
};

const ModsTable: SFC<Props> = props => {
  const { className } = props;
  const {
    expanded,
    group_expanded,
    human = className,
    details,
    onGroupToggle,
    onToggle,
    grouped = false,
    exclude = []
  } = props;

  const onCaptionClick = () => onToggle(className, expanded);
  const handleGroupToggle = (event: SyntheticEvent<HTMLButtonElement>) => {
    onGroupToggle(className);

    event.stopPropagation();
  };

  // Table componenent
  const Mods = grouped && !group_expanded ? GroupedMods : UngroupedMods;

  return (
    <div className={classnames('mods-table', className)}>
      <h4
        id={`${className}-caption`}
        aria-expanded={group_expanded}
        aria-haspopup={true}
        onClick={onCaptionClick}
      >
        {human} /<span className="count">{details.length}</span>
        {grouped && (
          <Button onClick={handleGroupToggle}>
            {group_expanded ? 'Grouped' : 'Ungrouped'}
          </Button>
        )}
      </h4>
      {expanded && (
        <Mods className={className} details={details} exclude={exclude} />
      )}
    </div>
  );
};

ModsTable.defaultProps = defaultProps;

export default ModsTable;
