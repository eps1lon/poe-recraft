import ItemProperties, { Builder } from './Properties';
import ArmourProperties from './ArmourProperties';
import ShieldProperties from './ShieldProperties';
import WeaponProperties from './WeaponProperties';
import Item from '../..';

export default function build(item: Item, builder: Builder): ItemProperties {
  if (item.meta_data.isA('AbstractShield')) {
    return new ShieldProperties(item, builder);
  } else if (item.meta_data.isA('AbstractArmour')) {
    return new ArmourProperties(item, builder);
  } else if (item.meta_data.isA('AbstractWeapon')) {
    return new WeaponProperties(item, builder);
  } else {
    return new ItemProperties(item, builder);
  }
}
