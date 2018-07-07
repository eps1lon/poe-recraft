import { inflectionIdentifier } from 'poe-i18n';
import { Flags, Generator, Item, Mod } from 'poe-mods';
import { createSelector } from 'reselect';

import { orbs } from 'components/GeneratorModal/Orb';
import { State } from 'state';
import { falseFlags, isDisabled } from 'util/flags';
import { withSpawnchance } from 'util/spawnweight';

export interface GeneratorDetails {
  mod: Mod;
  applicable?: Flags;
  spawnable?: Flags;
  spawnweight?: number;
}

export interface AvailableMods {
  prefixes: GeneratorDetails[];
  suffixes: GeneratorDetails[];
  implicits: GeneratorDetails[];
}

const availableMods = (
  item?: Item,
  generator?: Generator<Mod, Item>,
  whitelist: string[] = []
): AvailableMods => {
  let prefixes: GeneratorDetails[] = [];
  let suffixes: GeneratorDetails[] = [];
  let implicits: GeneratorDetails[] = [];

  if (item != null && generator != null) {
    const details = generator.modsFor(item, whitelist);

    prefixes = details.filter(({ mod }) => mod.isPrefix());
    suffixes = details.filter(({ mod }) => mod.isSuffix());
    implicits = details.filter(({ mod }) => mod.implicitCandidate());
  }

  const options = {
    filter: (details: GeneratorDetails) => !isDisabled(details)
  };

  return {
    prefixes: withSpawnchance(prefixes, options),
    suffixes: withSpawnchance(suffixes, options),
    implicits: withSpawnchance(implicits, options)
  };
};

const whitelistedAvailableMods = (whitelist: string[]) => (
  item?: Item,
  generator?: Generator<Mod, Item>
) => availableMods(item, generator, whitelist);

export const cachedAvailableMods = (whitelist: string[]) =>
  createSelector(
    (state: State) => state.craft.item,
    (state: State) => state.craft.mod_generator,
    whitelistedAvailableMods(whitelist)
  );

export const activeGenerator = (state: State) => {
  const { mod_generator_id } = state.craft;
  const orb = orbs[String(mod_generator_id)];

  if (orb !== undefined) {
    return orb.id;
  } else {
    return String(mod_generator_id);
  }
};

export const baseitemInflection = (state: State) => {
  const { item } = state.craft;
  const { messages } = state.i18n;

  if (item != null) {
    return inflectionIdentifier({
      inflection: messages[`poe.baseitemtypes.${item.baseitem.id}.inflection`]
    });
  } else {
    return inflectionIdentifier({});
  }
};

export const activeGeneratorApplicableTo = createSelector(
  (state: State) => state.craft.mod_generator,
  (state: State) => state.craft.item,
  (generator, item) => {
    if (generator === undefined || item === undefined) {
      return falseFlags();
    } else {
      return generator.applicableTo(item);
    }
  }
);
