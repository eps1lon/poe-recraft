// @flow
import { ItemShowcase } from 'poe-mods';

import type { State } from '../reducers/rootReducer';

export function buildShowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return new ItemShowcase(mods, options);
}
