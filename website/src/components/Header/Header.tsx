import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import BaseItemModal from 'containers/baseitem_picker/Modal';
import GeneratorModal from 'containers/GeneratorModal';
import LanguagePicker from 'containers/LanguagePicker';

export interface Props {
  locales: string[];
  onDrawerClick: () => void;
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {},
    drawerIcon: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      marginLeft: 24,
      flex: '0 1 auto',
    },
  }),
);

function Header(props: Props) {
  const { locales, onDrawerClick } = props;
  const classes = useClasses();

  const title = 'Hello, World!';

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerClick}
          className={classes.drawerIcon}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
        >
          {title}
        </Typography>
        <BaseItemModal />
        <GeneratorModal />
        <LanguagePicker locales={locales} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
