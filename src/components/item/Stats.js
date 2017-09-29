// @flow
import { type Item } from 'poe-mods';
import React from 'react';

type Props = {
  className: string,
  stats: { [string]: { id: string } }
};

const Stats = ({ className, stats }: Props) => {
  return Object.keys(stats).map(id => {
    const stat = stats[id];

    return (
      <div key={id} className={className}>
        {id}
      </div>
    );
  });
};

export default Stats;
