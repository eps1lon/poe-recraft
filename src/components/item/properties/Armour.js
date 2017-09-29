// @flow
import React from 'react';

import DisplayProperty from './DisplayProperty';

type Property = {
  values: [number, number],
  type: 'simple' | 'augmented'
};

export type Props = {
  properties: {
    armour: Property,
    evasion: Property,
    energy_shield: Property
  }
};

const Armour = ({ properties }: Props) => {
  const { armour, evasion, energy_shield } = properties;

  return [
    <DisplayProperty
      key="armour"
      human="Armour"
      type={armour.type}
      values={armour.values}
    />
  ];
};

export default Armour;
