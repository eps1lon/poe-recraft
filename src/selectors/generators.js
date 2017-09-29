// @flow
import { ItemShowcase, Alchemy, Alteration, Transmute } from 'poe-mods';

import type { State } from '../reducers/rootReducer';

export function buildShowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return new ItemShowcase(mods, options);
}

export function buildGeneratorFactory(generator: string) {
  switch (generator) {
    case 'alchemy':
      return buildAlchemy;
    case 'alteration':
      return buildAlteration;
    case 'transmute':
      return buildTransmute;
    default:
      throw new Error(generator);
  }
}

function buildAlchemy(state: State): Alchemy {
  const mods = state.poe.mods;

  return Alchemy.build(mods);
}

function buildAlteration(state: State): Alteration {
  const mods = state.poe.mods;

  return Alteration.build(mods);
}

function buildTransmute(state: State): Transmute {
  const mods = state.poe.mods;

  return Transmute.build(mods);
}
