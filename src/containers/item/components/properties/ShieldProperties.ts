import ArmourProperties from './ArmourProperties';
import Stat from '../../../../calculator/Stat';
import ValueRange from '../../../../calculator/ValueRange';
import Value from '../../../../calculator/Value';

export default class ShieldProperties extends ArmourProperties {
  public block() {
    const { shield_type } = this.parent.baseitem;

    if (shield_type === undefined) {
      throw new Error('shield_type not set in baseitem');
    }

    return this.parent.computeValue(shield_type.block, ['local', 'block']);
  }
}
