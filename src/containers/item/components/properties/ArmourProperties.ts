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

    return {
      armour: this.parent.computeValue(armour, ['local', 'defences', 'armour']),
      evasion: this.parent.computeValue(evasion, [
        'local',
        'defences',
        'evasion',
      ]),
      energy_shield: this.parent.computeValue(energy_shield, [
        'local',
        'defences',
        'energy_shield',
      ]),
    };
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
