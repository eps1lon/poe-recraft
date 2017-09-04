import React from 'react';

export type Props = {
  name: string,
  human: string
};

const ItemClassGroup = (props: Props) => {
  return <li>{props.human}</li>;
};

export default ItemClassGroup;
