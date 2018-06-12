import * as React from 'react';

import { isMod } from '../../../mod/poe';
import { Intersperse } from '../../../util/react';
import Separator from '../Separator';
import Corrupted from './Corrupted';
import Properties from './Properties';
import Requirements from './Requirements';
import Stats from './Stats';

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
}

export default class Body extends React.PureComponent<Props> {
  public render() {
    const { item } = this.props;
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

    return (
      <section className="body">
        <Intersperse renderSeparator={separator}>
          {properties.length > 0 && <Properties properties={properties} />}
          {requirements.length > 0 && (
            <Requirements key="requirements" requirements={requirements} />
          )}
          {utilityMods.length > 0 && (
            <Stats key="utilityMods" className="utilityMod">
              {utilityMods}
            </Stats>
          )}
          {implicitMods.length > 0 && (
            <Stats key="implicitMods" className="implicitMod">
              {implicitMods}
            </Stats>
          )}
          {enchantmentMods.length > 0 && (
            <Stats key="enchantmentMods" className="enchantmentMod">
              {enchantmentMods}
            </Stats>
          )}
          {explicitMods.length > 0 && (
            <Stats key="explicitMods" className="explicitMod">
              {explicitMods}
            </Stats>
          )}
          {craftedMods.length > 0 && (
            <Stats key="craftedMods" className="craftedMod">
              {craftedMods}
            </Stats>
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
