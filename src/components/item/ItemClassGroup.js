// @flow
import type { ItemClassProps } from 'poe-mods/lib/schema';
import React from 'react';

import ItemClass from '../../containers/ItemClass';

export type Props = {
  name: string,
  human: string,
  classes: ItemClassProps[]
};

const ItemClassGroup = (props: Props) => {
  return [
    <h3 key="heading">{props.human}</h3>,
    <ul key="classes" className={`item-class-group ${props.name}`}>
      {props.classes.map(itemclass => (
        <ItemClass key={itemclass.primary} {...itemclass} />
      ))}
    </ul>
  ];
};

export default ItemClassGroup;
