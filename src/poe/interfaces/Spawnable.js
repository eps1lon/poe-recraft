// @flow
import type FlagSet from '../FlagSet';
import type Item from '../ModContainer/Item';

export const mods = (
  collection: any[],
  item: Item,
  success: string[]
): any[] => {
  return collection.filter(thing => {
    return (
      typeof thing.spawnableOn === 'function' &&
      thing.spawnableOn(item, success)
    );
  });
};

export const map = (
  collection: any[],
  item: Item,
  success: string[]
): any[] => {
  for (const thing of collection) {
    if (typeof thing.spawnableOn === 'function') {
      thing.spawnableOn(item, success);
    }
  }
  return collection;
};

export const calculateSpawnchance = (
  collection: any[],
  filter: any => boolean
) => {
  const sum_spawnweight = collection.reduce((sum, thing) => {
    if (thing.spawnweight instanceof Number && filter(thing)) {
      return sum + thing.spawnweight;
    } else {
      return sum;
    }
  }, 0);

  return collection.map(thing => {
    if (thing.spawnweight instanceof Number && filter(thing)) {
      thing.spawnchance = thing.spawnweight / sum_spawnweight;
    }

    return thing;
  });
};

export interface Spawnable {
  spawnweight_cached: number,
  spawnchance: ?number,
  spawnable_flags: FlagSet,

  spawnableOn(Item): boolean,
  resetSpawnable(): void,
  spawnableCached(): boolean
}
