import Component from '../Component';
import Item from '../Item';
import { AugmentableValue } from '../util';

export interface Requirements {
  list(): {
    level: AugmentableValue;
    dex: AugmentableValue;
    int: AugmentableValue;
    str: AugmentableValue;
  };
  level(): AugmentableValue;
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

  public dex = 0;
  public int = 0;
  public str = 0;

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

  /**
   * Computes the required level including stat applications
   */
  public level(): AugmentableValue {
    return this.parent.computeValue(this.baseLevel(), [
      'local',
      'requirements',
      'level',
    ]);
  }

  public list() {
    const attribute_requirements_classification = ['local', 'requirements'];

    return {
      level: this.level(),
      str: this.parent.computeValue(this.str, [
        ...attribute_requirements_classification,
        'strength',
      ]),
      dex: this.parent.computeValue(this.dex, [
        ...attribute_requirements_classification,
        'dexterity',
      ]),
      int: this.parent.computeValue(this.int, [
        ...attribute_requirements_classification,
        'intelligence',
      ]),
    };
  }

  public any(): boolean {
    return Object.values(this.list()).some(({ value }) => value !== 0);
  }

  /**
   * computes required level before stat applications
   *
   * @returns number
   */
  private baseLevel(): number {
    if (this.parent.meta_data.isA('AbstractMap')) {
      return 0;
    } else {
      return Math.max(
        this.parent.baseitem.drop_level,
        ...this.parent.mods.map(mod => mod.requiredLevel()),
      );
    }
  }
}
