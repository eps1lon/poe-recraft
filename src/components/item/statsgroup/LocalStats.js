// @flow
import React from 'react';

import type Item from '../../../poe/ModContainer/Item';

import Statsgroup from './';
import { Value } from '../../poe/stats/';

export type Props = {
  item: Item
};

const LocalStats = ({ item }: Props) => {
  const stats = item.localStats();
  const has_stats = Object.keys(stats).length > 0;

  return (
    has_stats && (
      <Statsgroup className="local-stats">
        {Object.entries(stats).map(([key, value]) => {
          return (
            <span key={key}>
              {key}: <Value value={String(value)} />
            </span>
          );
        })}
      </Statsgroup>
    )
  );
};

export default LocalStats;
