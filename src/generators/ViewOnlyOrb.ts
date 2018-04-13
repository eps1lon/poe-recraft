import Orb from './Orb';
import Item from '../containers/item';
import { Flags } from '../util';

export default class ViewOnlyOrb extends Orb<Item> {
  /**
   * not applicable to anything
   * @param item 
   */
  public applicableTo(item: Item): Flags {
    return {
      not_applicable: true,
    };
  }

  /**
   * do nothing
   * @param item 
   */
  public applyTo(item: Item): Item {
    // do nothing
    return item;
  }
}
