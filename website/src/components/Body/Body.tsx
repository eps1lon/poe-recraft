import { Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AvailableMods from 'containers/AvailableMods';
import ItemSection from 'containers/ItemSection';

export interface Props {}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(9),
      },
    },
  }),
);

function AppContent() {
  const classes = useClasses({});
  return (
    <main className={classes.root}>
      <ItemSection />
      <Divider />
      <AvailableMods />
    </main>
  );
}

export default AppContent;
