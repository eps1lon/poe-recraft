// @flow
import type FlagSet from '../FlagSet';
import type Item from '../ModContainer/Item';

export interface Spawnable {
  spawnweightFor(Item): number,
  spawnableOn(Item): FlagSet
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
  spawnweightFor?: Item => number,
  spawnableOn?: Item => FlagSet
};

/** 
 * experimental flow feature
export const implementedBy = (thing: MaybeSpawnable): boolean %checks => {
  return thing.spawnableOn != null;
};*/

export const calculateSpawnchance = (
  item: Item,
  collection: MaybeSpawnable[],
  filter: MaybeSpawnable => boolean
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
      thing
    };
  });
};
