import { Button, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    title: {
      cursor: 'pointer',
      fontSize: '1.3em',
    },
  });
const useClasses = makeStyles(styles, { name: 'ModsTable' });

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
    <Paper className={classNames(classes.root, className)}>
      <Typography
        aria-expanded={group_expanded}
        aria-haspopup={true}
        className={classes.title}
        onClick={handleCaptionClick}
        variant="h4"
      >
        {human} /<span>{details.length}</span>
        {grouped && (
          <Button onClick={handleGroupToggle}>
            {group_expanded ? 'Grouped' : 'Ungrouped'}
          </Button>
        )}
      </Typography>
      {expanded && (
        <Mods className={className} details={details} exclude={exclude} />
      )}
    </Paper>
  );
}

export default React.memo(ModsTable);
