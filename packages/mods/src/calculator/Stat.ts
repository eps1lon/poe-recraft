import { StatProps } from '../schema';
import ValueRange from './ValueRange';

export default class Stat {
  public props: StatProps;
  public values: ValueRange;

  constructor(
    props: StatProps,
    values: [number, number] | ValueRange = [0, 0],
  ) {
    this.props = props;
    this.values =
      values instanceof ValueRange
        ? values
        : new ValueRange([values[0], values[1]]);
  }

  public get id(): string {
    return this.props.id;
  }

  public add(other: ValueRange) {
    return new Stat(this.props, this.values.add(other));
  }

  public mult(other: ValueRange) {
    return new Stat(this.props, this.values.mult(other));
  }
}
