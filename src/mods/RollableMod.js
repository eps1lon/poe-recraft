// @flow
import type { Spawnable } from '../interfaces/';
import type { SpawnWeightProps } from '../schema';
import type { Item } from '../containers/';

import ApplicableMod from './ApplicableMod';
import { type Flags } from '../util/Flags';

export type SpawnableFlag = 'no_matching_tags' | 'spawnweight_zero';
export type SpawnableFlags = Flags<SpawnableFlag>;

/* TODO:
 * serialize()
 */
export default class RollableMod extends ApplicableMod implements Spawnable {
  static SPAWNABLE_FLAGS: SpawnableFlags = {
    no_matching_tags: false,
    spawnweight_zero: false,
  };

  spawnweightPropsOf(item: Item): ?SpawnWeightProps {
    const item_tags = item.getTags();

    return this.props.spawn_weights.find(({ tag }) =>
      item_tags.find(item_tag => tag.primary === item_tag.primary),
    );
  }

  spawnableOn(item: Item): SpawnableFlags {
    const spawnable_flags = { ...RollableMod.SPAWNABLE_FLAGS };
    const spawnweight = this.spawnweightPropsOf(item);

    if (spawnweight == null) {
      // at first glance this shouldn't be happening
      // since every mod seems to have a spawnweight for the default
      // tag which every equipment seems to have
      spawnable_flags.no_matching_tags = true;
    } else if (spawnweight.value <= 0) {
      spawnable_flags.spawnweight_zero = true;
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
