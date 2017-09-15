// @flow
import type { Flags } from '../Flags';
import type { Item } from '../containers/';

export interface Applicable {
  // isApplicableTo(Item, string[]): boolean,
  applicableTo(Item): Flags<*>,
}
