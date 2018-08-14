import * as React from 'react';

import { Intersperse } from '../../../util/react';
import Separator from '../Separator';
import Corrupted from './Corrupted';
import Properties from './Properties';
import Requirements from './Requirements';
import Stats, { Extended } from './Stats';

export interface Props {
  item: {
    requirements?: Requirements['props']['requirements'];
    properties?: Properties['props']['properties'];
    utilityMods?: React.ReactNode[];
    implicitMods?: React.ReactNode[];
    enchantmentMods?: React.ReactNode[];
    explicitMods?: React.ReactNode[];
    craftedMods?: React.ReactNode[];
    corrupted?: boolean;
  };
  extended?: Extended;
}

export default class Body extends React.PureComponent<Props> {
  public render() {
    const { item, extended } = this.props;
    const {
      properties = [],
      requirements = [],
      utilityMods = [],
      implicitMods = [],
      enchantmentMods = [],
      explicitMods = [],
      craftedMods = [],
      corrupted = false,
    } = item;

    const shouldDisplayImplicits =
      implicitMods.length || enchantmentMods.length;
    const shouldDisplayExplicits =
      explicitMods.length || utilityMods.length || craftedMods.length;

    return (
      <section className="body">
        <Intersperse renderSeparator={separator}>
          {properties.length > 0 && <Properties properties={properties} />}
          {requirements.length > 0 && (
            <Requirements key="requirements" requirements={requirements} />
          )}
          {shouldDisplayImplicits && (
            <>
              <Stats
                className="implicitMod"
                extended={extended}
                group="implicit"
              >
                {implicitMods}
              </Stats>
              <Stats
                className="enchantmentMod"
                extended={extended}
                group="implicit"
              >
                {enchantmentMods}
              </Stats>
            </>
          )}
          {shouldDisplayExplicits && (
            <>
              <Stats
                className="explicitMod"
                extended={extended}
                group="explicit"
              >
                {explicitMods}
              </Stats>
              <Stats
                className="utilityMod"
                extended={extended}
                group="explicit"
              >
                {utilityMods}
              </Stats>
              <Stats
                className="craftedMod"
                extended={extended}
                group="explicit"
              >
                {craftedMods}
              </Stats>
            </>
          )}
        </Intersperse>
        {corrupted && <Corrupted />}
      </section>
    );
  }
}

function separator(key: string) {
  return <Separator key={key} />;
}
