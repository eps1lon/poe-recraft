// @flow
import type { Flags } from '../util/Flags';
import type { Container } from '../containers';

export interface Applicable<T: Container<*>> {
  // isApplicableTo(Item, string[]): boolean,
  applicableTo(T): Flags<*>,
}
