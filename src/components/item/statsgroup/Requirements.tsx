import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Statsgroup from './';
import { Value } from 'components/poe/stats/';
import { intersperse } from 'components/util';

export type Props = {
  item: Item;
};

const Requirements: SFC<Props> = ({ item }) => {
  const requirements = item.requirements.list();

  const relevant_requirements = Object.entries(requirements).filter(
    ([key, value]) =>
      typeof key === 'string' && typeof value === 'number' && value > 0
  );

  const elements = relevant_requirements.map(([key, value]) => {
    return (
      <span key={key}>
        {key} <Value value={String(value)} />
      </span>
    );
  });

  return (
    <Statsgroup className="requirements">
      {[
        ['Requires ', ...intersperse(elements)], //
        <span key={'ilvl'}>{item.props.item_level}</span>
      ]}
    </Statsgroup>
  );
};

export default Requirements;
