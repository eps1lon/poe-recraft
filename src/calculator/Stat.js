// @flow
import type { StatProps } from '../schema';
import ValueRange from './ValueRange';

export default class Stat {
  +props: StatProps;
  +values: ValueRange;

  constructor(
    props: StatProps,
    values: [number, number] | ValueRange = [0, 0],
  ) {
    (this: any).props = props;
    (this: any).values =
      values instanceof ValueRange ? values : new ValueRange(...values);
  }

  add(other: ValueRange) {
    return new Stat(this.props, this.values.add(other));
  }

  mult(other: ValueRange) {
    return new Stat(this.props, this.values.mult(other));
  }
}
