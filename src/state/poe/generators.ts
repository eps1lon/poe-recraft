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

import { State } from './reducers';

export function buildShowcase(state: { poe: State }): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return new ItemShowcase(mods, options);
}

const buildAlchemy = (state: { poe: State }) => Alchemy.build(state.poe.mods);
const buildAugment = (state: { poe: State }) => Augment.build(state.poe.mods);
const buildAlteration = (state: { poe: State }) =>
  Alteration.build(state.poe.mods);
const buildChaos = (state: { poe: State }) => Chaos.build(state.poe.mods);
const buildExalted = (state: { poe: State }) => Exalted.build(state.poe.mods);
const buildRegal = (state: { poe: State }) => Regal.build(state.poe.mods);
const buildScouring = (state: { poe: State }) => new Scouring();
const buildTransmute = (state: { poe: State }) =>
  Transmute.build(state.poe.mods);

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
