// @flow
import { createSelector } from 'reselect';

import type { State } from '../reducers/rootReducer';

import type { Item } from 'poe-mods/lib/containers';
import type { Generator } from 'poe-mods/lib/generators';
import type { Mod } from 'poe-mods/lib/mods';
import type { Flags } from 'poe-mods/lib/util';

import { ItemShowcase } from 'poe-mods';

export function buildSowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return new ItemShowcase(mods, options);
}

export type GeneratorDetails = {
  mod: Mod,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number
};

export type AvailableMods = {
  prefixes: GeneratorDetails[],
  suffixes: GeneratorDetails[],
  implicits: GeneratorDetails[]
};

const availableMods = (
  item: ?Item,
  generator: ?Generator<*>,
  whitelist: string[] = []
): AvailableMods => {
  let prefixes = [];
  let suffixes = [];
  let implicits = [];

  if (item != null && generator != null) {
    const details = generator.modsFor(item, whitelist);

    prefixes = details.filter(({ mod }) => mod.isPrefix());
    suffixes = details.filter(({ mod }) => mod.isSuffix());
    implicits = details.filter(({ mod }) => mod.implicitCandidate());
  }

  return {
    prefixes,
    suffixes,
    implicits
  };
};

const whitelistedAvailableMods = (whitelist: string[]) => (
  item: ?Item,
  generator: ?Generator<*>
) => availableMods(item, generator, whitelist);

export const cachedAvailableMods = (whitelist: string[]) =>
  createSelector(
    (state: State) => state.craft.item,
    (state: State) => state.craft.mod_generator,
    whitelistedAvailableMods(whitelist)
  );
