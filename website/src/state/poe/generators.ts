import {
  Alchemy,
  Alteration,
  Annulment,
  Augment,
  Chaos,
  ElderMods,
  Exalted,
  Generator,
  IncursionTempleMods,
  Item,
  ItemShowcase,
  Mod,
  Regal,
  Scouring,
  ShapedMods,
  Transmute,
  Vaal,
} from 'poe-mods';
import { createSelector } from 'reselect';

import { State as PoeState } from './reducers';
import { getEssences, getMods } from './selectors';

export const buildShowcase = createSelector(
  getMods,
  state => state.poe.benchoptions.data,
  getEssences,
  (mods, options, essences) => {
    return new ItemShowcase(mods, options, essences);
  },
);

// orbs
const buildAlchemy = createSelector(
  getMods,
  mods => Alchemy.build(mods),
);
const buildAnnullment = () => new Annulment();
const buildAugment = createSelector(
  getMods,
  mods => Augment.build(mods),
);
const buildAlteration = createSelector(
  getMods,
  mods => Alteration.build(mods),
);
const buildChaos = createSelector(
  getMods,
  mods => Chaos.build(mods),
);
const buildExalted = createSelector(
  getMods,
  mods => Exalted.build(mods),
);
const buildRegal = createSelector(
  getMods,
  mods => Regal.build(mods),
);
const buildScouring = () => new Scouring();
const buildTransmute = createSelector(
  getMods,
  mods => Transmute.build(mods),
);
const buildVaal = createSelector(
  getMods,
  mods => Vaal.build(mods),
);
// misc
const buildIncursion = createSelector(
  getMods,
  mods => IncursionTempleMods.build(mods),
);
const buildElderMods = createSelector(
  getMods,
  mods => ElderMods.build(mods),
);
const buildShapedMods = createSelector(
  getMods,
  mods => ShapedMods.build(mods),
);

export function buildGeneratorFactory(
  generator: string,
): (state: { poe: PoeState }) => Generator<Mod, Item> {
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
    case 'elder':
      return buildElderMods;
    case 'shaped':
      return buildShapedMods;
    default:
      throw new Error(generator);
  }
}
