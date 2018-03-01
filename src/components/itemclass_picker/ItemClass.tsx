import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { DropdownItem } from 'reactstrap';

export type Props = {
  active: string;
  id: string;
  name: string;
  onClick: (primary: string) => any;
};

const ItemClassGroup: SFC<Props> = props => {
  const { active, name, onClick, id } = props;

  return (
    // TODO was this working? typing indicates not
    <DropdownItem active={active === id} onClick={() => onClick(id)}>
      <FormattedMessage
        id={`poe.item_classes.${id}.name`}
        defaultMessage={name}
      />
    </DropdownItem>
  );
};
ItemClassGroup.defaultProps = {
  onClick: () => {}
};

export default ItemClassGroup;
