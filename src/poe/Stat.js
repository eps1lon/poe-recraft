// @flow
import type { StatProps } from './data/schema';
import type { ValueRange } from './ValueRange';

export default class Stat {
  static localization = null;

  props: StatProps;
  values: ValueRange;

  constructor(props: StatProps) {
    this.props = props;
    this.values = [0, 0];
  }

  valueString() {
    return `(${this.values.toString()})`;
  }
}
