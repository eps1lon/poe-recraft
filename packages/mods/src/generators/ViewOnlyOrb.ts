import Orb from './Orb';
import Item from '../containers/item';
import { Flags } from '../util';

export { SpawnableFlags, SpawnableFlag } from './Orb';

export interface ApplicableFlags extends Flags {
  not_applicable: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class ViewOnlyOrb extends Orb<Item> {
  /**
   * not applicable to anything
   * @param item
   */
  public applicableTo(item: Item): ApplicableFlags {
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
