// @flow

export type SetMap = {
  [string]: boolean
};

export default class FlagSet {
  static flagsBlacklisted(flag_set: FlagSet, blacklist: string[] = []) {
    const new_flag_set = flag_set.clone();

    for (const flag of blacklist) {
      new_flag_set.disable(flag);
    }

    return new_flag_set;
  }

  flags: string[];
  value: number;

  constructor(names: string[]) {
    this.flags = names;
    this.value = 0;
  }

  valueOf(flag: string): number {
    if (!this.exists(flag)) {
      throw new Error(`flag ${flag} doesnt exist`);
    } else {
      return Math.pow(2, this.flags.indexOf(flag));
    }
  }

  exists(name: string) {
    return this.flags.indexOf(name) !== -1;
  }

  add(name: string) {
    if (!this.exists(name)) {
      this.flags.push(name);
    } else {
      console.error('`' + name + '` already set in', this.flags);
    }
  }

  isSet(name: string): boolean {
    const value = this.valueOf(name);
    if (value == null) {
      return false;
    } else {
      return !!(this.value & value);
    }
  }

  setMap(): SetMap {
    return this.flags.reduce((bits_set, name) => {
      return {
        ...bits_set,
        [name]: this.isSet(name)
      };
    }, {});
  }

  anySet() {
    return this.value > 0;
  }

  enable(flag: string) {
    this.value |= this.valueOf(flag);

    return this.value;
  }

  disable(flag: string) {
    this.value &= ~this.valueOf(flag);

    return this.value;
  }

  clone() {
    const new_byte_set = new FlagSet(this.flags.slice());
    new_byte_set.value = this.value;

    return new_byte_set;
  }

  reset() {
    this.value = 0;
  }

  /**
   * applies a callback to each bit with its value (true/false)
   * returns an object with each bitName => bitValue pair for which
   * the callback returns true
   */
  filterBits(filter_cb: (boolean, string, SetMap) => boolean): SetMap {
    const unfiltered = this.setMap();

    return Object.keys(unfiltered).reduce((filtered, flag) => {
      if (filter_cb(unfiltered[flag], flag, unfiltered) === true) {
        return {
          ...filtered,
          [flag]: unfiltered[flag]
        };
      } else {
        return filtered;
      }
    }, {});
  }
}
