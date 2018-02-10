import { BaseError } from 'make-error';

import { Buildable } from '../interfaces';

export interface TableProps {
  primary: number;
  name?: string;
}

export class NotFound extends BaseError {
  constructor(name: string, message: string) {
    super(`${name} not found ${message}`);
  }
}

// take care. flow accepts any as a constructor
export default class PropsTable<P extends TableProps, T> {
  public builder: Buildable<P, T>;
  public table: P[];

  constructor(all: P[], constructor: Buildable<P, T>) {
    this.builder = constructor;
    this.table = all;
  }

  public all(): P[] {
    return this.table;
  }

  public find(finder: (props: P) => boolean): P | undefined {
    return this.table.find(finder);
  }

  /**
   * Builds an instance for the properties for which the provided predicate is
   * true. Returns for the first value for which the predicate is true
   */
  public from(finder: (props: P) => boolean): T {
    const props = this.find(finder);

    if (props == null) {
      throw new NotFound(this.builder.name, `with custom finder`);
    }

    return this.builder.build(props);
  }

  public fromPrimary(primary: number): T {
    try {
      return this.from(other => other.primary === primary);
    } catch (err) {
      // catch Notfound
      if (err instanceof NotFound) {
        throw new NotFound(this.builder.name, `with primary '${primary}'`);
      } else {
        throw err;
      }
    }
  }

  public fromName(name: string): T {
    try {
      return this.from(other => other.name === name);
    } catch (err) {
      // catch Notfound
      if (err instanceof NotFound) {
        throw new NotFound(this.builder.name, `with name '${name}'`);
      } else {
        throw err;
      }
    }
  }
}
