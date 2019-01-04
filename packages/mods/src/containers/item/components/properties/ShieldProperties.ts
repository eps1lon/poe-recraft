import ItemArmourProperties, { ArmourProperties } from './ArmourProperties';
import { AugmentableValue } from '../../util';

export interface ShieldProperties extends ArmourProperties {
  block(): AugmentableValue;
}

export default class ItemShieldProperties extends ItemArmourProperties
  implements ShieldProperties {
  public block() {
    const { shield_type } = this.parent.baseitem;

    if (shield_type === undefined) {
      throw new Error('shield_type not set in baseitem');
    }

    return this.parent.computeValue(shield_type.block, ['local', 'block']);
  }
}
