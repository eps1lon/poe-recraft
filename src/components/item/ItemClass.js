// @flow
import React from 'react';

type EventHandle = () => any;

export type Props = {
  primary: number,
  name: string,
  onClick: EventHandle
};

const ItemClassGroup = ({ name, onClick }: Props) => {
  return (
    <li>
      <button onClick={onClick}>{name}</button>
    </li>
  );
};

ItemClassGroup.defaultProps = {
  onClick: () => undefined
};

export default ItemClassGroup;
