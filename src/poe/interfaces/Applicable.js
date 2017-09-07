// @flow
import type FlagSet from '../FlagSet';
import type Item from '../ModContainer/Item';

export interface Applicable {
  //isApplicableTo(Item, string[]): boolean,
  applicableTo(Item): FlagSet
}
