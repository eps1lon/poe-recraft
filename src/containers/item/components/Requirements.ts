import Component from '../Component';
import Item from '../Item';

export interface Requirements {
  list(): { level: number; dex: number; int: number; str: number };
  level(): number;
}

export type Builder =
  | {
      req_str: number;
      req_dex: number;
      req_int: number;
    }
  | undefined;

/** 
 * the requirements to use this item
 * 
 * contains attributes strength, intelligence, evasion
 * and the itemlevel
 */
export default class ItemName
  implements Requirements, Component<Item, Builder> {
  public parent: Item;

  public dex: number = 0;
  public int: number = 0;
  public str: number = 0;

  constructor(item: Item, builder: Builder) {
    this.parent = item;

    if (builder != null) {
      this.dex = builder.req_dex;
      this.int = builder.req_int;
      this.str = builder.req_str;
    }
  }

  public builder(): Builder {
    return {
      req_dex: this.dex,
      req_int: this.int,
      req_str: this.str,
    };
  }

  public level(): number {
    if (this.parent.meta_data.isA('AbstractMap')) {
      return 0;
    } else {
      return Math.max(
        this.parent.baseitem.drop_level,
        ...this.parent.mods.map(mod => mod.requiredLevel()),
      );
    }
  }

  public list() {
    return {
      level: this.level(),
      str: this.str,
      dex: this.dex,
      int: this.int,
    };
  }

  public any(): boolean {
    return Object.values(this.list()).some(value => value !== 0);
  }
}
