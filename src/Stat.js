// @flow
import type { StatProps } from './data/schema';
import { type ValueRange, add, mult } from './ValueRange';

export default class Stat {
  static localization = null;

  +props: StatProps;
  +values: ValueRange;

  constructor(props: StatProps, values: ValueRange = [0, 0]) {
    (this: any).props = props;
    (this: any).values = values;
  }

  valueString() {
    return `(${this.values[0]} - ${this.values[1]})`;
  }

  set(values: ValueRange) {
    return new Stat(this.props, values);
  }

  add(values: ValueRange) {
    return new Stat(this.props, add(this.values, values));
  }

  mult(values: ValueRange) {
    return new Stat(this.props, mult(this.values, values));
  }
}
