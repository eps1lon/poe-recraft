import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import ArmourDisplay, {
  Props as ArmourProps,
  Property
} from './properties/Armour';

type Props = {
  item: Item;
};

const isArmourProperties = (properties: {
  [key: string]: Property;
}): properties is ArmourProps['properties'] => {
  return (
    'armour' in properties &&
    'evasion' in properties &&
    'energy_shield' in properties
  );
};

// @ts-ignore: jsx array elements not supported by ts
const Properties: SFC<Props> = ({ item }) => {
  const { meta_data, properties } = item;

  const property_displays = [];

  if (meta_data.isA('AbstractArmour')) {
    const armour_properties = properties.list();

    if (isArmourProperties(armour_properties)) {
      property_displays.push(
        <ArmourDisplay key="armour" properties={armour_properties} />
      );
    }
  }

  if (properties.any()) {
    return [...property_displays];
  } else {
    return null;
  }
};

export default Properties;
