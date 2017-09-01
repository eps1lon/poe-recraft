// @flow
import type FlagSet from '../FlagSet';
import type Item from '../ModContainer/Item';
import type Mod from '../Mod/';

export const mods = (
  collection: any[],
  item: Item,
  success: string[]
): Mod[] => {
  return collection.filter(thing => {
    return (
      typeof thing.applicableTo === 'function' &&
      thing.applicableTo(item, success)
    );
  });
};

export const map = (
  collection: any[],
  item: Item,
  success: string[]
): Mod[] => {
  for (const thing of collection) {
    if (typeof thing.applicableTo === 'function') {
      thing.applicableTo(item, success);
    }
  }
  return collection;
};

export interface Applicable {
  applicable_flags: FlagSet,

  applicableTo(Item, string[]): boolean,
  resetApplicable(): void,
  applicableCached(): boolean
}
