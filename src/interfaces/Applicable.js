// @flow
import type { Flags } from '../util/Flags';
import type { Item } from '../containers';

export interface Applicable {
  // isApplicableTo(Item, string[]): boolean,
  applicableTo(Item): Flags<*>,
}
