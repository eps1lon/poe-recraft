import * as _ from 'lodash';

import ItemProperties, {
  NumericProperty,
  Properties,
  Builder as BaseBuilder,
} from './Properties';
import Stat from '../../../../calculator/Stat';
import ValueRange from '../../../../calculator/ValueRange';
import Value from '../../../../calculator/Value';

export interface Defences {
  armour: NumericProperty;
  evasion: NumericProperty;
  energy_shield: NumericProperty;
}

export interface ArmourProperties extends Properties {
  defences(): Defences;
}

export type Builder = BaseBuilder;

export default class ItemArmourProperties extends ItemProperties
  implements ArmourProperties {
  public defences() {
    const item = this.parent;
    const { component_armour } = item.baseitem;

    if (component_armour == null) {
      throw new Error(
        'component_armour not set while attempting to calculate defences',
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
    const stats_as_array: Stat[] = [...Object.values(stats)];

    const augmented_props = _.mapValues(props, (value: Value) => {
      return  value.augmentWith(stats_as_array).compute() as NumericProperty;
    });

    return augmented_props;
  }

  public any(): boolean {
    const { armour, energy_shield, evasion } = this.defences();
    return (
      super.any() ||
      // armour > 0
      !ValueRange.isZero(armour.value) ||
      // es > 0
      !ValueRange.isZero(energy_shield.value) ||
      // eva > 0
      !ValueRange.isZero(evasion.value)
    );
  }
}
