import * as React from 'react';

import { Item, Affixes } from '../../poe';
import {  isMod } from '../../../mod/poe';
import Stats from '../../../stat/Stats';
import { Intersperse } from '../../../util/react';
import Separator from '../Separator';
import Properties from './Properties';
import Requirements from './Requirements';

export interface Props {
  item: Item;
  translations: {};
}

export default class Body extends React.PureComponent<Props> {
  public render() {
    const { item } = this.props;
    const { implicits = [], explicits = [], requirements = {} } = item;
    const implicit_stats = this.collectStats(implicits);
    const explicit_stats = this.collectStats(explicits);

    return (
      <section className="body">
        <Intersperse renderSeparator={separator}>
          {Properties.hasAny(item) && (
            <Properties key="properties" properties={item} />
          )}
          {Requirements.hasAny(requirements) && (
            <Requirements key="requirements" requirements={requirements} />
          )}
          {Stats.hasAny(implicit_stats) && (
            <Stats key="implicits" classname="implicit">
              {implicit_stats}
            </Stats>
          )}
          {Stats.hasAny(explicit_stats) && (
            <Stats key="explicits" classname="explicit">
              {explicit_stats}
            </Stats>
          )}
        </Intersperse>
      </section>
    );
  }

  private collectStats(affixes: Affixes): React.ReactNode[] {
    return affixes.reduce(
      (flattened: React.ReactNode[], affix) => {
        if (isMod(affix)) {
          flattened.push(...affix.stats);
        } else {
          flattened.push(affix);
        }

        return flattened;
      },
      [] as React.ReactNode[],
    );
  }
}

function separator(key: string) {
  return <Separator key={key} />;
}
