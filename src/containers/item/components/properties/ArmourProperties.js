// @flow
import type { Properties, Property } from './ComputedProperties';
import type Item from '../../Item';
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
    armour: {
      type: 'simple',
      value: new Value([armour, armour], ['local', 'defences', 'armour']),
    },
    evasion: {
      type: 'simple',
      value: new Value([evasion, evasion], ['local', 'defences', 'evasion']),
    },
    energy_shield: {
      type: 'simple',
      value: new Value(
        [energy_shield, energy_shield],
        ['local', 'defences', 'energy_shield'],
      ),
    },
  };

  const stats = item.stats();

  const augmented_armour = props.armour.value
    .augmentWith(Object.keys(stats).map(id => stats[id]))
    .compute();

  return (({
    armour: {
      type:
        augmented_armour === props.armour.value.base ? 'simple' : 'augmented',
      values: augmented_armour.asTuple(),
    },
    evasion: {
      type: 'simple',
      values: [evasion, evasion],
    },
    energy_shield: {
      type: 'simple',
      values: [energy_shield, energy_shield],
    },
  }: any): ArmourProperties);
}
