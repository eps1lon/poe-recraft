import { formatStats } from 'poe-i18n';
import { PureComponent } from 'react';

import Stat from './Stat';

export interface StatProps {
  id: string;
  // interval or single
  value: [number, number] | number;
  is_augmented: boolean;
}

export interface Props {
  stats: StatProps[];
  translations: {};
}

export default class Stats extends PureComponent<Props> {
  render() {
    const { stats, translations } = this.props;

    const i18n_options = {
      datas: translations,
      fallback: (id: string) =>
        id === 'dummy_stat_display_nothing' ? null : id,
    };
    return formatStats(stats, i18n_options).map((translation, i) => {
      return (
        <Stat
          key={i}
          message={translation}
          is_augmented={stats[i].is_augmented}
        />
      );
    });
  }
}
