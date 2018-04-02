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
import { createSelector } from 'reselect';

import { State } from './reducers';
import { getEssences, getMods } from './selectors';

export const buildShowcase = createSelector(
  (state: { poe: State }) => getMods(state),
  (state: { poe: State }) => state.poe.benchoptions,
  (state: { poe: State }) => getEssences(state),
  (mods, options, essences) => new ItemShowcase(mods, options, essences)
);

const buildAlchemy = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Alchemy.build(mods)
);
const buildAugment = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Augment.build(mods)
);
const buildAlteration = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Alteration.build(mods)
);
const buildChaos = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Chaos.build(mods)
);
const buildExalted = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Exalted.build(mods)
);
const buildRegal = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Regal.build(mods)
);
const buildScouring = () => new Scouring();
const buildTransmute = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Transmute.build(mods)
);

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
