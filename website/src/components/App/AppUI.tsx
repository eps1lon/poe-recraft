import { CssBaseline } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';

import Body from '../Body';
import Header from '../Header';

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
      marginBottom: theme.spacing(2),
    },
  }),
);

function AppUI(props: Props) {
  const { isDrawerOpen } = props;
  const classes = useClasses({});

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        itemClassGroups={settings.ITEMCLASSES_GROUPED}
        locales={settings.SUPPORTED_LOCALES}
      />
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
  const { open } = props;
  console.log(open);
  return null;
}

type StateProps = Pick<Props, 'isDrawerOpen'>;
const mapStateToProps = (): StateProps => {
  return {
    isDrawerOpen: false,
  };
};

export default connect(mapStateToProps)(AppUI);
