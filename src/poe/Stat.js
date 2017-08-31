// @flow
import type { StatProps } from './data/schema';
import type { Translateable } from './interfaces/';
import type { ValueRange } from './ValueRange';

class Stat implements Translateable {
  static localization = null;

  props: StatProps;
  values: ?ValueRange;

  constructor(props: StatProps) {
    this.props = props;
    this.values = null;
  }

  t(other_stats, localization = Stat.localization) {
    const { id } = this.props;

    return '';
  }
}
