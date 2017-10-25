// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DropdownItem } from 'reactstrap';

export type Props = {
  active: string,
  primary: number,
  name: string,
  onClick: number => void
};

const ItemClassGroup = (props: Props) => {
  const { active, name, onClick, primary } = props;

  return (
    <DropdownItem active={active === primary} onClick={onClick}>
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
