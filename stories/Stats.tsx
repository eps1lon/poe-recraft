import classnames from 'classnames';
import * as React from 'react';
const stat_descriptions = require('poe-i18n/locale-data/en/stat_descriptions.json');

import { Group as ModGroup } from '../src/mod/poe';
import Stats from '../src/stat/Stats';
import { Stat } from '../src/stat/poe';

export interface Props {
  rarity: 'normal' | 'magic' | 'rare';
  stats: Stat[];
  type: ModGroup;
}

const Story: React.SFC<Props> = ({ rarity, type, ...props }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Stats
          classname={ModGroup[type]}
          {...props}
          translations={{ stat_descriptions }}
        />
      </section>
    </div>
  );
};
export default Story;
