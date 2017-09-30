// @flow
import {
  ItemShowcase,
  Alchemy,
  Alteration,
  Augment,
  Chaos,
  Exalted,
  Regal,
  Scouring,
  Transmute
} from 'poe-mods';

import type { State } from 'reducers/rootReducer';

export function buildShowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return new ItemShowcase(mods, options);
}

const buildAlchemy = (state: State) => Alchemy.build(state.poe.mods);
const buildAugment = (state: State) => Augment.build(state.poe.mods);
const buildAlteration = (state: State) => Alteration.build(state.poe.mods);
const buildChaos = (state: State) => Chaos.build(state.poe.mods);
const buildExalted = (state: State) => Exalted.build(state.poe.mods);
const buildRegal = (state: State) => Regal.build(state.poe.mods);
const buildScouring = (state: State) => new Scouring();
const buildTransmute = (state: State) => Transmute.build(state.poe.mods);

export function buildGeneratorFactory(generator: string) {
  switch (generator) {
    case 'alchemy':
      return buildAlchemy;
    case 'augment':
      return buildAugment;
    case 'alteration':
      return buildAlteration;
    case 'chaos':
      return buildChaos;
    case 'exalted':
      return buildExalted;
    case 'regal':
      return buildRegal;
    case 'scouring':
      return buildScouring;
    case 'showcase':
      return buildShowcase;
    case 'transmute':
      return buildTransmute;
    default:
      throw new Error(generator);
  }
}
