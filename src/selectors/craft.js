// @flow
import { inflectionIdentifier } from 'poe-i18n';
import type { Item, Flags, Generator, Mod } from 'poe-mods';
import { createSelector } from 'reselect';

import type { State } from 'reducers/rootReducer';

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
  generator: ?Generator<*, *>,
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
  generator: ?Generator<*, *>
) => availableMods(item, generator, whitelist);

export const cachedAvailableMods = (whitelist: string[]) =>
  createSelector(
    (state: State) => state.craft.item,
    (state: State) => state.craft.mod_generator,
    whitelistedAvailableMods(whitelist)
  );

export const activeGenerator = (state: State) =>
  state.craft.mod_generator
    ? state.craft.mod_generator.constructor.name
    : undefined;

export const baseitemInflection = (state: State) => {
  const { item } = state.craft;
  const { messages } = state.i18n;

  if (item != null) {
    return inflectionIdentifier({
      inflection:
        messages[`poe.baseitemtypes.${item.baseitem.primary}.inflection`]
    });
  } else {
    return inflectionIdentifier({});
  }
};
