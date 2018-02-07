import React, { SFC } from 'react';

import DisplayProperty from './DisplayProperty';

export type Property = {
  values: [number, number];
  type: 'simple' | 'augmented';
};

export type Props = {
  properties: {
    armour: Property;
    evasion: Property;
    energy_shield: Property;
  };
};

// @ts-ignore: jsx array elements not supported
const Armour: SFC<Props> = ({ properties }) => {
  const { armour, evasion, energy_shield } = properties;

  return [
    <DisplayProperty
      key="armour"
      human="armour"
      type={armour.type}
      values={armour.values}
    />,
    <DisplayProperty
      key="evasion"
      human="evasion rating"
      type={evasion.type}
      values={evasion.values}
    />,
    <DisplayProperty
      key="energy_shield"
      human="energy shield"
      type={energy_shield.type}
      values={energy_shield.values}
    />
  ];
};

export default Armour;
