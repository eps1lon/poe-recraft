// @flow
import { type BaseItemTypeProps } from '../../schema';

type BaseBuilder = {
  baseitem: BaseItemTypeProps,
};

const shallowEqual = (a: {}, b: {}) => {
  return a === b || Object.keys(a).every(key => a[key] === b[key]);
};

export default class BaseItem<B: BaseBuilder> {
  static fromBuilder(builder: B): BaseItem<B> {
    return new BaseItem(builder.baseitem);
  }

  baseitem: BaseItemTypeProps;

  constructor(props: BaseItemTypeProps) {
    this.baseitem = props;
  }

  builder(): B {
    const builder: $Shape<B> = { baseitem: this.baseitem };

    return builder;
  }

  withMutations(mutate: B => B): this {
    const prev = this.builder();
    const mutated = mutate(prev);

    if (shallowEqual(prev, mutated)) {
      return this;
    } else {
      return this.constructor.fromBuilder(mutated);
    }
  }
}
