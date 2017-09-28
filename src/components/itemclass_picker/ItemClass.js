// @flow
import React from 'react';
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
      {name}
    </DropdownItem>
  );
};

ItemClassGroup.defaultProps = {
  onClick: () => {}
};

export default ItemClassGroup;
