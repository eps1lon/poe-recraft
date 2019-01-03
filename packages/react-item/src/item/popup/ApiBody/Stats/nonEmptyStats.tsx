import * as React from 'react';

import Stats, { Props } from './Stats';

const nonEmptyStats= (stats: React.ReactNode, props: Props) => {
  if (!Array.isArray(stats) || stats.length < 1) {
    return false;
  }
  return <Stats {...props}>{stats}</Stats>;
};
export default nonEmptyStats;
