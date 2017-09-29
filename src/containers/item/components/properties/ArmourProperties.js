// @flow
import _ from 'lodash';

import type { Properties, Property } from './ComputedProperties';
import type Item from '../../Item';
import Stat from '../../../../calculator/Stat';
import Value from '../../../../calculator/Value';

export interface ArmourProperties extends Properties {
  armour: Property,
  evasion: Property,
  energy_shield: Property,
}

export default function build(item: Item): ArmourProperties {
  // FIXME: https://github.com/facebook/flow/issues/2383

  const { component_armour } = item.baseitem;

  if (component_armour == null) {
    throw new Error(
      'component_armour not set while attempting to build ArmourProperties',
    );
  }

  const { armour, evasion, energy_shield } = component_armour;

  const props = {
    armour: new Value([armour, armour], ['local', 'defences', 'armour']),
    evasion: new Value([evasion, evasion], ['local', 'defences', 'evasion']),
    energy_shield: new Value(
      [energy_shield, energy_shield],
      ['local', 'defences', 'energy_shield'],
    ),
  };

  const stats = item.stats();
  // Flow false positive when using Object.values
  const stats_as_array: Stat[] = Object.keys(stats).map(id => stats[id]);

  const augmented_props = _.mapValues(props, (value: Value) => {
    const augmented = value.augmentWith(stats_as_array).compute();

    return {
      type: augmented === value.base ? 'simple' : 'augmented',
      values: augmented.asTuple(),
    };
  });

  return augmented_props;
}
