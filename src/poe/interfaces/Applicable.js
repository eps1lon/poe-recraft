// @flow
import type FlagSet from '../FlagSet';
import type ModContainer from '../ModContainer/';
import type Mod from '../Mod/';

type Success = any;

export const mods = (
  collection: any[],
  mod_container: ModContainer,
  success: Success
): Mod[] => {
  return collection.filter(thing => {
    return (
      typeof thing.applicableTo === 'function' &&
      thing.applicableTo(mod_container, success)
    );
  });
};

export const map = (
  collection: any[],
  mod_container: ModContainer,
  success: Success
): Mod[] => {
  for (const thing of collection) {
    if (typeof thing.applicableTo === 'function') {
      thing.applicableTo(mod_container, success);
    }
  }
  return collection;
};

export interface Applicable {
  applicable_flags: FlagSet,

  applicableTo(ModContainer, Success): boolean,
  resetApplicable(): void,
  applicableCached(): void
}
