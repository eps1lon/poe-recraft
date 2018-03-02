export type ValueRangeLike = ValueRange | number | [number, number];

export default class ValueRange {
  // this is evaluated before {ValueRange} is defined
  // which will fail the constructor because we check instanceof {ValueRange}
  // these are still available as properties
  // public static zero = new ValueRange([0, 0]);
  // public static one = new ValueRange([1, 1]);
  public static zero: ValueRange;
  public static one: ValueRange;

  public static isZero(value: ValueRangeLike) {
    const [min, max] = tuple(value);
    return min === 0 && max === 0;
  }

  public min: number;
  public max: number;

  constructor(range: ValueRangeLike) {
    const [min, max] = tuple(range);
    this.min = min;
    this.max = max;
  }

  public add(other: ValueRangeLike) {
    if (other instanceof ValueRange && other.isAddIdentity()) {
      return this;
    } else {
      const [min, max] = tuple(other);
      return new ValueRange([this.min + min, this.max + max]);
    }
  }

  public mult(other: ValueRangeLike) {
    if (other instanceof ValueRange && other.isMultIdentity()) {
      return this;
    } else {
      const [min, max] = tuple(other);
      return new ValueRange([this.min * min, this.max * max]);
    }
  }

  public map(mapFn: (n: number) => number) {
    const [min, max] = [mapFn(this.min), mapFn(this.max)];

    if (min !== this.min || max !== this.max) {
      return new ValueRange([min, max]);
    } else {
      return this;
    }
  }

  public isAddIdentity(): boolean {
    return this.min === 0 && this.max === 0;
  }

  public isMultIdentity(): boolean {
    return this.min === 1 && this.max === 1;
  }

  /**
   * +29% => 1.29
   */
  public percentToFactor(): ValueRange {
    return this.mult(new ValueRange([0.01, 0.01])).add(new ValueRange([1, 1]));
  }

  public asTuple(): [number, number] {
    return [this.min, this.max];
  }

  public valueOf(): number | [number, number] {
    const range = this.asTuple();

    if (range[0] === range[1]) {
      return range[0];
    } else {
      return range;
    }
  }
}

function tuple(value: ValueRangeLike): [number, number] {
  if (value instanceof ValueRange) {
    return value.asTuple();
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value, value];
  }
}

// since ValueRange is immutable we can have this singletons
// can still be reassigned though :(
ValueRange.zero = new ValueRange([0, 0]);
ValueRange.one = new ValueRange([1, 1]);
