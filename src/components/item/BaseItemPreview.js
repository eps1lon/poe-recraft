// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import {
  MetaData,
  LocalStats,
  Requirements,
  Mods,
  CatchUnsupportedStatsGroup
} from './statsgroup/';
import { Corrupted } from '../poe/stats/';

export type Props = {
  item: Item
};

const BaseItemPreview = ({ item }: Props) => {
  const groups = [
    { key: 'meta_data', component: MetaData },
    { key: 'local_stats', component: LocalStats },
    { key: 'requirements', component: Requirements },
    { key: 'mods', component: Mods }
  ];

  return (
    <div className="itembox">
      <span className="itemboxheader double-line">
        <span className="itemboxheader-left" />
        <span className="itemName">{item.name.lines().join('\n')}</span>
        <span className="itemboxheader-right" />
      </span>
      {groups.map(Group => (
        <CatchUnsupportedStatsGroup group={Group.key} item={item}>
          <Group.component key={Group.key} item={item} />
        </CatchUnsupportedStatsGroup>
      ))}
      {item.props.corrupted && <Corrupted />}
    </div>
  );
};

export default BaseItemPreview;
