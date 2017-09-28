// @flow
import type { Component } from '../Component';
import type Item from '../Item';

export interface Requirements {
  list(): { level: number, dex: number, int: number, str: number },
  level(): number,
}

export type Builder = ?{
  req_str: number,
  req_dex: number,
  req_int: number,
};

export default class ItemName
  implements Requirements, Component<Item, Builder> {
  parent: Item;

  dex: number = 0;
  int: number = 0;
  str: number = 0;

  constructor(item: Item, builder: Builder) {
    this.parent = item;

    if (builder != null) {
      this.dex = builder.req_dex;
      this.int = builder.req_int;
      this.str = builder.req_str;
    }
  }

  builder(): Builder {
    return {
      req_dex: this.dex,
      req_int: this.int,
      req_str: this.str,
    };
  }

  level(): number {
    if (this.parent.meta_data.isA('AbstractMap')) {
      return 0;
    } else {
      return Math.max(
        this.parent.baseitem.drop_level,
        ...this.parent.mods.map(mod => mod.requiredLevel()),
      );
    }
  }

  list() {
    return {
      level: this.level(),
      str: this.str,
      dex: this.dex,
      int: this.int,
    };
  }

  any(): boolean {
    return Object.values(this.list()).some(value => value !== 0);
  }
}
