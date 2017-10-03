// @flow
import { formatStats } from 'poe-i18n';
import { type Item } from 'poe-mods';
import React from 'react';

const locale = require('poe-i18n/locale-data/en/stat_descriptions');

type Props = {
  className: string,
  stats: { [string]: { values: { min: number, max: number } } }
};

const Stats = ({ className, stats }: Props) => {
  const stats_for_i18n = Object.keys(stats).map(id => {
    const { values } = stats[id];

    return {
      id,
      value: values.min
    };
  });

  try {
    return formatStats(stats_for_i18n, locale).map((translation, i) => {
      return (
        <div key={i} className={className}>
          {translation}
        </div>
      );
    });
  } catch (err) {
    console.warn(err.message, Object.keys(stats));
    return Object.keys(stats).map(id => {
      return (
        <div key={id} className={className}>
          {id}
        </div>
      );
    });
  }
};

export default Stats;
