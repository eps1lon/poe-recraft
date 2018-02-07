export default class ValueRange {
  public min: number;
  public max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  public add(other: ValueRange) {
    if (other.isAddIdentity()) {
      return this;
    } else {
      return new ValueRange(this.min + other.min, this.max + other.max);
    }
  }

  public mult(other: ValueRange) {
    if (other.isMultIdentity()) {
      return this;
    } else {
      return new ValueRange(this.min * other.min, this.max * other.max);
    }
  }

  public map(mapFn: (n: number) => number) {
    const [min, max] = [mapFn(this.min), mapFn(this.max)];

    if (min !== this.min || max !== this.max) {
      return new ValueRange(min, max);
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
    return this.mult(new ValueRange(0.01, 0.01)).add(new ValueRange(1, 1));
  }

  public asTuple(): [number, number] {
    return [this.min, this.max];
  }
}
