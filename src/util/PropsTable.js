// @flow
import { Buildable } from '../interfaces';

type PropsWithPrimary = {
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

  findByPrimary(primary: number): ?P {
    return this.find(other => other.primary === primary);
  }

  fromPrimary(primary: number): T {
    const props = this.findByPrimary(primary);

    if (props == null) {
      throw new NotFound(
        this.instance_constructor.name,
        `with primary '${primary}'`,
      );
    }

    return this.instance_constructor.build(props);
  }
}
