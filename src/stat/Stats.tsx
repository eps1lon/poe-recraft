import { formatStats } from 'poe-i18n';
import * as React from 'react';

import { Stat as StatProps } from './poe';
import Stat from './Stat';

export interface Props {
  classname: string;
  stats: StatProps[];
  translations: {};
}

export default class Stats extends React.PureComponent<Props> {
  public static hasAny(stats: Props['stats']) {
    // TODO: implicit movement speed gets not displayed
    return stats.length > 0;
  }

  render() {
    const { classname, stats, translations } = this.props;

    const i18n_options = {
      datas: translations,
      fallback: (id: string) =>
        id === 'dummy_stat_display_nothing' ? null : id,
    };
    return formatStats(stats, i18n_options).map((translation, i) => {
      return <Stat key={i} classname={classname} message={translation} />;
    });
  }
}
