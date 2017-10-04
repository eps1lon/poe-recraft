// @flow
import { formatStats } from 'poe-i18n';
import { type Stat } from 'poe-mods';
import React from 'react';

const locale = require('poe-i18n/locale-data/en/stat_descriptions');

type Props = {
  className: string,
  stats: Stat[]
};

const Stats = ({ className, stats }: Props) => {
  const stats_i18n = stats.map(stat => ({
    id: stat.props.id,
    value: stat.values.asTuple()
  }));
  const options = {
    data: locale,
    fallback: id => (id === 'dummy_stat_display_nothing' ? null : id)
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
    console.warn(err.message, stats);
    return stats.map(stat => {
      return (
        <div key={stat.props.id} className={className}>
          {stat.props.id}
        </div>
      );
    });
  }
};

export default Stats;
