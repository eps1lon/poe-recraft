import * as React from 'react';

import { Item } from '../../poe';
import { intersperse, Intersperse } from '../../../util/react';
import Separator from '../Separator';
import Properties from './Properties';
import Requirements from './Requirements';
import Stats from '../../../stat/Stats';
import { Mod } from '../../../mod/poe';
import { Stat } from '../../../stat/poe';

export interface Props {
  item: Item;
  translations: {};
}

export default class Body extends React.PureComponent<Props> {
  render() {
    const { item, translations } = this.props;
    const { implicits = [], explicits = [], requirements = {} } = item;
    const implicit_stats = this.collectStats(implicits);
    const explicit_stats = this.collectStats(explicits);

    return (
      <section className="body">
        <Intersperse renderSeparator={key => <Separator key={key} />}>
          {Properties.hasAny(item) && (
            <Properties key="properties" properties={item} />
          )}
          {Requirements.hasAny(requirements) && (
            <Requirements key="requirements" requirements={requirements} />
          )}
          {Stats.hasAny(implicit_stats) && (
            <Stats
              key="implicits"
              classname="implicit"
              stats={implicit_stats}
              translations={translations}
            />
          )}
          {Stats.hasAny(explicit_stats) && (
            <Stats
              key="explicits"
              classname="explicit"
              stats={explicit_stats}
              translations={translations}
            />
          )}
        </Intersperse>
      </section>
    );
  }

  private collectStats(mods: Mod[]): Stat[] {
    return mods.reduce(
      (flattened, { stats = [] }) => {
        flattened.push(...stats);
        return flattened;
      },
      [] as Stat[],
    );
  }
}
