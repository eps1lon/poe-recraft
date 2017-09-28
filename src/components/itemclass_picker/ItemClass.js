// @flow
import React from 'react';
import { DropdownItem } from 'reactstrap';

export type Props = {
  primary: number,
  name: string,
  onClick: number => void
};

const ItemClassGroup = (props: Props) => {
  const { name, onClick } = props;

  return <DropdownItem onClick={onClick}>{name}</DropdownItem>;
};

ItemClassGroup.defaultProps = {
  onClick: () => {}
};

export default ItemClassGroup;
