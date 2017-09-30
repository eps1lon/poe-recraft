// @flow
import type { Mod } from 'poe-mods';
import type { Dispatch } from 'redux';

import { addMod, removeMod } from 'actions/item';

export type ModHandles = {
  onAddMod: Mod => any,
  onRemoveMod: Mod => any
};
export const modHandles = (dispatch: Dispatch<*>) => {
  return {
    onAddMod: (mod: Mod) => dispatch(addMod(mod)),
    onRemoveMod: (mod: Mod) => dispatch(removeMod(mod))
  };
};

export default modHandles;
