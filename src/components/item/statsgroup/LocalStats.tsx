import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Statsgroup from './';
import { Value } from 'components/poe/stats/';

export type Props = {
  item: Item;
};

const LocalStats: SFC<Props> = ({ item }) => {
  const { stats } = item;
  const has_stats = Object.keys(stats).length > 0;

  if (!has_stats) {
    return null;
  }
  return (
    <Statsgroup className="local-stats">
      {Object.entries(stats).map(([key, value]) => {
        return (
          <span key={key}>
            {key}: <Value value={String(value)} />
          </span>
        );
      })}
    </Statsgroup>
  );
};

export default LocalStats;
