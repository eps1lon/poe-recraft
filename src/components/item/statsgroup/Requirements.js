// @flow
import React from 'react';

import type Item from '../../../poe/ModContainer/Item';

import Statsgroup from './';
import { Value } from '../../poe/stats/';
import { intersperse } from '../../util';

export type Props = {
  item: Item
};

const Requirements = ({ item }: Props) => {
  const requirements = item.requirements();

  const relevant_requirements = Object.entries(requirements).filter(
    ([key, value]) =>
      typeof key === 'string' && typeof value === 'number' && value > 0
  );

  const elements = relevant_requirements.map(([key, value]) => {
    return (
      <span key={key}>
        {key} <Value value={value} />
      </span>
    );
  });

  return (
    <Statsgroup className="requirements">
      {[
        ['Requires ', ...intersperse(elements)], //
        <span key={'ilvl'}>{item.item_level}</span>
      ]}
    </Statsgroup>
  );
};

export default Requirements;
