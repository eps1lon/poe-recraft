import Stat from './Stat';
import ValueRange from './ValueRange';

import applications from './stat_applications';

export type Classification = ReadonlyArray<string>;
export interface Modifier {
  stat: Stat;
  type: 'flat' | 'inc' | 'more';
}

// truncate after precision digits
const poe_round = (n: number, precision: number) => {
  // (Math.floor(n * 10 ** precision) / 10 ** precision
  // 1.005 => 1.00499999999999999999
  // round to prec + 1 and then truncate by removing the created digit
  return Number(n.toFixed(precision + 1).slice(0, -1));
};

export default class Value {
  public classification: Classification;
  public modifiers: ReadonlyArray<Modifier>;
  public range: ValueRange;
  /**
   * if the value change since init
   */
  public augmented: boolean = false;

  constructor(
    range: [number, number] | ValueRange,
    classification: Classification = [],
    modifiers: Modifier[] = [],
  ) {
    this.range = range instanceof ValueRange ? range : new ValueRange(range);
    this.classification = classification;
    this.modifiers = modifiers;
  }

  get value() {
    return this.range.valueOf();
  }

  public augmentWith(stats: Stat[]): Value {
    return new Value(
      this.range,
      this.classification,
      this.modifiers.concat(
        stats
          .filter(stat => this.augmentableBy(stat))
          .map(stat => {
            return {
              stat,
              type: applications[stat.props.id].type,
            };
          }),
      ),
    );
  }

  public augmentableBy(stat: Stat): boolean {
    return (
      applications[stat.props.id] != null &&
      // empty clauses never augment anything
      applications[stat.props.id].classification.length > 0 &&
      // applications[stat.props.id].classification is in DNF
      // [a, b, [c, d]] => a || b || (c && d)
      applications[stat.props.id].classification.some(clause =>
        Array.isArray(clause)
          ? clause.every(term => this.classification.includes(term))
          : this.classification.includes(clause),
      )
    );
  }

  /**
   * calculates the final ValueRange from all the applied modifers
   *
   * in PoE all increase modifers get summed up to one big more modifier
   */
  public compute(precision: number = 0): Value {
    const flat = this.modifiers
      .filter(({ type }) => type === 'flat')
      .reduce(
        (sum, modifier) => sum.add(modifier.stat.values),
        ValueRange.zero,
      );

    const increases = this.modifiers
      .filter(({ type }) => type === 'inc')
      .reduce(
        (sum, modifier) => sum.add(modifier.stat.values),
        ValueRange.zero,
      );

    const more = this.modifiers
      .filter(({ type }) => type === 'more')
      .reduce(
        (sum, modifier) => sum.mult(modifier.stat.values.percentToFactor()),
        ValueRange.one,
      );

    const calculated = new Value(
      this.range
        .add(flat)
        .mult(increases.percentToFactor())
        .mult(more)
        .map(n => poe_round(n, precision)),
    );
    calculated.augmented = calculated.range !== this.range;

    return calculated;
  }
}
