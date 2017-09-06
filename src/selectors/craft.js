// @flow
import { createSelector } from 'reselect';

import type { State } from '../reducers/rootReducer';
import type Item from '../poe/ModContainer/Item';
import type ModGenerator from '../poe/ModGenerator/';
import type Mod from '../poe/Mod/';

import ItemShowcase from '../poe/ModGenerator/ItemShowcase';

export function buildSowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return ItemShowcase.build(mods, options);
}

const availableMods = (
  item: ?Item,
  generator: ?ModGenerator<*>,
  whitelist: string[] = []
) => {
  let prefixes: Mod[] = [];
  let suffixes: Mod[] = [];
  let implicits: Mod[] = [];

  if (item != null && generator != null) {
    const mods = generator.modsFor(item, whitelist);

    prefixes = mods.filter(mod => mod.isPrefix());
    suffixes = mods.filter(mod => mod.isSuffix());
    implicits = mods.filter(mod => mod.implicitCandidate());
  }

  return {
    prefixes,
    suffixes,
    implicits
  };
};

const whitelistedAvailableMods = (whitelist: string[]) => (
  item: ?Item,
  generator: ?ModGenerator<*>
) => availableMods(item, generator, whitelist);

export const cachedAvailableMods = (whitelist: string[]) =>
  createSelector(
    (state: State) => state.craft.item,
    (state: State) => state.craft.mod_generator,
    whitelistedAvailableMods(whitelist)
  );
