// @flow
import { formatStats } from 'poe-i18n';
import { type Stat } from 'poe-mods';
import React from 'react';
import { injectIntl } from 'react-intl';

type Props = {
  className: string,
  intl: {
    messages: {
      poe: {
        descriptions: {}
      }
    }
  },
  stats: Stat[]
};

const Stats = ({ className, stats, intl }: Props) => {
  const stats_i18n = stats.map(stat => ({
    id: stat.props.id,
    value: stat.values.asTuple()
  }));

  const options = {
    datas: intl.messages.poe.descriptions,
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

export default injectIntl(Stats);
