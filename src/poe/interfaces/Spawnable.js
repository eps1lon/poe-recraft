// @flow
import type FlagSet from '../FlagSet';
import type Item from '../ModContainer/Item';

export interface Spawnable {
  spawnweight: number,
  spawnchance: ?number,
  spawnable_flags: FlagSet,

  spawnableOn(Item, string[]): boolean,
  resetSpawnable(): void,
  spawnableCached(): boolean
}

/**
 * this is for objects for which we decide at runtime if they implemented that
 * interface
 * 
 * its basically something like <T: ?Spawnable>
 * which means that if any of the properties defined in Spawnable is != null
 * then the hole interface is implemented
 */
export type MaybeSpawnable = {
  spawnableOn?: (Item, string[]) => boolean,
  spawnchance?: ?number,
  spawnweight?: number
};

/** 
 * experimental flow feature
export const implementedBy = (thing: MaybeSpawnable): boolean %checks => {
  return thing.spawnableOn != null;
};*/

export const mods = (
  collection: MaybeSpawnable[],
  item: Item,
  success: string[]
): MaybeSpawnable[] => {
  return collection.filter(thing => {
    return thing.spawnableOn != null && thing.spawnableOn(item, success);
  });
};

export const map = (
  collection: MaybeSpawnable[],
  item: Item,
  success: string[]
): MaybeSpawnable[] => {
  for (const thing of collection) {
    if (thing.spawnableOn != null) {
      thing.spawnableOn(item, success);
    }
  }
  return collection;
};

export const calculateSpawnchance = (
  collection: MaybeSpawnable[],
  filter: MaybeSpawnable => boolean
) => {
  const sum_spawnweight = collection.reduce((sum, thing) => {
    if (thing.spawnweight != null && filter(thing)) {
      return sum + thing.spawnweight;
    } else {
      return sum;
    }
  }, 0);

  return collection.map(thing => {
    if (filter(thing) && thing.spawnweight != null) {
      thing.spawnchance = thing.spawnweight / sum_spawnweight;
    }

    return thing;
  });
};
