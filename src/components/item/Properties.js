// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';

import ArmourDisplay from './properties/Armour';

type Props = {
  item: Item
};

const Properties = ({ item }: Props) => {
  const { meta_data, properties } = item;

  const property_displays = [];

  if (meta_data.isA('AbstractArmour')) {
    property_displays.push(
      // $FlowFixMe: cant have typeguards
      <ArmourDisplay key="armour" properties={properties.list()} />
    );
  }

  if (properties.any()) {
    return [...property_displays, <Separator key="sep" />];
  } else {
    return null;
  }
};

export default Properties;
