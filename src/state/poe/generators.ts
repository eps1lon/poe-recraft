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

import { getEssences, getMods } from './selectors';

export const buildShowcase = createSelector(
  getMods,
  state => state.poe.benchoptions.data,
  getEssences,
  (mods, options, essences) => {
    return new ItemShowcase(mods, options, essences);
  }
);

const buildAlchemy = createSelector(getMods, mods => Alchemy.build(mods));
const buildAnnullment = () => new Annulment();
const buildAugment = createSelector(getMods, mods => Augment.build(mods));
const buildAlteration = createSelector(getMods, mods => Alteration.build(mods));
const buildChaos = createSelector(getMods, mods => Chaos.build(mods));
const buildExalted = createSelector(getMods, mods => Exalted.build(mods));
const buildRegal = createSelector(getMods, mods => Regal.build(mods));
const buildScouring = () => new Scouring();
const buildTransmute = createSelector(getMods, mods => Transmute.build(mods));
const buildIncursion = createSelector(getMods, mods =>
  IncursionTempleMods.build(mods)
);
const buildVaal = createSelector(getMods, mods => Vaal.build(mods));

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
