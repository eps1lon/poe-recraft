// @flow
import React from 'react';
import { DropdownMenu } from 'reactstrap';

import ItemClass from '../../containers/itemclass_picker/ItemClass';

export type Props = {
  classes: { primary: number, name: string }[]
};

const GroupDropdown = (props: Props) => {
  const { classes } = props;

  return (
    <DropdownMenu>
      {classes.map(({ primary, name }) => (
        <ItemClass key={primary} primary={primary} name={name} />
      ))}
    </DropdownMenu>
  );
};

export default GroupDropdown;
