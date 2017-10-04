// @flow
import { formatStats } from 'poe-i18n';
import React from 'react';

const locale = require('poe-i18n/locale-data/en/stat_descriptions');

type Props = {
  className: string,
  stats: Array<{ id: string, value: number | [number, number] }>
};

const Stats = ({ className, stats }: Props) => {
  const options = {
    data: locale,
    fallback: id => (id === 'dummy_stat_display_nothing' ? null : id)
  };

  try {
    return formatStats(stats, options).map((translation, i) => {
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
        <div key={stat.id} className={className}>
          {stat.id}
        </div>
      );
    });
  }
};

export default Stats;
