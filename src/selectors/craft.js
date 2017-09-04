// @flow
import type { State } from '../reducers/rootReducer';

import ItemShowcase from '../poe/ModGenerator/ItemShowcase';

export function buildSowcase(state: State): ItemShowcase {
  const mods = state.poe.mods;
  const options = state.poe.benchoptions;

  return ItemShowcase.build(mods, options);
}
