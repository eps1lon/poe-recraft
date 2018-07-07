import { formatStats } from 'poe-i18n';
import { Stat } from 'poe-mods';
import React, { SFC } from 'react';

import injectDescriptions from 'containers/injectDescriptions';

export interface Props {
  className: string;
  descriptions: {};
  stats: Stat[];
}

// @ts-ignore: jsx array elements not supported
const Stats: SFC<Props> = ({ className, stats, descriptions }) => {
  const stats_i18n = stats.map(stat => ({
    id: stat.props.id,
    value: stat.values.asTuple()
  }));

  const options = {
    datas: descriptions,
    fallback: (id: string) => (id === 'dummy_stat_display_nothing' ? null : id)
  };

  try {
    return formatStats(stats_i18n, options).map((translation, i) => {
      return (
        <div key={i} className={className}>
          {translation}
        </div>
      );
    });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(err.message, stats);
    }

    return stats.map(stat => {
      return (
        <div key={stat.props.id} className={className}>
          {stat.props.id}
        </div>
      );
    });
  }
};

export default injectDescriptions(Stats);
