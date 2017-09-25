// @flow
import { Buildable } from '../interfaces';

export type PropsWithPrimary = {
  primary: number,
};

export class NotFound extends Error {
  constructor(name: string, message: string) {
    super(`${name} not found ${message}`);
  }
}

// take care. flow accepts any as a constructor
export default class PropsTable<P: PropsWithPrimary, T: Buildable<P>> {
  instance_constructor: Class<T>;
  table: P[];

  constructor(all: P[], constructor: Class<T>) {
    this.instance_constructor = constructor;
    this.table = all;
  }

  all(): P[] {
    return this.table;
  }

  find(finder: P => boolean): ?P {
    return this.table.find(finder);
  }

  /**
   * Builds an instance for the properties for which the provided predicate is
   * true. Returns for the first value for which the predicate is true
   */
  from(finder: P => boolean): T {
    const props = this.find(finder);

    if (props == null) {
      throw new NotFound(this.instance_constructor.name, `with custom finder`);
    }

    return this.instance_constructor.build(props);
  }

  fromPrimary(primary: number): T {
    try {
      return this.from(other => other.primary === primary);
    } catch (err) {
      throw new NotFound(
        this.instance_constructor.name,
        `with primary '${primary}'`,
      );
    }
  }
}
