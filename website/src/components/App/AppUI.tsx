import { CssBaseline } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import Body from 'components/Body';
import Header from 'components/Header';

import * as settings from './settings';

export interface Props {
  isDrawerOpen: boolean;
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    header: {
      /* below nprogress */
      zIndex: theme.zIndex.drawer + 1,
    },
    wizardProgress: {
      backgroundColor: '#eee',
      marginBottom: theme.spacing.unit * 2,
    },
  }),
);

function AppUI(props: Props) {
  const { isDrawerOpen } = props;
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header locales={settings.SUPPORTED_LOCALES} />
      <Body />
      <Drawer itemClasses={settings.ITEMCLASSES_GROUPED} open={isDrawerOpen} />
      <Notifications />
    </div>
  );
}

function Notifications() {
  return null;
}

interface DrawerProps {
  itemClasses: any[];
  open: boolean;
}
function Drawer(props: DrawerProps) {
  return null;
}

export default AppUI;
