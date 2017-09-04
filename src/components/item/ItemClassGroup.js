import React from 'react';

import type { Props as ItemClassProps } from './ItemClass';
import ItemClass from './ItemClass';

export type Props = {
  name: string,
  human: string,
  classes: ItemClassProps[]
};

const ItemClassGroup = (props: Props) => {
  return [
    <h3>{props.human}</h3>,
    <ul className={`item-class-group ${props.name}`}>
      {props.classes.map(itemclass => (
        <ItemClass key={itemclass.name} {...itemclass} />
      ))}
    </ul>
  ];
};

export default ItemClassGroup;
