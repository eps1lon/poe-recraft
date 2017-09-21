// @flow
import { Buildable } from '../interfaces';

const defaultPrimaryFinder = primary => (props: any) =>
  props.primary === primary;

/**
 * careful when using this. Flow doesnt check static methods on interfaces
 * a static build
 */
export function withPrimaryFinder<P, T: Buildable<P>>(
  superclass: Class<T>,
  finder: number => P => boolean = defaultPrimaryFinder,
): Class<*> {
  // $FlowFixMe: static get name()
  return class extends superclass {
    // keep the class name, hides implementation detail
    // static name = superclass.name; throw runtime
    static get name() {
      return super.name;
    }

    static all: ?(P[]);

    static fromPrimary(primary: number) {
      if (this.all == null) {
        throw new Error(`${String(this.name)} props list not set`);
      }

      const props = this.all.find(finder(primary));

      if (props === undefined) {
        throw new Error(`${this.name} primary '${primary}' not found`);
      }

      return this.build(props);
    }
  };
}
