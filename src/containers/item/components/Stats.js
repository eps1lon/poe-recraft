// @flow
import type { Component } from '../Component';
import type Item from '../Item';

import type { Mod } from '../../../mods';
import { Stat, type ValueRange } from '../../../util';

export type LocalStats = {
  [string]: ValueRange | string,
};

export interface Stats {
  list(): { [string]: Stat },
  local(): LocalStats,
}

export type Builder = {};

export default class ItemStats implements Stats, Component<Item, Builder> {
  parent: Item;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
  }

  builder(): Builder {
    return {};
  }

  /**
   * stats of mods combined
   */
  list() {
    return this.parent.mods.reduce((stats, mod: Mod) => {
      // flattened
      return mod.statsJoined().reduce((joined, stat) => {
        const { id } = stat.props;
        const existing = joined[id];

        // TODO fix typing
        // group by stat.Id
        if (existing instanceof Stat) {
          return {
            ...joined,
            [id]: existing.add(stat.values),
          };
        } else {
          return {
            ...joined,
            [id]: stat,
          };
        }
      }, stats);
    }, {});
  }

  /**
   * TODO
   */
  local(): LocalStats {
    if (this.parent.baseitem.component_armour != null) {
      return {
        physical_damage_reduction: String(
          this.parent.baseitem.component_armour.armour,
        ),
      };
    } else {
      throw new Error('could not build localStats');
    }
  }

  /**
   * method stub. remove mod stats and move to container
   */
  any(): boolean {
    return false;
  }
}
