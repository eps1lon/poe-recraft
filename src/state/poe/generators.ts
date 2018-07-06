import {
  Alchemy,
  Alteration,
  Annulment,
  Augment,
  Chaos,
  Exalted,
  IncursionTempleMods,
  ItemShowcase,
  Regal,
  Scouring,
  Transmute,
  Vaal
} from 'poe-mods';
import { createSelector } from 'reselect';

import { State } from './reducers';
import { getEssences, getMods } from './selectors';

export const buildShowcase = createSelector(
  (state: { poe: State }) => getMods(state),
  (state: { poe: State }) => state.poe.benchoptions.data,
  (state: { poe: State }) => getEssences(state),
  (mods, options, essences) => {
    return new ItemShowcase(mods, options, essences);
  }
);

const buildAlchemy = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Alchemy.build(mods)
);
const buildAnnullment = () => new Annulment();
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
const buildIncursion = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => IncursionTempleMods.build(mods)
);
const buildVaal = createSelector(
  (state: { poe: State }) => getMods(state),
  mods => Vaal.build(mods)
);

export function buildGeneratorFactory(generator: string) {
  switch (generator) {
    case 'alchemy':
      return buildAlchemy;
    case 'annullment':
      return buildAnnullment;
    case 'augmentation':
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
    case 'incursion':
      return buildIncursion;
    case 'vaal':
      return buildVaal;
    default:
      throw new Error(generator);
  }
}
