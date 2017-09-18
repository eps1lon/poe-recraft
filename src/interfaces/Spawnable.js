// @flow
import type { Flags } from '../util/Flags';
import type { Item } from '../containers';

export interface Spawnable {
  spawnweightFor(Item): number,
  spawnableOn(Item): Flags<*>,
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
  // spawnweight(Item)?
  +spawnweightFor?: Item => number,
  +spawnableOn?: Item => Flags<*>,
};

/** 
 * experimental flow feature
export const implementedBy = (thing: MaybeSpawnable): boolean %checks => {
  return thing.spawnableOn != null;
}; */

// filter nothing
const allowAll = () => true;

export const calculateSpawnchance = (
  item: Item,
  collection: MaybeSpawnable[],
  filter?: MaybeSpawnable => boolean = allowAll,
): { thing: MaybeSpawnable, spawnchance: number }[] => {
  const sum_spawnweight = collection.reduce((sum, thing) => {
    if (thing.spawnweightFor != null && filter(thing)) {
      return sum + thing.spawnweightFor(item);
    } else {
      return sum;
    }
  }, 0);

  return collection.map(thing => {
    let spawnchance = 0;

    if (thing.spawnweightFor != null && filter(thing)) {
      spawnchance = thing.spawnweightFor(item) / sum_spawnweight;
    }

    return {
      spawnchance,
      thing,
    };
  });
};
