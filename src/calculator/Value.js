// @flow
import type Stat from './Stat';
import ValueRange from './ValueRange';

import applications from './stat_applications';

type Classification = $ReadOnlyArray<string>;

type Modifier = {
  stat: Stat,
  type: 'flat' | 'inc' | 'more',
};

export default class Value {
  classification: Classification;
  modifiers: Modifier[];
  base: ValueRange;

  constructor(
    range: [number, number] | ValueRange,
    classification: Classification = [],
    modifiers: Modifier[] = [],
  ) {
    this.base = range instanceof ValueRange ? range : new ValueRange(...range);
    this.classification = classification;
    this.modifiers = modifiers;
  }

  augmentWith(stats: Stat[]): Value {
    return new Value(
      this.base,
      this.classification,
      this.modifiers.concat(
        stats.filter(stat => this.augmentableBy(stat)).map(stat => {
          return {
            stat,
            type: applications[stat.props.id].type,
          };
        }),
      ),
    );
  }

  augmentableBy(stat: Stat): boolean {
    return (
      applications[stat.props.id] != null &&
      // empty clauses never augment anything
      applications[stat.props.id].classification.length > 0 &&
      // applications[stat.props.id].classification is in KNF
      // [a, b, [c, d]] => a && b && (c || d)
      applications[stat.props.id].classification.every(
        tag =>
          Array.isArray(tag)
            ? tag.some(or => this.classification.includes(or))
            : this.classification.includes(tag),
      )
    );
  }

  /**
   * calculates the final ValueRange from all the applied modifers
   * 
   * in PoE all increase modifers get summed up to one big more modifier
   */
  compute(): ValueRange {
    const flat = this.modifiers
      .filter(({ type }) => type === 'flat')
      .reduce(
        (sum, modifier) => sum.add(modifier.stat.values),
        new ValueRange(0, 0),
      );

    const increases = this.modifiers
      .filter(({ type }) => type === 'inc')
      .reduce(
        (sum, modifier) => sum.add(modifier.stat.values),
        new ValueRange(0, 0),
      );

    const more = this.modifiers
      .filter(({ type }) => type === 'more')
      .reduce(
        (sum, modifier) => sum.mult(modifier.stat.values.percentToFactor()),
        new ValueRange(1, 1),
      );

    return this.base
      .add(flat)
      .mult(increases.percentToFactor())
      .mult(more);
  }
}
