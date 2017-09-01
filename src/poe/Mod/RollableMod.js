// @flow
import type { Applicable, Spawnable } from '../interfaces/';
import type { ModProps } from '../data/schema';
import type Item from '../ModContainer/Item';

import ApplicableMod from './ApplicableMod';
import FlagSet from '../FlagSet';

/* TODO: 
 * serialize()
 * spawnableByteHuman()
 * humanSpawnchance()
 * applicableByteHuman()
 */
export default class RollableMod extends ApplicableMod implements Spawnable {
  props: ModProps;
  rollable: ?boolean;
  // Spawnable
  spawnweight: number;
  spawnchance: ?number;
  spawnable_flags: FlagSet;

  constructor(props: ModProps) {
    super(props);

    this.spawnable_flags = new FlagSet([]);
    this.resetSpawnable();

    this.rollable = undefined;
  }

  resetSpawnable(): void {
    this.spawnweight = 0;
    this.spawnchance = undefined;
    this.spawnable_flags.reset();
  }

  spawnableOn(item: Item, success: string[]): boolean {
    const item_tags = item.getTags();

    const spawnweight = this.props.spawn_weights.find(({ tag }) =>
      item_tags.find(item_tag => tag.primary === item_tag.primary)
    );

    if (spawnweight === undefined) {
      this.spawnable_flags.enable('NO_MATCHING_TAGS');
      return false;
    } else if (spawnweight.value <= 0) {
      this.spawnweight = 0;
      this.spawnable_flags.enable('SPAWNWEIGHT_ZERO');
    }

    return !FlagSet.flagsBlacklisted(this.spawnable_flags, success).anySet();
  }

  spawnableCached(): boolean {
    return !this.spawnable_flags.anySet();
  }

  rollableOn(item: Item): boolean {
    this.rollable = this.applicableTo(item, []) && this.spawnableOn(item, []);

    return this.rollable;
  }

  rollableCached(): boolean {
    return this.spawnableCached() && this.applicableCached();
  }
}
