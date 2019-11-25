import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import BaseItemModal from 'containers/baseitem_picker/Modal';
import GeneratorModal from 'containers/GeneratorModal';
import ItemClassPicker from 'containers/itemclass_picker/Picker';
import LanguagePicker from 'containers/LanguagePicker';

export interface Props {
  itemClassGroups: any[];
  locales: string[];
  onDrawerClick: () => void;
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      color: theme.palette.type === 'dark' ? '#fff' : undefined,
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : undefined,
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
  const { itemClassGroups, locales } = props;
  const classes = useClasses({});

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <ItemClassPicker groups={itemClassGroups} />
        <BaseItemModal />
        <GeneratorModal />
        <LanguagePicker locales={locales} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
