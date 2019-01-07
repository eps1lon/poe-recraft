import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Flags, Mod } from 'poe-mods';
import React from 'react';

import GroupedMods from 'containers/mods/GroupedMods';
import UngroupedMods from 'containers/mods/UngroupedMods';

export interface Props {
  className: string;
  // if no expanded is passed (i.e. == null) then this value is considered as Boolean casted
  defaultExpanded?: boolean;
  exclude?: string[];
  expanded?: boolean;
  grouped?: boolean;
  group_expanded: boolean;
  human?: string;
  details: GeneratorDetails[];
  onGroupToggle: (group: string) => void;
  onToggle: (group: string, show: boolean) => void;
}

const styles = createStyles({
  title: {
    color: 'inherit',
    cursor: 'pointer',
    fontSize: '1.3em',

    '&:hover': {
      color: 'white',
    },
  },
});
const useClasses = makeStyles(styles);

export interface GeneratorDetails {
  mod: Mod;
  applicable?: Flags;
  spawnable?: Flags;
  spawnweight?: number;
  spawnchance?: number;
  relative_weight?: number;
}

const defaultProps = {
  exclude: [],
  grouped: false,
};

function ModsTable(props: Props) {
  const { className } = props;
  const {
    defaultExpanded,
    exclude = defaultProps.exclude,
    expanded: expandedProp,
    group_expanded,
    human = className,
    details,
    grouped = defaultProps.grouped,
    onGroupToggle,
    onToggle,
  } = props;

  const classes = useClasses(props);

  function handleCaptionClick() {
    onToggle(className, expanded);
  }

  function handleGroupToggle(event: React.MouseEvent) {
    onGroupToggle(className);
    event.stopPropagation();
  }

  const expanded =
    expandedProp == null ? Boolean(defaultExpanded) : expandedProp;

  // Table componenent
  const Mods = grouped && !group_expanded ? GroupedMods : UngroupedMods;

  return (
    <div className={className}>
      <h4
        aria-expanded={group_expanded}
        aria-haspopup={true}
        className={classes.title}
        onClick={handleCaptionClick}
      >
        {human} /<span>{details.length}</span>
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
}

export default React.memo(ModsTable);
