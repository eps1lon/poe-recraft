// @flow
export default class ValueRange {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  add(other: ValueRange) {
    if (other.isAddIdentity()) {
      return this;
    } else {
      return new ValueRange(this.min + other.min, this.max + other.max);
    }
  }

  mult(other: ValueRange) {
    if (other.isMultIdentity()) {
      return this;
    } else {
      return new ValueRange(this.min * other.min, this.max * other.max);
    }
  }

  map(mapFn: number => number) {
    const [min, max] = [mapFn(this.min), mapFn(this.max)];

    if (min !== this.min || max !== this.max) {
      return new ValueRange(min, max);
    } else {
      return this;
    }
  }

  isAddIdentity(): boolean {
    return this.min === 0 && this.max === 0;
  }

  isMultIdentity(): boolean {
    return this.min === 1 && this.max === 1;
  }

  /**
   * +29% => 1.29
   */
  percentToFactor(): ValueRange {
    return this.mult(new ValueRange(0.01, 0.01)).add(new ValueRange(1, 1));
  }

  asTuple(): [number, number] {
    return [this.min, this.max];
  }
}
