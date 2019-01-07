import React, { SFC } from 'react';

import ItemClass from 'containers/itemclass_picker/ItemClass';

export interface Props {
  classes: string[];
}

const GroupDropdown: SFC<Props> = props => {
  const { classes } = props;

  return (
    <DropdownMenu>
      {classes.map(id => (
        <ItemClass key={id} id={id} name={id} />
      ))}
    </DropdownMenu>
  );
};

// @ts-ignore: needs props to be considered a component
function DropdownMenu(props: any) {
  return null;
}

export default GroupDropdown;
