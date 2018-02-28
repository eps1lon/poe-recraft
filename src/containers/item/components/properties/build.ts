import ItemProperties, { Builder } from './Properties';
import ArmourProperties from './ArmourProperties';
import Item from '../..';

export default function build(item: Item, builder: Builder): ItemProperties {
  if (item.meta_data.isA('AbstractArmour')) {
    return new ArmourProperties(item, builder);
  } else {
    return new ItemProperties(item, builder);
  }
}
