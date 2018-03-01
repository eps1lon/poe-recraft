import React, { SFC } from 'react';
import { DropdownMenu } from 'reactstrap';

import ItemClass from 'containers/itemclass_picker/ItemClass';

export type Props = {
  classes: string[];
};

const GroupDropdown: SFC<Props> = props => {
  const { classes } = props;

  return (
    <DropdownMenu>
      {classes.map(id => <ItemClass key={id} id={id} name={name} />)}
    </DropdownMenu>
  );
};

export default GroupDropdown;
