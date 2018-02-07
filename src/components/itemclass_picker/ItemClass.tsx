import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { DropdownItem } from 'reactstrap';

export type Props = {
  active: string;
  primary: number;
  name: string;
  onClick: (primary: number) => any;
};

const ItemClassGroup: SFC<Props> = props => {
  const { active, name, onClick, primary } = props;

  return (
    // TODO was this working? typing indicates not
    <DropdownItem active={+active === primary} /*onClick={onClick}*/>
      <FormattedMessage
        id={`poe.item_classes.${primary}.name`}
        defaultMessage={name}
      />
    </DropdownItem>
  );
};
ItemClassGroup.defaultProps = {
  onClick: () => {}
};

export default ItemClassGroup;
