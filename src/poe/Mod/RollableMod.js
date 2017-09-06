// @flow
import type { Spawnable } from '../interfaces/';
import type { SpawnWeightProps, ModProps } from '../data/schema';
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

    this.spawnable_flags = new FlagSet([
      'NO_MATCHING_TAGS',
      'SPAWNWEIGHT_ZERO'
    ]);
    this.resetSpawnable();

    this.rollable = undefined;
  }

  resetSpawnable(): void {
    this.spawnweight = 0;
    this.spawnchance = undefined;
    this.spawnable_flags.reset();
  }

  spawnweightFor(item: Item): ?SpawnWeightProps {
    const item_tags = item.getTags();

    return this.props.spawn_weights.find(({ tag }) =>
      item_tags.find(item_tag => tag.primary === item_tag.primary)
    );
  }

  spawnableOn(item: Item, success: string[] = []): boolean {
    const spawnweight = this.spawnweightFor(item);

    if (spawnweight == null) {
      this.spawnable_flags.enable('NO_MATCHING_TAGS');
      return false;
    } else if (spawnweight.value <= 0) {
      this.spawnweight = 0;
      this.spawnable_flags.enable('SPAWNWEIGHT_ZERO');
    } else {
      this.spawnweight = spawnweight.value;
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
