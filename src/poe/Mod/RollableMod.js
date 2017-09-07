// @flow
import type { Spawnable } from '../interfaces/';
import type { SpawnWeightProps } from '../data/schema';
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
  static SPAWNABLE_FLAGS = ['NO_MATCHING_TAGS', 'SPAWNWEIGHT_ZERO'];

  spawnweightPropsOf(item: Item): ?SpawnWeightProps {
    const item_tags = item.getTags();

    return this.props.spawn_weights.find(({ tag }) =>
      item_tags.find(item_tag => tag.primary === item_tag.primary)
    );
  }

  spawnableOn(item: Item): FlagSet {
    const spawnable_flags = new FlagSet(RollableMod.SPAWNABLE_FLAGS);
    const spawnweight = this.spawnweightPropsOf(item);

    if (spawnweight == null) {
      spawnable_flags.enable('NO_MATCHING_TAGS');
    } else if (spawnweight.value <= 0) {
      spawnable_flags.enable('SPAWNWEIGHT_ZERO');
    }

    return spawnable_flags;
  }

  spawnweightFor(item: Item): number {
    const spawnweight = this.spawnweightPropsOf(item);

    if (spawnweight == null) {
      return 0;
    } else {
      return spawnweight.value;
    }
  }
}
