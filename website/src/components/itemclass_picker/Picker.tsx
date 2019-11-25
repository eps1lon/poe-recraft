import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import ItemClass from 'containers/itemclass_picker/ItemClass';
import React from 'react';

export interface Props {
  active: string | undefined;
  groups: Array<{
    human: string;
    name: string;
    classes: string[];
  }>;
}

export default function Picker(props: Props): JSX.Element {
  const { active, groups } = props;

  return groups.map(group => {
    return (
      <Dropdown
        key={group.name}
        className={active === group.name ? 'active' : ''}
        name={group.human}
      >
        <List component="div">
          {group.classes.map(itemClass => {
            return (
              <ItemClass key={itemClass} id={itemClass} name={itemClass} />
            );
          })}
        </List>
      </Dropdown>
    );
  }) as any;
}

interface DropdownProps {
  children: React.ReactElement<unknown>;
  className: string;
  name: string;
}

const useStyles = makeStyles(theme => {
  return {
    dropdown: {
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar + 1,
    },
  };
});

function Dropdown(props: DropdownProps) {
  const { children, name } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = React.useCallback(
    (event: React.SyntheticEvent<HTMLElement>) =>
      setAnchorEl(prevEl => (prevEl ? null : event.currentTarget)),
    [],
  );
  const close = React.useCallback(() => setAnchorEl(null), []);

  const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={close}>
      <div>
        <Button onClick={handleClick}>{name}</Button>
        <Popper
          anchorEl={anchorEl}
          className={classes.dropdown}
          open={Boolean(anchorEl)}
        >
          {children}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
